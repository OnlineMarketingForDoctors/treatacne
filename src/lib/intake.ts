// Get Started form definition (Chris's 3-step design + build guide section 5).
// Shared by the form, the server-side validation and the staff review pages.
// Clinical intake may name medicines (guide section 5): it isn't advertising.

export type Answers = Record<string, string | string[] | boolean | undefined>;

type Width = "full" | "half" | "third" | "quarter";

export type Field =
  | {
      id: string;
      type: "text" | "email" | "tel" | "date" | "textarea";
      label: string;
      placeholder?: string;
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
      help?: string;
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
  | { id: string; type: "note"; text: string; showIf?: (a: Answers) => boolean };

export type Section = { title: string; fields: Field[]; showIf?: (a: Answers) => boolean };
export type Step = { heading: string; intro?: string; sections: Section[] };

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
const useDurations = ["Less than 1 month", "1–3 months", "3–6 months", "More than 6 months"];
const effectiveness = ["Yes", "Partly", "No", "Not sure"];
const yesNo = ["Yes", "No"];
const states = ["ACT", "NSW", "NT", "QLD", "SA", "TAS", "VIC", "WA"];

export const steps: Step[] = [
  {
    heading: "Let's start with some contact info.",
    sections: [
      {
        title: "Personal Details",
        fields: [
          { id: "firstName", type: "text", label: "First name", placeholder: "First name", required: true, width: "half", autoComplete: "given-name" },
          { id: "lastName", type: "text", label: "Last name", placeholder: "Last name", required: true, width: "half", autoComplete: "family-name" },
          { id: "dob", type: "date", label: "Date of birth", required: true, width: "half", autoComplete: "bday" },
          { id: "sex", type: "select", label: "Sex assigned at birth", options: ["Female", "Male", "Intersex", "Prefer not to say"], width: "half" },
        ],
      },
      {
        title: "Parent or guardian",
        showIf: isUnder18,
        fields: [
          { id: "guardianNote", type: "note", text: "As the patient is under 18, a parent or guardian needs to complete this section. A parent or guardian must be present at every consultation." },
          { id: "guardianName", type: "text", label: "Parent/guardian name", placeholder: "Parent/guardian name", width: "half" },
          { id: "guardianRelationship", type: "text", label: "Relationship to patient", placeholder: "Relationship to patient", width: "half" },
          { id: "guardianPhone", type: "tel", label: "Parent/guardian phone", placeholder: "Parent/guardian phone", width: "half", inputMode: "tel" },
          { id: "guardianEmail", type: "email", label: "Parent/guardian email", placeholder: "Parent/guardian email", width: "half", inputMode: "email" },
          { id: "guardianConsent", type: "checkbox", label: "I am the patient's parent or guardian, I consent to their care, and I will attend their consultations.", required: true },
        ],
      },
      {
        title: "Contact Details",
        fields: [
          { id: "mobile", type: "tel", label: "Mobile number", placeholder: "Mobile number", required: true, width: "half", autoComplete: "tel", inputMode: "tel" },
          { id: "email", type: "email", label: "Email address", placeholder: "Email address", width: "half", autoComplete: "email", inputMode: "email" },
          { id: "address1", type: "text", label: "Address line 1", placeholder: "Address line 1", width: "half", autoComplete: "address-line1" },
          { id: "address2", type: "text", label: "Address line 2", placeholder: "Address line 2", width: "half", autoComplete: "address-line2" },
          { id: "suburb", type: "text", label: "Suburb", placeholder: "Suburb", width: "half", autoComplete: "address-level2" },
          { id: "postcode", type: "text", label: "Postcode", placeholder: "Postcode", width: "quarter", autoComplete: "postal-code", inputMode: "numeric" },
          { id: "state", type: "select", label: "State", options: states, width: "quarter" },
        ],
      },
      {
        title: "Medicare & Health Card",
        fields: [
          { id: "medicareNumber", type: "text", label: "Medicare number", placeholder: "Medicare number", width: "half", inputMode: "numeric" },
          { id: "medicareExpiry", type: "text", label: "Medicare expiry date", placeholder: "Medicare expiry (MM/YYYY)", width: "half" },
          { id: "concessionCard", type: "text", label: "Healthcare / concession card", placeholder: "Healthcare / Concession Card (Optional)", width: "half" },
          { id: "concessionExpiry", type: "text", label: "Concession card expiry", placeholder: "Expiry date (MM/YYYY)", width: "half" },
        ],
      },
      {
        title: "Your GP",
        fields: [
          { id: "gpName", type: "text", label: "GP name", placeholder: "GP name", width: "half" },
          { id: "gpClinic", type: "text", label: "GP clinic / practice", placeholder: "GP Clinic / Practice", width: "half" },
          { id: "gpAddress", type: "text", label: "GP street address", placeholder: "GP street address", width: "full" },
        ],
      },
      {
        title: "Emergency Contact",
        fields: [
          { id: "emergencyName", type: "text", label: "Emergency contact name", placeholder: "Name", width: "third" },
          { id: "emergencyRelationship", type: "text", label: "Relationship", placeholder: "Relationship", width: "third" },
          { id: "emergencyPhone", type: "tel", label: "Emergency contact phone", placeholder: "Phone", width: "third", inputMode: "tel" },
        ],
      },
    ],
  },
  {
    heading: "Tell us more about your skin",
    sections: [
      {
        title: "Acne History",
        fields: [
          { id: "acneDuration", type: "select", label: "How long have you had acne?", options: durations, width: "half" },
          { id: "acneAgeStarted", type: "text", label: "Age when acne started", placeholder: "Age when acne started? e.g. 15", width: "half", inputMode: "numeric" },
          { id: "acneLocations", type: "choice", label: "Where is your acne mainly located?", options: ["Forehead", "Cheeks", "Nose", "Chin/Jawline", "Chest", "Back", "Neck/Shoulders"], multiple: true, columns: 4 },
          { id: "acneTypes", type: "choice", label: "What type of acne do you mainly have?", options: ["Blackheads/Whiteheads", "Red bumps", "Pus-filled spots", "Deep painful cysts", "Not sure"], multiple: true, columns: 3 },
          // TODO: DLQI questionnaire (10 questions) goes here once the Cardiff University licence is in place.
        ],
      },
      {
        title: "Hormones & Contraception",
        showIf: (a) => str(a, "sex") !== "Male",
        fields: [
          { id: "periodsAge", type: "text", label: "What age did your periods start?", placeholder: "e.g. 13", width: "full", inputMode: "numeric" },
          { id: "flareBeforePeriod", type: "choice", label: "Did you notice your acne flares up in the week before your period?", options: yesNo, columns: 2 },
          { id: "onCocp", type: "choice", label: "Are you currently using a combined oral contraceptive pill (COCP)?", options: yesNo, columns: 2 },
          { id: "cocpName", type: "text", label: "Which pill?", placeholder: "e.g. Yasmin, Yaz, Levlen", width: "half", showIf: (a) => str(a, "onCocp") === "Yes" },
          { id: "cocpStarted", type: "text", label: "When did you start?", placeholder: "Month / Year", width: "half", showIf: (a) => str(a, "onCocp") === "Yes" },
          { id: "planningPregnancy", type: "choice", label: "Are you planning to become pregnant in the next 12 months?", options: yesNo, columns: 2 },
          { id: "pregnancyNote", type: "note", text: "IMPORTANT: some acne treatments cannot be used during pregnancy or while trying to conceive." },
        ],
      },
      {
        title: "Previous treatments",
        fields: [
          { id: "topicals", type: "choice", label: "Creams & Gels (topicals): have you tried topical treatments?", options: ["Benzoyl Peroxide", "Retinoids (e.g. Differin)", "Antibiotic Cream", "Salicylic Acid", "Clindamycin", "None/Not Sure"], multiple: true, columns: 3 },
          { id: "topicalsDuration", type: "select", label: "How long did you use them for?", options: useDurations, width: "half" },
          { id: "topicalsEffective", type: "select", label: "Were they effective?", options: effectiveness, width: "half" },
          { id: "orals", type: "choice", label: "Oral Medications: have you taken oral medications for acne?", options: ["Antibiotics (e.g. doxycycline)", "Spironolactone", "Combined pill for acne", "None", "Not sure"], multiple: true, columns: 3 },
          { id: "oralsDose", type: "text", label: "Dose (if known)", placeholder: "e.g. 100mg doxycycline", width: "half" },
          { id: "oralsDuration", type: "select", label: "How long for?", options: useDurations, width: "half" },
          { id: "oralsEffective", type: "select", label: "Were they effective?", options: effectiveness, width: "full" },
          { id: "isotretinoin", type: "choice", label: "Have you heard of or are you interested in Roaccutane / Accutane (isotretinoin)?", options: ["Yes - I'd like to explore it", "I've heard of it, not sure", "No, prefer other options", "I've used it before"], columns: 2 },
          { id: "isoYears", type: "text", label: "Previous course: year(s) taken", placeholder: "e.g. 2019 - 2020", width: "third", showIf: (a) => str(a, "isotretinoin") === "I've used it before" },
          { id: "isoDuration", type: "select", label: "Previous course: duration", options: ["Less than 6 months", "6–12 months", "More than 12 months"], width: "third", showIf: (a) => str(a, "isotretinoin") === "I've used it before" },
          { id: "isoMaxDose", type: "text", label: "Previous course: max dose (if known)", placeholder: "e.g. 40mg/day", width: "third", showIf: (a) => str(a, "isotretinoin") === "I've used it before" },
          { id: "isoSideEffects", type: "choice", label: "Any notable side effects?", options: ["Dry Lips/Skin", "Joint pain", "Mood changes", "Eye dryness", "Nosebleeds", "None"], multiple: true, columns: 3, showIf: (a) => str(a, "isotretinoin") === "I've used it before" },
        ],
      },
      {
        title: "Medical History",
        fields: [
          { id: "conditions", type: "choice", label: "Any relevant medical conditions? (select all that apply)", options: ["PCOS", "Thyroid condition", "Diabetes", "Liver disease", "High cholesterol", "None"], multiple: true, columns: 3 },
          { id: "anxietyDepression", type: "choice", label: "Do you have a history of anxiety or depression?", options: yesNo, columns: 2 },
          { id: "mentalHealthConditions", type: "choice", label: "Which condition(s)?", options: ["Anxiety", "Depression", "Both"], columns: 3, showIf: (a) => str(a, "anxietyDepression") === "Yes" },
          { id: "seenPsych", type: "choice", label: "Have you seen a psychologist or psychiatrist?", options: yesNo, columns: 2, showIf: (a) => str(a, "anxietyDepression") === "Yes" },
          { id: "familyHistory", type: "choice", label: "Family history (select all that apply)", options: ["Acne in family", "PCOS in family", "None"], multiple: true, columns: 3 },
          { id: "currentMedications", type: "textarea", label: "Current medications", placeholder: "List any medications, vitamins or supplements you take, or write 'None'" },
          { id: "allergies", type: "textarea", label: "Allergies", placeholder: "List any allergies (medicines, foods, other), or write 'None'" },
        ],
      },
      {
        title: "Your preferences",
        fields: [
          { id: "prescriptionPreference", type: "choice", label: "Prescription preference", options: ["Send my script to me (SMS or email) so I can use my local pharmacy", "Post my medication to my home (via Edge Compounding Pharmacy)"], columns: 2 },
          { id: "practitionerPreference", type: "choice", label: "Who would you prefer to see?", options: ["Our GP trained in acne", "Dermatologist", "No preference"], columns: 3 },
        ],
      },
    ],
  },
  {
    heading: "Let's upload your photos",
    intro: "Clear photos will help your doctor make an accurate assessment. The whole process takes about 2 minutes.",
    sections: [
      {
        title: "Consents & Declaration",
        fields: [
          { id: "consentPrivacy", type: "checkbox", title: "Privacy.", label: "I consent to Treat Skin Conditions Pty Ltd collecting, storing, using and sharing my personal and health information, including my photos, to provide my care, as described in the Privacy Policy.", required: true },
          { id: "consentTelehealth", type: "checkbox", title: "Telehealth.", label: "I understand my consultations will happen by phone or video. Telehealth has limits, and my clinician may recommend an in-person review. I have read and accept the Terms of Use.", required: true },
          { id: "consentCarePathway", type: "checkbox", title: "Care pathway and fees.", label: "I understand that I will first speak with an acne nurse, who does not prescribe, and may then see a doctor or dermatologist. I understand the fees, deposit and cancellation policy on the Pricing page.", required: true },
          { id: "consentAccuracy", type: "checkbox", title: "Accuracy and age.", label: "I confirm the information I have given is true and complete. I am 18 or over, or I am the parent or guardian of the patient, consent to their care, and will attend their consultations.", required: true },
          { id: "consentPhotography", type: "checkbox", title: "Clinical photography (optional).", label: "I consent to my de-identified photos being used for clinical training and quality improvement. I can still receive care if I don't tick this box." },
        ],
      },
      {
        title: "Electronic Signature",
        fields: [
          { id: "signatureName", type: "text", label: "Full name", placeholder: "Enter name", required: true, width: "half", autoComplete: "name" },
          { id: "signatureDate", type: "date", label: "Date", required: true, width: "half" },
          { id: "signatureRelationship", type: "text", label: "Your relationship to the patient", placeholder: "e.g. Mother, Father, Guardian", required: true, width: "full", showIf: isUnder18 },
        ],
      },
    ],
  },
];

/** File slots. The referral sits on step 1, photos on step 3. */
export type FileSlot = { id: string; label: string; hint?: string; group: string };

export const referralSlot: FileSlot = {
  id: "referral",
  label: "GP referral",
  group: "Referral",
};

export const photoGroups: { title: string; slots: FileSlot[] }[] = [
  {
    title: "Face Photos",
    slots: [
      { id: "face-front", label: "Front Face", hint: "Looking straight ahead", group: "Face Photos" },
      { id: "face-left", label: "Left Profile", hint: "Turn head left", group: "Face Photos" },
      { id: "face-right", label: "Right Profile", hint: "Turn head right", group: "Face Photos" },
    ],
  },
  {
    title: "Close-Up / Specific Areas",
    slots: [
      { id: "closeup-1", label: "Close-up of main problem area", group: "Close-Up / Specific Areas" },
      { id: "closeup-2", label: "Add another area (optional)", group: "Close-Up / Specific Areas" },
      { id: "closeup-3", label: "Add another area (optional)", group: "Close-Up / Specific Areas" },
    ],
  },
  {
    title: "Body Acne",
    slots: [
      { id: "body-chest", label: "Chest", hint: "- front torso", group: "Body Acne" },
      { id: "body-back", label: "Upper back", hint: "- ask someone to help", group: "Body Acne" },
      { id: "body-other", label: "Other area", hint: "(optional)", group: "Body Acne" },
    ],
  },
];

export const allFileSlots: FileSlot[] = [referralSlot, ...photoGroups.flatMap((g) => g.slots)];

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
  steps.flatMap((s) => s.sections.flatMap((sec) => sec.fields)).filter((f) => f.type !== "note").map((f) => f.id),
);
