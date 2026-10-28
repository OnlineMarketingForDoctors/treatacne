"use client";

import Image from "next/image";
import { useState } from "react";

export function ProductGallery({ images, name }: { images: string[]; name: string }) {
  const [active, setActive] = useState(0);

  return (
    <div>
      <div className="relative aspect-[686/671] overflow-hidden rounded-[20px]">
        <Image
          src={images[active]}
          alt={name}
          fill
          priority
          sizes="(min-width: 1024px) 46vw, 100vw"
          className="object-cover"
        />
      </div>
      {images.length > 1 && (
        <ul className="mt-3 flex gap-[10px]">
          {images.map((src, i) => (
            <li key={i}>
              <button
                type="button"
                onClick={() => setActive(i)}
                aria-label={`Show image ${i + 1} of ${images.length}`}
                aria-pressed={i === active}
                className={`block overflow-hidden rounded-[14px] outline-offset-2 transition-opacity ${
                  i === active ? "outline outline-1 outline-brand" : "opacity-80 hover:opacity-100"
                }`}
              >
                <Image
                  src={src}
                  alt=""
                  width={180}
                  height={180}
                  className="size-[70px] object-cover lg:size-[90px]"
                />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
