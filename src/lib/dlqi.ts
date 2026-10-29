// Dermatology Life Quality Index (DLQI), Finlay & Khan 1994, Cardiff University.
// Copyrighted: it may only be shown on the site under a licence from Cardiff University
// (build guide section 5). Keep the wording and scoring exactly as published.
// The DLQI is for ages 16+; children (4–16) use the separate CDLQI.

/** Cardiff University licence confirmed. */
export const DLQI_ENABLED = true;

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

// Children's Dermatology Life Quality Index (CDLQI), Lewis-Jones & Finlay 1995, Cardiff
// University. Licensed separately from the DLQI. For ages 4–16 (under DLQI_MIN_AGE here).

/** Cardiff University licence confirmed. */
export const CDLQI_ENABLED = true;

export const CDLQI_MIN_AGE = 4;

export const CDLQI_INSTRUCTIONS =
  "The aim of this questionnaire is to measure how much your skin problem has affected you OVER THE LAST WEEK. Please choose one answer for each question.";

/** Our own note (not part of the questionnaire): the child should give the answers */
export const CDLQI_PARENT_NOTE =
  "Parents and guardians: please help your child read the questions, but let them choose their own answers.";

export const CDLQI_COPYRIGHT =
  "© M.S. Lewis-Jones, A.Y. Finlay, May 1993. This must not be copied without the permission of the authors.";

const CHILD_SCALE = ["Very much", "Quite a lot", "Only a little", "Not at all"];

export const cdlqiQuestions: { id: string; label: string; options: string[] }[] = [
  { id: "cdlqi1", label: "1. Over the last week, how itchy, \"scratchy\", sore or painful has your skin been?", options: CHILD_SCALE },
  { id: "cdlqi2", label: "2. Over the last week, how embarrassed or self conscious, upset or sad have you been because of your skin?", options: CHILD_SCALE },
  { id: "cdlqi3", label: "3. Over the last week, how much has your skin affected your friendships?", options: CHILD_SCALE },
  { id: "cdlqi4", label: "4. Over the last week, how much have you changed or worn different or special clothes/shoes because of your skin?", options: CHILD_SCALE },
  { id: "cdlqi5", label: "5. Over the last week, how much has your skin trouble affected going out, playing, or doing hobbies?", options: CHILD_SCALE },
  { id: "cdlqi6", label: "6. Over the last week, how much have you avoided swimming or other sports because of your skin trouble?", options: CHILD_SCALE },
  { id: "cdlqi7", label: "7. Last week, was it school time or holiday time?", options: ["School time", "Holiday time"] },
  { id: "cdlqi7a", label: "If school time: Over the last week, how much did your skin problem affect your school work?", options: ["Prevented school", ...CHILD_SCALE] },
  { id: "cdlqi7b", label: "If holiday time: How much over the last week, has your skin problem interfered with your enjoyment of the holiday?", options: CHILD_SCALE },
  { id: "cdlqi8", label: "8. Over the last week, how much trouble have you had because of your skin with other people calling you names, teasing, bullying, asking questions or avoiding you?", options: CHILD_SCALE },
  { id: "cdlqi9", label: "9. Over the last week, how much has your sleep been affected by your skin problem?", options: CHILD_SCALE },
  { id: "cdlqi10", label: "10. Over the last week, how much of a problem has the treatment for your skin been?", options: CHILD_SCALE },
];

const childPoints: Record<string, number> = {
  "Prevented school": 3,
  "Very much": 3,
  "Quite a lot": 2,
  "Only a little": 1,
  "Not at all": 0,
};

/** CDLQI score bands (Waters et al. 2010) */
export function cdlqiBand(score: number) {
  if (score <= 1) return "No effect on child's life";
  if (score <= 6) return "Small effect on child's life";
  if (score <= 12) return "Moderate effect on child's life";
  if (score <= 18) return "Very large effect on child's life";
  return "Extremely large effect on child's life";
}

/**
 * CDLQI total (0–30): Very much 3, Quite a lot 2, Only a little 1, Not at all 0.
 * Q7 is scored from the school or holiday follow-up ("Prevented school" 3). One unanswered
 * question scores 0; with two or more unanswered it isn't scored (returns null).
 */
export function cdlqiScore(answers: Record<string, unknown>): number | null {
  const get = (id: string) => (typeof answers[id] === "string" ? (answers[id] as string) : "");
  let score = 0;
  let missing = 0;
  for (const q of cdlqiQuestions) {
    if (q.id === "cdlqi7a" || q.id === "cdlqi7b") continue;
    const value =
      q.id === "cdlqi7"
        ? get(get("cdlqi7") === "School time" ? "cdlqi7a" : get("cdlqi7") === "Holiday time" ? "cdlqi7b" : "")
        : get(q.id);
    if (!value) missing++;
    else score += childPoints[value] ?? 0;
  }
  return missing >= 2 ? null : score;
}
