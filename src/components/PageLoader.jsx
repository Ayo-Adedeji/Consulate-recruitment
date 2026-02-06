import consulateLogo from '../assets/consulateLogo.png';

const PageLoader = () => {
  return (
    <div className="fixed inset-0 bg-white/95 backdrop-blur-sm z-[9999] flex items-center justify-center">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-azure/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse delay-700"></div>
      </div>

      {/* Logo with pulsing animation */}
      <div className="relative z-10 flex flex-col items-center">
        <div className="animate-logoPulse">
          <img 
            src={consulateLogo} 
            alt="Consulate Recruitment" 
            className="h-32 md:h-40 drop-shadow-2xl"
          />
        </div>
        
        {/* Loading text */}
        <div className="mt-8 flex items-center gap-2">
          <div className="flex gap-1">
            <div className="w-2 h-2 bg-azure rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-azureSoft rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
          </div>
          <p className="text-primary font-semibold text-lg ml-2">Loading</p>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
