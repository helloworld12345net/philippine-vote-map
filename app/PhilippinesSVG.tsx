"use client";

import { useEffect } from "react";

type Props = {
  onRegionHover?: (region: string) => void;
};

const regionVotes: Record<
  string,
  { intensity: number }
> = {
  NCR: { intensity: 1 },
  Region1: { intensity: 0.7 },
  Region2: { intensity: 0.5 },
  Region3: { intensity: 0.9 },
  Visayas: { intensity: 0.6 },
  Mindanao: { intensity: 0.8 },
};

export default function PhilippinesSVG({
  onRegionHover,
}: Props) {

  useEffect(() => {

    const svgObject =
      document.getElementById(
        "ph-map"
      ) as HTMLObjectElement;

    if (!svgObject) return;

    svgObject.onload = () => {

      const svg =
        svgObject.contentDocument;

      if (!svg) return;

      Object.entries(regionVotes).forEach(
        ([id, data]) => {

          const region =
            svg.getElementById(id);

          if (!region) return;

          region.style.transition =
            "all 0.3s ease";

          region.style.cursor = "pointer";

          region.style.fill =
            `rgba(0,255,170,${data.intensity})`;

          region.style.stroke =
            "#00ffaa";

          region.style.strokeWidth =
            "2";

          region.addEventListener(
            "mouseenter",
            () => {

              region.style.filter =
                "drop-shadow(0 0 15px rgba(0,255,170,0.9))";

              region.style.opacity =
                "1";

              if (onRegionHover) {
                onRegionHover(id);
              }
            }
          );

          region.addEventListener(
            "mouseleave",
            () => {

              region.style.filter =
                "none";
            }
          );
        }
      );
    };

  }, [onRegionHover]);

  return (
    <div className="w-full flex justify-center items-center">

      <object
        id="ph-map"
        type="image/svg+xml"
        data="/philippines.svg"
        className="
          w-full
          max-w-[1000px]
          h-auto
          opacity-90
          transition-all
          duration-500
          drop-shadow-[0_0_40px_rgba(0,255,170,0.15)]
        "
      />

    </div>
  );
}