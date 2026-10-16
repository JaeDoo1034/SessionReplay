import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { ReactFlow, Background, Controls, MiniMap, Handle, Position, BaseEdge, getBezierPath, MarkerType } from '@xyflow/react';
import { Activity, Play, Pause, RotateCcw, Zap, Check, AlertTriangle, Clock } from 'lucide-react';

const PLAN = [
  { id: 'input', label: 'Input Parser', subtitle: '요청 정규화', duration: 1200, x: 70, y: 190 },
  { id: 'retrieve', label: 'Retriever', subtitle: '문서 검색 · RAG', duration: 2200, x: 350, y: 190 },
  { id: 'reason', label: 'Reasoning Agent', subtitle: 'LLM 추론', duration: 3200, x: 630, y: 190 },
  { id: 'validate', label: 'Validator', subtitle: '응답 품질 검증', duration: 1700, x: 910, y: 190 },
  { id: 'output', label: 'Final Response', subtitle: '응답 생성', duration: 1100, x: 1190, y: 190 },
];
const emptyState = () => Object.fromEntries(PLAN.map(n => [n.id, { status: 'waiting', progress: 0, elapsed: 0 }]));
const fmt = n => `${(n / 1000).toFixed(1)}s`;

function ExecutionNode({ data }) {
  const { label, subtitle, status, progress, elapsed, order } = data;
  return <div className={`execution-node ${status}`}>
    <Handle type="target" position={Position.Left} className="handle" />
    <div className="progress-outline" style={{ '--progress': `${progress}%` }} />
    <div className="node-inner">
      <div className="node-top"><span className="node-index">{String(order).padStart(2, '0')}</span><span className={`status-chip ${status}`}>{status === 'running' ? 'RUNNING' : status === 'completed' ? 'DONE' : status === 'failed' ? 'FAILED' : 'WAITING'}</span></div>
      <strong>{label}</strong><span className="node-subtitle">{subtitle}</span>
      <div className="node-bottom"><span>{status === 'running' ? `${Math.round(progress)}%` : status === 'completed' ? <><Check size={13}/> 100%</> : status === 'failed' ? <><AlertTriangle size={13}/> Error</> : '0%'}</span><span><Clock size={12}/>{elapsed ? fmt(elapsed) : '—'}</span></div>
    </div>
    <Handle type="source" position={Position.Right} className="handle" />
  </div>;
}
function AnimatedEdge(props) {
  const [path] = getBezierPath(props);
  const active = props.data?.active;
  const done = props.data?.done;
  return <>
    <BaseEdge path={path} markerEnd={props.markerEnd} style={{ stroke: done ? '#2dd4bf' : active ? '#60a5fa' : '#46546e', strokeWidth: active ? 2.8 : 2 }} />
    {active && <><path d={path} fill="none" stroke="#60a5fa" strokeWidth="3" strokeDasharray="6 10" className="edge-flow"/><circle r="5" fill="#93c5fd" className="edge-dot"><animateMotion dur="1.4s" repeatCount="indefinite" path={path}/></circle></>}
  </>;
}
const nodeTypes = { execution: ExecutionNode };
const edgeTypes = { animated: AnimatedEdge };

export default function App() {
  const [states, setStates] = useState(emptyState);
  const [phase, setPhase] = useState('idle');
  const [logs, setLogs] = useState([{ at: '00:00', text: 'Workflow ready', type: 'info' }]);
  const [speed, setSpeed] = useState(1);
  const runtime = useRef({ index: 0, elapsed: 0, last: 0 });
  const statesRef = useRef(states);
  useEffect(() => { statesRef.current = states; }, [states]);
  const log = useCallback((text, type = 'info') => setLogs(prev => [{ at: new Date().toLocaleTimeString('ko-KR', { hour12: false }), text, type }, ...prev].slice(0, 50)), []);
  const reset = useCallback(() => { runtime.current = { index: 0, elapsed: 0, last: 0 }; setStates(emptyState()); setPhase('idle'); setLogs([{ at: '00:00', text: 'Workflow reset', type: 'info' }]); }, []);
  const start = useCallback(() => {
    if (phase === 'completed' || phase === 'failed') { reset(); return; }
    if (phase === 'idle') { runtime.current = { index: 0, elapsed: 0, last: 0 }; setStates(prev => ({ ...prev, input: { status: 'running', progress: 0, elapsed: 0 } })); log('Input Parser started'); }
    setPhase('running');
  }, [phase, reset, log]);
  useEffect(() => {
    if (phase !== 'running') return;
    runtime.current.last = performance.now();
    const timer = setInterval(() => {
      const now = performance.now(); const delta = Math.min(now - runtime.current.last, 200) * speed; runtime.current.last = now;
      const run = runtime.current; const current = PLAN[run.index]; if (!current) return;
      run.elapsed += delta;
      const elapsed = Math.min(run.elapsed, current.duration); const progress = elapsed / current.duration * 100;
      setStates(prev => ({ ...prev, [current.id]: { status: 'running', progress, elapsed } }));
      if (run.elapsed >= current.duration) {
        setStates(prev => ({ ...prev, [current.id]: { status: 'completed', progress: 100, elapsed: current.duration }, ...(PLAN[run.index + 1] ? { [PLAN[run.index + 1].id]: { status: 'running', progress: 0, elapsed: 0 } } : {}) }));
        log(`${current.label} completed`, 'success'); run.index += 1; run.elapsed = 0;
        if (run.index >= PLAN.length) { setPhase('completed'); log('Workflow completed successfully', 'success'); }
        else log(`${PLAN[run.index].label} started`);
      }
    }, 45);
    return () => clearInterval(timer);
  }, [phase, speed, log]);
  const fail = () => { const current = PLAN[runtime.current.index]; if (!current || phase !== 'running') return; setStates(prev => ({ ...prev, [current.id]: { ...prev[current.id], status: 'failed' } })); setPhase('failed'); log(`${current.label} failed (demo)`, 'error'); };
  // Integration point: call applyGraphEvent({nodeId, status, progress, elapsed}) from SSE/WebSocket events.
  const applyGraphEvent = useCallback(event => { if (!PLAN.some(n => n.id === event.nodeId)) return; setStates(prev => ({ ...prev, [event.nodeId]: { ...prev[event.nodeId], status: event.status, progress: event.progress ?? prev[event.nodeId].progress, elapsed: event.elapsed ?? prev[event.nodeId].elapsed } })); }, []);
  const nodes = useMemo(() => PLAN.map((n, i) => ({ id: n.id, type: 'execution', position: { x: n.x, y: n.y }, draggable: true, data: { ...n, ...states[n.id], order: i + 1 } })), [states]);
  const edges = useMemo(() => PLAN.slice(0, -1).map((n, i) => ({ id: `e-${n.id}`, source: n.id, target: PLAN[i + 1].id, type: 'animated', data: { active: states[n.id].status === 'completed' && states[PLAN[i + 1].id].status === 'running', done: states[PLAN[i + 1].id].status === 'completed' }, markerEnd: { type: MarkerType.ArrowClosed, color: '#64748b', width: 15, height: 15 } })), [states]);
  const completed = PLAN.filter(n => states[n.id].status === 'completed').length;
  const active = PLAN.find(n => states[n.id].status === 'running');
  return <div className="app">
    <header className="header"><div className="brand"><div className="brand-icon"><Activity size={21}/></div><div><h1>LangGraph <span>Monitor</span></h1><p>AGENT EXECUTION / LIVE WORKFLOW</p></div></div><div className="header-right"><span className="live-dot"/> LOCAL DEMO <span className="divider"/> <span>v1.0</span></div></header>
    <main><section className="headline"><div><div className="eyebrow"><Zap size={14}/> EXECUTION OVERVIEW</div><h2>Workflow Execution</h2><p>실시간 노드 상태, 진행률 및 데이터 흐름 모니터링</p></div><div className="actions"><button className="secondary" onClick={reset}><RotateCcw size={15}/> Reset</button><button className="secondary" onClick={fail} disabled={phase !== 'running'}><AlertTriangle size={15}/> Simulate Error</button><button className="primary" onClick={phase === 'running' ? () => setPhase('paused') : start} disabled={phase === 'completed' || phase === 'failed'}>{phase === 'running' ? <><Pause size={16}/> Pause</> : <><Play size={16}/> {phase === 'paused' ? 'Resume' : 'Run Workflow'}</>}</button></div></section>
      <section className="metrics"><div className="metric"><span>TOTAL NODES</span><strong>05</strong><small>Graph stages</small></div><div className="metric"><span>COMPLETED</span><strong className="mint">{String(completed).padStart(2, '0')} <small>/ 05</small></strong><small>Successfully executed</small></div><div className="metric"><span>CURRENT NODE</span><strong className="current-label">{active?.label || (phase === 'completed' ? 'Finished' : phase === 'failed' ? 'Failed' : '—')}</strong><small>{active ? `${Math.round(states[active.id].progress)}% processed` : 'No active task'}</small></div><div className="metric"><span>EXECUTION STATUS</span><strong className={`phase ${phase}`}>{phase.toUpperCase()}</strong><small>Simulation engine</small></div></section>
      <section className="workspace"><div className="workspace-heading"><div><span className="panel-indicator"/> GRAPH CANVAS <small>Directed execution graph</small></div><div className="legend"><span><i className="wait"/> Waiting</span><span><i className="run"/> Running</span><span><i className="done"/> Completed</span><span><i className="err"/> Failed</span></div></div><div className="flow-area"><ReactFlow nodes={nodes} edges={edges} nodeTypes={nodeTypes} edgeTypes={edgeTypes} fitView fitViewOptions={{ padding: .2 }} minZoom={.35} maxZoom={1.5} proOptions={{ hideAttribution: true }}><Background color="#253047" gap={22} size={1}/><Controls position="bottom-left"/><MiniMap nodeColor={n => states[n.id]?.status === 'completed' ? '#2dd4bf' : states[n.id]?.status === 'running' ? '#60a5fa' : '#334155'} pannable zoomable position="bottom-right"/></ReactFlow></div><div className="workspace-footer"><span>● Drag nodes to rearrange · Scroll to zoom</span><label>SIMULATION SPEED <select value={speed} onChange={e => setSpeed(Number(e.target.value))}><option value={0.5}>0.5×</option><option value={1}>1×</option><option value={2}>2×</option><option value={4}>4×</option></select></label></div></section>
      <section className="bottom"><div className="events"><div className="section-title"><Activity size={17}/> Execution Events <span>{logs.length} events</span></div><div className="log-list">{logs.map((item, i) => <div className="log-item" key={`${item.at}-${i}`}><span>{item.at}</span><i className={item.type}/><p>{item.text}</p></div>)}</div></div><div className="summary"><div className="section-title"><Zap size={17}/> Pipeline Progress</div><div className="summary-number">{Math.round(PLAN.reduce((sum, n) => sum + states[n.id].progress, 0) / PLAN.length)}<small>%</small></div><div className="overall-bar"><div style={{ width: `${PLAN.reduce((sum, n) => sum + states[n.id].progress, 0) / PLAN.length}%` }}/></div><p>{completed} of {PLAN.length} stages completed</p><div className="hint">Connect LangGraph stream events to <code>applyGraphEvent()</code> to replace the demo simulation.</div></div></section>
    </main>
  </div>;
}
