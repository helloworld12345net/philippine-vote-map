"use client";

export default function ShareButtons() {
  const shareUrl = "https://voteforpeaceph.vercel.app/";
  const shareText =
    "Support peace and unity in the Philippines 🇵🇭 Vote now and share your voice!";

  const encodedUrl = encodeURIComponent(shareUrl);
  const encodedText = encodeURIComponent(shareText);

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
    whatsapp: `https://wa.me/?text=${encodedText}%20${encodedUrl}`,
    telegram: `https://t.me/share/url?url=${encodedUrl}&text=${encodedText}`,
  };

  const nativeShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: "Vote For Peace PH",
          text: shareText,
          url: shareUrl,
        });
      } catch (err) {
        console.log(err);
      }
    } else {
      window.open(shareLinks.facebook, "_blank");
    }
  };

  return (
    <div className="relative z-50 flex flex-col items-center gap-4 py-8">
      <h2 className="text-xl font-bold text-center">
        Share this movement 🇵🇭
      </h2>

      <button
        onClick={nativeShare}
        className="bg-white text-black px-6 py-3 rounded-full font-semibold hover:scale-105 transition"
      >
        Share Now
      </button>

      <div className="flex gap-4">
        <a
          href={shareLinks.facebook}
          target="_blank"
          className="bg-blue-600 px-4 py-2 rounded-full hover:scale-110 transition"
        >
          Facebook
        </a>

        <a
          href={shareLinks.whatsapp}
          target="_blank"
          className="bg-green-500 px-4 py-2 rounded-full hover:scale-110 transition"
        >
          WhatsApp
        </a>

        <a
          href={shareLinks.telegram}
          target="_blank"
          className="bg-cyan-500 px-4 py-2 rounded-full hover:scale-110 transition"
        >
          Telegram
        </a>
      </div>
    </div>
  );
}
