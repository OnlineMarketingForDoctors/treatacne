// Dummy answers for test submissions of the Get Started form.
// TURN OFF BEFORE LAUNCH: set TEST_PREFILL to false.

import { cdlqiQuestions, dlqiQuestions } from "@/lib/dlqi";
import type { Answers } from "@/lib/intake";

/** Pre-fills the Get Started form with dummy data. Must be false on the live site. */
export const TEST_PREFILL = true;

/**
 * Every field filled in, including ones that only show for under-18s or after certain answers
 * (the server keeps only the fields that are visible, so changing the date of birth or an answer
 * still gives a valid test).
 */
export function testAnswers(): Answers {
  // Middle option of each questionnaire question, so the scores aren't 0
  const questionnaire = Object.fromEntries(
    [...dlqiQuestions, ...cdlqiQuestions].map((q) => [q.id, q.options[Math.floor(q.options.length / 2)]]),
  );
  return {
    // Step 1
    firstName: "Test",
    lastName: "Patient",
    dob: "1995-06-15",
    sex: "Female",
    mobile: "0400 000 000",
    email: "test.patient@example.com",
    state: "VIC",
    interpreter: "No",
    interpreterLanguage: "Vietnamese",
    interpreterLanguageOther: "Tagalog",
    guardianName: "Test Guardian",
    guardianRelationship: "Mother",
    guardianPhone: "0400 000 001",
    guardianEmail: "guardian@example.com",
    // Step 2
    acneDuration: "1–2 years",
    acneLocations: ["Cheeks", "Chin/Jawline"],
    acneTypes: ["Red bumps", "Pus-filled spots"],
    triedPharmacy: "Partly",
    triedPrescriptionTopical: "Didn't help",
    triedAntibiotics: "Not tried",
    triedPill: "Not tried",
    triedSpironolactone: "Not tried",
    triedIsotretinoin: "Not tried",
    triedOther: "Tea tree oil (test submission)",
    triedOtherResult: "Partly",
    acneMedicines: "Adapalene gel for 3 months (test submission)",
    otherMedicines: "None (test submission)",
    medicalConditions: "None (test submission)",
    anxietyDepression: "No",
    allergies: "Yes",
    allergiesList: "Penicillin (test submission)",
    pregnancy: "No",
    hormonalContraception: "Yes",
    contraceptionName: "Combined pill (test submission)",
    practitionerPreference: "No preference",
    prescriptionPreference: "Send my script to me (SMS or email) so I can use my local pharmacy",
    // Step 4 (optional questionnaire)
    ...questionnaire,
    dlqi7: "No",
    dlqi7b: "A little",
    cdlqi7: "School time",
    cdlqi7a: "Only a little",
    // Step 5
    consentPrivacy: true,
    consentDeclaration: true,
    consentPhotography: false,
    signatureName: "Test Patient",
    signatureRelationship: "Mother",
  };
}
