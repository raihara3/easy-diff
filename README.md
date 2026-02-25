# Easy Diff

A text diff web service that compares two pieces of text and highlights the differences. Built with a custom Myers O(ND) diff algorithm -- no external diff libraries.

## Features

- Real-time text diffing with debounced input (300ms)
- Split (side-by-side) and unified view modes
- Character-level highlighting within changed lines
- Line numbers for both old and new text
- Dark mode only, using a Material Design 3 dark palette

## Tech Stack

- [Next.js](https://nextjs.org) 16 (App Router)
- TypeScript
- [Tailwind CSS](https://tailwindcss.com) v4
- Fonts: JetBrains Mono (diff output), Inter (UI)

## Project Structure

```
src/
  lib/diff/
    myers.ts           # Myers O(ND) diff algorithm
    line-diff.ts       # Line-level diff with character highlighting
    character-diff.ts  # Character-level diff within line pairs
    types.ts           # Shared types (DiffLine, DiffResult, etc.)
  hooks/
    useDiff.ts         # React hook with debounced diff computation
  components/
    diff/              # DiffViewer, SideBySideView, InlineView, DiffLine
    input/             # TextInputPanel, InputSection
    layout/            # Header
```

## Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the app.

Other commands:

```bash
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint
```

## Deployment

Deploy to [Vercel](https://vercel.com):

```bash
npx vercel
```
