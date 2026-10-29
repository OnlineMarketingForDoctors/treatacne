// Dermatology Life Quality Index (DLQI), Finlay & Khan 1994, Cardiff University.
// Copyrighted: it may only be shown on the site under a licence from Cardiff University
// (build guide section 5). Keep the wording and scoring exactly as published.
// The DLQI is for ages 16+; children (4–16) use the separate CDLQI.

/** Switch on once the Cardiff University licence is confirmed. */
export const DLQI_ENABLED = false;

export const DLQI_MIN_AGE = 16;

export const DLQI_INSTRUCTIONS =
  "The aim of this questionnaire is to measure how much your skin problem has affected your life OVER THE LAST WEEK. Please choose one answer for each question.";

export const DLQI_COPYRIGHT =
  "© Dermatology Life Quality Index. A Y Finlay, G K Khan, April 1992. www.dermatology.org.uk. This must not be copied without the permission of the authors.";

const SCALE = ["Very much", "A lot", "A little", "Not at all"];
const SCALE_NR = [...SCALE, "Not relevant"];

export const dlqiQuestions: { id: string; label: string; options: string[] }[] = [
  { id: "dlqi1", label: "1. Over the last week, how itchy, sore, painful or stinging has your skin been?", options: SCALE },
  { id: "dlqi2", label: "2. Over the last week, how embarrassed or self conscious have you been because of your skin?", options: SCALE },
  { id: "dlqi3", label: "3. Over the last week, how much has your skin interfered with you going shopping or looking after your home or garden?", options: SCALE_NR },
  { id: "dlqi4", label: "4. Over the last week, how much has your skin influenced the clothes you wear?", options: SCALE_NR },
  { id: "dlqi5", label: "5. Over the last week, how much has your skin affected any social or leisure activities?", options: SCALE_NR },
  { id: "dlqi6", label: "6. Over the last week, how much has your skin made it difficult for you to do any sport?", options: SCALE_NR },
  { id: "dlqi7", label: "7. Over the last week, has your skin prevented you from working or studying?", options: ["Yes", "No", "Not relevant"] },
  { id: "dlqi7b", label: "If \"No\", over the last week how much has your skin been a problem at work or studying?", options: ["A lot", "A little", "Not at all"] },
  { id: "dlqi8", label: "8. Over the last week, how much has your skin created problems with your partner or any of your close friends or relatives?", options: SCALE_NR },
  { id: "dlqi9", label: "9. Over the last week, how much has your skin caused any sexual difficulties?", options: SCALE_NR },
  { id: "dlqi10", label: "10. Over the last week, how much of a problem has the treatment for your skin been, for example by making your home messy, or by taking up time?", options: SCALE_NR },
];

const points: Record<string, number> = {
  "Very much": 3,
  "A lot": 2,
  "A little": 1,
  "Not at all": 0,
  "Not relevant": 0,
};

/** Score bands from the DLQI scoring instructions */
export function dlqiBand(score: number) {
  if (score <= 1) return "No effect at all on patient's life";
  if (score <= 5) return "Small effect on patient's life";
  if (score <= 10) return "Moderate effect on patient's life";
  if (score <= 20) return "Very large effect on patient's life";
  return "Extremely large effect on patient's life";
}

/**
 * DLQI total (0–30) per the official scoring: questions score 3/2/1/0, "Not relevant" 0.
 * Q7: "Yes" (prevented working or studying) scores 3; "No" is scored by its follow-up
 * (A lot 2, A little 1, Not at all 0). One unanswered question scores 0; with two or more
 * unanswered the questionnaire isn't scored (returns null).
 */
export function dlqiScore(answers: Record<string, unknown>): number | null {
  let score = 0;
  let missing = 0;
  for (const q of dlqiQuestions) {
    if (q.id === "dlqi7b") continue;
    const value = answers[q.id];
    if (typeof value !== "string" || !value) {
      missing++;
      continue;
    }
    if (q.id === "dlqi7") {
      if (value === "Yes") score += 3;
      else if (value === "No") {
        const follow = answers.dlqi7b;
        if (typeof follow === "string" && follow) score += points[follow] ?? 0;
        else missing++;
      }
      continue;
    }
    score += points[value] ?? 0;
  }
  return missing >= 2 ? null : score;
}
