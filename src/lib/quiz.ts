// The 7 quiz questions (shared by the quiz and the staff view of a submission).

export type Question = { id: string; label: string; options: string[]; multiple?: boolean };

export const GP_OPTION = "Our GP with a special interest in acne - lower cost";
export const NOT_READY = "I'm not ready to see anyone yet";

export const quizQuestions: Question[] = [
  {
    id: "severity",
    label: "How would you describe your acne?",
    options: ["Mild", "Moderate", "Severe", "Not sure"],
  },
  {
    id: "duration",
    label: "How long have you had it?",
    options: ["Less than 6 months", "6–12 months", "1+ years"],
  },
  { id: "location", label: "Where is it?", options: ["Face", "Back", "Chest"], multiple: true },
  {
    id: "tried",
    label: "What have you tried?",
    options: [
      "Nothing",
      "Skincare",
      "Prescription creams",
      "Prescription tablets",
      "Treatment from my GP",
    ],
    multiple: true,
  },
  { id: "scarring", label: "Do you have scarring or dark marks?", options: ["Yes", "No", "Not sure"] },
  {
    id: "goal",
    label: "What's your main goal?",
    options: [
      "Fewer breakouts",
      "Prevent scarring",
      "Treat severe or persistent acne",
      "Ongoing management",
    ],
  },
  {
    id: "preference",
    label: "Who would you prefer to see?",
    options: [GP_OPTION, "Dermatologist", "No preference", NOT_READY],
  },
];
