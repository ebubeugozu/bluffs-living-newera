import React, { useState } from 'react';
import {
  ShieldAlert,
  Droplets,
  Zap,
  Wifi,
  Trash2,
  Package,
  TreePine,
  Waves,
  HeartHandshake,
  Check,
  AlertCircle,
  HelpCircle,
} from 'lucide-react';
import { PageId } from '../types';
import { AMENITIES_DATA } from '../data/communityData';

interface AmenitiesPageProps {
  onNavigate: (page: PageId) => void;
}

export const AmenitiesPage: React.FC<AmenitiesPageProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'All Services & Amenities' },
    { id: 'utilities', label: 'Utilities & Convenience' },
    { id: 'services', label: 'Resident Stewardship' },
    { id: 'nature', label: 'Nature & Riverfront' },
    { id: 'emergency', label: 'Emergency Flight Staging' },
    { id: 'optional', label: 'Optional / Proposed Options' },
  ];

  const filteredAmenities = AMENITIES_DATA.filter((item) => {
    if (selectedCategory === 'all') return true;
    return item.category === selectedCategory;
  });

  return (
    <div className="bg-[#F7F4EC] text-[#303630]">
      
      {/* HEADER */}
      <section className="bg-[#183B2B] text-[#F7F4EC] py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#A6B49A]/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B28B5B]">
            Community Infrastructure & Services
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-[#F7F4EC] text-balance">
            Thoughtfully Considered. Naturally Enjoyed.
          </h1>
          <p className="text-base sm:text-lg text-[#D9D0BF] max-w-2xl mx-auto font-light leading-relaxed">
            Essential everyday conveniences seamlessly integrated into 140 acres of private Tennessee woodland and riverfront.
          </p>
        </div>
      </section>

      {/* CATEGORY FILTER BAR */}
      <section className="sticky top-[69px] z-20 bg-[#F7F4EC]/95 backdrop-blur-md border-b border-[#D9D0BF]/60 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center overflow-x-auto gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 text-xs font-semibold rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat.id
                  ? 'bg-[#183B2B] text-[#F7F4EC] shadow-sm'
                  : 'bg-[#FFFFFF] text-[#303630] border border-[#D9D0BF]/70 hover:bg-[#F7F4EC]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* AMENITIES GRID */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredAmenities.map((amenity) => (
            <div
              key={amenity.id}
              className={`bg-[#FFFFFF] rounded-xl border p-7 flex flex-col justify-between shadow-sm transition-all hover:shadow-md ${
                !amenity.included
                  ? 'border-dashed border-[#B28B5B]/60 bg-[#FFFFFF]/90'
                  : amenity.category === 'emergency'
                  ? 'border-[#B28B5B]/80'
                  : 'border-[#D9D0BF]/80'
              }`}
            >
              <div>
                {/* Header with status badge */}
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] uppercase font-bold tracking-wider text-[#A6B49A]">
                    {amenity.category.toUpperCase()}
                  </span>
                  
                  {amenity.included ? (
                    <span className="text-[11px] font-semibold text-[#183B2B] bg-[#A6B49A]/20 px-2.5 py-0.5 rounded">
                      Included with Homesite
                    </span>
                  ) : (
                    <span className="text-[11px] font-semibold text-[#B28B5B] bg-[#B28B5B]/15 px-2.5 py-0.5 rounded">
                      {amenity.badge || 'Optional / Future'}
                    </span>
                  )}
                </div>

                <h3 className="font-serif text-2xl font-semibold text-[#183B2B] mb-2 leading-snug">
                  {amenity.title}
                </h3>

                <p className="text-xs text-[#303630]/80 leading-relaxed mb-5">
                  {amenity.summary}
                </p>

                {/* Details list */}
                <ul className="space-y-2 border-t border-[#D9D0BF]/40 pt-4 text-xs text-[#303630]/85">
                  {amenity.details.map((detail, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#183B2B] mt-1.5 shrink-0" />
                      <span>{detail}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Optional/Proposed Disclaimer on card */}
              {!amenity.included && (
                <div className="mt-6 pt-3 border-t border-dashed border-[#B28B5B]/40 text-[11px] text-[#303630]/70 italic">
                  Note: Optional amenities are planned additions and are not guaranteed or included in standard baseline homesite leases.
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* DEDICATED EMERGENCY & MEDICAL FLIGHT DISCLAIMER SECTION */}
      <section className="py-16 bg-[#183B2B] text-[#F7F4EC] border-t border-[#A6B49A]/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex items-start gap-4 p-6 bg-[#10291F] rounded-xl border border-[#B28B5B]/40">
            <ShieldAlert size={28} className="text-[#B28B5B] shrink-0 mt-1" />
            <div className="space-y-2 text-xs leading-relaxed text-[#D9D0BF]">
              <h3 className="font-serif text-lg font-semibold text-[#F7F4EC]">
                Emergency Air Transport Staging & LifeFlight Information
              </h3>
              <p>
                The Bluffs maintains a designated, level concrete helipad meeting standard rotorcraft safety envelopes to serve as an emergency flight staging and landing zone for regional emergency services and medical helicopters.
              </p>
              <p className="font-medium text-[#F7F4EC]">
                Mandatory Safety Disclaimer: The presence of an onsite helipad facilitates emergency medical air transport operations when dispatched by emergency personnel. It does NOT guarantee emergency medical response times, weather flight clearances, or hospital admission, and does NOT replace calling 911 or local emergency medical services. Optional LifeFlight membership is an air medical membership program and does not substitute for comprehensive primary medical insurance or county emergency responders.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#183B2B]">
          Have Specific Questions About Utilities or Pad Readiness?
        </h2>
        <p className="text-sm text-[#303630]/80 max-w-xl mx-auto leading-relaxed">
          Our team can provide detailed electrical connection schematics, water pressure ratings, and tiny-home build certifications accepted at The Bluffs.
        </p>
        <button
          onClick={() => onNavigate('request-info')}
          className="px-7 py-3 bg-[#183B2B] hover:bg-[#10291F] text-[#F7F4EC] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer"
        >
          Request Technical Specifications
        </button>
      </section>

    </div>
  );
};
