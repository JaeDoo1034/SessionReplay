import React, { useEffect, useRef, useState } from 'react';
import { createRoot } from 'react-dom/client';
import { ReactFlow, Background, Controls, Handle, Position, BaseEdge, getBezierPath, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './style.css';

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
function recordedScreens(payload) {
  if (!payload) return [];
  const snapshot = payload.events.find(e => e.type === 'snapshot');
  const doc = new DOMParser().parseFromString(snapshot?.data?.html || '', 'text/html');
  const initial = doc.querySelector('.screen.active[data-view]');
  const screens = [{ name: initial?.dataset.view || '', label: doc.querySelector('#screen-title')?.textContent || doc.title || '시작 화면', time: 0 }];
  for (const event of payload.events) {
    if (event.data?.eventType === 'view_state' && !screens.some(s => s.name === event.data.screenName)) {
      screens.push({ name: event.data.screenName, label: event.data.title || event.data.screenName, time: event.timeOffsetMs });
    }
  }
  return screens;
}

function App() {
  const [context, setContext] = useState(() => bridge()?.getContext() || {});
  const [enabled, setEnabled] = useState(false);
  const [scope, setScope] = useState('all');
  const [screen, setScreen] = useState(null);
  const [button, setButton] = useState(null);
  const [picking, setPicking] = useState(false);
  const [message, setMessage] = useState('리플레이를 원하는 화면에서 멈춘 뒤 분석 기준을 선택하세요.');
  const [instructions, setInstructions] = useState('');
  const [stages, setStages] = useState(newStages);
  const [logs, setLogs] = useState([]);
  const [result, setResult] = useState(null);
  const [busy, setBusy] = useState(false);
  const [seeking, setSeeking] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [targetScreen, setTargetScreen] = useState('0');
  const dialog = useRef(null);
  const runRef = useRef(0);
  const busyRef = useRef(false);
  const screens = recordedScreens(context.payload);
  const selectedLogs = button ? (context.payload?.events || []).filter(event => event.data?.eventType === 'click' && button.selectors.includes(event.data.target)).slice(0, 3).map(event => ({
    timeOffsetMs: event.timeOffsetMs, type: event.type, data: { eventType: event.data.eventType, target: event.data.target }
  })) : [];
  const addLog = text => setLogs(prev => [...prev, { at: new Date().toLocaleTimeString('ko-KR', { hour12: false }), text }]);
  const setStage = (index, patch) => setStages(prev => prev.map((stage, i) => i === index ? { ...stage, ...patch } : stage));
  useEffect(() => {
    const handler = event => {
      runRef.current += 1;
      setContext({ ...bridge().getContext(), ...event.detail });
      setScreen(null); setButton(null); setPicking(false); setResult(null); setStages(newStages()); setLogs([]); setTargetScreen('0');
    };
    window.addEventListener('replay:session', handler);
    return () => window.removeEventListener('replay:session', handler);
  }, []);
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
      style.textContent = '[data-analysis-hover]{outline:3px solid #4f7cff!important;outline-offset:3px;cursor:crosshair!important}[data-analysis-selected]{outline:3px solid #14b8a6!important;outline-offset:3px}';
      doc.head.append(style);
      const move = event => {
        hovered?.removeAttribute('data-analysis-hover');
        hovered = picking ? event.target.closest('button,a,[role="button"],input[type="submit"]') : null;
        hovered?.setAttribute('data-analysis-hover', '');
      };
      const click = event => {
        if (!enabled) return;
        event.preventDefault(); event.stopImmediatePropagation();
        if (!picking) return;
        const node = event.target.closest('button,a,[role="button"],input[type="submit"]');
        if (!node) { setMessage('버튼 또는 링크를 선택하세요.'); return; }
        const active = doc.querySelector('.screen.active[data-view]')?.dataset.view || '';
        if (active !== screen?.screenName) { setMessage('화면이 변경되었습니다. 먼저 이 화면을 다시 선택하세요.'); setPicking(false); return; }
        const selector = nodePath(node);
        const selectors = new Set([selector]);
        // Include recorded child targets so clicking an icon/text in a button
        // matches the same button. Exact CSS identities, never text matching.
        for (const event of context.payload?.events || []) {
          if (event.data?.eventType !== 'click') continue;
          try { const target = doc.querySelector(event.data.target); if (target && node.contains(target)) selectors.add(event.data.target); } catch {}
        }
        setButton({ label: (node.getAttribute('aria-label') || node.textContent || node.value || '선택한 버튼').trim().replace(/\s+/g, ' ').slice(0, 100), selectors: [...selectors].slice(0, 100) });
        doc.querySelectorAll('[data-analysis-selected]').forEach(n => n.removeAttribute('data-analysis-selected'));
        node.setAttribute('data-analysis-selected', '');
        setPicking(false); setMessage('버튼을 선택했습니다. 로그를 확인하거나 분석을 실행하세요.');
      };
      doc.addEventListener('pointermove', move, true);
      doc.addEventListener('click', click, true);
      if (enabled && button) { try { doc.querySelector(button.selectors[0])?.setAttribute('data-analysis-selected', ''); } catch {} }
      cleanup = () => { doc.removeEventListener('pointermove', move, true); doc.removeEventListener('click', click, true); style.remove(); doc.querySelectorAll('[data-analysis-hover],[data-analysis-selected]').forEach(n => { n.removeAttribute('data-analysis-hover'); n.removeAttribute('data-analysis-selected'); }); };
    };
    attach(); frame.addEventListener('load', attach);
    return () => { cleanup(); frame.removeEventListener('load', attach); };
  }, [context, enabled, picking, screen, button]);

  function selectScreen() {
    bridge().pause();
    const doc = context.frame?.contentDocument;
    if (!doc?.body) return;
    const active = doc.querySelector('.screen.active[data-view]');
    const snapshot = context.payload.events.find(e => e.type === 'snapshot');
    let url = snapshot?.data?.url || context.payload.pageUrl;
    const position = Number(document.getElementById('replay-position').value);
    for (const event of context.payload.events) {
      if (event.timeOffsetMs <= position && ['history_pushstate', 'history_replacestate', 'popstate', 'hashchange'].includes(event.data?.eventType)) url = event.data.href || url;
    }
    setScreen({ pagePath: pathOf(url), screenName: active?.dataset.view || '', screenLabel: doc.querySelector('#screen-title')?.textContent || doc.title || pathOf(url) });
    setButton(null); setResult(null); setPicking(false);
    setMessage('화면을 선택했습니다. 화면 방문자를 분석하거나 버튼 조건을 추가하세요.');
    setStages(newStages()); setLogs([]);
  }
  function criteria() { return { scope, sessionId: context.sessionId, ...screen, button }; }
  function openWorkflow() { dialog.current.showModal(); setModalOpen(true); }
  async function scan(onProgress) {
    const response = await fetch('/api/replay/analyze-cohort', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(criteria()) });
    if (!response.ok) { const json = await response.json(); throw new Error(json.error || '로그 조회 실패'); }
    const reader = response.body.getReader(); const decoder = new TextDecoder(); let buffer = ''; let output;
    while (true) {
      const { value, done } = await reader.read();
      buffer += decoder.decode(value, { stream: !done });
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
    if (!screen || busyRef.current) return;
    busyRef.current = true; setBusy(true); setPicking(false); bridge().pause();
    const runId = ++runRef.current; const started = performance.now(); let stage = 1; let stageStarted = started;
    setResult(null); setLogs([]); setStages([{ status: 'completed', elapsed: 0 }, { status: 'running', elapsed: 0 }, { status: 'waiting', elapsed: 0 }]);
    openWorkflow(); addLog(`기준 설정 완료 · ${scope === 'all' ? '전체 세션' : '현재 세션'} · ${screen.screenLabel}${button ? ` / ${button.label} 클릭` : ' 방문'}`);
    try {
      const output = await scan(progress => { if (runId === runRef.current) { setStage(1, { subtitle: `${progress.scanned} / ${progress.total}개 세션 확인`, elapsed: performance.now() - started }); } });
      if (runId !== runRef.current) return;
      setResult(output); setStage(1, { status: 'completed', elapsed: performance.now() - started });
      addLog(`로그 분석 완료 · ${output.summary.scannedSessions}개 중 ${output.summary.matchedSessions}개 세션 일치 · ${output.summary.matchedEvents}건`);
      if (!output.summary.matchedSessions) { setMessage('조건에 맞는 세션이 없습니다. 화면 또는 버튼 조건을 변경해보세요.'); addLog('일치 세션이 없어 LLM 분석을 실행하지 않았습니다.'); return; }
      if (!withLlm) { addLog('로그 확인 완료 · LLM 분석은 아직 실행하지 않았습니다.'); return; }
      stage = 2; stageStarted = performance.now(); setStage(2, { status: 'running' }); addLog('조건을 충족한 세션들의 행동 요약으로 LLM 분석 시작');
      const response = await fetch('/api/llm-analyze', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ summary: output.summary, analysisInstructions: `조건을 충족한 세션 집단을 분석하세요. 집계 지표는 세션별 평균이며 고객 수로 해석하지 마세요. 행동은 일치한 세션 전체의 행동입니다. ${instructions}` }) });
      const llm = await response.json();
      if (!response.ok) throw new Error(llm.error || 'LLM 분석 실패');
      if (runId !== runRef.current) return;
      setStage(2, { status: 'completed', elapsed: performance.now() - stageStarted });
      addLog('LLM 분석 완료 · 좌측 분석 메뉴에 결과를 반영했습니다.'); setMessage('분석이 완료되었습니다. 좌측 분석 메뉴에서 결과를 확인하세요.');
      window.dispatchEvent(new CustomEvent('replay:cohort-result', { detail: { result: output, llm } }));
    } catch (error) {
      if (runId !== runRef.current) return;
      setStage(stage, { status: 'failed', elapsed: performance.now() - stageStarted }); addLog(error.message); setMessage(`분석 실패: ${error.message}`);
    } finally { busyRef.current = false; setBusy(false); }
  }
  const nodes = STAGES.map((label, index) => ({ id: String(index), type: 'execution', position: { x: index * 290, y: 30 }, data: { order: index + 1, label, subtitle: [screen ? `${screen.screenLabel}${button ? ' · 버튼 클릭' : ' · 화면 방문'}` : '화면과 버튼 선택', result ? `${result.summary.matchedSessions} / ${result.summary.scannedSessions}개 세션 일치` : '조건에 맞는 세션 필터링', '고객 행동 유형 해석'][index], ...stages[index] } }));
  const edges = [0, 1].map(index => ({ id: `e${index}`, source: String(index), target: String(index + 1), type: 'animated', data: { active: stages[index].status === 'completed' && stages[index + 1].status === 'running', done: stages[index + 1].status === 'completed' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b' } }));
  return <div className="detail-analysis">
    <div className="detail-toolbar"><div><span className="detail-eyebrow">BEHAVIOR WORKSPACE</span><strong>리플레이에서 분석 조건 찾기</strong></div>
      <label className="detail-switch"><input type="checkbox" role="switch" checked={enabled} disabled={busy} onChange={event => { setEnabled(event.target.checked); setPicking(false); if (event.target.checked) bridge()?.pause(); }}/><span/>상세 분석 <b>{enabled ? 'ON' : 'OFF'}</b></label>
    </div>
    {enabled && <div className="detail-settings"><div className="detail-intro"><span>01 — 분석 기준</span><p>화면을 선택하고, 원하는 버튼을 누른 세션만 모아 분석하세요.</p></div>
      <fieldset disabled={busy || seeking || !context.payload}>
        <div className="detail-field"><span>분석 범위</span><div className="scope-options" role="group" aria-label="분석 범위">{[['all', '전체 세션'], ['current', '현재 선택한 세션']].map(([value, label]) => <button key={value} type="button" aria-pressed={scope === value} className={scope === value ? 'selected' : ''} onClick={() => { setScope(value); setResult(null); setStages(newStages()); }}>{label}</button>)}</div></div>
        <div className="screen-navigator"><label>기록된 화면<select aria-label="기록된 화면" value={targetScreen} onChange={e => setTargetScreen(e.target.value)}>{screens.map((s, i) => <option key={i} value={i}>{s.label} · {formatTime(s.time)}</option>)}</select></label><button type="button" className="detail-secondary" onClick={async () => { setSeeking(true); setPicking(false); try { await bridge().seek(screens[Number(targetScreen)].time); setMessage('화면으로 이동했습니다. 이 화면 선택을 눌러 기준을 지정하세요.'); } catch (error) { setMessage(error.message); } finally { setSeeking(false); } }}>화면으로 이동</button></div>
        <div className="criteria-cards"><div><small>화면 조건</small><strong>{screen?.screenLabel || '선택한 화면 없음'}</strong><code>{screen?.pagePath || '리플레이를 멈추고 선택하세요'}</code><button type="button" onClick={selectScreen}>이 화면 선택</button></div>
          <div><small>버튼 조건 · 선택 사항</small><strong>{button?.label || '화면 방문 세션 전체'}</strong><code>{button?.selectors[0] || '특정 버튼 클릭 조건을 추가할 수 있어요'}</code><div className="detail-buttons"><button type="button" disabled={!screen} className={picking ? 'picking' : ''} onClick={() => { bridge().pause(); setPicking(!picking); setMessage(picking ? '버튼 선택을 취소했습니다.' : '리플레이 화면 속 버튼을 클릭하세요.'); }}>{picking ? '선택 취소' : '화면에서 버튼 선택'}</button>{button && <button type="button" className="detail-secondary" onClick={() => { setButton(null); setResult(null); }}>해제</button>}</div></div></div>
        <details className="detail-prompt"><summary>LLM 분석 기준 추가</summary><textarea value={instructions} onChange={e => setInstructions(e.target.value)} maxLength={1000} rows="3" placeholder="예: 가입 의도와 이탈 징후를 중심으로 분석해줘"/></details>
        {button && <details className="selected-log-sample" open><summary>선택한 버튼의 실제 기록 예시 · 현재 세션</summary>{selectedLogs.length ? <pre>{JSON.stringify(selectedLogs, null, 2)}</pre> : <p>현재 세션에 이 버튼의 클릭 기록이 없습니다. ‘실제 로그 확인’으로 선택한 분석 범위에서 찾아보세요.</p>}<small>화면 조건까지 적용한 결과는 ‘실제 로그 확인’에서 확인할 수 있습니다.</small></details>}
        <div className="detail-actions"><button type="button" className="detail-secondary" disabled={!screen} onClick={() => run(false)}>실제 로그 확인</button><button type="button" disabled={!screen} onClick={() => run(true)}>분석 실행 ↗</button><small>일치한 세션 전체의 행동을 분석합니다.</small></div>
      </fieldset><p className="detail-message" role="status">{!context.payload ? '먼저 세션 목록에서 리플레이를 선택하세요.' : message}</p>
    </div>}
    <dialog ref={dialog} className="analysis-dialog" aria-labelledby="analysis-dialog-title" onClose={() => setModalOpen(false)} onCancel={event => { if (busy) event.preventDefault(); }}>
      <div className="analysis-modal-head"><div><span className="detail-eyebrow">ANALYSIS WORKFLOW</span><h2 id="analysis-dialog-title">조건에서 고객 이해까지</h2><p>{scope === 'all' ? '전체 세션' : '현재 선택한 세션'} · {screen?.screenLabel}{button ? ` → ${button.label} 클릭` : ' 방문'}</p></div><button type="button" aria-label="분석 팝업 닫기" className="detail-secondary" disabled={busy} onClick={() => dialog.current.close()}>×</button></div>
      <div className="analysis-flow">{modalOpen && <ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} nodesDraggable={false} nodesConnectable={false} fitView fitViewOptions={{ padding: .18 }} minZoom={.3} maxZoom={1.3}><Background color="#2b3c55" gap={20}/><Controls showInteractive={false}/></ReactFlow>}</div>
      <div className="analysis-modal-body"><div className="analysis-events"><h3>작업 로그 <span>{busy ? '실행 중' : '대기 또는 완료'}</span></h3><div aria-live="polite">{logs.map((log, i) => <p key={i}><time>{log.at}</time>{log.text}</p>)}</div></div>
        {result && <div className="analysis-log-preview"><h3>조건에 맞는 실제 로그 <span>{result.summary.matchedEvents}건</span></h3><p>{result.summary.scannedSessions}개 중 <b>{result.summary.matchedSessions}개 세션</b> · 최대 50건 미리보기</p>{result.logs.length ? <pre>{JSON.stringify(result.logs, null, 2)}</pre> : <p>일치하는 로그가 없습니다. 조건을 변경해보세요.</p>}</div>}
      </div><div className="analysis-modal-footer"><span>{busy ? '실제 분석 응답을 기다리고 있습니다.' : '로그를 확인한 뒤 팝업을 닫아 기준을 수정할 수 있습니다.'}</span><button type="button" disabled={busy} onClick={() => dialog.current.close()}>{stages[2].status === 'completed' ? '분석 결과 보기' : '닫기'}</button></div>
    </dialog>
  </div>;
}
createRoot(document.getElementById('detail-analysis-root')).render(<App/>);
