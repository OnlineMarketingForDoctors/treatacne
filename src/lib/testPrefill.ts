// Dummy answers and photos for test submissions of the Get Started form.
// TURN OFF BEFORE LAUNCH: set TEST_PREFILL to false.

import { cdlqiQuestions, dlqiQuestions } from "@/lib/dlqi";
import { photoGroups, type Answers } from "@/lib/intake";

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

/** Small labelled placeholder JPEGs for the main photo slots (browser only) */
export async function testFiles(): Promise<Record<string, File>> {
  const slots = photoGroups.flatMap((g) => g.slots).filter((s) => s.id !== "body");
  const files: Record<string, File> = {};
  for (const slot of slots) {
    const canvas = document.createElement("canvas");
    canvas.width = canvas.height = 400;
    const ctx = canvas.getContext("2d");
    if (!ctx) continue;
    ctx.fillStyle = "#fcede6";
    ctx.fillRect(0, 0, 400, 400);
    ctx.fillStyle = "#e8541e";
    ctx.textAlign = "center";
    ctx.font = "bold 28px sans-serif";
    ctx.fillText("TEST PHOTO", 200, 185);
    ctx.font = "22px sans-serif";
    ctx.fillText(slot.label, 200, 225);
    const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/jpeg", 0.8));
    if (blob) files[slot.id] = new File([blob], `test-${slot.id}.jpg`, { type: "image/jpeg" });
  }
  return files;
}
