// Content from the Treat:Acne Website Build Guide (approved copy). Keep wording as written.

// TODO: replace with the Healthengine nurse-consultation booking link (due from Niyati).
export const BOOKING_URL = "https://www.healthengine.com.au/";
export const GET_STARTED_URL = "/get-started";
// TODO: Kajabi "Mastering Acne" checkout link (due from Niyati). The course page is /learn.
export const COURSE_URL = "#";
export const COURSE_PAGE = "/learn";

// Shop is a "coming soon" page for now. Set to true to bring back the product pages and cart.
export const SHOP_ENABLED = false;

// Search engines are told not to index the site until launch. Set to true to allow indexing.
export const SITE_INDEXABLE = false;

export const contact = {
  email: "info@treatacne.com.au",
  phone: "0485 816 400",
  phoneTel: "+61485816400",
  fax: "03 7074 0477",
  company: "Treat Skin Conditions Pty Ltd",
  abn: "70 685 569 608",
};

export const tagline = "Dermatologist-led care";
export const responseTime = "within 2 working days";

export const keyMessage = "Your first consultation with our acne nurse is free.";

// Terms that must accompany the free-consultation offer wherever it appears
export const freeConsultTerms = "Nurse consultations don't include prescribing. Doctor fees apply.";
// The same terms in the "Let's get started" band (the one place they appear on every page)
export const footerCtaTerms =
  "Nurse consultation is free and doesn't include prescribing. Doctor fees apply.";

export const courseLine =
  "Not ready for a consultation? You can still learn more with our online course, Mastering Acne.";

export const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/learn", label: "Learn" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
];

export const footerLinks = [
  { href: "/about", label: "About" },
  { href: "/how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/severe-persistent-acne", label: "Severe & persistent acne" },
  { href: "/faq", label: "FAQ" },
  { href: "/learn", label: "Learn" },
  { href: "/quiz", label: "Acne quiz" },
];

export const footerSecondaryLinks = [
  { href: "/photo-guide", label: "Photo guide" },
  { href: "/shop", label: "Shop" },
  { href: "/contact", label: "Contact" },
  { href: "/feedback-and-complaints", label: "Feedback & complaints" },
  { href: "/accessibility", label: "Accessibility" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-use", label: "Terms of Use" },
];

// TODO: add the clinic's Instagram and LinkedIn profile URLs (due from Niyati). Hidden until then.
export const socialLinks: { href: string; label: string }[] = [];

export const crisisLines = [
  { name: "Lifeline", number: "13 11 14", tel: "131114", note: "24/7" },
  { name: "Kids Helpline", number: "1800 55 1800", tel: "1800551800", note: "ages 5–25, 24/7" },
];

export const prices = [
  { service: "Acne nurse consultation (phone)", fee: "Free" },
  { service: "Dermatologist, first consultation (video)", fee: "$365" },
  { service: "Dermatologist, review (video)", fee: "$280" },
  { service: "GP with a special interest in acne, first consultation (video)", fee: "$99 (no Medicare rebate)" },
  { service: "GP review (video)", fee: "$99 (no Medicare rebate)" },
  { service: "Nurse support between appointments", fee: "Free" },
  { service: "Blood tests", fee: "Bulk-billed with Medicare" },
];

export const gpReferralNote =
  "If our GP refers you to our dermatologist, the referral is free. Dermatologist fees apply, and with the referral you can claim the Medicare rebate.";

// "How it works in 5 steps" (same wording on Home and How it works)
export const steps = [
  { title: "Tell us about your skin.", body: "A 4-minute online form and a few photos." },
  {
    title: "Free call with our acne nurse.",
    body: "Book a time that suits you, usually within 2 working days. She reviews your history and photos, explains all your treatment options, then books you with the right doctor. Our nurses provide information only: they can't give medical advice or prescribe.",
  },
  {
    title: "See our dermatologist or GP.",
    body: "By secure video, wherever you live. We recommend our dermatologist for moderate, severe or persistent acne, or acne that hasn't responded to treatment.",
  },
  { title: "Your personalised treatment plan.", body: "Built around your skin and what you've already tried." },
  {
    title: "Treatment, your way.",
    body: "Your script sent to you for any pharmacy, or your treatment posted to your door.",
  },
];

export const ongoingCare = "Regular dermatologist reviews, with nurse support between visits.";

export const budgetCallout = {
  title: "On a budget? See our GP for $99.",
  body: `Our GP with a special interest in acne offers video consultations for $99 (no Medicare rebate). Some acne medications can only be prescribed by a dermatologist, so our GP can refer you if you need one. ${gpReferralNote} Just tell our nurse.`,
};

export const goodToKnow =
  "Your nurse calls by phone. Doctor consultations are by secure video: we'll send a private link, with no app needed.";

export const whyChoose = [
  {
    title: "Designed by a dermatologist",
    body: "Our treatment pathways are designed by a specialist dermatologist.",
  },
  {
    title: "Personalised treatment",
    body: "A plan based on your skin and what you've already tried, with support throughout.",
  },
  {
    title: "Real follow-up",
    body: "Regular reviews, with nurse support between visits.",
  },
  {
    title: "Clear fees",
    body: "A free nurse consultation to start, with clear fees before you book.",
  },
  {
    title: "No referral or clinic visit needed",
    body: "Care from home, anywhere in Australia.",
  },
];

export const faqs = [
  {
    question: "Who is Treat:Acne for?",
    answer:
      "Anyone in Australia with acne, at any age. Under-18s need a parent or guardian to consent and attend the consultation.",
  },
  {
    question: "I'm not ready for a consultation. What can I do at home?",
    answer:
      "Start with Mastering Acne, a comprehensive online course created by our dermatologist, Dr Niyati Sharma. Learn how acne works, how to build a routine that suits your skin, and how to get the most from treatment, at your own pace. If your acne is painful, leaving marks or scars, or not improving, we recommend booking a consultation.",
    link: { href: "/learn", label: "See the course →" },
  },
  {
    question: "What happens at my first consultation?",
    answer:
      "Book your free nurse call at a time that suits you, usually within 2 working days. Our acne nurse reviews your history and photos, explains your treatment options, then books you with the right doctor.",
  },
  {
    question: "Do I need a referral?",
    answer:
      "No. A referral is only needed to claim a Medicare rebate for a dermatologist consultation. If you start with our GP and later need a dermatologist's care, our GP can refer you to our dermatologist, and the referral is free. Dermatologist fees apply, and with the referral you can claim the Medicare rebate. Fees for consultations already provided aren't refundable. Every person's acne is different, and needing a new approach doesn't mean the earlier care was wrong.",
  },
  {
    question: "How much does it cost?",
    answer:
      "Acne nurse consultation: free. GP with a special interest in acne: $99 for the first consultation and $99 for reviews (no Medicare rebate). Dermatologist: $365 for the first consultation and $280 for reviews (Medicare rebate with a valid referral). Fees are for a complete consultation. Your doctor will take the time you need.",
    link: { href: "/pricing", label: "See Pricing →" },
  },
  {
    question: "Do you offer discounts for healthcare or concession card holders?",
    answer:
      "We're not able to offer concession discounts at this stage, and our fees are the same for everyone. We've kept care as affordable as we can: your first nurse consultation is free, and our GP consultations are $99. If you have a concession card, you may pay less for PBS medicines at the pharmacy, so please tell our nurse.",
  },
  {
    question: "How do I pay?",
    answer:
      "After your nurse consultation, our nurse will send you a secure Tyro payment link by text or email. You can also pay by bank transfer: our nurse will give you the details. Payment must be received before your consultation. If it isn't, your appointment will be moved to a later time. Dermatologist bookings need a $100 deposit to secure the time, with the balance paid before the consultation.",
  },
  {
    question: "What if I need to cancel?",
    answer:
      "Cancel more than 24 hours before your appointment for a full refund of your payment or deposit. If you cancel within 24 hours or miss your appointment, your GP consultation payment or $100 dermatologist deposit is not refunded. Your nurse consultation is free, so just text us to rebook. To cancel, text or call 0485 816 400 or email info@treatacne.com.au.",
  },
  {
    question: "What if my acne is severe or keeps coming back?",
    answer:
      "Our dermatologist manages severe and persistent acne, with regular reviews, any monitoring you need, and nurse support throughout. Some acne treatments can only be prescribed by a dermatologist, so if you have moderate to severe acne we recommend our dermatologist. Our nurse will guide you.",
  },
  {
    question: "How do I get my medicine?",
    answer:
      "We'll send your script to you to use at any pharmacy. If you prefer, you can choose to have it posted to you by Edge Compounding Pharmacy. This is optional, and we have no financial or business relationship with Edge.",
  },
  {
    question: "What about blood tests?",
    answer:
      "We email you a request form to take to any pathology centre. They're bulk-billed with Medicare, and we contact you with the results.",
  },
  {
    question: "How do I send my GP referral?",
    answer:
      "Upload it in the Get Started form, fax it to 03 7074 0477, or email it to info@treatacne.com.au. A valid referral lets you claim a Medicare rebate for your dermatologist consultation.",
  },
  {
    question: "Is telehealth right for me?",
    answer: "It works for most acne. If your skin needs to be seen in person, we'll let you know.",
  },
  {
    question: "Who can't you treat?",
    answer:
      "Treat:Acne is for people living in Australia. We can't help in an emergency (call 000), and if your doctor thinks you need to be examined in person, they'll tell you and help you arrange it.",
  },
  {
    question: "Can teenagers use Treat:Acne?",
    answer:
      "Yes. We treat patients of all ages. If you're under 18, a parent or guardian needs to give consent and join every consultation.",
  },
  {
    question: "I'm pregnant, breastfeeding or planning a pregnancy. Can I still be treated?",
    answer:
      "Yes, but please tell our nurse, because some acne treatments aren't suitable during pregnancy or breastfeeding. Your doctor will recommend safe options for you.",
  },
  {
    question: "Can I keep using my own skincare?",
    answer: "Usually, yes. Your clinician will tell you what to keep, stop or add.",
  },
  {
    question: "Is my information private?",
    answer:
      "Yes. Your answers and photos are encrypted, stored securely in Australia and only seen by our clinical team, in line with our Privacy Policy.",
  },
  {
    question: "I've already been treated for acne by my GP. Can I see a dermatologist instead?",
    answer:
      "Yes. If you've already had lengthy treatment from your GP, our nurse can book you straight in with our dermatologist, even if your acne is mild. The first dermatologist consultation is $365, with a Medicare rebate if you have a referral.",
  },
  {
    question: "What if my doctor is running late?",
    answer:
      "Our doctors do their best to run on time, but some consultations take longer than expected. If your doctor is running more than 20 minutes late, we'll let you know by SMS. Please keep your phone nearby and stay ready to join your video link.",
  },
];
