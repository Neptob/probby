# Design & Product Decisions

This document tracks meaningful UX and architecture decisions made during development, including the reasoning behind each choice.

---

## XP Assignment at Day Confirmation, Not Real-Time

**Decision:** XP points are assigned permanently only when a day "closes" — on the first app open after midnight — rather than updating in real-time as activities are checked.

**Why:**
- History should show only complete, confirmed days — not a day in progress that could still change
- The Header XP counter should reflect earned, stable experience — not fluctuate while the user is actively logging
- Confirms a natural narrative moment: the day ends, results are sealed, XP is awarded
- Creates a clean trigger point for a level-up animation if the user gained enough XP to advance

**Implementation note:** `DayLog` will include a `confirmed: boolean` field. On app mount, any unconfirmed logs from previous days are confirmed and their XP is calculated. Today's log remains a draft until the day changes.

**Trade-off:** The user's XP total in the Header does not reflect today's activity until tomorrow. This is intentional — it reinforces the idea that today's effort pays off tomorrow, which aligns with the self-improvement theme.

---

## Activities Can Optionally Use a Counter

**Decision:** Any activity — positive or negative — can show a `+/-` counter when checked. Whether an activity has a counter is controlled by `hasCounter: boolean` on the individual activity, not by whether its points are positive or negative.

**Why:**
- A counter makes sense for any repeatable activity, not just penalties — e.g. multiple running sessions, extra study blocks, or multiple dietary slips in a day
- Decouples the UI interaction pattern from the semantic meaning of the activity
- Keeps the data model flexible: adding a counter to any activity in Settings requires only toggling one field

**Trade-off:** The counter is only visible when the activity is checked. Unchecking resets the count to zero. This is intentional — unchecking means "this didn't happen", which resets everything cleanly.

---

## Disciplines as Top-Level Groupings (Not Tags or Flat Lists)

**Decision:** Activities are grouped under Disciplines (Fisico, Mente, Charm, Spirito) rather than shown as a flat list or tagged.

**Why:**
- Mirrors how the original paper template was structured — familiar mental model for the user
- Disciplines map naturally to character stats in the RPG metaphor
- Groups make the checklist scannable — the user knows where to look for each activity type
- In the future social version, Disciplines become the shareable "Schede" published by experts

---

## localStorage with Export/Import Instead of a Backend

**Decision:** All data is stored in `localStorage` with a manual JSON export/import feature, rather than using a database or cloud sync.

**Why:**
- Zero infrastructure cost and complexity for the demo phase
- No authentication required — the app works immediately without signup
- Export/import gives the user control over their data and a recovery path if localStorage is cleared

**Trade-off:** Data is tied to a single browser on a single device. The export/import feature mitigates this but requires manual action. A proper backend with accounts is planned for the Next.js social version.
