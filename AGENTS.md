# Prototype Instructions

Run the local server yourself and open the preview in the browser available to this environment. Do not give the user server-start instructions when you can run it.

Before making substantial visual changes, use the Product Design plugin's `get-context` skill when the visual source is unclear or no longer matches the current goal. When the user gives durable prototype-specific design feedback, preferences, or decisions, record them in `AGENTS.md`.

When implementing from a selected generated mock, treat that image as the source of truth for layout, component anatomy, density, spacing, color, typography, visible content, and hierarchy.

Build app UI in `src/`. Keep `.openai/hosting.json`, `worker/index.js`, `scripts/prepare-sites-build.mjs`, and `tests/sites-worker.test.mjs` intact so the same local prototype can be handed to Sites. Before a Sites handoff, run `npm run build` and `npm run test:sites`; the build must leave `dist/client/index.html`, `dist/server/index.js`, and `dist/.openai/hosting.json`.

## Product decisions

- The selected visual source is the first generated direction: a bright white, deep-navy, emerald-accented Saudi executive analytics interface.
- English is the default language. Arabic is available through an EN/AR toggle and must use full RTL layout.
- The product is a fictional portfolio demonstration for a data analytics and financial reporting consultancy. All sample metrics and case studies must be labeled as demo data.
- The primary conversion is a qualified project inquiry. The dashboard preview, report export, services, and case studies support that conversion.
