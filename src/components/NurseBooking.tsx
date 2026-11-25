"use client";

import { useEffect, useRef, useState } from "react";
import { HEALTHENGINE_ID } from "@/lib/site";

/**
 * "Book your free nurse consultation" button. Opens Healthengine's booking widget in a pop-up.
 * The widget is Healthengine's own script, added exactly as Healthengine supplies it:
 *   <script data-he-id="103646" src="https://healthengine.com.au/webplugin/appointments.js"></script>
 * (it draws the booking calendar where the script sits, so it goes inside the pop-up).
 */
export function NurseBooking({ className = "", buttonClassName = "" }: { className?: string; buttonClassName?: string }) {
  const dialog = useRef<HTMLDialogElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Load the widget the first time the pop-up opens
  useEffect(() => {
    const el = box.current;
    if (!loaded || !el) return;
    const script = document.createElement("script");
    script.src = "https://healthengine.com.au/webplugin/appointments.js";
    script.async = true;
    script.dataset.heId = HEALTHENGINE_ID;
    el.appendChild(script);
    return () => {
      el.innerHTML = "";
    };
  }, [loaded]);

  const open = () => {
    setLoaded(true);
    dialog.current?.showModal();
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={open}
        aria-haspopup="dialog"
        className={`inline-flex h-[52px] w-full items-center justify-center rounded-full bg-brand px-8 text-body text-white transition-colors hover:bg-brand-soft sm:w-auto ${buttonClassName}`}
      >
        Book your free nurse consultation →
      </button>
      <dialog
        ref={dialog}
        aria-labelledby="nurse-booking-title"
        onClick={(e) => {
          // Click on the dimmed backdrop closes it
          if (e.target === dialog.current) dialog.current.close();
        }}
        className="m-auto w-[calc(100%-32px)] max-w-[560px] rounded-2xl bg-white p-0 text-left text-black backdrop:bg-black/50"
      >
        <div className="flex items-center justify-between gap-4 border-b border-brand/30 px-5 py-4">
          <h2 id="nurse-booking-title" className="text-big text-brand">
            Book your free nurse consultation
          </h2>
          <button
            type="button"
            onClick={() => dialog.current?.close()}
            aria-label="Close"
            className="flex size-9 shrink-0 items-center justify-center rounded-full text-brand hover:bg-cream"
          >
            <svg aria-hidden width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="m3 3 10 10M13 3 3 13" />
            </svg>
          </button>
        </div>
        <div ref={box} className="he-booking min-h-[520px] p-4 [&_iframe]:!w-full" />
      </dialog>
    </div>
  );
}
