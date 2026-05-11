"use client";

import Link from "next/link";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import { ShieldCheck, MapPinned, Vote } from "lucide-react";
import PhilippinesMap from "./PhilippinesMap";
import TopRegions from "./TopRegions";
import LiveFeed from "./LiveFeed";

export default function Home() {
  const { isSignedIn } = useUser();

  const [totalVotes, setTotalVotes] = useState(0);

  useEffect(() => {
    const fetchTotalVotes = async () => {
      try {
        const res = await fetch("/api/results");
        const data = await res.json();

        const total = data.reduce(
          (sum: number, item: any) => sum + item._count.region,
          0
        );

        setTotalVotes(total);

      } catch (error) {
        console.log(error);
      }
    };

    // fetch immediately
    fetchTotalVotes();

    // refresh every 3 sec
    const interval = setInterval(fetchTotalVotes, 3000);

    return () => clearInterval(interval);

  }, []);

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#041414] text-white">

      {/* ========================= */}
      {/* ANIMATED FUTURISTIC BG */}
      {/* ========================= */}
      <div className="absolute inset-0">

        {/* ANIMATED CYBER LIGHTS */}
        <div className="absolute inset-0 overflow-hidden">

          {/* LIGHT 1 */}
          <div
            className="
              absolute
              top-[10%]
              left-[5%]
              h-[350px]
              w-[350px]
              rounded-full
              animate-[moveGlowOne_8s_ease-in-out_infinite]
              opacity-70
            "
            style={{
              background:
                "radial-gradient(circle, rgba(0,255,170,0.9) 0%, rgba(0,255,170,0.25) 40%, transparent 70%)",
              filter: "blur(50px)",
            }}
          />

          {/* LIGHT 2 */}
          <div
            className="
              absolute
              top-[55%]
              right-[8%]
              h-[300px]
              w-[300px]
              rounded-full
              animate-[moveGlowTwo_10s_ease-in-out_infinite]
              opacity-60
            "
            style={{
              background:
                "radial-gradient(circle, rgba(0,255,255,0.85) 0%, rgba(0,255,255,0.2) 40%, transparent 70%)",
              filter: "blur(45px)",
            }}
          />

          {/* LIGHT 3 */}
          <div
            className="
              absolute
              bottom-[5%]
              left-[35%]
              h-[280px]
              w-[280px]
              rounded-full
              animate-[moveGlowThree_7s_ease-in-out_infinite]
              opacity-60
            "
            style={{
              background:
                "radial-gradient(circle, rgba(0,255,120,0.85) 0%, rgba(0,255,120,0.18) 45%, transparent 75%)",
              filter: "blur(40px)",
            }}
          />

        </div>

        {/* TOP LEFT GLOW */}
        <div
          className="
            absolute
            top-[-30%]
            left-[-20%]
            h-[900px]
            w-[900px]
            animate-pulse
            rounded-full
            opacity-20
          "
          style={{
            background:
              "radial-gradient(circle, rgba(0,255,170,0.35), transparent 70%)",
            filter: "blur(120px)",
          }}
        />

        {/* BOTTOM RIGHT GLOW */}
        <div
          className="
            absolute
            bottom-[-25%]
            right-[-15%]
            h-[800px]
            w-[800px]
            animate-pulse
            rounded-full
            opacity-20
          "
          style={{
            background:
              "radial-gradient(circle, rgba(0,255,120,0.25), transparent 70%)",
            filter: "blur(120px)",
            animationDuration: "6s",
          }}
        />

      </div>

      {/* CYBER GRID */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.08]
          bg-[linear-gradient(rgba(0,255,150,0.15)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,150,0.15)_1px,transparent_1px)]
          bg-[size:60px_60px]
        "
      />

      {/* DARK OVERLAY */}
      <div className="absolute inset-0 bg-[#041414]/70 backdrop-blur-[2px]" />

      {/* ========================= */}
      {/* HERO SECTION */}
      {/* ========================= */}
      <section className="relative z-10 flex min-h-screen flex-col items-center justify-center px-6 text-center">

        {/* LABEL */}
        <p className="mb-6 text-xs uppercase tracking-[0.5em] text-green-400 md:text-sm">
          DUTERTE SUPPORTERS VOTE MAP
        </p>

        {/* TITLE */}
        <h1 className="max-w-6xl text-5xl font-black leading-none md:text-8xl">
          THE PEOPLE’S
          <span className="mt-4 block text-green-400 drop-shadow-[0_0_35px_rgba(0,255,150,0.8)]">
            VOICE
          </span>
        </h1>

        {/* SUBTITLE */}
        <p className="mt-8 max-w-3xl text-lg leading-relaxed text-gray-300 md:text-2xl">
          A transparent real-time voting and participation platform visualizing
          regional engagement of Duterte supporters across the Philippines.
        </p>

        {/* STATS CARD */}
        <div className="mt-12 rounded-3xl border border-green-400/20 bg-[#072222]/80 px-10 py-8 backdrop-blur-xl shadow-[0_0_60px_rgba(0,255,150,0.12)]">

          <p className="text-sm uppercase tracking-[0.3em] text-green-300">
            Nationwide Votes
          </p>

          <h2 className="mt-3 text-6xl font-extrabold text-green-400">
            {totalVotes.toLocaleString()}
          </h2>

        </div>

        {/* BUTTONS */}
        <div className="mt-12 flex flex-wrap justify-center gap-5">

          {/* VOTE NOW */}
          <Link
            href={isSignedIn ? "/vote" : "/sign-up"}
            className="rounded-full bg-green-400 px-10 py-5 font-bold text-black shadow-[0_0_35px_rgba(0,255,150,0.5)] transition-all duration-300 hover:scale-105 hover:bg-green-300"
          >
            {isSignedIn ? "Enter Voting Portal" : "Vote Now"}
          </Link>

          {/* EXPLORE */}
          <a
            href="#vote-map"
            className="rounded-full border border-green-400 px-10 py-5 font-bold text-green-400 transition-all duration-300 hover:scale-105 hover:bg-green-400 hover:text-black"
          >
            Explore Regions
          </a>

        </div>

        {/* FEATURE CARDS */}
        <div className="mt-24 grid w-full max-w-6xl grid-cols-1 gap-6 md:grid-cols-3">

          {/* CARD 1 */}
          <div className="rounded-3xl border border-green-400/10 bg-[#071F1F]/70 p-8 backdrop-blur-md transition hover:border-green-400/30">

            <ShieldCheck className="mb-5 h-12 w-12 text-green-400" />

            <h3 className="mb-3 text-2xl font-bold">
              Transparent
            </h3>

            <p className="text-gray-400">
              Real-time verified regional participation visible to the public.
            </p>

          </div>

          {/* CARD 2 */}
          <div className="rounded-3xl border border-green-400/10 bg-[#071F1F]/70 p-8 backdrop-blur-md transition hover:border-green-400/30">

            <MapPinned className="mb-5 h-12 w-12 text-green-400" />

            <h3 className="mb-3 text-2xl font-bold">
              Regional Mapping
            </h3>

            <p className="text-gray-400">
              Interactive Philippine map displaying votes by region live.
            </p>

          </div>

          {/* CARD 3 */}
          <div className="rounded-3xl border border-green-400/10 bg-[#071F1F]/70 p-8 backdrop-blur-md transition hover:border-green-400/30">

            <Vote className="mb-5 h-12 w-12 text-green-400" />

            <h3 className="mb-3 text-2xl font-bold">
              Civic Participation
            </h3>

            <p className="text-gray-400">
              Empowering every Filipino voice through digital engagement.
            </p>

          </div>

        </div>

      </section>

      {/* PH MAP */}
      <PhilippinesMap />
      <TopRegions />
      <LiveFeed />
      {/* ========================= */}
      {/* STATEMENT SECTION */}
      {/* ========================= */}
      <section className="relative overflow-hidden bg-[#031313] py-32">

        {/* GRID */}
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

        {/* CENTER GLOW */}
        <div className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400/10 blur-[140px]" />

        <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">

          {/* LABEL */}
          <p className="mb-6 text-sm uppercase tracking-[0.45em] text-green-400">
            The People’s Voice
          </p>

          {/* TITLE */}
          <h2 className="text-5xl font-black leading-tight text-white md:text-7xl">
            THE PHILIPPINES
            <span className="block text-green-400">
              IS SPEAKING
            </span>
          </h2>

          {/* TEXT */}
          <div className="mt-16 space-y-10 text-xl leading-[2.1rem] text-[#B6C3C3] md:text-2xl">

            <p>
              From Luzon to Mindanao, millions of Filipinos are uniting behind
              a vision of discipline, security, progress, and genuine change.
              This platform maps that growing support in real time, revealing
              the strength of public participation across every region of the
              country.
            </p>

            <p>
              Every number on this map represents a voice, a community, and a
              shared belief that the future of the nation should be driven by
              action, accountability, and the will of the people.
            </p>

          </div>

        </div>

      </section>
    {/* ========================= */}
{/* ========================= */}
{/* DONATION SECTION */}
{/* ========================= */}
<section className="relative overflow-hidden bg-[#021010] py-20">

  {/* GRID BG */}
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

  {/* CENTER GLOW */}
  <div className="absolute left-1/2 top-1/2 h-[350px] w-[350px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-green-400/10 blur-[120px]" />

  <div className="relative z-10 mx-auto max-w-5xl px-6">

    {/* HEADER */}
    <div className="text-center">

      <p className="mb-4 text-xs uppercase tracking-[0.45em] text-green-400">
        Support The Platform
      </p>

      <h2 className="text-4xl font-black text-white md:text-6xl">
        KEEP THE
        <span className="block text-green-400">
          MOVEMENT LIVE
        </span>
      </h2>

      <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-[#A9B7B7] md:text-lg">
        Help support server costs, live vote infrastructure,
        and continuous development of this platform.
      </p>

    </div>

    {/* DONATION CARD */}
<div className="mt-14 flex justify-center">

  {/* GCASH */}
  <div
    className="
      w-full
      max-w-md
      rounded-[28px]
      border
      border-green-400/15
      bg-[#041919]/80
      p-6
      backdrop-blur-xl
      shadow-[0_0_60px_rgba(0,255,170,0.06)]
    "
  >

    <p className="text-center text-xs uppercase tracking-[0.35em] text-green-400">
      GCash
    </p>

    <h3 className="mt-3 text-center text-3xl font-black text-white">
      Support via GCash
    </h3>

    {/* QR IMAGE */}
    <div className="mt-6 overflow-hidden rounded-2xl border border-green-400/10 bg-[#031212]">

      <img
        src="/gcash.jpg"
        alt="GCash QR"
        className="h-[260px] w-full object-contain p-4"
      />

    </div>

    {/* DOWNLOAD BUTTON */}
    <a
      href="/gcash.jpg"
      download
      className="
        mt-6
        inline-flex
        w-full
        items-center
        justify-center
        rounded-2xl
        bg-green-400
        px-5
        py-4
        font-bold
        text-black
        transition-all
        duration-300
        hover:scale-[1.02]
        hover:bg-green-300
      "
    >
      Download GCash QR
    </a>

  </div>

</div>

  </div>

</section>

    </main>
  );
}