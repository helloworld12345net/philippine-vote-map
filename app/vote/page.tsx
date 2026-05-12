"use client";

import { useState } from "react";

const regions = [
  "Region I",
  "CAR",
  "Region II",
  "Region III",
  "NCR",
  "Region IV-A",
  "Region IV-B",
  "Region V",
  "Region VI",
  "Region VII",
  "Region VIII",
  "Region IX",
  "Region X",
  "Region XI",
  "Region XII",
  "Region XIII",
  "BARMM",
];

export default function VotePage() {
  const [email, setEmail] = useState("");
  const [signature, setSignature] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [alreadyVoted, setAlreadyVoted] = useState(false);

  const handleVote = async () => {

    if (!email || !signature || !selectedRegion) {
      setMessage("Please complete all fields.");
      return;
    }

    try {

      setLoading(true);

      const res = await fetch("/api/vote", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          signature,
          region: selectedRegion,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong");
        return;
      }

      setAlreadyVoted(true);

      setMessage(`Vote submitted for ${selectedRegion}!`);

    } catch (error) {

      console.log(error);

      setMessage("Server error");

    } finally {

      setLoading(false);

    }
  };

  return (
    <main className="min-h-screen bg-[#031313] px-6 py-24 text-white">

      <div className="mx-auto max-w-2xl rounded-[40px] border border-green-400/20 bg-[#071919] p-12">

        <p className="mb-4 text-sm uppercase tracking-[0.4em] text-green-400">
          Voting Portal
        </p>

        <h1 className="text-5xl font-black">
          CAST YOUR
          <span className="block text-green-400">
            VOTE
          </span>
        </h1>

        <p className="mt-6 text-lg text-gray-400">
          Enter your details and select your Philippine region.
        </p>

        {alreadyVoted ? (

          <div className="mt-12 rounded-3xl border border-green-400/20 bg-[#041414] p-10 text-center">

            <h2 className="text-3xl font-bold text-green-400">
              Vote Recorded
            </h2>

            <p className="mt-4 text-lg text-gray-300">
              {message}
            </p>

          </div>

        ) : (

          <>

            {/* EMAIL */}
            <div className="mt-10">

              <label className="mb-4 block text-sm uppercase tracking-[0.3em] text-green-300">
                Email Address
              </label>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full rounded-2xl border border-green-400/20 bg-[#041414] p-5 text-white outline-none"
              />

            </div>

            {/* SIGNATURE */}
            <div className="mt-8">

              <label className="mb-4 block text-sm uppercase tracking-[0.3em] text-green-300">
                Full Name / Signature
              </label>

              <input
                type="text"
                value={signature}
                onChange={(e) => setSignature(e.target.value)}
                placeholder="Type your full name"
                className="w-full rounded-2xl border border-green-400/20 bg-[#041414] p-5 text-white outline-none"
              />

            </div>

            {/* REGION */}
            <div className="mt-8">

              <label className="mb-4 block text-sm uppercase tracking-[0.3em] text-green-300">
                Select Region
              </label>

              <select
                value={selectedRegion}
                onChange={(e) => setSelectedRegion(e.target.value)}
                className="w-full rounded-2xl border border-green-400/20 bg-[#041414] p-5 text-white outline-none"
              >

                <option value="">Choose Region</option>

                {regions.map((region) => (
                  <option key={region} value={region}>
                    {region}
                  </option>
                ))}

              </select>

            </div>

            {/* SUBMIT */}
            <button
              onClick={handleVote}
              disabled={loading}
              className="mt-10 w-full rounded-2xl bg-green-400 px-8 py-5 text-lg font-bold text-black transition hover:bg-green-300 disabled:opacity-50"
            >
              {loading ? "Submitting..." : "Submit Vote"}
            </button>

          </>

        )}

        {message && !alreadyVoted && (

          <div className="mt-8 rounded-2xl border border-green-400/20 bg-[#041414] p-5 text-center text-green-300">
            {message}
          </div>

        )}

      </div>

    </main>
  );
}
