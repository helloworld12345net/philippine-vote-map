"use client";

type Props = {
  className?: string;
};

export default function PhilippinesSVG({
  className = "",
}: Props) {
  return (
    <div
      className={`
        absolute inset-0
        flex items-center justify-center
        overflow-hidden
        ${className}
      `}
    >
     <img
  src="/philippines.svg"
  alt="Philippines Map"
  className="
    absolute
    left-1/2
    top-1/2

    w-[145%]
    sm:w-[120%]
    lg:w-[100%]

    max-w-none

    -translate-x-1/2
    -translate-y-1/2

    opacity-80
    select-none
    pointer-events-none

    drop-shadow-[0_0_40px_rgba(0,255,170,0.12)]
  "
/>
    </div>
  );
}