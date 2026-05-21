# ANSWERS.md

---

## 1. How to Run

You need Node.js 18 or above. Check with `node --version`.

```bash
npm install
npm run dev
```

Then open http://localhost:3000 in your browser.

For production build:

```bash
npm run build
npm start
```

No database, no backend. Just a local dev server that compiles React code. If port 3000 is busy it will switch to 3001 automatically.

---

## 2. Stack and Design Choices

**Stack: Next.js 14 with TypeScript and Tailwind CSS**

I went with Next.js because it is what I am most comfortable with for React projects. It gives you hot reload, TypeScript out of the box, and easy deployment to Vercel. For a single-page app it is a bit heavy, but it removes all setup headaches and lets you focus on the actual UI. Framer Motion handles animations, Lucide gives clean icons, and Sonner shows a small toast on reset.

**Decision 1: Per person amount is bigger and gold colored compared to tip and total**

All three result numbers (tip, total, per person) live in the same results card. But the one everyone actually cares about at a restaurant table is "what do I owe personally?" So I made the per person value use a larger font (text-4xl on desktop vs text-xl for the others) and amber/gold color with a subtle warm section at the bottom. The other two are just supporting info. Your eye goes straight to the gold number without reading any labels. This affects the ResultPanel component.

**Decision 2: On mobile the results panel shows above the inputs, not below**

I used `flex-col-reverse` in the grid wrapper. When you open a soft keyboard on a phone it covers roughly the bottom half of the screen. If results sit below the inputs, they disappear the moment you start typing. Flipping the order means the numbers stay visible while you are entering the bill or people count. You can watch the amount update live without scrolling or closing the keyboard. This affects the main calculator layout in TipCalculator.tsx.

---

## 3. Responsive and Accessibility

**360px phone:**
Single column layout. Results card appears first at the top so it stays visible when the keyboard opens. All inputs are full width. The plus and minus stepper buttons are 48px tall which is big enough for a thumb tap. Font sizes stay readable.

**1440px laptop:**
Two column grid side by side, inputs on left and results on right. Everything fits above the fold with comfortable spacing.

**Accessibility handled:**
Every input has a proper label element connected with htmlFor and id. Error messages use `role="alert"` so screen readers announce them as soon as they appear, without the user needing to navigate to them. `aria-invalid` and `aria-describedby` link each input to its error so a screen reader says something like "Bill Amount, invalid, Bill must be greater than zero." Preset tip buttons use `aria-pressed` to show which one is selected. All interactive elements keep their default focus outline so keyboard users can see where they are.

**Knowingly skipped:**
aria-live on the results panel. If I added that, a screen reader would read out the updated total after every single keystroke while typing. For a bill of 42.50 you would hear the number changing on every character typed. That would be very annoying. Screen reader users can just tab to the results after entering their values and read them normally. Not ideal but better than the alternative.

---

## 4. AI Usage

**Tool: Claude Code (Anthropic)**

The full app was built using Claude Code. Here is how the workflow went:

1. Gave it the assessment spec and asked it to read and fully understand the requirements before doing anything.
2. Asked it to make a detailed plan first, covering the component structure, state management, validation rules, rounding policy, and the commit sequence.
3. Reviewed the plan, then asked it to start building step by step with a commit after each piece.
4. After the initial version was done, reviewed the UI and gave feedback on what to change.
5. It then redesigned: changed from separate floating cards for each input to one unified card with dividers, fixed the per-person card color (it was using a greenish background that clashed with the navy theme), added a math breakdown under the per-person amount, and made the page background slightly less flat by adding a teal radial gradient.

**Specific thing I changed from AI output:**

Claude initially made the ResultPanel with three separate cards, each floating independently with the same card style. The per-person card was using a dark green-tinted background color (#0e1a0f) which looked off against the rest of the navy theme. I told it to redo the result panel as one unified card, with the per-person section separated by an amber border at the bottom and using a consistent dark navy background. I also asked for a small breakdown line showing "total divided by N people" below the big per-person number, which was not in the original output.

---

## 5. Honest Gap

The interaction between the preset tip buttons and the custom tip input is not quite right.

Right now if you click the 15% preset and then accidentally click into the custom input box, the preset highlight disappears immediately even if you did not type anything. You lose your selection without meaning to.

The proper fix would be: only deactivate the preset when the custom field actually has a valid number in it. On blur, if the custom field is still empty, restore whatever preset was active before. This needs a small ref to remember the previous preset and some onBlur logic on the custom input. I started working on it but the edge cases got messy, for example what happens if user types something, clears it, then clicks back to a preset. Cut it to keep the current behavior simple and predictable rather than getting it half right.

---

## Rounding Policy

Per-person amounts use round up to nearest cent: `Math.ceil(amount * 100) / 100`

Example: 100 dollar bill with 15% tip = 115 dollar total. Split 3 ways = 38.333... Per person becomes 38.34.

Why round up instead of round to nearest? If you round to nearest, 38.33 times 3 = 114.99. The group is one cent short of the actual bill. In a restaurant that means someone is underpaying by a cent. Rounding up means 38.34 times 3 = 115.02, so the group pays two cents extra total. That two cents becomes a tiny bit of extra tip which is fine. The shortfall is not fine.
