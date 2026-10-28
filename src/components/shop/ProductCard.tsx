import Image from "next/image";
import Link from "next/link";
import { formatPrice, type Product } from "@/lib/products";

export function ProductCard({ product }: { product: Product }) {
  return (
    <Link href={`/shop/${product.slug}`} className="group block text-center">
      <div className="relative aspect-[338/420] overflow-hidden rounded-[20px]">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 23vw, 50vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </div>
      <h2 className="mt-4 text-small group-hover:underline lg:text-body">{product.name}</h2>
      <p className="mt-1 text-small text-black lg:text-body">{product.size}</p>
      <p className="mt-1 text-small text-black lg:text-body">{formatPrice(product.price)}</p>
    </Link>
  );
}
