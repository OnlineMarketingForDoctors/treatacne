// Content from the Treat:Acne Website Build Guide (approved copy). Keep wording as written.

// TODO: replace with the Healthengine nurse-consultation booking link (due from Niyati).
export const BOOKING_URL = "https://www.healthengine.com.au/";
export const GET_STARTED_URL = "/get-started";
// TODO: Kajabi "Mastering Acne" checkout link (due from Niyati).
export const COURSE_URL = "#";

// Shop is a "coming soon" page for now. Set to true to bring back the product pages and cart.
export const SHOP_ENABLED = false;

export const contact = {
  email: "info@treatacne.com.au",
  company: "Treat Skin Conditions Pty Ltd",
  abn: "70 685 569 608",
  address: "186 Gilbert Road, Preston VIC 3072",
};

export const keyMessage =
  "Your first 30-minute consultation is FREE with our trained acne nurses. GP consultations $99.";

// Terms that must accompany the free-consultation offer wherever it appears
export const freeConsultTerms =
  "Nurse consultation is free and doesn't include prescribing. 20-minute GP consultations are $99 with no Medicare rebate. Dermatologist fees apply. Seeing a dermatologist without a referral means no Medicare rebate.";

export const navLinks = [
  { href: "/about", label: "About Us" },
  { href: "/how-it-works", label: "How it works" },
  { href: "/pricing", label: "Pricing" },
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
];

export const footerSecondaryLinks = [
  { href: "/photo-guide", label: "Photo guide" },
  { href: "/shop", label: "Shop" },
  { href: "/privacy-policy", label: "Privacy Policy" },
  { href: "/terms-of-use", label: "Terms of Use" },
];

// TODO: replace with the clinic's real profile URLs (due from Niyati)
export const socialLinks = [
  { href: "https://www.instagram.com/", label: "Instagram" },
  { href: "https://www.linkedin.com/", label: "LinkedIn" },
];

export const crisisLines = [
  { name: "Lifeline", number: "13 11 14", tel: "131114", note: "24/7" },
  { name: "Kids Helpline", number: "1800 55 1800", tel: "1800551800", note: "ages 5–25, 24/7" },
];

export const prices = [
  { service: "Acne nurse consultation (30 minutes, phone)", fee: "Free" },
  { service: "GP trained in acne (20 minutes, video, mild acne)", fee: "$99" },
  { service: "Dermatologist - first consultation (20 minutes, video)", fee: "$365" },
  { service: "Dermatologist - review (10 minutes, video)", fee: "$280" },
  { service: "Nurse support between appointments", fee: "Free" },
  { service: "Blood tests", fee: "Bulk-billed (free)" },
];

export const steps = [
  {
    title: "Submit your medical information and photos.",
    body: "It takes about 4 minutes to fill out our online form and attach your photos.",
  },
  {
    title: "Talk to our acne nurse - within 2 business days.",
    body: "Our nurse calls you by phone for a free 30-minute consultation, reviews your history and photos, and guides you to the right doctor.",
  },
  {
    title: "See the right doctor for your skin.",
    body: "Our GP trained in acne for mild acne ($99), or a dermatologist if you've already had lengthy treatment from your GP, or for moderate, severe or persistent acne, or if you'd prefer one. Our GPs are trained and guided by our dermatologist throughout your consultation process.",
  },
  {
    title: "Receive your personalised treatment plan.",
    body: "Medical treatment where appropriate, targeted skincare, or both.",
  },
  {
    title: "Get your treatment, your way.",
    body: "We can send your script to you for any pharmacy, or post your treatment directly to you - whichever is easier, wherever you live in Australia.",
  },
];

export const whyChoose = [
  {
    title: "Dermatologist-led care.",
    body: "Every treatment pathway is designed and overseen by a specialist dermatologist.",
  },
  {
    title: "From home, Australia-wide.",
    body: "Phone and video consultations, with treatment posted to you or collected locally.",
  },
  {
    title: "Personalised treatment.",
    body: "Based on your skin, your history and what you've already tried.",
  },
  {
    title: "Supported throughout.",
    body: "A nurse is available between appointments, so you're never left managing it alone.",
  },
  {
    title: "The right care at the right price.",
    body: "A free nurse consultation, then our GP trained in acne for $99, or a dermatologist when you need one.",
  },
];

export const faqs = [
  {
    question: "Who is Treat:Acne for?",
    answer:
      "Anyone in Australia with acne, at any age. Under-18s need a parent or guardian to consent and attend the consultation.",
  },
  {
    question: "What happens at my first consultation?",
    answer:
      "Our acne nurse calls you within 2 business days, reviews your history and photos, then books you with the right doctor.",
  },
  {
    question: "Do I need a referral?",
    answer:
      "No. A referral is only needed to claim a Medicare rebate for a dermatologist consultation. If you start with our GP and later need a dermatologist's care, or your treatment plan changes, our GP can refer you to our dermatologist at no extra cost. Please note that fees for consultations already provided aren't refundable. Every person's acne is different, and needing a new approach doesn't mean the earlier care was wrong. It just means it's time for our dermatologist to take a different approach.",
  },
  {
    question: "How much does it cost?",
    answer:
      "30-minute acne nurse consultation: free. 20-minute consultation with our GP with a special interest in acne: $99 (no Medicare rebate). Our GPs are trained and guided by our dermatologist throughout your consultation process. Dermatologist: $365 for the first consultation and $280 for reviews (Medicare rebate with a valid referral). See Pricing.",
  },
  {
    question: "What if my acne is severe or keeps coming back?",
    answer:
      "Our dermatologist manages severe and persistent acne, with regular reviews, any monitoring you need, and nurse support throughout. Some acne treatments can only be prescribed by a dermatologist, so if you have moderate to severe acne you'll need to see our dermatologist. Our nurse will guide you.",
  },
  {
    question: "How do I get my medication?",
    answer:
      "We can post it to you, or send the script to you so you can use your local pharmacy.",
  },
  {
    question: "What about blood tests?",
    answer:
      "We email you a request form to take to any pathology centre. They're bulk-billed, and we contact you with the results.",
  },
  {
    question: "Is telehealth right for me?",
    answer: "It works for most acne. If your skin needs to be seen in person, we'll let you know.",
  },
  {
    question: "Can I keep using my own skincare?",
    answer: "Usually, yes. Your clinician will tell you what to keep, stop or add.",
  },
  {
    question: "Is my information private?",
    answer:
      "Yes. Your details are stored securely and used only for your care, in line with our Privacy Policy.",
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
