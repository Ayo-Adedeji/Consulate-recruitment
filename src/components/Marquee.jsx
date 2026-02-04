const Marquee = () => {
  const text = "Jobs • Temporary & Permanent Roles • Trusted Career Support • Apply Today • ";
  
  // Create one long continuous string with proper spacing
  const continuousText = Array.from({ length: 15 }, () => text).join("");

  return (
    <div className="w-full overflow-hidden bg-primary text-white">
      {/* Single continuous text string to avoid overlapping */}
      <div className="flex w-max h-16 items-center animate-marqueeMedium hover:[animation-play-state:paused] text-sm sm:text-base lg:text-lg font-medium">
        <span className="whitespace-nowrap">{continuousText}</span>
      </div>
    </div>
  );
};

export default Marquee;
