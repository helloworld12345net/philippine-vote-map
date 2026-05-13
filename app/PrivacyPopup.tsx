"use client";

import { useEffect, useState } from "react";

export default function PrivacyPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("privacyAccepted");

    if (!accepted) {
      setShow(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("privacyAccepted", "true");
    setShow(false);
  };

  if (!show) return null;

  return (
    <div className="fixed bottom-5 left-1/2 z-50 w-[94%] max-w-2xl -translate-x-1/2">
      <div className="rounded-2xl border border-cyan-400/20 bg-black/60 backdrop-blur-xl shadow-[0_0_25px_rgba(34,211,238,0.15)] p-4 md:p-5">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          
          <p className="text-sm md:text-[15px] text-gray-200 leading-relaxed">
            This platform uses anonymous analytics and regional participation
            tracking to maintain transparency, prevent duplicate voting, and
            improve user experience. Any email address provided is used solely
            for platform participation and verification purposes and will never
            be sold, shared, or used outside this platform.
          </p>

          <button
            onClick={handleAccept}
            className="rounded-xl bg-cyan-400 px-5 py-2 text-sm font-semibold text-black transition-all duration-300 hover:scale-105 hover:bg-cyan-300"
          >
            OK
          </button>

        </div>
      </div>
    </div>
  );
}
