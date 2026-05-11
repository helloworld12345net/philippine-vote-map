"use client";

import { useEffect, useState } from "react";

type RegionData = {
  region: string;
  votes: number;
};

export default function TopRegions() {
  const [regions, setRegions] = useState<RegionData[]>([]);

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const res = await fetch("/api/results");
        const data = await res.json();

        const formatted = data
          .map((item: any) => ({
            region: item.region,
            votes: item._count.region,
          }))
          .sort((a: RegionData, b: RegionData) => b.votes - a.votes)
          .slice(0, 5);

        setRegions(formatted);

      } catch (error) {
        console.log(error);
      }
    };

    fetchResults();

    const interval = setInterval(() => {
      fetchResults();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative bg-[#041414] px-6 py-24 text-white">

      <div className="mx-auto max-w-5xl">

        <div className="mb-16 text-center">

          <p className="mb-4 text-sm uppercase tracking-[0.4em] text-green-400">
            Regional Rankings
          </p>

          <h2 className="text-5xl font-black">
            TOP
            <span className="block text-green-400">
              REGIONS
            </span>
          </h2>

        </div>

        <div className="space-y-6">

          {regions.map((region, index) => (
            <div
              key={region.region}
              className="flex items-center justify-between rounded-3xl border border-green-400/10 bg-[#071919] p-8"
            >

              <div className="flex items-center gap-6">

                <div
                  className="
                    flex
                    h-16
                    w-16
                    items-center
                    justify-center
                    rounded-full
                    bg-green-400
                    text-2xl
                    font-black
                    text-black
                  "
                >
                  #{index + 1}
                </div>

                <div>
                  <h3 className="text-2xl font-bold">
                    {region.region}
                  </h3>

                  <p className="text-gray-400">
                    Regional Support
                  </p>
                </div>

              </div>

              <div className="text-right">

                <div className="text-4xl font-black text-green-400">
                  {region.votes.toLocaleString()}
                </div>

                <p className="text-gray-500">
                  votes
                </p>

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}