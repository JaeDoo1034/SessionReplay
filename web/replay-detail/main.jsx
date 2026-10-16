import React, { useEffect, useMemo, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { createPortal } from 'react-dom';
import { ReactFlow, Background, Controls, Handle, Position, BaseEdge, getBezierPath, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './style.css';
import { analyzeBehavior } from '../../src/behavior-analyzer.js';

// Adapted from ReactFlow_Ref/langgraph-flow-monitor: custom execution nodes,
// animated handoffs and status borders. All statuses come from real work.
const STAGES = ['기준 설정', '로그 분석', 'LLM 분석'];
const LABELS = { waiting: '대기', running: '실행 중', completed: '완료', failed: '실패' };
function ExecutionNode({ data }) {
  return <div className={`analysis-node ${data.status}`}>
    <Handle type="target" position={Position.Left}/>
    <div className="an-node-top"><span>STEP 0{data.order}</span><b>{LABELS[data.status]}</b></div>
    <strong>{data.label}</strong><p>{data.subtitle}</p>
    <div className="an-node-bottom">{data.elapsed ? `${(data.elapsed / 1000).toFixed(1)}초` : '—'}<span>{data.status === 'completed' ? '✓' : data.status === 'running' ? '●' : '○'}</span></div>
    <Handle type="source" position={Position.Right}/>
  </div>;
}
function AnimatedEdge(props) {
  const [path] = getBezierPath(props);
  return <><BaseEdge path={path} markerEnd={props.markerEnd} style={{ stroke: props.data.done ? '#28c6a4' : props.data.active ? '#60a5fa' : '#475569', strokeWidth: 2 }}/>
    {props.data.active && <><path d={path} fill="none" stroke="#60a5fa" strokeWidth="3" strokeDasharray="6 10" className="analysis-edge"/><circle r="4" fill="#93c5fd"><animateMotion dur="1.4s" repeatCount="indefinite" path={path}/></circle></>}
  </>;
}
const nodeTypes = { execution: ExecutionNode };
const edgeTypes = { animated: AnimatedEdge };
const newStages = () => STAGES.map(() => ({ status: 'waiting', elapsed: 0 }));
const bridge = () => window.ReplayDetailBridge;
const previewDefaults = window.SessionReplaySDK.getConfig();
const previewScreen = screen => window.SessionReplaySDK.previewCollection({ eventType: 'view_state', data: { screenName: screen.screenName, title: screen.screenLabel, activeSelector: screen.screenName ? `.screen[data-view=${JSON.stringify(screen.screenName)}]` : 'document', scrollTop: '<화면 진입 시 스크롤 위치>' } });
const pathOf = value => { try { const u = new URL(value, location.href); return u.pathname + u.search + u.hash; } catch { return ''; } };
const formatTime = ms => `${Math.floor(ms / 60000)}:${String(Math.floor(ms / 1000) % 60).padStart(2, '0')}`;
function nodePath(node) {
  if (node.id) return `#${CSS.escape(node.id)}`;
  for (const attr of ['data-testid', 'data-test', 'data-qa', 'data-cy', 'name', 'aria-label']) {
    const value = node.getAttribute(attr);
    if (!value) continue;
    const selector = `${node.tagName.toLowerCase()}[${attr}=${JSON.stringify(value)}]`;
    if (node.ownerDocument.querySelectorAll(selector).length === 1) return selector;
  }
  const parts = [];
  for (let current = node; current && current !== node.ownerDocument.body; current = current.parentElement) {
    const siblings = [...(current.parentElement?.children || [])].filter(n => n.tagName === current.tagName);
    parts.unshift(`${current.tagName.toLowerCase()}:nth-of-type(${siblings.indexOf(current) + 1})`);
  }
  return parts.join(' > ');
}
const screenKey = screen => JSON.stringify([screen.pagePath, screen.screenName || '']);
function recordedScreens(payload) {
  if (!payload) return [];
  const rows = [];
  let pagePath = pathOf(payload.page?.href || location.href);
  for (const event of payload.events) {
    const data = event.data || {};
    let row;
    if (event.type === 'snapshot') {
      pagePath = pathOf(data.url || pagePath);
      const doc = new DOMParser().parseFromString(data.html || '', 'text/html');
      row = { pagePath, screenName: doc.querySelector('.screen.active[data-view]')?.dataset.view || '', screenLabel: doc.querySelector('#screen-title')?.textContent || doc.title || pagePath, time: event.timeOffsetMs || 0 };
    } else if (data.eventType === 'view_state') {
      row = { pagePath, screenName: data.screenName || '', screenLabel: data.title || data.screenName || pagePath, time: event.timeOffsetMs };
    } else if (['history_pushstate', 'history_replacestate', 'popstate', 'hashchange'].includes(data.eventType) && data.href) {
      pagePath = pathOf(data.href);
      row = { pagePath, screenName: '', screenLabel: pagePath, time: event.timeOffsetMs };
    }
    if (row && !rows.some(item => screenKey(item) === screenKey(row))) rows.push(row);
  }
  return rows;
}
function currentScreen(context) {
  const doc = context.frame?.contentDocument;
  if (!doc?.body || !context.payload) return null;
  let url = context.payload.events.find(e => e.type === 'snapshot')?.data?.url || context.payload.page?.href;
  const position = Number(document.getElementById('replay-position').value);
  for (const event of context.payload.events) {
    if (event.timeOffsetMs <= position && ['history_pushstate', 'history_replacestate', 'popstate', 'hashchange'].includes(event.data?.eventType)) url = event.data.href || url;
  }
  return { pagePath: pathOf(url), screenName: doc.querySelector('.screen.active[data-view]')?.dataset.view || '', screenLabel: doc.querySelector('#screen-title')?.textContent || doc.title || pathOf(url) };
}

function App() {
  const [context, setContext] = useState(() => bridge()?.getContext() || {});
  const [enabled, setEnabled] = useState(false);
  const [scope, setScope] = useState('all');
  const [selectedScreens, setSelectedScreens] = useState([]);
  const [viewedKey, setViewedKey] = useState('');
  const [collectionPreview, setCollectionPreview] = useState(null);
  const [picking, setPicking] = useState(false);
  const [message, setMessage] = useState('현재 선택한 세션 전체의 행동을 분석합니다.');
  const [instructions, setInstructions] = useState('');
  const [stages, setStages] = useState(newStages);
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const dialog = useRef(null);
  const runRef = useRef(0);
  const busyRef = useRef(false);
  const screens = useMemo(() => recordedScreens(context.payload), [context.payload]);
  const local = useMemo(() => context.payload ? analyzeBehavior(context.payload).summary : null, [context.payload]);
  const buttonCount = selectedScreens.reduce((count, row) => count + row.buttons.length, 0);
  const ready = Boolean(context.payload && (!enabled || selectedScreens.length));
  const selectionLabel = enabled ? `${selectedScreens.length}개 화면 · ${buttonCount}개 버튼` : '현재 선택한 세션 전체 행동';
  const scopeLabel = enabled && scope === 'all' ? '전체 세션' : '현재 선택한 세션';
  const addLog = text => setLogs(prev => [...prev, { at: new Date().toLocaleTimeString('ko-KR', { hour12: false }), text }]);
  const setStage = (index, patch) => setStages(prev => prev.map((stage, i) => i === index ? { ...stage, ...patch } : stage));
  const resetWork = () => { setResult(null); setStages(newStages()); setLogs([]); };

  useEffect(() => {
    const handler = event => {
      runRef.current += 1;
      setContext({ ...bridge().getContext(), ...event.detail });
      setSelectedScreens([]); setViewedKey(''); setCollectionPreview(null); setPicking(false); resetWork();
      setMessage('분석 대상 세션을 불러왔습니다.');
    };
    window.addEventListener('replay:session', handler);
    return () => window.removeEventListener('replay:session', handler);
  }, []);
  useEffect(() => {
    window.SessionReplaySDK.configure({ ...previewDefaults, ...context.payload?.recordingConfig?.privacy, enabledEvents: context.payload?.recordingConfig?.enabledEvents || previewDefaults.enabledEvents });
  }, [context.payload]);

  useEffect(() => {
    const frame = context.frame;
    if (!frame) return;
    let cleanup = () => {};
    const attach = () => {
      cleanup();
      const doc = frame.contentDocument;
      if (!doc?.body) return;
      let hovered;
      const style = doc.createElement('style');
      style.textContent = '[data-analysis-hover]{outline:3px solid #4f7cff!important;outline-offset:3px;cursor:crosshair!important}[data-analysis-selected]{outline:3px solid #14b8a6!important;outline-offset:3px;position:relative!important}[data-analysis-selected]::after{content:attr(data-analysis-index) / "";position:absolute;right:-7px;top:-9px;min-width:18px;height:18px;line-height:18px;text-align:center;border-radius:6px;background:#0c9d8c;color:white;font:700 10px/18px sans-serif;z-index:999;pointer-events:none}[data-analysis-screen]{outline:2px dashed #8eb2ff!important;outline-offset:-2px}';
      doc.head.append(style);
      const paint = () => {
        doc.querySelectorAll('[data-analysis-selected],[data-analysis-screen]').forEach(n => { n.removeAttribute('data-analysis-selected'); n.removeAttribute('data-analysis-index'); n.removeAttribute('data-analysis-screen'); });
        const current = currentScreen({ ...context, frame });
        if (!current) return;
        const key = screenKey(current);
        setViewedKey(key);
        let index = 0;
        for (const row of selectedScreens) {
          if (enabled && screenKey(row) === key && row.screenName) doc.querySelector('.screen.active[data-view]')?.setAttribute('data-analysis-screen', '');
          for (const button of row.buttons) {
            index++;
            if (!enabled || screenKey(row) !== key) continue;
            try { const node = doc.querySelector(button.selectors[0]); node?.setAttribute('data-analysis-selected', ''); node?.setAttribute('data-analysis-index', String(index)); } catch {}
          }
        }
      };
      const move = event => {
        hovered?.removeAttribute('data-analysis-hover');
        hovered = picking ? event.target.closest('button,a,[role="button"],input[type="submit"]') : null;
        hovered?.setAttribute('data-analysis-hover', '');
      };
      const click = event => {
        if (!enabled) return;
        event.preventDefault(); event.stopImmediatePropagation();
        if (!picking || busyRef.current) return;
        const node = event.target.closest('button,a,[role="button"],input[type="submit"]');
        if (!node) { setMessage('버튼 또는 링크를 선택하세요.'); return; }
        const current = currentScreen(context);
        const row = current && selectedScreens.find(item => screenKey(item) === screenKey(current));
        if (!row) { setMessage('먼저 화면 조건 목록에서 현재 화면을 선택하세요.'); return; }
        const preview = window.SessionReplaySDK.previewCollection({ eventType: 'click', target: node });
        setCollectionPreview(preview); resetWork();
        if (!preview.collectible) { setMessage(preview.reason); return; }
        const selector = preview.log.data.target;
        const existing = row.buttons.some(button => button.selectors.includes(selector));
        if (existing) setCollectionPreview(previewScreen(row));
        if (!existing && row.buttons.length >= 50) { setMessage('화면당 버튼은 최대 50개까지 선택할 수 있습니다.'); return; }
        const selectors = new Set([selector, nodePath(node)]);
        for (const event of context.payload?.events || []) {
          if (event.data?.eventType !== 'click') continue;
          try { const target = doc.querySelector(event.data.target); if (target && node.contains(target)) selectors.add(event.data.target); } catch {}
        }
        const button = { label: (preview.log.data.text || node.getAttribute('aria-label') || '선택한 버튼').trim().replace(/\s+/g, ' ').slice(0, 100), selectors: [...selectors].slice(0, 100), preview };
        setSelectedScreens(prev => prev.map(item => screenKey(item) !== screenKey(row) ? item : { ...item, buttons: existing ? item.buttons.filter(b => !b.selectors.includes(selector)) : [...item.buttons, button] }));
        setMessage(existing ? '버튼 선택을 해제했습니다.' : '버튼을 추가했습니다. 다른 버튼도 클릭해 선택한 뒤 선택 완료를 누르세요.');
      };
      paint(); doc.addEventListener('pointermove', move, true); doc.addEventListener('click', click, true);
      window.addEventListener('replay:position', paint);
      cleanup = () => {
        doc.removeEventListener('pointermove', move, true); doc.removeEventListener('click', click, true); window.removeEventListener('replay:position', paint); style.remove();
        doc.querySelectorAll('[data-analysis-hover],[data-analysis-selected],[data-analysis-screen]').forEach(n => { n.removeAttribute('data-analysis-hover'); n.removeAttribute('data-analysis-selected'); n.removeAttribute('data-analysis-index'); n.removeAttribute('data-analysis-screen'); });
      };
    };
    attach(); frame.addEventListener('load', attach);
    return () => { cleanup(); frame.removeEventListener('load', attach); };
  }, [context, enabled, picking, selectedScreens]);

  async function showScreen(row) {
    bridge().pause(); setSeeking(true); setPicking(false);
    try { await bridge().seek(row.time); setViewedKey(screenKey(row)); setCollectionPreview(previewScreen(row)); }
    catch (error) { setMessage(error.message); }
    finally { setSeeking(false); }
  }
  function toggleScreen(row) {
    resetWork(); setPicking(false);
    const exists = selectedScreens.some(item => screenKey(item) === screenKey(row));
    if (!exists && selectedScreens.length >= 30) { setMessage('화면은 최대 30개까지 선택할 수 있습니다.'); return; }
    setSelectedScreens(prev => exists ? prev.filter(item => screenKey(item) !== screenKey(row)) : [...prev, { ...row, buttons: [] }]);
    setCollectionPreview(exists ? null : previewScreen(row));
    setMessage(exists ? '화면과 해당 화면의 버튼 조건을 해제했습니다.' : '화면을 추가했습니다. 버튼을 선택하지 않으면 화면 방문 조건으로 분석합니다.');
    if (!exists) showScreen(row);
  }
  function removeButton(row, button) {
    setSelectedScreens(prev => prev.map(item => screenKey(item) !== screenKey(row) ? item : { ...item, buttons: item.buttons.filter(b => b.selectors[0] !== button.selectors[0]) }));
    setCollectionPreview(previewScreen(row)); resetWork();
  }
  function toggleMode(value) {
    setEnabled(value); setPicking(false); resetWork();
    if (value) bridge()?.pause();
    else window.dispatchEvent(new CustomEvent('replay:single-mode'));
    setMessage(value ? '화면 조건 목록에서 여러 화면과 버튼을 선택하세요.' : '현재 선택한 세션 전체의 행동을 분석합니다.');
  }
  function criteria() {
    if (!enabled) return { mode: 'session', scope: 'current', sessionId: context.sessionId };
    return { mode: 'detail', scope, sessionId: context.sessionId, match: 'any', conditions: selectedScreens.map(row => ({ pagePath: row.pagePath, screenName: row.screenName, screenLabel: row.screenLabel, buttons: row.buttons.map(({ label, selectors }) => ({ label, selectors })) })) };
  }
  function openWorkflow() { dialog.current.showModal(); setModalOpen(true); }
  async function scan(onProgress) {
    const response = await fetch('/api/replay/analyze-cohort', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(criteria()) });
    if (!response.ok) { const json = await response.json(); throw new Error(json.error || '로그 조회 실패'); }
    const reader = response.body.getReader(); const decoder = new TextDecoder(); let buffer = ''; let output;
    while (true) {
      const { value, done } = await reader.read(); buffer += decoder.decode(value, { stream: !done });
      let newline;
      while ((newline = buffer.indexOf('\n')) !== -1) {
        const line = buffer.slice(0, newline); buffer = buffer.slice(newline + 1);
        if (!line.trim()) continue;
        const event = JSON.parse(line);
        if (event.type === 'error') throw new Error(event.error);
        if (event.type === 'progress') onProgress(event);
        if (event.type === 'result') output = event;
      }
      if (done) break;
    }
    if (!output) throw new Error('분석 결과를 받지 못했습니다.');
    return output;
  }
  async function run(withLlm) {
    if (!ready || busyRef.current) return;
    busyRef.current = true; setBusy(true); setPicking(false); bridge().pause();
    const runId = ++runRef.current; const started = performance.now(); let stage = 1; let stageStarted = started;
    setResult(null); setLogs([]); setStages([{ status: 'completed', elapsed: 0 }, { status: 'running', elapsed: 0 }, { status: 'waiting', elapsed: 0 }]);
    addLog(`기준 설정 완료 · ${scopeLabel} · ${selectionLabel}`);
    try {
      const output = await scan(progress => { if (runId === runRef.current) setStage(1, { subtitle: `${progress.scanned} / ${progress.total}개 세션 확인`, elapsed: performance.now() - started }); });
      if (runId !== runRef.current) return;
      setResult(output); setStage(1, { status: 'completed', elapsed: performance.now() - started });
      addLog(`로그 분석 완료 · ${output.summary.scannedSessions}개 중 ${output.summary.matchedSessions}개 세션 일치 · ${output.summary.matchedEvents}건`);
      if (!output.summary.matchedSessions) { setMessage('조건에 맞는 세션이 없습니다. 화면 또는 버튼 조건을 변경해보세요.'); addLog('일치 세션이 없어 LLM 분석을 실행하지 않았습니다.'); return; }
      if (!withLlm) { addLog('로그 확인 완료 · LLM 분석은 아직 실행하지 않았습니다.'); return; }
      stage = 2; stageStarted = performance.now(); setStage(2, { status: 'running' }); addLog('선택한 분석 대상의 행동 요약으로 LLM 분석 시작');
      const response = await fetch('/api/llm-analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ summary: output.summary, analysisInstructions: `선택한 세션의 행동을 분석하세요. 조건이 여러 개면 화면별 버튼 조건 중 하나라도 일치한 세션입니다. 지표는 세션별 평균이며 세션 수를 고유 고객 수로 해석하지 마세요. 행동은 대상 세션 전체의 행동입니다. ${instructions}` }) });
      const llm = await response.json();
      if (!response.ok) throw new Error(llm.error || 'LLM 분석 실패');
      if (runId !== runRef.current) return;
      setStage(2, { status: 'completed', elapsed: performance.now() - stageStarted });
      addLog('LLM 분석 완료 · 우측 분석 결과에 반영했습니다.'); setMessage('분석이 완료되었습니다. 우측 분석 결과를 확인하세요.');
      window.dispatchEvent(new CustomEvent('replay:cohort-result', { detail: { result: output, llm } }));
    } catch (error) {
      if (runId !== runRef.current) return;
      setStage(stage, { status: 'failed', elapsed: performance.now() - stageStarted }); addLog(error.message); setMessage(`분석 실패: ${error.message}`);
    } finally { busyRef.current = false; setBusy(false); }
  }
  const subtitles = [ready ? selectionLabel : '화면과 버튼 선택', result ? `${result.summary.scannedSessions}개 중 ${result.summary.matchedSessions}개 세션 일치` : enabled ? '조건에 맞는 행동 추출' : '선택한 세션의 행동 요약', stages[2].status === 'completed' ? '우측에서 분석 결과 확인' : '고객 행동 유형 해석'];
  const nodes = STAGES.map((label, index) => ({ id: String(index), type: 'execution', position: { x: index * 290, y: 30 }, data: { order: index + 1, label, subtitle: subtitles[index], ...stages[index] } }));
  const edges = [0, 1].map(index => ({ id: `e${index}`, source: String(index), target: String(index + 1), type: 'animated', data: { active: stages[index].status === 'completed' && stages[index + 1].status === 'running', done: stages[index + 1].status === 'completed' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' } }));
  let buttonIndex = 0;
  const prompt = <details className="detail-prompt"><summary>LLM 분석 기준 추가</summary><textarea value={instructions} disabled={busy} onChange={e => setInstructions(e.target.value)} maxLength={1000} rows="3" placeholder="예: 가입 의도와 이탈 징후를 중심으로 분석해줘"/></details>;
  return <div className="detail-analysis">
    {createPortal(<><div className="workflow-heading"><div><span className="detail-eyebrow">WORKFLOW OVERVIEW</span><h2>업무 진행 사항</h2></div><div className="workflow-tools"><span className={`workflow-run-state ${busy ? 'running' : ''}`}>{busy ? '분석 진행 중' : stages[2].status === 'completed' ? '분석 완료' : stages.some(s => s.status === 'failed') ? '작업 실패' : '분석 준비'}</span><button type="button" className="detail-secondary" onClick={openWorkflow}>상세보기 ↗</button></div></div><ol className="workflow-sequence" aria-label="분석 진행 순서">{STAGES.map((label, index) => { const status = index === 0 && ready && stages[0].status === 'waiting' ? 'configured' : stages[index].status; return <li key={label} className={status} aria-current={stages[index].status === 'running' ? 'step' : undefined}><span className="sequence-number">{stages[index].status === 'completed' ? '✓' : `0${index + 1}`}</span><div><strong>{label}</strong><p>{subtitles[index]}</p></div><span className="sequence-status">{status === 'configured' ? '설정됨' : LABELS[status]}</span>{index < 2 && <span className="sequence-arrow" aria-hidden="true">→</span>}</li>; })}</ol></>, document.getElementById('workflow-overview-root'))}
    <div className="detail-toolbar"><div><span className="detail-eyebrow">02 · ANALYSIS CRITERIA</span><strong>{enabled ? '분석 조건 설정' : '선택한 세션 행동 분석'}</strong></div>
      <label className="detail-switch"><input type="checkbox" role="switch" checked={enabled} disabled={busy} onChange={event => toggleMode(event.target.checked)}/><span/>상세 분석 <b>{enabled ? 'ON' : 'OFF'}</b></label>
    </div>
    {!enabled && <section className="single-session-analysis" aria-label="선택한 세션 행동 요약">{local ? <>
      <div className="single-session-name"><small>현재 분석 대상 · 1개 세션</small><strong>{context.payload.session?.name || '현재 선택한 세션'}</strong></div>
      <div className="single-stats">{[['체류 시간', `${local.durationSec}초`], ['클릭', `${local.byEventType.click || 0}회`], ['입력·변경', `${(local.byEventType.input || 0) + (local.byEventType.change || 0)}회`], ['제출', `${local.submits}회`]].map(([label, value]) => <div key={label}><span>{label}</span><strong>{value}</strong></div>)}</div>
      <div className="single-type"><small>행동 기반 요약</small><strong>{local.customerType.primaryLabelKo || '행동 탐색 고객'}</strong><p>{local.behaviorSignals.frustration ? '반복 클릭 등 이용 과정의 마찰 신호가 있습니다.' : local.behaviorSignals.completion ? '제출 또는 실행 버튼을 통한 완료 의도가 관찰되었습니다.' : local.behaviorSignals.formIntent ? '정보를 입력하며 다음 행동을 준비한 세션입니다.' : '화면 탐색과 상호작용을 중심으로 살펴볼 수 있는 세션입니다.'}</p></div>
      <h3>화면 탐색 흐름</h3><ol className="session-journey">{screens.map(row => <li key={screenKey(row)}><time>{formatTime(row.time)}</time><span>{row.screenLabel}</span></li>)}</ol>
      {prompt}<button type="button" className="single-analyze" disabled={busy} onClick={() => run(true)}>{busy ? '분석 진행 중…' : '선택 세션 정밀 분석 ↗'}</button>
      <small className="single-note">화면·버튼 조건 없이 현재 세션 전체의 행동을 분석합니다.</small>
    </> : <p className="criteria-empty">세션 목록에서 분석할 세션을 선택하세요.</p>}</section>}
    {enabled && <div className="detail-settings"><fieldset disabled={busy || seeking || !context.payload}>
      <div className="detail-field"><span>분석 범위</span><div className="scope-options" role="group" aria-label="분석 범위">{[['all', '전체 세션'], ['current', '현재 선택한 세션']].map(([value, label]) => <button key={value} type="button" aria-pressed={scope === value} className={scope === value ? 'selected' : ''} onClick={() => { setScope(value); resetWork(); }}>{label}</button>)}</div></div>
      <section className="screen-conditions" aria-label="화면 조건 보기"><div className="condition-section-head"><h3>화면 조건 보기</h3><span>{selectedScreens.length}개 선택</span></div><p>체크하면 분석 조건에 추가하고 해당 화면을 표시합니다.</p>
        <ul className="recorded-screen-list">{screens.map(row => { const checked = selectedScreens.some(item => screenKey(item) === screenKey(row)); return <li key={screenKey(row)} className={`${checked ? 'selected' : ''} ${viewedKey === screenKey(row) ? 'viewing' : ''}`}><label><input type="checkbox" aria-label={`${row.screenLabel} 화면 조건`} checked={checked} onChange={() => toggleScreen(row)}/><span><strong>{row.screenLabel}</strong><small>{formatTime(row.time)}{viewedKey === screenKey(row) ? ' · 보는 중' : ''}</small></span></label><button type="button" className="detail-secondary" aria-label={`${row.screenLabel} 화면 보기`} onClick={() => showScreen(row)}>보기</button></li>; })}</ul>
        {!screens.length && <p>이 세션에 기록된 화면이 없습니다.</p>}
      </section>
      <section className="selected-condition-section" aria-label="선택한 화면 및 버튼 조건"><div className="condition-section-head"><h3>선택한 조건</h3><span>{selectedScreens.length}개 화면 · {buttonCount}개 버튼</span></div>
        <p className="condition-match-note">화면별 조건 중 하나라도 일치하면 포함합니다. 버튼이 없는 화면은 방문 조건입니다.</p>
        <button type="button" className={picking ? 'picking multi-picker' : 'multi-picker'} disabled={!selectedScreens.some(row => screenKey(row) === viewedKey)} onClick={() => { bridge().pause(); setPicking(!picking); setMessage(picking ? '버튼 선택을 마쳤습니다.' : '왼쪽 화면의 버튼을 여러 개 클릭하세요. 다시 클릭하면 선택이 해제됩니다.'); }}>{picking ? '버튼 선택 완료' : '화면에서 버튼 복수 선택'}</button>
        <ul className="selected-condition-list">{selectedScreens.map((row, screenIndex) => <li key={screenKey(row)}><div className="selected-condition-title"><button type="button" className="condition-view-link" onClick={() => showScreen(row)}>{screenIndex + 1}. {row.screenLabel}</button><button type="button" className="condition-remove" aria-label={`${row.screenLabel} 화면 조건 해제`} onClick={() => toggleScreen(row)}>×</button></div><code>{row.pagePath}</code>{row.buttons.length ? <ul>{row.buttons.map(button => { const number = ++buttonIndex; return <li key={button.selectors[0]}><span className="selected-button-number">{number}</span><button type="button" className="selected-button-label" onClick={() => setCollectionPreview(button.preview)}>{button.label}</button><button type="button" className="condition-remove" aria-label={`${row.screenLabel} ${button.label} 버튼 해제`} onClick={() => removeButton(row, button)}>×</button></li>; })}</ul> : <p className="screen-visit-note">화면 방문 · 버튼 조건 없음</p>}</li>)}</ul>
        {!selectedScreens.length && <p className="condition-empty">위 목록에서 분석할 화면을 선택하세요.</p>}
      </section>
      {prompt}<div className="detail-actions"><button type="button" disabled={!ready} onClick={() => run(true)}>{busy ? '분석 진행 중…' : '분석 실행 ↗'}</button><button type="button" className="detail-secondary" disabled={!ready} onClick={() => run(false)}>조건 일치 확인</button></div>
    </fieldset></div>}
    <p className="detail-message mode-message" role="status">{!context.payload ? '먼저 세션 목록에서 리플레이를 선택하세요.' : message}</p>
    {enabled && <section className="collection-preview" aria-label="로그 수집 구조"><div className="collection-heading"><div><span className="detail-eyebrow">COLLECTION PREVIEW</span><h3>로그 수집 구조</h3></div><span className="preview-badge">로직 기반</span></div><p className="collection-description">선택한 조건의 수집 구조입니다. 목록의 버튼 이름을 누르면 해당 버튼의 구조를 확인합니다.</p>
      {collectionPreview ? collectionPreview.collectible ? <><div className="collection-event-label"><span>{collectionPreview.log.data.eventType}</span><small>선택한 조건의 로그 형태</small></div><pre data-testid="collection-log-structure">{JSON.stringify(collectionPreview.log, null, 2)}</pre></> : <p className="collection-blocked">{collectionPreview.reason}</p> : <div className="collection-empty"><code>{'{ eventType, target, … }'}</code><p>화면이나 버튼을 선택하면 수집 구조가 표시됩니다.</p></div>}
      <small className="collection-note">저장된 이벤트 조회나 새 로그 전송 없이 수집 로직으로 생성합니다.</small>
    </section>}
    {createPortal(<dialog ref={dialog} className="analysis-dialog" aria-labelledby="analysis-dialog-title" onClose={() => setModalOpen(false)} onCancel={event => { if (busy) event.preventDefault(); }}>
      <div className="analysis-modal-head"><div><span className="detail-eyebrow">ANALYSIS WORKFLOW</span><h2 id="analysis-dialog-title">조건에서 고객 이해까지</h2><p>{scopeLabel} · {selectionLabel}</p></div><button type="button" aria-label="분석 팝업 닫기" className="detail-secondary" disabled={busy} onClick={() => dialog.current.close()}>×</button></div>
      <div className="analysis-flow">{modalOpen && <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} nodesDraggable={false} nodesConnectable={false} fitView fitViewOptions={{ padding: .18 }} minZoom={.3} maxZoom={1.3}><Background color="#2b3c55" gap={20}/><Controls showInteractive={false}/></ReactFlow>}</div>
      <div className="analysis-modal-body"><div className="analysis-events"><h3>작업 로그</h3><div aria-live="polite">{!logs.length && <p>분석을 실행하면 단계별 작업 내역이 표시됩니다.</p>}{logs.map((log, i) => <p key={i}><time>{log.at}</time>{log.text}</p>)}</div></div>
        {result && <div className="analysis-log-preview"><h3>분석 대상의 실제 로그 <span>{result.summary.matchedEvents}건</span></h3><p>{result.summary.scannedSessions}개 중 <b>{result.summary.matchedSessions}개 세션</b> · 최대 50건 미리보기</p>{result.logs.length ? <pre>{JSON.stringify(result.logs, null, 2)}</pre> : <p>일치하는 로그가 없습니다.</p>}</div>}
      </div><div className="analysis-modal-footer"><span>{busy ? '실제 분석 응답을 기다리고 있습니다.' : '분석 결과와 조건을 확인할 수 있습니다.'}</span><button type="button" disabled={busy} onClick={() => dialog.current.close()}>{stages[2].status === 'completed' ? '분석 결과 보기' : '닫기'}</button></div>
    </dialog>, document.body)}
  </div>;
}
createRoot(document.getElementById('detail-analysis-root')).render(<App/>);
