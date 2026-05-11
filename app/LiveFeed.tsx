"use client";

import { useEffect, useState } from "react";

type FeedVote = {
  id: number;
  region: string;
  createdAt: string;
};

export default function LiveFeed() {
  const [votes, setVotes] = useState<FeedVote[]>([]);

  useEffect(() => {
    const fetchVotes = async () => {
      try {
        const res = await fetch("/api/live-feed");
        const data = await res.json();

        setVotes(data);

      } catch (error) {
        console.log(error);
      }
    };

    fetchVotes();

    const interval = setInterval(fetchVotes, 3000);

    return () => clearInterval(interval);

  }, []);

  return (
    <section className="relative overflow-hidden bg-[#041818] py-24">

      {/* BG GRID */}
      <div className="absolute inset-0 opacity-[0.04]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,255,170,0.12) 1px, transparent 1px), linear-gradient(90deg, rgba(0,255,170,0.12) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-5xl px-6">

        {/* TITLE */}
        <div className="mb-14 text-center">

          <p className="mb-4 text-sm uppercase tracking-[0.45em] text-green-400">
            Live Participation
          </p>

          <h2 className="text-5xl font-black text-white md:text-6xl">
            REAL-TIME
            <span className="block text-green-400">
              VOTE FEED
            </span>
          </h2>

        </div>

        {/* FEED */}
        <div className="space-y-5">

          {votes.map((vote) => (
            <div
              key={vote.id}
              className="
                flex items-center justify-between
                rounded-3xl
                border border-green-400/10
                bg-[#072222]/80
                p-6
                backdrop-blur-xl
              "
            >

              <div>

                <p className="text-2xl font-bold text-white">
                  Someone voted from {vote.region}
                </p>

                <p className="mt-2 text-sm text-[#8FA0A0]">
                  {new Date(vote.createdAt).toLocaleTimeString()}
                </p>

              </div>

              {/* PULSE DOT */}
              <div className="relative">

                <div className="h-4 w-4 rounded-full bg-green-400" />

                <div className="absolute inset-0 animate-ping rounded-full bg-green-400 opacity-75" />

              </div>

            </div>
          ))}

        </div>

      </div>

    </section>
  );
}