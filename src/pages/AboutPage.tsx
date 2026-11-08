import React from 'react';
import { Compass, MapPin, Trees, Mountain, Sparkles, ArrowRight, ShieldCheck } from 'lucide-react';
import { PageId } from '../types';
import { PROPERTY_STATS } from '../data/communityData';

interface AboutPageProps {
  onNavigate: (page: PageId) => void;
}

export const AboutPage: React.FC<AboutPageProps> = ({ onNavigate }) => {
  return (
    <div className="bg-[#F7F4EC] text-[#303630]">
      
      {/* PAGE HEADER */}
      <section className="bg-[#183B2B] text-[#F7F4EC] py-20 lg:py-28 px-4 sm:px-6 lg:px-8 border-b border-[#A6B49A]/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B28B5B]">
            About The Bluffs at New Era
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-[#F7F4EC] text-balance">
            A Community Rooted in Nature. Designed for Living.
          </h1>
          <p className="text-base sm:text-lg text-[#D9D0BF] max-w-2xl mx-auto font-light leading-relaxed">
            Discover a boutique residential sanctuary spanning 140 acres of private ridge and riverfront land in Linden, Tennessee.
          </p>
        </div>
      </section>

      {/* EDITORIAL NARRATIVE & VISION */}
      <section className="py-20 lg:py-24 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-12">
          
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#183B2B] block">
                The Vision
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#183B2B] mt-2">
                Simplicity Without Compromise
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4 text-sm sm:text-base text-[#303630]/85 font-sans leading-relaxed">
              <p>
                The Bluffs at New Era was conceived as an intentional answer to modern living: a place where individuals and couples can embrace a simpler, nature-centered lifestyle without sacrificing comfort, architectural elegance, or essential everyday services.
              </p>
              <p>
                Set atop the rolling limestone ridges overlooking the Tennessee River, the property encompasses approximately 140 contiguous acres of upland hardwood forest, quiet hollows, and dramatic blufflines. Rather than clear-cutting the land to maximize density, our master plan was designed around the land’s natural contours.
              </p>
            </div>
          </div>

          <div className="border-t border-[#D9D0BF]/60 pt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#183B2B] block">
                The Setting
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#183B2B] mt-2">
                Linden & Perry County, Tennessee
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4 text-sm sm:text-base text-[#303630]/85 font-sans leading-relaxed">
              <p>
                Located along the western edge of Middle Tennessee, Linden and Perry County are cherished for their peaceful agrarian rhythms, pristine waterways, and protected dark skies. With the Buffalo River to the east and the Tennessee River bordering our property to the west, water and forest define the region’s character.
              </p>
              <p>
                Residents enjoy the quiet pace of a historic river town—where local farmers sell seasonal produce and neighbors greet each other by name—while remaining an easy 90-minute drive from Nashville’s international airport and metropolitan amenities.
              </p>
            </div>
          </div>

          <div className="border-t border-[#D9D0BF]/60 pt-12 grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            <div className="md:col-span-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#183B2B] block">
                The River Frontage
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-medium text-[#183B2B] mt-2">
                Half a Mile of Living Water
              </h2>
            </div>
            <div className="md:col-span-8 space-y-4 text-sm sm:text-base text-[#303630]/85 font-sans leading-relaxed">
              <p>
                The western perimeter of The Bluffs includes approximately half a mile of direct Tennessee River frontage. This wide, navigable river provides ever-changing seasonal views, refreshing river breezes on warm summer evenings, and direct access for kayaking, paddleboarding, and fishing.
              </p>
              <p>
                A designated river trail connects the upper homesite ridge down to the shoreline launch point and fishing shelves, protected by a dedicated conservation buffer to safeguard water quality and riverbank ecosystems.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* CORE PILLARS OF LIFE AT THE BLUFFS */}
      <section className="py-20 bg-[#10291F] text-[#F7F4EC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-14">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B28B5B]">
              Community Principles
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#F7F4EC]">
              Four Pillars of Our Community
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="p-6 bg-[#183B2B] rounded-xl border border-[#A6B49A]/20 space-y-3">
              <span className="text-xs font-mono text-[#B28B5B] block">PILLAR 01</span>
              <h3 className="font-serif text-xl font-medium text-[#F7F4EC]">Personal Privacy</h3>
              <p className="text-xs text-[#D9D0BF] leading-relaxed">
                Expansive 6,000+ sq ft building pads with generous forest buffers between homesites, ensuring personal peace and undisturbed solitude.
              </p>
            </div>

            <div className="p-6 bg-[#183B2B] rounded-xl border border-[#A6B49A]/20 space-y-3">
              <span className="text-xs font-mono text-[#B28B5B] block">PILLAR 02</span>
              <h3 className="font-serif text-xl font-medium text-[#F7F4EC]">Ecological Stewardship</h3>
              <p className="text-xs text-[#D9D0BF] leading-relaxed">
                Development guided by formal conservation study principles: dark-sky lighting, riverbank protection, and mature oak canopy preservation.
              </p>
            </div>

            <div className="p-6 bg-[#183B2B] rounded-xl border border-[#A6B49A]/20 space-y-3">
              <span className="text-xs font-mono text-[#B28B5B] block">PILLAR 03</span>
              <h3 className="font-serif text-xl font-medium text-[#F7F4EC]">Genuine Community</h3>
              <p className="text-xs text-[#D9D0BF] leading-relaxed">
                Shared organic gardens, heritage chicken coop, community apiary, and sunset fire-circle hearth creating organic bonds among 30+ residents.
              </p>
            </div>

            <div className="p-6 bg-[#183B2B] rounded-xl border border-[#A6B49A]/20 space-y-3">
              <span className="text-xs font-mono text-[#B28B5B] block">PILLAR 04</span>
              <h3 className="font-serif text-xl font-medium text-[#F7F4EC]">Modern Reliability</h3>
              <p className="text-xs text-[#D9D0BF] leading-relaxed">
                Underground electrical distribution, reliable municipal water, gigabit fiber internet, and a dedicated emergency helipad for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}
      <section className="py-20 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#183B2B]">
          Experience The Bluffs in Person
        </h2>
        <p className="text-sm text-[#303630]/80 max-w-xl mx-auto leading-relaxed">
          The best way to understand the peace, river views, and scale of The Bluffs is to walk the ridge yourself. Inquire with our team to arrange a private property tour.
        </p>
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate('request-info')}
            className="w-full sm:w-auto px-7 py-3 bg-[#183B2B] hover:bg-[#10291F] text-[#F7F4EC] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer"
          >
            Schedule a Private Tour
          </button>
          <button
            onClick={() => onNavigate('map')}
            className="w-full sm:w-auto px-7 py-3 border border-[#183B2B] text-[#183B2B] hover:bg-[#183B2B] hover:text-[#F7F4EC] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer"
          >
            Explore Master Site Map
          </button>
        </div>
      </section>

    </div>
  );
};
