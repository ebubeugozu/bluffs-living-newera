import React, { useState } from 'react';
import {
  FileText,
  Download,
  ChevronLeft,
  ChevronRight,
  Maximize2,
  CheckCircle2,
  Layers,
  ArrowRight,
  X,
} from 'lucide-react';
import { PageId } from '../types';
import { PITCH_DECK_SLIDES, PROPERTY_STATS } from '../data/communityData';

interface PitchDeckPageProps {
  onNavigate: (page: PageId) => void;
}

export const PitchDeckPage: React.FC<PitchDeckPageProps> = ({ onNavigate }) => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);

  const currentSlide = PITCH_DECK_SLIDES[currentSlideIndex];

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev < PITCH_DECK_SLIDES.length - 1 ? prev + 1 : 0));
  };

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : PITCH_DECK_SLIDES.length - 1));
  };

  const handleDownloadDeck = () => {
    const textContent = `THE BLUFFS AT NEW ERA - COMMUNITY OVERVIEW & PITCH DECK PROSPECTUS
Linden, Perry County, Tennessee
Official Website: https://bluffsnewera.com | Contact: Info@bluffsnewera.com

KEY VERIFIED METRICS:
- Total Property Acreage: Approximately 140 contiguous acres
- Tennessee River Frontage: Approximately 1/2 mile of natural shoreline
- Homesite Pad Footprints: 6,000+ square feet with underground city utilities & fiber
- Community Scale: Intimate 30+ resident community
- Emergency Support: Onsite certified helipad for LifeFlight medical air transport staging

SLIDE DECK OUTLINE:
${PITCH_DECK_SLIDES.map(
  (s) => `
SLIDE ${s.slideNumber}: ${s.title.toUpperCase()}
Subtitle: ${s.subtitle}
Key Highlight: ${s.highlightMetric ? `${s.highlightMetric.value} - ${s.highlightMetric.label}` : 'N/A'}
Core Elements:
${s.bulletPoints.map((b) => `  * ${b}`).join('\n')}
Executive Summary:
${s.narrative}
----------------------------------------------------------------------`
).join('\n')}

For leasing inquiries, homesite reservations, and private property visits:
Email: Info@bluffsnewera.com
`;

    const blob = new Blob([textContent], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'The_Bluffs_at_New_Era_Community_Overview_Pitch_Deck.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-[#F7F4EC] text-[#303630]">
      
      {/* HEADER */}
      <section className="bg-[#183B2B] text-[#F7F4EC] py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#A6B49A]/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B28B5B]">
            Official Community Prospectus
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-[#F7F4EC] text-balance">
            Discover the Community.
          </h1>
          <p className="text-base sm:text-lg text-[#D9D0BF] max-w-2xl mx-auto font-light leading-relaxed">
            Explore the vision, property, amenities, and opportunities that make The Bluffs at New Era unique.
          </p>
        </div>
      </section>

      {/* PITCH DECK SLIDE VIEWER SECTION */}
      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP TOOLBAR */}
        <div className="flex items-center justify-between gap-4 mb-6 bg-[#FFFFFF] p-4 rounded-xl border border-[#D9D0BF]/70 shadow-sm">
          <div className="flex items-center gap-2">
            <Layers size={18} className="text-[#183B2B]" />
            <span className="text-xs font-semibold uppercase tracking-wider text-[#183B2B]">
              Slide {currentSlideIndex + 1} of {PITCH_DECK_SLIDES.length}
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsFullscreen(true)}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs text-[#183B2B] hover:bg-[#F7F4EC] rounded transition-colors cursor-pointer"
            >
              <Maximize2 size={14} />
              <span className="hidden sm:inline">Fullscreen Mode</span>
            </button>

            <button
              onClick={handleDownloadDeck}
              className="flex items-center gap-1.5 px-4 py-2 bg-[#183B2B] hover:bg-[#10291F] text-[#F7F4EC] text-xs font-semibold rounded transition-colors cursor-pointer"
            >
              <Download size={14} />
              <span>Download Overview</span>
            </button>
          </div>
        </div>

        {/* PRIMARY SLIDE DISPLAY CARD */}
        <div className="bg-[#183B2B] text-[#F7F4EC] rounded-2xl border border-[#A6B49A]/30 p-8 sm:p-14 shadow-2xl relative min-h-[500px] flex flex-col justify-between overflow-hidden">
          
          {/* Subtle background graphic */}
          <div className="absolute right-0 bottom-0 opacity-5 pointer-events-none select-none">
            <span className="font-serif text-[180px] font-bold text-[#F7F4EC]">
              0{currentSlide.slideNumber}
            </span>
          </div>

          <div>
            {/* Slide kicker */}
            <div className="flex items-center justify-between gap-4 border-b border-[#A6B49A]/20 pb-4 mb-8">
              <span className="text-xs font-mono uppercase tracking-widest text-[#B28B5B]">
                THE BLUFFS PROSPECTUS · SLIDE 0{currentSlide.slideNumber}
              </span>
              <span className="text-xs text-[#A6B49A] font-sans">
                Linden, Perry County, TN
              </span>
            </div>

            {/* Slide title & subtitle */}
            <div className="max-w-3xl mb-8 space-y-2">
              <h2 className="font-serif text-3xl sm:text-5xl font-semibold tracking-tight text-[#F7F4EC]">
                {currentSlide.title}
              </h2>
              <p className="text-sm sm:text-base text-[#B28B5B] font-medium">
                {currentSlide.subtitle}
              </p>
            </div>

            {/* Slide Main Content Split */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Bullet points */}
              <div className="lg:col-span-8 space-y-3.5">
                <ul className="space-y-3">
                  {currentSlide.bulletPoints.map((pt, idx) => (
                    <li key={idx} className="flex items-start gap-3 text-xs sm:text-sm text-[#D9D0BF] leading-relaxed">
                      <span className="w-2 h-2 rounded-full bg-[#B28B5B] mt-1.5 shrink-0" />
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>

                {/* Narrative prose */}
                <div className="pt-6 border-t border-[#A6B49A]/15 text-xs sm:text-sm text-[#F7F4EC] italic leading-relaxed">
                  "{currentSlide.narrative}"
                </div>
              </div>

              {/* Highlight KPI Callout */}
              {currentSlide.highlightMetric && (
                <div className="lg:col-span-4 bg-[#10291F] p-6 rounded-xl border border-[#A6B49A]/20 text-center space-y-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#A6B49A] block">
                    Verified Metric
                  </span>
                  <div className="font-serif text-3xl sm:text-4xl font-bold text-[#F7F4EC] tabular-nums">
                    {currentSlide.highlightMetric.value}
                  </div>
                  <div className="text-xs text-[#D9D0BF]">
                    {currentSlide.highlightMetric.label}
                  </div>
                </div>
              )}

            </div>
          </div>

          {/* SLIDE CONTROLS STRIP */}
          <div className="pt-8 mt-8 border-t border-[#A6B49A]/20 flex items-center justify-between">
            <button
              onClick={handlePrev}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#10291F] hover:bg-[#143224] text-xs text-[#F7F4EC] transition-colors cursor-pointer"
            >
              <ChevronLeft size={16} />
              <span className="hidden sm:inline">Previous Slide</span>
            </button>

            {/* Slide Dots */}
            <div className="flex items-center gap-2">
              {PITCH_DECK_SLIDES.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentSlideIndex(idx)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    currentSlideIndex === idx ? 'w-6 bg-[#B28B5B]' : 'w-2 bg-[#A6B49A]/30 hover:bg-[#A6B49A]'
                  }`}
                  aria-label={`Jump to slide ${idx + 1}`}
                />
              ))}
            </div>

            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-4 py-2 rounded-md bg-[#B28B5B] hover:bg-[#c29865] text-xs font-semibold text-[#10291F] transition-colors cursor-pointer"
            >
              <span className="hidden sm:inline">Next Slide</span>
              <ChevronRight size={16} />
            </button>
          </div>

        </div>

      </section>

      {/* FULLSCREEN MODAL OVERLAY */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-[#10291F] p-6 sm:p-12 flex flex-col justify-between animate-fadeIn text-[#F7F4EC]">
          <div className="flex items-center justify-between border-b border-[#A6B49A]/20 pb-4">
            <span className="font-serif text-xl font-bold">THE BLUFFS AT NEW ERA · PROSPECTUS</span>
            <button
              onClick={() => setIsFullscreen(false)}
              className="p-2 text-[#A6B49A] hover:text-[#FFFFFF]"
            >
              <X size={24} />
            </button>
          </div>

          <div className="max-w-4xl mx-auto space-y-6 text-center my-auto">
            <span className="text-xs font-mono uppercase tracking-widest text-[#B28B5B]">
              SLIDE 0{currentSlide.slideNumber} OF 0{PITCH_DECK_SLIDES.length}
            </span>
            <h2 className="font-serif text-4xl sm:text-6xl font-semibold">{currentSlide.title}</h2>
            <p className="text-lg text-[#B28B5B]">{currentSlide.subtitle}</p>

            <ul className="space-y-3 max-w-2xl mx-auto text-left pt-4">
              {currentSlide.bulletPoints.map((pt, idx) => (
                <li key={idx} className="flex items-start gap-3 text-base text-[#D9D0BF]">
                  <span className="w-2 h-2 rounded-full bg-[#B28B5B] mt-2 shrink-0" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>

            <div className="pt-6 text-sm text-[#F7F4EC] italic max-w-xl mx-auto">
              "{currentSlide.narrative}"
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-[#A6B49A]/20 pt-4">
            <button
              onClick={handlePrev}
              className="px-6 py-2.5 rounded bg-[#183B2B] text-xs font-semibold text-[#F7F4EC]"
            >
              Previous Slide
            </button>
            <div className="text-xs text-[#A6B49A]">Slide {currentSlideIndex + 1} of {PITCH_DECK_SLIDES.length}</div>
            <button
              onClick={handleNext}
              className="px-6 py-2.5 rounded bg-[#B28B5B] text-xs font-semibold text-[#10291F]"
            >
              Next Slide
            </button>
          </div>
        </div>
      )}

      {/* CALL TO ACTION */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#183B2B]">
          Ready to Take the Next Step?
        </h2>
        <p className="text-sm text-[#303630]/80 max-w-xl mx-auto leading-relaxed">
          Connect directly with our community director to discuss homesite reservations, tour dates, and application review.
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('request-info')}
            className="w-full sm:w-auto px-7 py-3 border border-[#183B2B] text-[#183B2B] hover:bg-[#183B2B] hover:text-[#F7F4EC] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer"
          >
            Request Information
          </button>
          <button
            onClick={() => onNavigate('apply')}
            className="w-full sm:w-auto px-7 py-3 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer"
          >
            Apply to The Bluffs
          </button>
        </div>
      </section>

    </div>
  );
};
