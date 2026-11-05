// Quiz answers are kept in the patient's browser so the Get Started form can pre-fill from
// them and attach them to the submission for the nurse. Wrapped in try/catch: storage can be
// unavailable (private windows, blocked site data).

export type QuizAnswers = Record<string, string[]>;
export type QuizResult = "A" | "B" | "C" | "D";
export type SavedQuiz = { answers: QuizAnswers; result: QuizResult; savedAt: number };

const KEY = "treatacne:quiz";
const MAX_AGE = 30 * 24 * 60 * 60 * 1000;

export function saveQuiz(answers: QuizAnswers, result: QuizResult) {
  try {
    localStorage.setItem(KEY, JSON.stringify({ answers, result, savedAt: Date.now() }));
  } catch {}
}

export function loadQuiz(): SavedQuiz | null {
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) ?? "null") as SavedQuiz | null;
    if (!saved || Date.now() - saved.savedAt > MAX_AGE) return null;
    return saved;
  } catch {
    return null;
  }
}

export function clearQuiz() {
  try {
    localStorage.removeItem(KEY);
  } catch {}
}
