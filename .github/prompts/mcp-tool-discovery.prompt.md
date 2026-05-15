---
mode: agent
description: Discover and document available MCP tools, then plan how to use them.
---

# MCP Tool Discovery & Planning

Help me understand and use the MCP servers configured in this workspace.

## Procedure
1. List every MCP server currently connected and the tools each exposes. Group by server.
2. For each tool, show: name, one-line purpose, required inputs, and a realistic example invocation.
3. Ask me what I am trying to accomplish.
4. Propose a **tool plan**: ordered list of `server.tool(args)` calls with the rationale for each step.
5. Wait for my approval before executing the plan.

## Rules
- Never call a tool that mutates external state without explicit approval.
- Prefer read-only tools to confirm assumptions before any write tool runs.
- After execution, summarize what changed and what you verified.
