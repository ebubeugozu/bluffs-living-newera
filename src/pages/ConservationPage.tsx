import React, { useState } from 'react';
import { ShieldCheck, Download, FileText, CheckCircle2, ChevronDown, ChevronUp, Eye, Trees, Waves } from 'lucide-react';
import { PageId } from '../types';
import { CONSERVATION_TOPICS } from '../data/communityData';

interface ConservationPageProps {
  onNavigate: (page: PageId) => void;
}

export const ConservationPage: React.FC<ConservationPageProps> = ({ onNavigate }) => {
  const [expandedTopic, setExpandedTopic] = useState<string | null>('watershed');
  const [showDocumentPreview, setShowDocumentPreview] = useState(false);

  const handleDownloadStudy = () => {
    const documentText = `THE BLUFFS AT NEW ERA - CONSERVATION STUDY SUMMARY & ENVIRONMENTAL STEWARDSHIP PLAN
Linden, Perry County, Tennessee
Approx. 140 Contiguous Acres | Half-Mile Tennessee River Frontage

1. EXECUTIVE SUMMARY:
This conservation overview inventories the natural resources, sensitive bluffs, and wildlife corridors across the 140-acre tract in Linden, TN. All site work adheres strictly to minimal ground disturbance and native canopy preservation.

2. KEY FINDINGS:
- Riparian Buffer: Mandatory 100-foot native vegetation corridor along the half-mile Tennessee River frontage to prevent erosion and filter runoff.
- Mature Hardwood Ridge: Over 85% of contiguous forest remains intact; road layout avoids high-value old-growth white oaks and hickories.
- Bald Eagle Territory: Verified active eagle nesting territory along the western bluffs protected by a 330-ft seasonal disturbance buffer.
- Dark Sky Preservation: Strict shielded lighting covenants to preserve nocturnal wildlife navigation and dark night skies.

For full technical documentation, contact: Info@bluffsnewera.com`;

    const blob = new Blob([documentText], { type: 'text/plain;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'The_Bluffs_at_New_Era_Conservation_Study_Summary.txt';
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
            Environmental Stewardship & Study
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-[#F7F4EC] text-balance">
            Preserving the Land. Respecting the Landscape.
          </h1>
          <p className="text-base sm:text-lg text-[#D9D0BF] max-w-2xl mx-auto font-light leading-relaxed">
            The foundation of The Bluffs at New Era rests on thorough environmental analysis, watershed protection, and sensitive development across 140 acres.
          </p>
        </div>
      </section>

      {/* INTRODUCTION TO THE CONSERVATION STUDY */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#FFFFFF] p-8 sm:p-10 rounded-2xl border border-[#D9D0BF]/70 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#D9D0BF]/40 pb-6">
            <div>
              <span className="text-xs uppercase tracking-wider font-semibold text-[#B28B5B] block mb-1">
                Document Overview
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#183B2B]">
                The Bluffs Comprehensive Conservation Baseline
              </h2>
            </div>
            
            <button
              onClick={handleDownloadStudy}
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-[#183B2B] hover:bg-[#10291F] text-[#F7F4EC] text-xs font-semibold tracking-wider uppercase rounded-md transition-colors cursor-pointer self-start sm:self-auto shrink-0"
            >
              <Download size={14} />
              <span>Download Summary</span>
            </button>
          </div>

          <p className="text-sm sm:text-base text-[#303630]/85 font-sans leading-relaxed">
            Before any road grading or pad engineering commenced, a comprehensive conservation assessment was commissioned to evaluate topography, watershed flow toward the Tennessee River, forest age structure, and sensitive avian habitats.
          </p>

          <p className="text-sm text-[#303630]/80 font-sans leading-relaxed">
            The study established non-negotiable building envelopes and conservation covenants. Rather than leveling the terrain, our development footprint preserves the natural micro-watersheds and places all homesite pads on gentle natural contours with permeable foundations.
          </p>
        </div>
      </section>

      {/* FOUR STUDY FINDINGS SECTIONS */}
      <section className="py-8 pb-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <h3 className="font-serif text-2xl font-semibold text-[#183B2B] mb-6">
          Key Ecological Study Focus Areas
        </h3>

        <div className="space-y-4">
          {CONSERVATION_TOPICS.map((topic) => {
            const isExpanded = expandedTopic === topic.id;

            return (
              <div
                key={topic.id}
                className="bg-[#FFFFFF] rounded-xl border border-[#D9D0BF]/80 overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => setExpandedTopic(isExpanded ? null : topic.id)}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-[#F7F4EC]/50 transition-colors cursor-pointer"
                >
                  <div className="flex-1">
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B28B5B] block mb-1">
                      Conservation Protocol
                    </span>
                    <h4 className="font-serif text-xl sm:text-2xl font-medium text-[#183B2B]">
                      {topic.title}
                    </h4>
                    <p className="text-xs sm:text-sm text-[#303630]/75 mt-1">
                      {topic.summary}
                    </p>
                  </div>
                  <div className="p-2 text-[#183B2B]">
                    {isExpanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                </button>

                {isExpanded && (
                  <div className="px-6 pb-6 pt-2 border-t border-[#D9D0BF]/40 space-y-4 animate-fadeIn">
                    <span className="text-xs uppercase tracking-wider font-semibold text-[#183B2B] block">
                      Study Findings & Data
                    </span>
                    <ul className="space-y-2.5">
                      {topic.findings.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-[#303630]/85 leading-relaxed">
                          <CheckCircle2 size={16} className="text-[#183B2B] shrink-0 mt-0.5" />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>

                    <div className="p-4 bg-[#F7F4EC] rounded-lg border border-[#D9D0BF]/60 text-xs">
                      <strong className="text-[#183B2B] block mb-1">Covenant Policy:</strong>
                      <span className="text-[#303630]/80">{topic.recommendation}</span>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* DOCUMENT VIEWER & CALL TO ACTION */}
      <section className="py-16 bg-[#10291F] text-[#F7F4EC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#183B2B] text-xs text-[#B28B5B]">
            <FileText size={14} />
            <span>Official Study Records</span>
          </div>

          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#F7F4EC]">
            Request Full Technical Study Documentation
          </h2>
          <p className="text-sm text-[#D9D0BF] max-w-xl mx-auto leading-relaxed">
            Prospective residents and ecological partners are invited to inspect the complete environmental baseline report, soil test logs, and forestry management schedule.
          </p>

          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('request-info')}
              className="px-6 py-3 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer"
            >
              Request Environmental Documentation
            </button>
            <button
              onClick={() => onNavigate('map')}
              className="px-6 py-3 border border-[#A6B49A]/40 text-[#F7F4EC] hover:bg-[#183B2B] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer"
            >
              View Conservation Zones on Map
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
