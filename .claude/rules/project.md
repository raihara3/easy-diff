---
paths:
  - "src/**"
  - "package.json"
---

* Next.js 16 App Router with React 19, TypeScript strict mode, Tailwind CSS v4
* Tailwind CSS v4 uses CSS-first configuration (`@theme inline` in `globals.css`) -- no `tailwind.config.ts`
* Path alias: `@/*` maps to `./src/*`
* Dark mode only -- Material Design 3 dark palette as CSS custom properties in `globals.css`
* Diff-specific semantic colors: `--color-diff-added-*`, `--color-diff-removed-*`
* Fonts: Inter for UI (`--font-sans`), JetBrains Mono for code (`--font-mono`), loaded via `next/font/google`
* Core diff algorithm (Myers) is self-implemented in `lib/diff/` -- never introduce external diff libraries
* Zero third-party runtime dependencies beyond React and Next.js
* Pure logic in `lib/`, React hooks in `hooks/`, UI in `components/`
* Components use named exports, one per file matching filename; pages use default exports
* Client components must have `"use client"` directive
* Props interfaces are defined inline in the component file
* Type-only imports use `import type { ... }` syntax

## Directory Structure

| Path | Purpose |
|------|---------|
| `src/app/` | Next.js App Router pages and layout |
| `src/components/diff/` | Diff display (DiffViewer, InlineView, SideBySideView, DiffLine, DiffModeToggle) |
| `src/components/input/` | Text input (InputSection, TextInputPanel) |
| `src/components/layout/` | Shell components (Header) |
| `src/hooks/` | Custom React hooks (useDiff) |
| `src/lib/diff/` | Pure diff algorithms and types (myers, line-diff, character-diff, types) |