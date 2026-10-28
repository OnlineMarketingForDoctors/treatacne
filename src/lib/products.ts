// TODO: PLACEHOLDER CATALOGUE. The designs only show "Cleanser Cream" repeated, so these
// products, prices, descriptions and photos must be replaced with the client's real range.
// (Later this can move to the database so staff can manage products without a code change.)

export type Category = { slug: string; name: string };

export type Product = {
  slug: string;
  name: string;
  category: Category;
  size: string;
  /** Price in cents, AUD incl. GST */
  price: number;
  description: string[];
  images: string[];
};

export const categories: Category[] = [
  { slug: "cleansers", name: "Cleansers" },
  { slug: "moisturisers", name: "Moisturisers" },
  { slug: "serums", name: "Serums" },
  { slug: "supplements", name: "Supplements" },
];

const [cleansers, moisturisers, serums, supplements] = categories;

const placeholderPhoto = "/images/product-cleanser-cream.jpg";
const placeholderDescription = [
  "Product description to be supplied by Treat:Acne.",
  "Include key ingredients, who it suits and how to use it.",
];

function placeholder(slug: string, name: string, category: Category): Product {
  return {
    slug,
    name,
    category,
    size: "30mL / 1.01fl.oz",
    price: 3600,
    description: placeholderDescription,
    // The design shows four gallery thumbnails; swap in real product angles when available.
    images: [placeholderPhoto, placeholderPhoto, placeholderPhoto, placeholderPhoto],
  };
}

export const products: Product[] = [
  placeholder("cleanser-cream", "Cleanser Cream", cleansers),
  placeholder("gel-cleanser", "Gel Cleanser", cleansers),
  placeholder("barrier-moisturiser", "Barrier Moisturiser", moisturisers),
  placeholder("light-moisturiser", "Light Moisturiser", moisturisers),
  placeholder("clarifying-serum", "Clarifying Serum", serums),
  placeholder("hydrating-serum", "Hydrating Serum", serums),
  placeholder("skin-support-capsules", "Skin Support Capsules", supplements),
  placeholder("daily-skin-powder", "Daily Skin Powder", supplements),
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

const aud = new Intl.NumberFormat("en-AU", { style: "currency", currency: "AUD" });

export function formatPrice(cents: number) {
  return aud.format(cents / 100);
}
