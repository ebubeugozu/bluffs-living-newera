import React, { useState } from 'react';
import {
  MapPin,
  Car,
  Plane,
  HeartPulse,
  Compass,
  ArrowUpRight,
  ShieldAlert,
  Info,
  Waves,
} from 'lucide-react';
import { PageId, DestinationDistance } from '../types';
import { DISTANCES_DATA } from '../data/communityData';

interface TransportationPageProps {
  onNavigate: (page: PageId) => void;
}

export const TransportationPage: React.FC<TransportationPageProps> = ({ onNavigate }) => {
  const [filterCat, setFilterCat] = useState<string>('all');

  const filteredDistances = DISTANCES_DATA.filter((item) => {
    if (filterCat === 'all') return true;
    return item.category === filterCat;
  });

  return (
    <div className="bg-[#F7F4EC] text-[#303630]">
      
      {/* HEADER */}
      <section className="bg-[#183B2B] text-[#F7F4EC] py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#A6B49A]/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B28B5B]">
            Regional Connectivity & Travel
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-[#F7F4EC] text-balance">
            Connected to What Matters. Surrounded by What Matters More.
          </h1>
          <p className="text-base sm:text-lg text-[#D9D0BF] max-w-2xl mx-auto font-light leading-relaxed">
            Situated in Linden, Tennessee—quiet enough for uninterrupted tranquility, yet accessible to regional medical care, supplies, and airports.
          </p>
        </div>
      </section>

      {/* REGIONAL ROUTE OVERVIEW STRIP */}
      <section className="py-12 bg-[#FFFFFF] border-b border-[#D9D0BF]/60 px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 text-xs">
          <div className="p-4 bg-[#F7F4EC] rounded-lg border border-[#D9D0BF]/60 space-y-1">
            <span className="font-semibold text-[#183B2B] uppercase tracking-wide block">Primary Driving Route</span>
            <p className="text-[#303630]/80">
              Accessed directly via State Route 13 and Highway 412 connecting east toward I-40 and west toward the Tennessee River valley.
            </p>
          </div>
          <div className="p-4 bg-[#F7F4EC] rounded-lg border border-[#D9D0BF]/60 space-y-1">
            <span className="font-semibold text-[#183B2B] uppercase tracking-wide block">Local County Seat</span>
            <p className="text-[#303630]/80">
              Historic Linden, TN is located 7 miles (11 minutes) east, providing everyday groceries, post office, dining, and hardware.
            </p>
          </div>
          <div className="p-4 bg-[#F7F4EC] rounded-lg border border-[#D9D0BF]/60 space-y-1">
            <span className="font-semibold text-[#183B2B] uppercase tracking-wide block">Waterway Proximity</span>
            <p className="text-[#303630]/80">
              The property directly fronts the Tennessee River with public full-service boat ramps located within an 8-minute drive.
            </p>
          </div>
        </div>
      </section>

      {/* DESTINATIONS & DISTANCES GRID */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Category filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#183B2B]">
              Verified Driving Times & Distances
            </h2>
            <p className="text-xs text-[#303630]/70 mt-1">
              Distances calculated from The Bluffs entrance gate in Linden, TN.
            </p>
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto">
            {[
              { id: 'all', label: 'All Destinations' },
              { id: 'town', label: 'Towns & Cities' },
              { id: 'recreation', label: 'Water & Parks' },
              { id: 'medical', label: 'Medical Facilities' },
              { id: 'airport', label: 'Airports' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setFilterCat(cat.id)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-md transition-colors cursor-pointer ${
                  filterCat === cat.id
                    ? 'bg-[#183B2B] text-[#F7F4EC]'
                    : 'bg-[#FFFFFF] text-[#303630] border border-[#D9D0BF]/70 hover:bg-[#F7F4EC]'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Distance Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDistances.map((dest, idx) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] p-6 rounded-xl border border-[#D9D0BF]/80 flex flex-col justify-between shadow-sm hover:shadow-md transition-all"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#B28B5B]">
                    {dest.category.toUpperCase()}
                  </span>
                  
                  <div className="text-right">
                    <span className="font-serif text-xl font-bold text-[#183B2B] tabular-nums">
                      {dest.driveTimeMins}
                    </span>
                    <span className="text-xs text-[#303630]/75 ml-1">mins</span>
                  </div>
                </div>

                <h3 className="font-serif text-xl font-semibold text-[#183B2B] mb-1">
                  {dest.name}
                </h3>

                <div className="text-xs text-[#A6B49A] font-semibold mb-3">
                  {dest.distanceMiles} Miles via Highway Corridor
                </div>

                <p className="text-xs text-[#303630]/80 leading-relaxed">
                  {dest.description}
                </p>
              </div>

              {dest.directionsUrl && (
                <div className="mt-5 pt-3 border-t border-[#D9D0BF]/40">
                  <a
                    href={dest.directionsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#183B2B] hover:text-[#B28B5B] transition-colors"
                  >
                    <span>View Driving Directions</span>
                    <ArrowUpRight size={13} />
                  </a>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* SCATS CLIENT-SUPPLIED REFERENCE PLACEHOLDER */}
        <div className="mt-12 p-6 bg-[#FFFFFF] rounded-xl border border-dashed border-[#A6B49A] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#183B2B]">
            <Info size={16} className="text-[#B28B5B]" />
            <span>Client Reference Note: SCATS (South Central Area Transit Services)</span>
          </div>
          <p className="text-xs text-[#303630]/80 leading-relaxed">
            In accordance with project guidelines, the term <em>SCATS</em> from the client page brief is preserved as a verified municipal transportation inquiry. Specific schedule, regional van service availability, and route verification for Perry County will be published following final confirmation with the regional transportation coordinator.
          </p>
        </div>

      </section>

      {/* CALL TO ACTION */}
      <section className="py-16 bg-[#183B2B] text-[#F7F4EC] text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#F7F4EC]">
            Plan Your Travel to The Bluffs
          </h2>
          <p className="text-sm text-[#D9D0BF] leading-relaxed">
            We provide prospective residents with detailed driving directions and recommendations for regional overnight lodging in Linden, TN.
          </p>
          <button
            onClick={() => onNavigate('request-info')}
            className="px-7 py-3 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer"
          >
            Request Travel Directions & Tour
          </button>
        </div>
      </section>

    </div>
  );
};
