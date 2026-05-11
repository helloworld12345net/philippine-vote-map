"use client";

import { useEffect, useMemo, useState } from "react";
import PhilippinesSVG from "./PhilippinesSVG";

type Region = {
  id: string;
  name: string;
  full: string;
  votes: number;
  x: number;
  y: number;
  labelX: number;
  labelY: number;
};

const initialRegions: Region[] = [
  {
    id: "r1",
    name: "Region I",
    full: "Ilocos Region",
    votes: 0,
    x: 455,
    y: 170,
    labelX: 80,
    labelY: 120,
  },
  {
    id: "car",
    name: "CAR",
    full: "Cordillera Admin. Region",
    votes: 0,
    x: 540,
    y: 250,
    labelX: 780,
    labelY: 130,
  },
  {
    id: "r2",
    name: "Region II",
    full: "Cagayan Valley",
    votes: 0,
    x: 500,
    y: 420,
    labelX: 60,
    labelY: 320,
  },
  {
    id: "r3",
    name: "Region III",
    full: "Central Luzon",
    votes: 0,
    x: 445,
    y: 620,
    labelX: 90,
    labelY: 560,
  },
  {
    id: "ncr",
    name: "NCR",
    full: "National Capital Region",
    votes: 0,
    x: 490,
    y: 830,
    labelX: 60,
    labelY: 810,
  },
  {
    id: "r4a",
    name: "Region IV-A",
    full: "CALABARZON",
    votes: 0,
    x: 650,
    y: 850,
    labelX: 860,
    labelY: 640,
  },
  {
    id: "r4b",
    name: "Region IV-B",
    full: "MIMAROPA",
    votes: 0,
    x: 395,
    y: 1180,
    labelX: 70,
    labelY: 1120,
  },
  {
    id: "r5",
    name: "Region V",
    full: "Bicol Region",
    votes: 0,
    x: 860,
    y: 1050,
    labelX: 1160,
    labelY: 880,
  },
  {
    id: "r6",
    name: "Region VI",
    full: "Western Visayas",
    votes: 0,
    x: 640,
    y: 1430,
    labelX: 20,
    labelY: 1420,
  },
  {
    id: "r7",
    name: "Region VII",
    full: "Central Visayas",
    votes: 0,
    x: 820,
    y: 1570,
    labelX: 1280,
    labelY: 1460,
  },
  {
    id: "r8",
    name: "Region VIII",
    full: "Eastern Visayas",
    votes: 0,
    x: 980,
    y: 1450,
    labelX: 1280,
    labelY: 1280,
  },
  {
    id: "r9",
    name: "Region IX",
    full: "Zamboanga Peninsula",
    votes: 0,
    x: 610,
    y: 1910,
    labelX: 240,
    labelY: 1820,
  },
  {
    id: "r10",
    name: "Region X",
    full: "Northern Mindanao",
    votes: 0,
    x: 940,
    y: 1980,
    labelX: 1200,
    labelY: 1960,
  },
  {
    id: "r11",
    name: "Region XI",
    full: "Davao Region",
    votes: 0,
    x: 920,
    y: 2220,
    labelX: 1260,
    labelY: 2220,
  },
  {
    id: "r12",
    name: "Region XII",
    full: "SOCCSKSARGEN",
    votes: 0,
    x: 770,
    y: 2140,
    labelX: 470,
    labelY: 2320,
  },
  {
    id: "r13",
    name: "Region XIII",
    full: "Caraga",
    votes: 0,
    x: 1080,
    y: 1830,
    labelX: 1370,
    labelY: 1760,
  },
  {
    id: "barmm",
    name: "BARMM",
    full: "Bangsamoro Autonomous Region",
    votes: 0,
    x: 470,
    y: 2160,
    labelX: 120,
    labelY: 2120,
  },
];

export default function PhilippinesMap() {
  const [regions, setRegions] = useState(initialRegions);
  const [activeRegion, setActiveRegion] = useState(initialRegions[0]);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await fetch("/api/results");
        const data = await res.json();

        const updatedRegions = initialRegions.map((region) => {
          const match = data.find(
            (item: any) => item.region === region.name
          );

          return {
            ...region,
            votes: match?._count?.region || 0,
          };
        });

        setRegions(updatedRegions);

        const topRegion = [...updatedRegions].sort(
          (a, b) => b.votes - a.votes
        )[0];

        setActiveRegion(topRegion);
      } catch (error) {
        console.log(error);
      }
    };

    fetchVotes();

    const interval = setInterval(fetchVotes, 3000);

    return () => clearInterval(interval);
  }, []);

  const maxVotes = useMemo(() => {
    return Math.max(...regions.map((r) => r.votes), 1);
  }, [regions]);

  const totalVotes = useMemo(() => {
    return regions.reduce((sum, r) => sum + r.votes, 0);
  }, [regions]);

  const getRadius = (votes: number) => {
    return 8 + (votes / maxVotes) * 26;
  };

  return (
    <section
      id="vote-map"
      className="relative overflow-hidden bg-[#031313] py-14 md:py-24"
    >
      {/* GRID */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,255,170,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,0.15) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-10">

        {/* HEADER */}
        <div className="mb-10 text-center md:mb-16">

          <p className="text-[10px] uppercase tracking-[0.35em] text-green-400 sm:text-xs md:text-sm">
            Live Regional Participation
          </p>

          <h2 className="mt-4 text-3xl font-black leading-none text-white sm:text-5xl md:text-6xl">
            PHILIPPINE
            <span className="block text-green-400">
              VOTE MAP
            </span>
          </h2>

        </div>

        {/* GRID */}
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[1.2fr_0.8fr]">

          {/* MAP */}
          <div
            className="
              relative
              overflow-hidden
              rounded-[28px]
              border
              border-green-400/15
              bg-[#041919]/80
              backdrop-blur-xl

              h-[580px]
              sm:h-[760px]
              lg:h-[980px]
            "
          >

            {/* SVG MAP */}
            <PhilippinesSVG className="opacity-90" />

            {/* DOTS */}
            <svg
              viewBox="0 0 1500 2400"
              className="absolute inset-0 z-10 h-full w-full"
            >
              {regions.map((region) => {
                const intensity = region.votes / maxVotes;
                const radius = getRadius(region.votes);

                return (
                  <g
                    key={region.id}
                    onMouseEnter={() => setActiveRegion(region)}
                    onClick={() => setActiveRegion(region)}
                    className="cursor-pointer"
                  >
                    <circle
                      cx={region.x}
                      cy={region.y}
                      r={radius + 10}
                      fill={`rgba(0,255,170,${0.08 + intensity * 0.22})`}
                    />

                    <circle
                      cx={region.x}
                      cy={region.y}
                      r={radius}
                      fill={`rgba(0,255,170,${0.3 + intensity * 0.7})`}
                    />

                    <text
                      x={region.labelX}
                      y={region.labelY}
                      className="fill-white text-[15px] font-bold"
                    >
                      {region.name}
                    </text>
                  </g>
                );
              })}
            </svg>

          </div>

          {/* SIDE PANEL */}
          <div
            className="
              rounded-[28px]
              border
              border-green-400/15
              bg-[#061919]/85
              p-6
              sm:p-8
              md:p-10
              backdrop-blur-xl
            "
          >

            <p className="text-[10px] uppercase tracking-[0.35em] text-green-400 sm:text-xs md:text-sm">
              Active Region
            </p>

            <h2 className="mt-4 text-4xl font-black leading-none text-white sm:text-5xl md:text-6xl">
              {activeRegion.name}
            </h2>

            <p className="mt-3 text-base text-[#A5B3B3] sm:text-xl md:text-2xl">
              {activeRegion.full}
            </p>

            <div className="mt-10 md:mt-14">

              <div className="text-5xl font-black leading-none text-green-400 sm:text-6xl md:text-7xl">
                {activeRegion.votes.toLocaleString()}
              </div>

              <p className="mt-3 text-base text-[#708080] md:text-xl">
                Votes Gathered
              </p>

            </div>

            <div className="mt-12 md:mt-16">

              <p className="text-base text-[#8FA0A0] md:text-xl">
                Total Votes
              </p>

              <p className="mt-3 text-4xl font-black text-green-400 sm:text-5xl md:text-6xl">
                {totalVotes.toLocaleString()}
              </p>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}