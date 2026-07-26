---
name: rough-task-implementer
description: >
  Use this skill whenever the user gives a rough, informally worded implementation task
  (a mix of loose prose, pasted code or API snippets, and/or a UI screenshot or mockup)
  and wants it built. Common signals include phrases like "implement this" or "this is
  how it should look", pasted API response shapes, and references to loading states,
  modals, or screens described in casual language rather than a formal spec. Always
  applies to React Native code. Produces a clarified implementation plan first, gets
  user confirmation, then writes code. Never jumps straight to code from a rough task.
---

# Rough Task Implementer

Turns a loosely-described task (prose + pasted code/API shape + screenshot) into a concrete React Native implementation, via a mandatory plan-then-code workflow.

## Workflow

### Step 1: Extract everything given

Before analyzing, inventory exactly what was provided:

- The prose description (what should happen, in what order)
- Any pasted code — API call signatures, response shapes, existing component code, types/interfaces
- Any image — treat it as the source of truth for layout, spacing, what fields are visible, states shown (loading, populated, error)

Read the image carefully if provided: note exact UI elements, their arrangement, any visible copy/labels, and whether it shows a single state or implies multiple (e.g. a loading spinner over a modal vs. the populated modal).

### Step 2: Identify ambiguity — do not guess

Rough tasks reliably underspecify things like:

- **Trigger timing** — "when X is hit" / "at that time" without saying exactly which user action fires it
- **Error states** — what happens if the API fails, times out, or returns partial data (almost never specified)
- **Loading indicator scope** — full-screen overlay vs. inline spinner vs. skeleton — infer from the image if shown, otherwise ask
- **Data mapping** — which API response field maps to which UI field, especially when field names don't obviously match
- **Edge cases** — empty states, what happens if the modal is dismissed mid-request, retry behavior
- **Existing code integration** — where this slots into the existing component tree, whether it's a new component or modifies an existing one

For each ambiguity found, do not silently assume. Use `ask_user_input_v0`-style clarifying questions (or plain questions if that tool isn't available in context) grouped together in one pass — don't drip-feed one question at a time. If something is a minor detail with an obvious convention-following default (e.g. spinner color matching existing app theme), note the assumption inline in the plan instead of asking.

### Step 3: Write the implementation plan

Structure:

1. **Trigger & flow** — the exact sequence of user action → state change → API call → UI update, as a numbered list
2. **Components touched** — new components to create vs. existing components to modify, named explicitly
3. **State** — what new state is needed (loading, error, data) and where it lives
4. **Data mapping** — table or list mapping API response fields → UI fields, called out explicitly since this is the most common silent-bug source
5. **Edge cases handled** — error, empty, retry (only include what was clarified or has an obvious default — don't invent scope)
6. **Open questions** — anything asked in Step 2 that's still unresolved, listed even after asking, if the user hasn't answered yet

Present this plan and stop. Do not write code yet.

### Step 4: Wait for confirmation

The user may confirm as-is, request changes to the plan, or answer outstanding questions. Revise the plan if needed. Only proceed to code once the user gives a clear go-ahead (e.g. "yes", "looks good", "go ahead", "implement it").

### Step 5: Implement

Write the React Native code matching the confirmed plan:

- Match the existing code style/patterns from any pasted existing code (hooks usage, styling approach — StyleSheet vs. styled-components vs. Tailwind/NativeWind, naming conventions)
- Implement loading/error/populated states as separate, clearly readable branches — not nested ternaries three levels deep
- Map API response fields exactly as specified in the confirmed plan's data mapping section
- Keep the diff scoped to what the plan describes — don't refactor unrelated code in the same pass unless asked

## Notes

- If the user pastes a task that's actually already fully specified (clear trigger, clear data shape, no visual ambiguity), the plan step can be short — a few lines confirming understanding — rather than padded out to hit every section above. Don't manufacture ambiguity that isn't there.
- If no image is provided but the task references "how it should look," ask for one or ask for a description before finalizing the UI portion of the plan — don't invent layout.
- This skill governs the _shape_ of the interaction (plan → confirm → code), not a fixed file/folder structure — follow whatever project structure is visible in the pasted code or existing repo.
