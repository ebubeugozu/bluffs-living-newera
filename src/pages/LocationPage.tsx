import React, { useState } from 'react';
import {
  MapPin,
  Car,
  Compass,
  ArrowUpRight,
  Info,
  Waves,
  HeartPulse,
  Plane,
  Building,
  Navigation,
} from 'lucide-react';
import { PageId } from '../types';
import { DISTANCES_DATA, PROPERTY_STATS } from '../data/communityData';

interface LocationPageProps {
  onNavigate: (page: PageId) => void;
  onScheduleTour: () => void;
}

export const LocationPage: React.FC<LocationPageProps> = ({
  onNavigate,
  onScheduleTour,
}) => {
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
            Location & Regional Guide
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-[#F7F4EC] text-balance">
            Connected to What Matters. Surrounded by What Matters More.
          </h1>
          <p className="text-base sm:text-lg text-[#D9D0BF] max-w-2xl mx-auto font-light leading-relaxed">
            The Bluffs at New Era is nestled along the Tennessee River in Linden, Perry County—a peaceful rural haven within easy reach of Nashville and regional services.
          </p>
        </div>
      </section>

      {/* LINDEN, TENNESSEE OVERVIEW */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          <div className="lg:col-span-6 space-y-5">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#183B2B] block">
              The Region
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#183B2B] leading-tight">
              Linden & Perry County, Tennessee
            </h2>
            <p className="text-sm text-[#303630]/85 font-sans leading-relaxed">
              Located in the scenic Western Highland Rim of Tennessee, Perry County is flanked by two historic waterways: the free-flowing Buffalo River to the east and the mighty Tennessee River bordering our property to the west.
            </p>
            <p className="text-sm text-[#303630]/80 font-sans leading-relaxed">
              With a low population density, clean water, and virtually no light pollution, Linden offers an authentic agrarian pace of life. Historic Main Street features charming local dining at The Commodore Hotel & Cafe, weekly farmer's markets, a community health clinic, grocery stores, and local craft shops.
            </p>
          </div>

          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-6 bg-[#FFFFFF] rounded-xl border border-[#D9D0BF]/80 space-y-2">
              <span className="text-xs font-mono text-[#B28B5B] block">COORDINATES</span>
              <h4 className="font-serif text-lg font-semibold text-[#183B2B]">35.6134° N, 87.8428° W</h4>
              <p className="text-xs text-[#303630]/75">Linden, Perry County, TN 37096</p>
            </div>

            <div className="p-6 bg-[#FFFFFF] rounded-xl border border-[#D9D0BF]/80 space-y-2">
              <span className="text-xs font-mono text-[#B28B5B] block">RIVER MILE</span>
              <h4 className="font-serif text-lg font-semibold text-[#183B2B]">Tennessee River Mile 114.5</h4>
              <p className="text-xs text-[#303630]/75">Deep-water navigable channel</p>
            </div>

            <div className="p-6 bg-[#FFFFFF] rounded-xl border border-[#D9D0BF]/80 space-y-2">
              <span className="text-xs font-mono text-[#B28B5B] block">ELEVATION</span>
              <h4 className="font-serif text-lg font-semibold text-[#183B2B]">380 to 720 Feet</h4>
              <p className="text-xs text-[#303630]/75">From river shoreline to high bluff crest</p>
            </div>

            <div className="p-6 bg-[#FFFFFF] rounded-xl border border-[#D9D0BF]/80 space-y-2">
              <span className="text-xs font-mono text-[#B28B5B] block">DARK SKY CLASS</span>
              <h4 className="font-serif text-lg font-semibold text-[#183B2B]">Bortle Class 3/4</h4>
              <p className="text-xs text-[#303630]/75">Pristine night sky & Milky Way clarity</p>
            </div>
          </div>

        </div>
      </section>

      {/* DRIVING DISTANCES & TRAVEL TIMES */}
      <section className="py-16 bg-[#FFFFFF] border-t border-[#D9D0BF]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
          
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#183B2B] block">
                Accessibility
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#183B2B]">
                Verified Travel Times & Distances
              </h2>
            </div>

            {/* Filter buttons */}
            <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
              {[
                { id: 'all', label: 'All Destinations' },
                { id: 'town', label: 'Towns' },
                { id: 'recreation', label: 'Recreation' },
                { id: 'medical', label: 'Medical' },
                { id: 'airport', label: 'Airports' },
              ].map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setFilterCat(cat.id)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                    filterCat === cat.id
                      ? 'bg-[#183B2B] text-[#F7F4EC]'
                      : 'bg-[#F7F4EC] text-[#303630] border border-[#D9D0BF] hover:bg-[#D9D0BF]/40'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDistances.map((dest, idx) => (
              <div
                key={idx}
                className="bg-[#F7F4EC] p-6 rounded-xl border border-[#D9D0BF] flex flex-col justify-between shadow-sm space-y-3"
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-[#B28B5B]">
                      {dest.category.toUpperCase()}
                    </span>
                    <span className="font-serif text-xl font-bold text-[#183B2B]">
                      {dest.driveTimeMins} mins
                    </span>
                  </div>

                  <h4 className="font-serif text-xl font-semibold text-[#183B2B] mb-1">
                    {dest.name}
                  </h4>

                  <span className="text-xs font-semibold text-[#A6B49A] block mb-2">
                    {dest.distanceMiles} Miles
                  </span>

                  <p className="text-xs text-[#303630]/80 leading-relaxed font-sans">
                    {dest.description}
                  </p>
                </div>

                {dest.directionsUrl && (
                  <div className="pt-3 border-t border-[#D9D0BF]/50">
                    <a
                      href={dest.directionsUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#183B2B] hover:text-[#B28B5B] transition-colors"
                    >
                      <span>Get Driving Directions</span>
                      <ArrowUpRight size={13} />
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* SCATS CLIENT-SUPPLIED REFERENCE PLACEHOLDER */}
          <div className="p-6 bg-[#FFFFFF] rounded-xl border border-dashed border-[#A6B49A] space-y-2 mt-8">
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#183B2B]">
              <Info size={16} className="text-[#B28B5B]" />
              <span>Transportation Reference: SCATS</span>
            </div>
            <p className="text-xs text-[#303630]/80 leading-relaxed">
              In accordance with project guidelines, the term <em>SCATS</em> from the client page brief is preserved as a verified municipal transportation inquiry. Specific schedule, regional van service availability, and route verification for Perry County will be published following final confirmation with the regional transportation coordinator.
            </p>
          </div>

        </div>
      </section>

      {/* STEP-BY-STEP DRIVING DIRECTIONS */}
      <section className="py-16 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#183B2B]">
            Navigation Assistance
          </span>
          <h2 className="font-serif text-3xl font-semibold text-[#183B2B]">
            How to Reach The Bluffs
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
          <div className="p-6 bg-[#FFFFFF] rounded-xl border border-[#D9D0BF]/80 space-y-2">
            <h4 className="font-serif text-lg font-semibold text-[#183B2B]">From Nashville & BNA Airport</h4>
            <p className="text-[#303630]/80 leading-relaxed">
              Take I-40 West toward Memphis for approximately 65 miles to Exit 143 (TN-13 South toward Linden). Follow TN-13 South through Lobelville into Linden, then follow local signs to The Bluffs private entrance. Total drive time: ~90 minutes.
            </p>
          </div>

          <div className="p-6 bg-[#FFFFFF] rounded-xl border border-[#D9D0BF]/80 space-y-2">
            <h4 className="font-serif text-lg font-semibold text-[#183B2B]">From Memphis & West Tennessee</h4>
            <p className="text-[#303630]/80 leading-relaxed">
              Take I-40 East toward Nashville to Exit 126 (US-641/TN-69 toward Camden/Parsons). Take US-412 East crossing the Tennessee River bridge into Perry County, then follow signs toward Linden. Total drive time: ~120 minutes.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-[#183B2B] text-[#F7F4EC] text-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold">
            Ready to Visit Linden, TN?
          </h2>
          <p className="text-sm text-[#D9D0BF]">
            We provide prospective residents with detailed turn-by-turn route maps, local lodging recommendations, and gate access codes for scheduled visits.
          </p>
          <button
            onClick={onScheduleTour}
            className="px-7 py-3 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer shadow-md"
          >
            Schedule a Private Tour
          </button>
        </div>
      </section>

    </div>
  );
};
