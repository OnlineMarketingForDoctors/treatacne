// Get Started form definition: the shorter 5-step form from Niyati's review (Nov 2026).
// Shared by the form, the server-side validation and the staff review pages.
// Generic medicine names only (TGA advertising rules apply to this public page too).

import {
  CDLQI_COPYRIGHT,
  CDLQI_ENABLED,
  CDLQI_INSTRUCTIONS,
  CDLQI_MIN_AGE,
  CDLQI_PARENT_NOTE,
  cdlqiQuestions,
  DLQI_COPYRIGHT,
  DLQI_ENABLED,
  DLQI_INSTRUCTIONS,
  DLQI_MIN_AGE,
  dlqiQuestions,
} from "@/lib/dlqi";

export type Answers = Record<string, string | string[] | boolean | undefined>;

type Width = "full" | "half" | "third" | "quarter";

export type Field =
  | {
      id: string;
      type: "text" | "email" | "tel" | "date" | "textarea";
      label: string;
      placeholder?: string;
      /** Helper text under the label */
      help?: string;
      required?: boolean;
      width?: Width;
      autoComplete?: string;
      inputMode?: "numeric" | "tel" | "email";
      showIf?: (a: Answers) => boolean;
    }
  | {
      id: string;
      type: "select";
      label: string;
      options: string[];
      required?: boolean;
      width?: Width;
      /** Helper text under the field */
      help?: string;
      showIf?: (a: Answers) => boolean;
    }
  | {
      id: string;
      /** Pill buttons; `multiple` allows several */
      type: "choice";
      label: string;
      options: string[];
      multiple?: boolean;
      columns?: 2 | 3 | 4;
      required?: boolean;
      /** Small print under the options */
      help?: string;
      showIf?: (a: Answers) => boolean;
    }
  | {
      id: string;
      /** One row per item, same options on each row; each row is saved under its own id */
      type: "matrix";
      label: string;
      rows: { id: string; label: string }[];
      options: string[];
      /** Last row with a free-text box for the name, e.g. "Other" */
      otherRow?: { id: string; textId: string; label: string };
      showIf?: (a: Answers) => boolean;
    }
  | {
      id: string;
      type: "checkbox";
      label: string;
      /** Bold lead-in shown before the label */
      title?: string;
      required?: boolean;
      showIf?: (a: Answers) => boolean;
    }
  | {
      id: string;
      /** Plain radio buttons in a column (long options) */
      type: "radios";
      label: string;
      options: string[];
      help?: string;
      showIf?: (a: Answers) => boolean;
    }
  | { id: string; type: "note"; text: string; showIf?: (a: Answers) => boolean };

export type Section = { title: string; fields: Field[]; showIf?: (a: Answers) => boolean };
export type Step = {
  /** Short name for the progress label ("Step 2 of 5: Your skin") */
  name: string;
  heading: string;
  intro?: string;
  sections: Section[];
};

const str = (a: Answers, id: string) => (typeof a[id] === "string" ? (a[id] as string) : "");

/** Age in whole years from an ISO date (yyyy-mm-dd), or null if invalid */
export function ageFrom(dob: string, today = new Date()): number | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(dob);
  if (!m) return null;
  const birth = new Date(Number(m[1]), Number(m[2]) - 1, Number(m[3]));
  if (Number.isNaN(birth.getTime()) || birth > today) return null;
  let age = today.getFullYear() - birth.getFullYear();
  const beforeBirthday =
    today.getMonth() < birth.getMonth() ||
    (today.getMonth() === birth.getMonth() && today.getDate() < birth.getDate());
  if (beforeBirthday) age -= 1;
  return age;
}

export const isUnder18 = (a: Answers) => {
  const age = ageFrom(str(a, "dob"));
  return age !== null && age < 18;
};

const durations = ["Less than 6 months", "6–12 months", "1–2 years", "2–5 years", "More than 5 years"];
const yesNo = ["Yes", "No"];
const states = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];
export const isFemale = (a: Answers) => str(a, "sex") === "Female";
const languages = ["Arabic", "Cantonese", "Greek", "Hindi", "Italian", "Korean", "Mandarin", "Punjabi", "Spanish", "Vietnamese", "Other"];

export const triedOptions = ["Helped", "Partly", "Didn't help", "Not tried"];
export const triedRows = [
  { id: "triedPharmacy", label: "Pharmacy washes or creams (e.g. benzoyl peroxide, salicylic acid)" },
  { id: "triedPrescriptionTopical", label: "Prescription creams or gels (e.g. adapalene, tretinoin, clindamycin)" },
  { id: "triedAntibiotics", label: "Antibiotic tablets (e.g. doxycycline, minocycline)" },
  { id: "triedPill", label: "The contraceptive pill (taken for acne)" },
  { id: "triedSpironolactone", label: "Spironolactone" },
  { id: "triedIsotretinoin", label: "Isotretinoin" },
];

/** Which skin questionnaire applies at this age (step 4), if any */
export function questionnaireFor(a: Answers): "dlqi" | "cdlqi" | null {
  const age = ageFrom(str(a, "dob"));
  if (age === null) return null;
  if (DLQI_ENABLED && age >= DLQI_MIN_AGE) return "dlqi";
  if (CDLQI_ENABLED && age >= CDLQI_MIN_AGE) return "cdlqi";
  return null;
}

export const QUESTIONNAIRE_INTRO =
  "Optional: how your skin affects your life. These 10 quick questions help us triage you even faster. No time? No problem: you can skip them and still submit.";

export const steps: Step[] = [
  {
    name: "A bit about you",
    heading: "1. A bit about you",
    sections: [
      {
        title: "Your details",
        fields: [
          { id: "firstName", type: "text", label: "First name", required: true, width: "third", autoComplete: "given-name" },
          { id: "lastName", type: "text", label: "Last name", required: true, width: "third", autoComplete: "family-name" },
          { id: "dob", type: "date", label: "Date of birth", required: true, width: "third", autoComplete: "bday" },
          { id: "sex", type: "select", label: "Sex assigned at birth", options: ["Female", "Male", "Intersex", "Prefer not to say"], required: true, width: "third" },
          { id: "mobile", type: "tel", label: "Mobile", required: true, width: "third", autoComplete: "tel", inputMode: "tel" },
          { id: "email", type: "email", label: "Email", required: true, width: "third", autoComplete: "email", inputMode: "email" },
          { id: "state", type: "select", label: "State", options: states, required: true, width: "third" },
          { id: "interpreter", type: "select", label: "Need an interpreter?", options: yesNo, required: true, width: "third" },
          { id: "interpreterLanguage", type: "select", label: "If yes, which language?", options: languages, required: true, width: "third", help: "Free for you. We book a TIS National interpreter.", showIf: (a) => str(a, "interpreter") === "Yes" },
          { id: "interpreterLanguageOther", type: "text", label: "Which language?", required: true, width: "third", showIf: (a) => str(a, "interpreter") === "Yes" && str(a, "interpreterLanguage") === "Other" },
        ],
      },
      {
        title: "Parent or guardian",
        showIf: isUnder18,
        fields: [
          { id: "guardianNote", type: "note", text: "As the patient is under 18, a parent or guardian needs to give consent and join every consultation. They'll also sign at the last step." },
          { id: "guardianName", type: "text", label: "Parent/guardian name", required: true, width: "half" },
          { id: "guardianRelationship", type: "text", label: "Relationship to patient", required: true, width: "half" },
          { id: "guardianPhone", type: "tel", label: "Parent/guardian phone (optional)", width: "half", inputMode: "tel" },
          { id: "guardianEmail", type: "email", label: "Parent/guardian email (optional)", width: "half", inputMode: "email" },
        ],
      },
    ],
  },
  {
    name: "Your skin",
    heading: "2. Your skin",
    sections: [
      {
        title: "Your acne",
        fields: [
          { id: "acneDuration", type: "select", label: "How long you've had acne", options: durations, required: true, width: "third" },
          { id: "acneLocations", type: "choice", label: "Where it is", options: ["Forehead", "Cheeks", "Nose", "Chin/Jawline", "Chest", "Back", "Neck/Shoulders"], multiple: true, required: true, columns: 4 },
          { id: "acneTypes", type: "choice", label: "What type", options: ["Blackheads/Whiteheads", "Red bumps", "Pus-filled spots", "Deep painful cysts", "Not sure"], multiple: true, required: true, columns: 3 },
        ],
      },
      {
        title: "What you've tried",
        fields: [
          { id: "tried", type: "matrix", label: "What have you tried? (optional)", rows: triedRows, options: triedOptions, otherRow: { id: "triedOtherResult", textId: "triedOther", label: "Other" } },
          { id: "acneMedicines", type: "textarea", label: "Previous or current medicines you've taken for acne (optional)", placeholder: "e.g. creams, antibiotic tablets, the pill. Not sure of the name? Leave it blank: our nurse can go through it with you." },
        ],
      },
      {
        title: "Your health",
        fields: [
          { id: "anxietyDepression", type: "select", label: "Do you have anxiety or depression?", options: yesNo, required: true, width: "third", help: "If you answer Yes, our nurse will ask about it on your call." },
          { id: "allergies", type: "select", label: "Do you have any allergies?", options: yesNo, required: true, width: "third" },
          { id: "practitionerPreference", type: "select", label: "Who would you prefer to see?", options: ["Our GP with a special interest in acne", "Dermatologist", "No preference"], width: "third" },
          { id: "allergiesList", type: "textarea", label: "Please list your allergies", placeholder: "Medicines, foods or anything else", showIf: (a) => str(a, "allergies") === "Yes" },
          { id: "otherMedicines", type: "text", label: "Other medicines you take (optional)", placeholder: "Not sure? Leave it blank.", width: "half" },
          { id: "medicalConditions", type: "text", label: "Medical conditions (optional)", width: "half" },
        ],
      },
      {
        title: "Pregnancy & contraception",
        showIf: isFemale,
        fields: [
          { id: "hormonalContraception", type: "select", label: "Are you on hormonal contraception? (e.g. the combined pill, mini pill, hormonal IUD, implant)", options: ["No", "Yes", "Unsure"], width: "half" },
          { id: "contraceptionName", type: "text", label: "Name, if you know it (optional)", width: "half" },
          { id: "pregnancy", type: "select", label: "Are you pregnant, breastfeeding, or planning a pregnancy in the next 12 months?", options: ["No", "Pregnant", "Breastfeeding", "Planning a pregnancy", "Unsure"], required: true, width: "full", help: "Some acne treatments can't be used during pregnancy or breastfeeding, or while trying to conceive." },
        ],
      },
      {
        title: "Your prescription",
        fields: [
          { id: "prescriptionPreference", type: "radios", label: "How would you like your prescription?", options: ["Send my script to me (SMS or email) so I can use my local pharmacy", "Post my medication to my home (via Edge Compounding Pharmacy)"], help: "Optional. You can use any pharmacy. Treat:Acne has no financial or business relationship with Edge Compounding Pharmacy." },
        ],
      },
    ],
  },
  {
    name: "Photos",
    heading: "3. Photos",
    intro: "Tap each box to take or choose a photo. Good light, no makeup or filters. Tie hair back so we can see your forehead, cheeks, jawline and neck.",
    sections: [],
  },
  {
    name: "Optional questions",
    heading: "4. Optional: how your skin affects your life",
    sections: [
      {
        title: "How your skin affects your life (DLQI)",
        // Licensed questionnaire, ages 16+ (see lib/dlqi.ts)
        showIf: (a) => questionnaireFor(a) === "dlqi",
        fields: [
          { id: "dlqiInstructions", type: "note", text: DLQI_INSTRUCTIONS },
          ...dlqiQuestions.map(
            (q): Field => ({
              id: q.id,
              type: "choice",
              label: q.label,
              options: q.options,
              columns: q.options.length === 4 ? 4 : 3,
              showIf: q.id === "dlqi7b" ? (a) => str(a, "dlqi7") === "No" : undefined,
            }),
          ),
          { id: "dlqiCopyright", type: "note", text: DLQI_COPYRIGHT },
        ],
      },
      {
        title: "How your skin affects you (CDLQI)",
        // Licensed children's questionnaire, ages 4–15 (see lib/dlqi.ts)
        showIf: (a) => questionnaireFor(a) === "cdlqi",
        fields: [
          { id: "cdlqiParentNote", type: "note", text: CDLQI_PARENT_NOTE },
          { id: "cdlqiInstructions", type: "note", text: CDLQI_INSTRUCTIONS },
          ...cdlqiQuestions.map(
            (q): Field => ({
              id: q.id,
              type: "choice",
              label: q.label,
              options: q.options,
              columns: q.options.length === 2 ? 2 : q.options.length === 4 ? 4 : 3,
              showIf:
                q.id === "cdlqi7a"
                  ? (a) => str(a, "cdlqi7") === "School time"
                  : q.id === "cdlqi7b"
                    ? (a) => str(a, "cdlqi7") === "Holiday time"
                    : undefined,
            }),
          ),
          { id: "cdlqiCopyright", type: "note", text: CDLQI_COPYRIGHT },
        ],
      },
    ],
  },
  {
    name: "Almost done",
    heading: "5. Almost done",
    sections: [
      {
        title: "Consents & declaration",
        fields: [
          // TODO: final consent wording is with the lawyer
          { id: "consentPrivacy", type: "checkbox", label: "I consent to my personal and health information, including photos, being collected and used for my care, as described in the Privacy Policy.", required: true },
          { id: "consentDeclaration", type: "checkbox", label: "I have read the Terms of Use. I understand my nurse consultation is by phone and doctor consultations are by video, the nurse does not prescribe, the fees and cancellation policy, and that this is not an emergency service. The information I've given is true and complete.", required: true },
          { id: "consentPhotography", type: "checkbox", label: "Optional: my photos may be used for internal clinical training and quality improvement, never in advertising." },
        ],
      },
      {
        title: "Parent or guardian",
        showIf: isUnder18,
        fields: [
          { id: "signatureRelationship", type: "text", label: "Your relationship to the patient", placeholder: "e.g. Mother, Father, Guardian", required: true, width: "half" },
        ],
      },
      {
        title: "Signature",
        fields: [
          { id: "signatureName", type: "text", label: "Full name as signature", required: true, width: "full", autoComplete: "name" },
        ],
      },
    ],
  },
];

/** Steps by number, for the form's step logic */
export const STEP = { about: 0, skin: 1, photos: 2, questionnaire: 3, done: 4 } as const;

/** File slots. The referral sits on step 1, photos on step 3. */
export type FileSlot = { id: string; label: string; hint?: string; example?: string; group: string };

export const referralSlot: FileSlot = {
  id: "referral",
  label: "GP referral",
  group: "Referral",
};

const ex = (name: string) => `/images/photo-examples/example-${name}.jpg`;

export const photoGroups: { title: string; slots: FileSlot[] }[] = [
  {
    title: "Your photos",
    slots: [
      { id: "face-front", label: "Front of face", hint: "Whole face, hair back, chin up", example: ex("face-front"), group: "Photos" },
      { id: "face-left", label: "Left side", hint: "Turn to your right: cheek, jaw, neck", example: ex("face-left"), group: "Photos" },
      { id: "face-right", label: "Right side", hint: "Turn to your left: cheek, jaw, neck", example: ex("face-right"), group: "Photos" },
      { id: "closeup-1", label: "Close-up of worst area", hint: "Hold 15–20 cm away", example: ex("closeup"), group: "Photos" },
      { id: "body", label: "Chest or back", hint: "If you have acne there", example: ex("body-chest"), group: "Photos" },
    ],
  },
];

/** "Upload all photos at once": unlabelled extra photos, which the nurse sorts out */
export const MAX_BULK_PHOTOS = 10;
export const bulkSlots: FileSlot[] = Array.from({ length: MAX_BULK_PHOTOS }, (_, i) => ({
  id: `extra-${i + 1}`,
  label: `Photo ${i + 1} (uploaded together)`,
  group: "Photos",
}));

export const allFileSlots: FileSlot[] = [referralSlot, ...photoGroups.flatMap((g) => g.slots), ...bulkSlots];

export const ALLOWED_FILE_TYPES = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/heic",
  "image/heif",
  "application/pdf",
];
export const MAX_FILE_BYTES = 15 * 1024 * 1024;

/** Fields currently shown, given the answers so far */
export function visibleFields(step: Step, a: Answers): Field[] {
  return step.sections
    .filter((s) => !s.showIf || s.showIf(a))
    .flatMap((s) => s.fields)
    .filter((f) => !f.showIf || f.showIf(a));
}

/** Answer keys currently shown in a step (a matrix saves one key per row) */
export function visibleAnswerIds(step: Step, a: Answers): string[] {
  return visibleFields(step, a).flatMap((f) =>
    f.type === "matrix"
      ? [...f.rows.map((r) => r.id), ...(f.otherRow ? [f.otherRow.id, f.otherRow.textId] : [])]
      : f.type === "note"
        ? []
        : [f.id],
  );
}

const isEmpty = (v: Answers[string]) =>
  v === undefined || v === false || (typeof v === "string" ? v.trim() === "" : Array.isArray(v) && v.length === 0);

/** Required-field and format checks for one step. Returns field id → message. */
export function validateStep(stepIndex: number, a: Answers): Record<string, string> {
  const errors: Record<string, string> = {};
  for (const f of visibleFields(steps[stepIndex], a)) {
    if (f.type === "note") continue;
    const v = a[f.id];
    if ("required" in f && f.required && isEmpty(v)) {
      errors[f.id] = f.type === "checkbox" ? "Please tick to continue." : "This field is required.";
      continue;
    }
    if (typeof v !== "string" || v.trim() === "") continue;
    if (f.type === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) errors[f.id] = "Please enter a valid email address.";
    if (f.id === "mobile" && v.replace(/[^\d]/g, "").length < 8) errors[f.id] = "Please enter a valid mobile number.";
    if (f.id === "dob" && ageFrom(v) === null) errors[f.id] = "Please enter a valid date of birth.";
  }
  return errors;
}

/** All known field ids (used to drop anything unexpected from a submission) */
export const fieldIds = new Set(
  steps
    .flatMap((s) => s.sections.flatMap((sec) => sec.fields))
    .flatMap((f) =>
      f.type === "matrix"
        ? [...f.rows.map((r) => r.id), ...(f.otherRow ? [f.otherRow.id, f.otherRow.textId] : [])]
        : f.type === "note"
          ? []
          : [f.id],
    ),
);
