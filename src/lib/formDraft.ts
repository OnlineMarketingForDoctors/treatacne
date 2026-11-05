// "Save progress": the Get Started answers are kept in the patient's own browser (never on
// our servers) until they submit. Photos can't be stored this way. Expires after 7 days.
import type { Answers } from "@/lib/intake";

const KEY = "treatacne:get-started";
const MAX_AGE = 7 * 24 * 60 * 60 * 1000;

type Draft = { answers: Answers; stepIndex: number; savedAt: number };

export function loadDraft(): Draft | null {
  try {
    const draft = JSON.parse(localStorage.getItem(KEY) ?? "null") as Draft | null;
    if (!draft || Date.now() - draft.savedAt > MAX_AGE) return null;
    return draft;
  } catch {
    return null;
  }
}

export function saveDraft(answers: Answers, stepIndex: number) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ answers, stepIndex, savedAt: Date.now() }));
  } catch {}
}

export function clearDraft() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
