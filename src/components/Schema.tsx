import { contact, tagline } from "@/lib/site";
import { SITE_URL } from "@/app/sitemap";

// Structured data for search engines: a telehealth medical business serving Australia.
// No street address (Niyati's review); Dr Sharma as the founding dermatologist.
const schema = {
  "@context": "https://schema.org",
  "@type": "MedicalBusiness",
  "@id": `${SITE_URL}/#business`,
  name: "Treat:Acne",
  slogan: tagline,
  description:
    "Dermatologist-led online acne care anywhere in Australia, starting with a free consultation with our acne nurse.",
  url: SITE_URL,
  logo: `${SITE_URL}/images/logo-dark.png`,
  image: `${SITE_URL}/opengraph-image.png`,
  telephone: "+61 485 816 400",
  faxNumber: "+61 3 7074 0477",
  email: contact.email,
  legalName: contact.company,
  taxID: `ABN ${contact.abn}`,
  medicalSpecialty: "Dermatology",
  areaServed: { "@type": "Country", name: "Australia" },
  founder: { "@id": `${SITE_URL}/#niyati-sharma` },
  employee: [
    {
      "@type": "Physician",
      "@id": `${SITE_URL}/#niyati-sharma`,
      name: "Dr Niyati Sharma",
      jobTitle: "Specialist dermatologist",
      medicalSpecialty: "Dermatology",
      honorificSuffix: "MBBS, FACD, MPH",
      url: `${SITE_URL}/about`,
      image: `${SITE_URL}/images/dr-niyati-sharma.jpg`,
    },
  ],
};

export function Schema() {
  return (
    <script
      type="application/ld+json"
      // JSON from constants only (no user input)
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema).replace(/</g, "\\u003c") }}
    />
  );
}
