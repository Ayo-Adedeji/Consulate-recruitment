const Marquee = () => {
  const text =
    "Jobs • Temporary & Permanent Roles • CV Writing & Interview Prep • Trusted Career Support • Apply Today • ";

  return (
    <div className="relative w-full overflow-hidden bg-primary text-white">
      {/* Edge fade */}
      <div
        className="pointer-events-none absolute inset-0 z-10
        [mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]
        [-webkit-mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
      />

      {/* Marquee track */}
      <div
        className="
          flex
          w-max
          h-16
          items-center
          animate-marqueeMedium
          hover:[animation-play-state:paused]
          text-sm
          sm:text-base
          lg:text-lg
          font-medium
        "
      >
        <span className="whitespace-nowrap pr-12">{text.repeat(4)}</span>
        <span className="whitespace-nowrap pr-12">{text.repeat(4)}</span>
      </div>
    </div>
  );
};

export default Marquee;
