import { Mail, ExternalLink } from 'lucide-react';

const services = [
  'Business Websites',
  'Landing Pages',
  'Portfolio Websites',
  'E-commerce Websites',
  'Website Redesign',
  'Mobile App Development',
];

const CodeOfSolomonBanner = () => {
  return (
    <section className="py-12 px-4 bg-[#1F3A5F]">
      <div className="max-w-6xl mx-auto">

        {/* Sponsored label */}
        <div className="flex justify-end mb-4">
          <span className="text-xs font-semibold uppercase tracking-widest text-white/30 border border-white/15 px-3 py-1 rounded-full">
            Sponsored
          </span>
        </div>

        <div className="border border-white/10 rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 lg:grid-cols-2">

            {/* Left — brand info */}
            <div className="p-8 md:p-10 border-b lg:border-b-0 lg:border-r border-white/10">
              {/* Gold accent line */}
              <div className="w-10 h-1 bg-accent rounded-full mb-6"></div>

              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3 font-heading">
                Code of Solomon
              </h3>
              <p className="text-white/70 text-base leading-relaxed mb-6">
                Building fast, responsive websites and mobile apps that help your business grow online.
              </p>

              {/* Service tags */}
              <div className="flex flex-wrap gap-2">
                {services.map((service) => (
                  <span
                    key={service}
                    className="text-xs font-medium px-3 py-1.5 rounded-full bg-white/8 text-white/80 border border-white/15 hover:border-accent/50 hover:text-white transition-colors duration-200"
                  >
                    {service}
                  </span>
                ))}
              </div>
            </div>

            {/* Right — CTA */}
            <div className="p-8 md:p-10 flex flex-col justify-between gap-8">
              <div>
                <p className="text-white/50 text-xs uppercase tracking-widest font-semibold mb-3">Get in touch</p>
                <div className="space-y-3">
                  <a
                    href="https://wa.me/2349031978634"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/15 flex items-center justify-center group-hover:border-accent/50 transition-colors">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                      </svg>
                    </div>
                    +234 903 197 8634
                  </a>
                  <a
                    href="mailto:dasammayo@gmail.com"
                    className="flex items-center gap-3 text-white/70 hover:text-white transition-colors text-sm group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-white/8 border border-white/15 flex items-center justify-center group-hover:border-accent/50 transition-colors">
                      <Mail className="w-4 h-4" />
                    </div>
                    dasammayo@gmail.com
                  </a>
                </div>
              </div>

              <a
                href="mailto:dasammayo@gmail.com"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 bg-accent text-white font-semibold text-sm rounded-xl hover:bg-yellow-500 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 w-full sm:w-auto"
              >
                Contact Us <ExternalLink className="w-4 h-4" />
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default CodeOfSolomonBanner;
