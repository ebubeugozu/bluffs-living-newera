import React from 'react';
import { PageId } from '../types';
import { InteractiveMapComponent } from '../components/InteractiveMapComponent';
import { MapPin, Compass, Mountain, Trees, Waves } from 'lucide-react';

interface MapPageProps {
  onNavigate: (page: PageId) => void;
  onSelectProperty?: (id: string) => void;
}

export const MapPage: React.FC<MapPageProps> = ({ onNavigate, onSelectProperty }) => {
  return (
    <div className="bg-[#F7F4EC] text-[#303630]">
      
      {/* HEADER */}
      <section className="bg-[#183B2B] text-[#F7F4EC] pt-16 pb-12 px-4 sm:px-6 lg:px-8 border-b border-[#A6B49A]/20">
        <div className="max-w-5xl mx-auto text-center space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#10291F] border border-[#A6B49A]/20 text-xs font-semibold uppercase tracking-[0.2em] text-[#B28B5B]">
            <Compass size={14} />
            <span>Master Site Cartography</span>
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-[#F7F4EC]">
            Explore the Bluffs.
          </h1>
          <p className="text-base sm:text-lg text-[#D9D0BF] max-w-2xl mx-auto font-light leading-relaxed">
            Discover the landscape, amenities, and natural features that make this community distinctive.
          </p>
        </div>
      </section>

      {/* FULL-SIZE INTERACTIVE MAP WRAPPER */}
      <section className="py-8 px-2 sm:px-6 lg:px-8 max-w-[1600px] mx-auto">
        
        {/* Navigation & Guide Ribbon */}
        <div className="bg-[#FFFFFF] p-4 rounded-xl border border-[#D9D0BF]/70 mb-4 flex flex-wrap items-center justify-between gap-4 text-xs">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-[#183B2B] uppercase tracking-wider">Map Navigation:</span>
            <span className="text-[#303630]/75">Click and drag to pan · Click any marker or directory listing to inspect homesites, river access, and community amenities.</span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => onNavigate('properties')}
              className="px-3.5 py-1.5 border border-[#183B2B] text-[#183B2B] hover:bg-[#183B2B] hover:text-[#F7F4EC] font-semibold rounded text-xs transition-colors cursor-pointer"
            >
              Browse Inventory
            </button>
            <button
              onClick={() => onNavigate('tour')}
              className="px-3.5 py-1.5 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] font-semibold rounded text-xs transition-colors cursor-pointer"
            >
              Schedule a Tour
            </button>
          </div>
        </div>

        {/* FULL INTERACTIVE MAP INSTANCE */}
        <InteractiveMapComponent
          fullHeight={true}
          onSelectProperty={onSelectProperty}
          onNavigateToInquiry={() => onNavigate('tour')}
        />

        {/* MAP LEGEND / ACCURACY NOTE */}
        <div className="mt-6 bg-[#FFFFFF] p-6 rounded-xl border border-[#D9D0BF]/70 grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-[#303630]/80">
          <div>
            <h4 className="font-serif text-base font-semibold text-[#183B2B] mb-1">
              Topography & Elevations
            </h4>
            <p className="leading-relaxed">
              Elevations span from 380 feet along the limestone shores of the Tennessee River up to 720 feet along the crest of the eastern hardwood ridge, providing natural insulation and cooling river breezes.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-base font-semibold text-[#183B2B] mb-1">
              Homesite Pad Engineering
            </h4>
            <p className="leading-relaxed">
              Every homesite pad (6,000+ sq ft footprint) has been engineered with minimal tree removal, dedicated 50A/100A underground electrical conduits, city water service stubs, and high-speed fiber drops.
            </p>
          </div>
          <div>
            <h4 className="font-serif text-base font-semibold text-[#183B2B] mb-1">
              Cartographic Verification
            </h4>
            <p className="leading-relaxed">
              Site boundaries, river frontage, and road courses reflect verified property surveys. Specific lot availability is updated continuously by our stewardship team.
            </p>
          </div>
        </div>

      </section>

    </div>
  );
};
