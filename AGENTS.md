# AGENTS.md

## Repository expectations
- Use pnpm only.
- Run `pnpm lint` and `pnpm test` after changes.
- Do not introduce new UI libraries.
- Reuse existing primitives from `src/components/ui`.
- Prefer existing design tokens and Tailwind utilities.
- Follow App Router conventions in `app/`.
- Keep components server/client boundaries explicit.
- Do not invent new spacing or color scales if a token exists.
- For Figma-driven work, match layout and hierarchy closely, but translate into this repo's patterns rather than copying raw structure.