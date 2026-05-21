# Tip Calculator

A live tip calculator and bill splitter built with Next.js, Tailwind CSS, Framer Motion, and Lucide icons.

## Quick Start

**Requirements:** Node.js 18 or later

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```bash
npm run build
npm start
```

## Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **Framer Motion** — number animations, error slide-ins, button press feedback
- **Lucide React** — icons
- **Sonner** — toast notification on reset

## Features

- Live calculation as you type — no submit button
- Tip presets (10% / 15% / 20%) with active highlight + custom input
- People count stepper with +/- buttons
- Inline validation with animated error messages
- Reset button with toast confirmation
- Mobile-first responsive layout (results visible above keyboard on narrow screens)
- Round-up rounding policy: per-person amounts round up to the nearest cent
