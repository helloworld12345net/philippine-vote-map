"use client";

import { useEffect, useState } from "react";

export default function InAppBrowserWarning() {
  const [isInApp, setIsInApp] = useState(false);

  useEffect(() => {
    const ua = navigator.userAgent || "";

    const inApp =
      ua.includes("FBAN") ||
      ua.includes("FBAV") ||
      ua.includes("Instagram") ||
      ua.includes("TikTok");

    setIsInApp(inApp);
  }, []);

  if (!isInApp) return null;

  return (
    <div className="bg-red-600 text-white p-4 text-center font-bold">
      Google Login does not work inside Facebook or Instagram browser.
      <br />
      Please open this page in Chrome or Safari.
    </div>
  );
}
