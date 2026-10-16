# LangGraph-style React Flow Monitor

## Run

```bash
npm install
npm run dev
```

Open the local URL printed by Vite.

## Features
- Custom React Flow nodes with rotating glow while running
- Conic-gradient node border showing progress percentage
- Animated edge dashes and traveling particle during handoff
- Run, pause, resume, reset, speed selector and error simulation
- Execution event log and overall pipeline progress

## Real LangGraph integration

`App.jsx` contains an `applyGraphEvent({nodeId, status, progress, elapsed})` callback. Wire your backend's SSE or WebSocket messages to it and disable the demo interval when using live execution.

Example normalized event:
```json
{"nodeId":"retrieve","status":"running","progress":48,"elapsed":1020}
```

LangGraph `astream_events` / `astream` do not inherently provide percentage progress for every node. Emit custom progress events from your backend or derive a UI-specific estimate. `nodeId` values must map to the nodes in `PLAN`. Never expose API keys in the browser.
