import React from "react";

const Youtube = () => {
  return (
    <section className="relative py-16 md:py-24 bg-footer overflow-hidden">
      
      {/* Decorative blobs */}
      <div className="absolute -top-32 -left-32 w-96 h-96 bg-indigo-300/20 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-32 -right-32 w-96 h-96 bg-purple-300/20 rounded-full blur-3xl"></div>

      <div className="relative max-w-7xl mx-auto px-4 md:px-6">
        
        {/* Center the video container and make it 70% width with responsive adjustments */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-[90%] sm:max-w-[80%] md:max-w-[70%] overflow-hidden">
            
            {/* Maintain 16:9 aspect ratio */}
            <div className="relative pb-[56.25%] h-0">
              <iframe
                className="absolute inset-0 w-full h-full rounded-lg shadow-lg"
                src="https://www.youtube.com/embed/RhV8N4PQwgk"
                title="Consulate Recruitment Advert"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default Youtube;
