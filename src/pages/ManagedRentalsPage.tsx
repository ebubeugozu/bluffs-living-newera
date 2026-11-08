import React, { useState } from 'react';
import { Home, Calendar, ShieldCheck, CheckCircle2, ChevronDown, ChevronUp, ArrowRight, Sparkles, Key } from 'lucide-react';
import { PageId } from '../types';
import { MANAGED_RENTALS_DATA, PROPERTY_STATS } from '../data/communityData';

interface ManagedRentalsPageProps {
  onNavigate: (page: PageId) => void;
  onScheduleTour: () => void;
}

export const ManagedRentalsPage: React.FC<ManagedRentalsPageProps> = ({
  onNavigate,
  onScheduleTour,
}) => {
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Is participation in the rental program mandatory?',
      a: 'No. Participation is 100% voluntary. Many residents choose full-time private occupancy. The program is designed solely for residents who wish to offset expenses when traveling or residing elsewhere seasonally.',
    },
    {
      q: 'How are community quiet hours and resident privacy safeguarded?',
      a: 'All guest stays require prior identity verification, agreement to community quiet hours (10:00 PM to 7:00 AM), Dark-Sky lighting covenants, and vehicle registration. Parties and commercial events are strictly prohibited.',
    },
    {
      q: 'What is the "Stay & Discover" program for prospective buyers?',
      a: 'Prospective residents considering a homesite lease or tiny home purchase may book a 2 to 4-night stay in a fully furnished model home. This allows you to experience the river breeze, trails, and quiet community rhythms before committing.',
    },
    {
      q: 'Are rental income or investment returns guaranteed?',
      a: 'No. The Bluffs does not guarantee rental occupancy, guest volume, or investment returns. The community is primarily residential in character.',
    },
  ];

  return (
    <div className="bg-[#F7F4EC] text-[#303630]">
      
      {/* HERO */}
      <section className="bg-[#183B2B] text-[#F7F4EC] py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#A6B49A]/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B28B5B]">
            Living Here · Flexibility
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-[#F7F4EC] text-balance">
            Managed Rentals & Stay & Discover
          </h1>
          <p className="text-base sm:text-lg text-[#D9D0BF] max-w-2xl mx-auto font-light leading-relaxed">
            Flexible home sharing options for seasonal residents and immersive discovery stays for prospective community members.
          </p>
        </div>
      </section>

      {/* CORE PROGRAMS SPLIT */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {MANAGED_RENTALS_DATA.map((prog) => (
            <div
              key={prog.id}
              className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#D9D0BF]/80 shadow-sm space-y-5 flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2.5 rounded-lg bg-[#183B2B] text-[#B28B5B]">
                    {prog.id === 'mr-program' ? <Key size={20} /> : <Home size={20} />}
                  </div>
                  <h3 className="font-serif text-2xl font-semibold text-[#183B2B]">
                    {prog.title}
                  </h3>
                </div>

                <p className="text-sm text-[#303630]/85 leading-relaxed font-sans">
                  {prog.summary}
                </p>

                <div className="pt-3 border-t border-[#D9D0BF]/50">
                  <span className="text-[10px] uppercase font-bold text-[#A6B49A] tracking-wider block mb-2">
                    Program Inclusions & Standards
                  </span>
                  <ul className="space-y-2">
                    {prog.benefits.map((b, idx) => (
                      <li key={idx} className="flex items-start gap-2 text-xs text-[#303630]/85">
                        <CheckCircle2 size={14} className="text-[#183B2B] shrink-0 mt-0.5" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="pt-4 border-t border-[#D9D0BF]/50">
                <button
                  onClick={onScheduleTour}
                  className="w-full py-2.5 bg-[#183B2B] hover:bg-[#10291F] text-[#F7F4EC] text-xs font-semibold tracking-wider uppercase rounded-md transition-colors"
                >
                  Inquire About This Program
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQS & DISCLAIMER */}
      <section className="py-16 bg-[#FFFFFF] border-t border-[#D9D0BF]/60">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          <div className="text-center space-y-2">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#183B2B]">
              Transparency & Guidelines
            </span>
            <h2 className="font-serif text-3xl font-semibold text-[#183B2B]">
              Managed Rental FAQs
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

          {/* Legal Compliance Disclaimer */}
          <div className="p-5 bg-[#F7F4EC] rounded-xl border border-[#D9D0BF]/80 text-xs text-[#303630]/75 space-y-1">
            <strong className="text-[#183B2B] block">Legal & Financial Notice:</strong>
            <p>
              The Bluffs at New Era is an intentional residential community and does not operate as an unmanaged commercial resort. All managed rentals are secondary to community covenants, architectural preservation, and resident peace. We do not provide financial projections or make promises regarding investment returns.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#183B2B] text-[#F7F4EC] text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold">
            Ready to Plan Your "Stay & Discover" Visit?
          </h2>
          <p className="text-sm text-[#D9D0BF]">
            Experience sunrise over the river from a completed tiny home. Contact our team to request current availability.
          </p>
          <button
            onClick={onScheduleTour}
            className="px-7 py-3 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer shadow-md"
          >
            Request Stay & Discover Dates
          </button>
        </div>
      </section>

    </div>
  );
};
