import React from 'react';

const Marquee = () => {
  return (
    <div className="w-full overflow-hidden bg-primary text-white h-16 flex items-center">
      <div className="animate-scroll whitespace-nowrap text-sm sm:text-base lg:text-lg font-medium">
        Welcome to Consulate Recruitment Agency — your reliable staffing solutions, cleaning services and management consulting. Apply for jobs, get blog insight update and lots more. Call us today on 07786043535
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Welcome to Consulate Recruitment Agency — your reliable staffing solutions, cleaning services and management consulting. Apply for jobs, get blog insight update and lots more. Call us today on 07786043535
      </div>
      
      <style jsx>{`
        .animate-scroll {
          animation: scroll 20s linear infinite;
        }
        
        .animate-scroll:hover {
          animation-play-state: paused;
        }
        
        @keyframes scroll {
          from {
            transform: translateX(100%);
          }
          to {
            transform: translateX(-100%);
          }
        }
      `}</style>
    </div>
  );
};

export default Marquee;