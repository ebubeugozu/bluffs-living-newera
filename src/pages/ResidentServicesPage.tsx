import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, Calendar, ArrowRight, Wrench, Sparkles, Droplets, Zap } from 'lucide-react';
import { PageId } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { RESIDENT_SERVICES_DATA } from '../data/communityData';

interface ResidentServicesPageProps {
  onNavigate: (page: PageId) => void;
  onScheduleTour: () => void;
}

export const ResidentServicesPage: React.FC<ResidentServicesPageProps> = ({
  onNavigate,
  onScheduleTour,
}) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Who performs road grading and winter snow or storm maintenance?',
      a: 'The Bluffs employs full-time dedicated grounds stewards equipped with heavy grading and maintenance machinery to keep all private internal roads, ditches, and trail corridors pristine year-round.',
    },
    {
      q: 'How does package delivery work for residents?',
      a: 'USPS, UPS, FedEx, and Amazon deliver daily to the secure parcel lockers at our Gated Resident Stewardship Center at the entrance.',
    },
    {
      q: 'Can residents leave for seasonal travel with peace of mind?',
      a: 'Yes. Our Home Stewardship Program offers regular exterior visual inspections, winterization checks, and authorized contractor escorts for extended resident absences.',
    },
    {
      q: 'Are high-speed internet outages addressed quickly?',
      a: 'Yes. Our dedicated commercial rural fiber partner provides prioritized business-class SLA support for all residential drops at The Bluffs.',
    },
  ];

  return (
    <div className="bg-[#F7F4EC] text-[#303630]">
      
      {/* HERO */}
      <section className="bg-[#183B2B] text-[#F7F4EC] py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#A6B49A]/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B28B5B]">
            Living Here · Stewardship
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-[#F7F4EC] text-balance">
            Resident Services & Support
          </h1>
          <p className="text-base sm:text-lg text-[#D9D0BF] max-w-2xl mx-auto font-light leading-relaxed">
            Quiet, unobtrusive property management and dedicated community care so you can focus entirely on enjoying life in nature.
          </p>
        </div>
      </section>

      {/* CORE SERVICES GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {RESIDENT_SERVICES_DATA.map((srv) => (
            <div
              key={srv.id}
              className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#D9D0BF]/80 shadow-sm space-y-4"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-lg bg-[#183B2B] text-[#B28B5B]">
                  <Wrench size={20} />
                </div>
                <h3 className="font-serif text-2xl font-semibold text-[#183B2B]">
                  {srv.title}
                </h3>
              </div>

              <p className="text-sm text-[#303630]/80 leading-relaxed font-sans">
                {srv.summary}
              </p>

              <div className="pt-3 border-t border-[#D9D0BF]/50">
                <span className="text-[10px] uppercase font-bold text-[#A6B49A] tracking-wider block mb-2">
                  Service Inclusions
                </span>
                <ul className="space-y-2">
                  {srv.highlights.map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-[#303630]/85">
                      <CheckCircle2 size={14} className="text-[#183B2B] shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQS SECTION */}
      <section className="py-16 bg-[#FFFFFF] border-t border-[#D9D0BF]/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#183B2B]">
              Questions & Answers
            </span>
            <h2 className="font-serif text-3xl font-semibold text-[#183B2B]">
              Resident Services FAQ
            </h2>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div key={idx} className="border border-[#D9D0BF]/80 rounded-xl overflow-hidden">
                <button
                  onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-semibold text-sm text-[#183B2B] flex items-center justify-between hover:bg-[#F7F4EC] transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  {expandedFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                </button>
                {expandedFaq === idx && (
                  <div className="p-5 pt-0 text-xs sm:text-sm text-[#303630]/80 leading-relaxed bg-[#F7F4EC]/40">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#183B2B] text-[#F7F4EC] text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold">
            Experience Hassle-Free Living in Nature
          </h2>
          <p className="text-sm text-[#D9D0BF]">
            Speak with our community stewardship team to understand lease inclusions, HOA services, and utility setup.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onScheduleTour}
              className="px-7 py-3 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer"
            >
              Schedule a Private Tour
            </button>
            <button
              onClick={() => onNavigate('properties')}
              className="px-7 py-3 border border-[#A6B49A]/40 text-[#F7F4EC] hover:bg-[#10291F] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer"
            >
              Browse Available Homesites
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
