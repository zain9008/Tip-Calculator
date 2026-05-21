# ANSWERS.md

---

## 1. How to Run

**Requirements:** Node.js 18 or later. Check with `node --version`.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). That's it — no database, no backend, just a local dev server compiling the React code.

To build for production: `npm run build && npm start`

---

## 2. Stack and Design Choices

**Stack: Next.js 14 (App Router) + TypeScript + Tailwind CSS**

Next.js is what I know best for React projects. For a single-page app this is slight overkill compared to plain Vite, but it gives hot reload out of the box, easy Vercel deployment, and the App Router makes server/client boundaries explicit — which matters for framer-motion (client-only). TypeScript catches input handling bugs early (e.g., confusing `string` bill values with `number` ones). Tailwind keeps styling fast without a separate CSS file per component.

**Visual Decision 1: "Per Person" card uses amber/gold and a larger font (text-3xl vs text-2xl)**

The results panel has three numbers: tip amount, grand total, and per person. In a group dinner context, the only number anyone actually cares about is "what do I owe?" Making it bigger and gold means your eyes go there first without needing a label to tell you it's important. The other two cards use neutral white because they're supporting information. This affects the ResultPanel component — specifically the third card's color and size classes.

**Visual Decision 2: On mobile (under 1024px), the results panel renders ABOVE the inputs**

I used `flex-col-reverse` on the outer grid wrapper for mobile. The reason: when a soft keyboard opens on a phone, it covers roughly the bottom half of the screen. If results are below inputs (the natural document order), they get covered when the user is actively typing. Flipping the order on small screens means the numbers stay visible while you type — you can watch the total update without scrolling or dismissing the keyboard. This affects the layout in TipCalculator.tsx.

---

## 3. Responsive and Accessibility

**360px phone:**
Single-column layout. Results appear first (above inputs) so they stay visible when the keyboard is open. All inputs are full-width. The +/- stepper buttons are 56px tall — large enough for a thumb tap. Font sizes reduce slightly but stay readable.

**1440px laptop:**
Two-column grid (inputs left, results right). Everything is visible above the fold. The cards have generous padding. No horizontal scrolling.

**Accessibility handled:**
- Every input has a `<label>` element linked by `htmlFor` / `id`. Screen readers announce the label when you focus the field.
- Error messages use `role="alert"` so screen readers announce them immediately when they appear, without the user having to navigate to them.
- `aria-invalid` and `aria-describedby` connect each input to its error message — screen readers say "Bill Amount, invalid, Enter a valid number" instead of just "text field."
- Preset buttons use `aria-pressed` to communicate which tip is active.
- Focus rings are not removed — every interactive element has a visible outline on keyboard focus.
- The +/- people buttons have descriptive `aria-label` attributes ("Increase number of people").

**Knowingly skipped:**
`aria-live` on the result panel. If I added `aria-live="polite"`, a screen reader would announce the updated total after every single keystroke while typing the bill amount. For a $42.50 bill you'd hear: "zero point zero zero... four point two five... forty two point five zero..." on every character. That's genuinely worse than not announcing. Screen reader users can tab to the results section after finishing their input and the values will be read normally.

---

## 4. AI Usage

**Tool used: Claude Code (Anthropic's CLI assistant)**

I gave it the full assessment spec and asked it to plan and build a Next.js tip calculator using Framer Motion, Lucide icons, Sonner for toasts, and a dark navy design that didn't look like a generic AI output.

**What it gave me:** A complete implementation including all components, the calculation logic, and the layout structure.

**What I specifically changed:**

Claude's initial `ResultPanel` showed all three result cards with identical visual weight — same font size (text-2xl), same text color (white), same card style. I changed the "Per Person" card to use `text-3xl`, `text-amber-400` for the value, and an amber border with a subtle green-tinted background. The original equal-weight layout treats the total and per-person amount as equally important — but in practice, everyone standing at a restaurant only needs one number. Making it visually dominant removes the need to parse three cards to find the answer.

I also changed the mobile layout order. Claude's initial layout had inputs on top, results below (standard top-to-bottom reading order). I switched to `flex-col-reverse` so results appear first on small screens, keeping them visible when the keyboard opens.

---

## 5. Honest Gap

The custom tip input and preset button interaction is not as polished as it should be.

Currently: if you've selected 15% using the preset button, and you accidentally click into the custom tip field (maybe to see if it's editable), the preset highlight disappears immediately — even though you haven't typed anything. You've lost your 15% selection without meaning to.

The fix: only deactivate the active preset when the custom input contains a valid number. On blur, if the custom field is empty, restore the previously active preset. This would require tracking a `previousPreset` ref and adding `onBlur` logic to the custom input. I had a version of this but the edge cases (what if they type, clear, and click back to a preset?) got messy, so I cut it to keep the interaction simple and predictable rather than subtly broken.

---

## Rounding Policy

Per-person amounts use **round up to the nearest cent**: `Math.ceil(amount * 100) / 100`

Example: $100 bill, 15% tip = $115 total. Split 3 ways = $38.333... Per person = $38.34 (not $38.33).

Why round up instead of round to nearest? At a restaurant, the group needs to cover the exact bill. Rounding to nearest means $38.33 x 3 = $114.99 — one cent short. The waiter gets $114.99 on a $115 bill. Rounding up means $38.34 x 3 = $115.02 — the group pays two cents extra total, which stays as a slightly larger tip. The overpay is at most $0.01 per person, which is acceptable. The underpay is not.
