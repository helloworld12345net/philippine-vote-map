"use client";

import { useEffect, useState } from "react";

export default function InAppBrowserWarning() {
  const [showFallback, setShowFallback] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || "";

    const isFacebook =
      ua.includes("FBAN") || ua.includes("FBAV");

    const isInstagram = ua.includes("Instagram");

    const isTikTok = ua.includes("TikTok");

    const isInApp = isFacebook || isInstagram || isTikTok;

    if (!isInApp) return;

    const currentUrl = window.location.href;

    // ANDROID → TRY OPEN CHROME
    if (/Android/i.test(ua)) {
      window.location.href =
        "intent://" +
        currentUrl.replace(/^https?:\/\//, "") +
        "#Intent;scheme=https;package=com.android.chrome;end";
    }

    // IOS → TRY OPEN SAFARI
    else if (/iPhone|iPad|iPod/i.test(ua)) {
      window.location.href = currentUrl;
    }

    // SHOW FALLBACK MESSAGE AFTER 2 SEC
    const timer = setTimeout(() => {
      setShowFallback(true);
    }, 2000);

    return () => clearTimeout(timer);

  }, []);

  if (!showFallback) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-6">

      <div className="w-full max-w-md rounded-3xl border border-green-400/20 bg-[#041414] p-8 text-center shadow-[0_0_40px_rgba(0,255,150,0.15)]">

        <h2 className="text-2xl font-black text-green-400">
          Open in Browser
        </h2>

        <p className="mt-4 text-gray-300">
          Google Login is blocked inside Facebook, Instagram, and TikTok browsers.
        </p>

        <p className="mt-2 text-sm text-gray-500">
          Please open this website in Chrome or Safari to continue.
        </p>

        <a
          href={window.location.href}
          target="_blank"
          className="mt-6 inline-flex w-full items-center justify-center rounded-2xl bg-green-400 px-6 py-4 font-bold text-black transition-all duration-300 hover:scale-[1.02] hover:bg-green-300"
        >
          Open Website
        </a>

      </div>

    </div>
  );
}
