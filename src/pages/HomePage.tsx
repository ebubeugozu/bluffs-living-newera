import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  TreePine,
  Waves,
  Eye,
  Camera,
  FileText,
  MapPin,
  Calendar,
  Sparkles,
  ShieldCheck,
  ChevronRight,
  Flame,
  Check,
  Search,
} from 'lucide-react';
import { PageId, PropertyItem, PropertyFilters } from '../types';
import { PROPERTY_STATS, PROPERTY_LISTINGS } from '../data/communityData';
import { InteractiveMapComponent } from '../components/InteractiveMapComponent';
import { PropertyCard } from '../components/PropertyCard';
import { PropertySearchPanel } from '../components/PropertySearchPanel';
import { ImageWithFallback } from '../components/ImageWithFallback';

interface HomePageProps {
  onNavigate: (page: PageId) => void;
  onViewPropertyDetail: (id: string) => void;
  onViewGallery: (property: PropertyItem) => void;
  onQuickView: (property: PropertyItem) => void;
  onScheduleTour: (propertyTitle?: string) => void;
  favouriteIds?: string[];
  onToggleFavourite?: (id: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onNavigate,
  onViewPropertyDetail,
  onViewGallery,
  onQuickView,
  onScheduleTour,
  favouriteIds = [],
  onToggleFavourite,
}) => {
  const [heroSearchFilters, setHeroSearchFilters] = useState<PropertyFilters>({
    propertyType: 'all',
    transactionType: 'all',
    setting: 'all',
    priceRange: 'all',
    minLotSize: 'all',
    status: 'all',
    searchQuery: '',
  });

  const featuredProperties = PROPERTY_LISTINGS.slice(0, 3);

  const handleSearchSubmit = () => {
    onNavigate('properties');
  };

  return (
    <div className="bg-[#F7F4EC] text-[#303630]">
      
      {/* 1. CINEMATIC HERO SECTION */}
      <section className="relative min-h-[82vh] lg:min-h-[88vh] flex items-center justify-center bg-[#10291F] text-[#F7F4EC] overflow-hidden px-4 sm:px-6 lg:px-8 pt-16 pb-28">
        
        {/* ATMOSPHERIC BACKGROUND GRAPHIC: RIVER BLUFF AT SUNRISE */}
        <div className="absolute inset-0 z-0 opacity-40 mix-blend-luminosity pointer-events-none">
          <svg viewBox="0 0 1440 900" className="w-full h-full object-cover preserve-3d" preserveAspectRatio="xMidYMid slice">
            <defs>
              <linearGradient id="skyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#183B2B" />
                <stop offset="50%" stopColor="#10291F" />
                <stop offset="100%" stopColor="#0A1C15" />
              </linearGradient>
              <linearGradient id="riverShimmer" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#A6B49A" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#F7F4EC" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#A6B49A" stopOpacity="0.1" />
              </linearGradient>
            </defs>
            <rect width="1440" height="900" fill="url(#skyGrad)" />
            <path d="M 0,420 Q 380,310 720,380 T 1440,340 L 1440,900 L 0,900 Z" fill="#143224" opacity="0.6" />
            <path d="M 0,510 Q 480,410 960,490 T 1440,460 L 1440,900 L 0,900 Z" fill="#183B2B" opacity="0.8" />
            <path d="M 0,650 C 400,620 700,740 1440,680 L 1440,820 C 800,880 300,760 0,780 Z" fill="url(#riverShimmer)" />
            <path d="M 0,680 Q 240,640 480,700 T 960,670 T 1440,710 L 1440,900 L 0,900 Z" fill="#10291F" />
          </svg>
        </div>

        {/* SUBTLE VIGNETTE OVERLAY */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-[#10291F] via-[#10291F]/60 to-transparent"></div>

        {/* HERO CONTENT */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-6">
          
          {/* LOCATION LABEL */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#183B2B]/80 border border-[#A6B49A]/30 text-xs tracking-[0.25em] text-[#B28B5B] uppercase font-semibold">
            <MapPin size={13} />
            <span>THE BLUFFS AT NEW ERA · LINDEN, TENNESSEE</span>
          </div>

          {/* HEADLINE */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-semibold tracking-tight leading-[1.08] text-[#F7F4EC] text-balance">
            A Different Way to Experience Life.
          </h1>

          {/* SUPPORTING COPY */}
          <p className="text-base sm:text-xl text-[#D9D0BF] max-w-2xl mx-auto font-sans font-light leading-relaxed">
            Discover a private community where nature, comfort, and connection come together across the beautiful landscapes of Tennessee.
          </p>

          {/* CALL TO ACTION BUTTONS */}
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onNavigate('properties')}
              className="w-full sm:w-auto px-7 py-3.5 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] font-semibold text-xs tracking-wider uppercase rounded-md transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>Explore Available Homesites</span>
              <ArrowRight size={15} />
            </button>

            <button
              onClick={() => onScheduleTour()}
              className="w-full sm:w-auto px-7 py-3.5 border border-[#A6B49A]/40 text-[#F7F4EC] hover:bg-[#183B2B] font-semibold text-xs tracking-wider uppercase rounded-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <Calendar size={15} />
              <span>Schedule Private Tour</span>
            </button>
          </div>

          {/* RIVER VISTA QUICK STATS STRIP */}
          <div className="pt-10 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-[#A6B49A]/20 max-w-3xl mx-auto text-left">
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#F7F4EC] tabular-nums">
                140
              </div>
              <div className="text-[11px] text-[#A6B49A] uppercase tracking-wider font-medium">
                Contiguous Acres
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#B28B5B] tabular-nums">
                ½ Mile
              </div>
              <div className="text-[11px] text-[#A6B49A] uppercase tracking-wider font-medium">
                River Frontage
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#F7F4EC] tabular-nums">
                6,000+
              </div>
              <div className="text-[11px] text-[#A6B49A] uppercase tracking-wider font-medium">
                Sq Ft Homesites
              </div>
            </div>
            <div>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#B28B5B] tabular-nums">
                30+
              </div>
              <div className="text-[11px] text-[#A6B49A] uppercase tracking-wider font-medium">
                Resident Community
              </div>
            </div>
          </div>

        </div>

      </section>

      {/* INTEGRATED HERO PROPERTY SEARCH PANEL (ELEGANTLY OVERLAPPING TRANSITION) */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 -mt-14 relative z-20">
        <PropertySearchPanel
          filters={heroSearchFilters}
          onFilterChange={setHeroSearchFilters}
          onSearchSubmit={handleSearchSubmit}
          resultCount={PROPERTY_LISTINGS.length}
        />
      </section>

      {/* 2. PROPERTY INTRODUCTION */}
      <section className="py-20 lg:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          <div className="lg:col-span-7 space-y-6">
            <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#183B2B] block">
              The Living Philosophy
            </span>
            <h2 className="font-serif text-3xl sm:text-5xl font-medium tracking-tight text-[#183B2B] leading-tight text-balance">
              More Than a Place to Live. A Place to Belong.
            </h2>
            <p className="text-base text-[#303630]/85 font-sans leading-relaxed">
              The Bluffs at New Era is a nature-focused boutique community designed around personal privacy, generous open space, thoughtful amenities, and an appreciation for the surrounding environment.
            </p>
            <p className="text-sm text-[#303630]/75 font-sans leading-relaxed">
              Unlike typical tiny-home developments that crowd small pads together in cleared fields, The Bluffs preserves approximately 140 acres of mature hardwood ridges, sandstone blufflines, and quiet hollows. Each private homesite provides 6,000+ square feet of wooded seclusion, dedicated underground city utilities, and direct access to half a mile of riverfront.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <button
                onClick={() => onNavigate('about')}
                className="px-6 py-3 bg-[#183B2B] hover:bg-[#10291F] text-[#F7F4EC] text-xs font-semibold tracking-wider uppercase rounded-md transition-colors cursor-pointer"
              >
                Read Community Story
              </button>
              <button
                onClick={() => onScheduleTour()}
                className="px-6 py-3 border border-[#183B2B] text-[#183B2B] hover:bg-[#183B2B] hover:text-[#F7F4EC] text-xs font-semibold tracking-wider uppercase rounded-md transition-colors cursor-pointer"
              >
                Schedule a Visit
              </button>
            </div>
          </div>

          <div className="lg:col-span-5 bg-[#183B2B] text-[#F7F4EC] p-8 sm:p-10 rounded-2xl shadow-xl space-y-6 border border-[#A6B49A]/20">
            <h3 className="font-serif text-2xl font-semibold text-[#F7F4EC]">
              Verified Community Scale
            </h3>
            <ul className="space-y-4 text-sm divide-y divide-[#A6B49A]/20">
              <li className="pt-3 first:pt-0 flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#B28B5B] mt-1.5 shrink-0" />
                <div>
                  <strong className="text-[#F7F4EC] block font-medium">Approximately 140 Acres</strong>
                  <span className="text-xs text-[#D9D0BF]">Expansive private acreage protected from commercial sprawl.</span>
                </div>
              </li>
              <li className="pt-3 flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#B28B5B] mt-1.5 shrink-0" />
                <div>
                  <strong className="text-[#F7F4EC] block font-medium">½ Mile of Tennessee River Shoreline</strong>
                  <span className="text-xs text-[#D9D0BF]">Direct water access, kayak racks, fishing perches, and river views.</span>
                </div>
              </li>
              <li className="pt-3 flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#B28B5B] mt-1.5 shrink-0" />
                <div>
                  <strong className="text-[#F7F4EC] block font-medium">6,000+ Sq Ft Private Homesites</strong>
                  <span className="text-xs text-[#D9D0BF]">Engineered level building pads with mature wooded perimeter buffers.</span>
                </div>
              </li>
              <li className="pt-3 flex items-start gap-3">
                <span className="w-2 h-2 rounded-full bg-[#B28B5B] mt-1.5 shrink-0" />
                <div>
                  <strong className="text-[#F7F4EC] block font-medium">Curated 30+ Resident Community</strong>
                  <span className="text-xs text-[#D9D0BF]">Intimate, boutique scale fostering neighborliness and peace.</span>
                </div>
              </li>
            </ul>
          </div>

        </div>
      </section>

      {/* FEATURED AVAILABLE HOMESITES STRIP */}
      <section className="py-20 bg-[#FFFFFF] border-t border-b border-[#D9D0BF]/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#183B2B]">
                Phase 1 Inventory
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-semibold text-[#183B2B]">
                Featured Available Homes & Homesites
              </h2>
              <p className="text-sm text-[#303630]/75 max-w-xl">
                Explore a selection of our most scenic parcels, each featuring certified underground utilities, fiber drops, and dedicated building pads.
              </p>
            </div>

            <button
              onClick={() => onNavigate('properties')}
              className="px-6 py-3 bg-[#183B2B] hover:bg-[#10291F] text-[#F7F4EC] text-xs font-semibold tracking-wider uppercase rounded-md transition-colors self-start md:self-auto shrink-0 cursor-pointer shadow-sm"
            >
              Browse All Properties ({PROPERTY_LISTINGS.length})
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((prop) => (
              <PropertyCard
                key={prop.id}
                property={prop}
                onViewGallery={onViewGallery}
                onQuickView={onQuickView}
                onViewFullProperty={onViewPropertyDetail}
                onEnquire={() => onScheduleTour(prop.title)}
                isFavourite={favouriteIds.includes(prop.id)}
                onToggleFavourite={onToggleFavourite}
              />
            ))}
          </div>

        </div>
      </section>

      {/* 3. INTERACTIVE MAP PREVIEW */}
      <section className="py-16 bg-[#183B2B] text-[#F7F4EC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B28B5B]">
                Interactive Cartography
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#F7F4EC]">
                Explore the Land. Discover the Possibilities.
              </h2>
              <p className="text-sm text-[#D9D0BF] max-w-xl">
                Navigate the 140-acre master plan. Inspect homesite locations, river access points, community gardens, trails, and scenic overlooks.
              </p>
            </div>

            <button
              onClick={() => onNavigate('map')}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#F7F4EC] hover:bg-[#FFFFFF] text-[#183B2B] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer self-start md:self-auto shrink-0 shadow-md"
            >
              <span>Explore the Interactive Map</span>
              <ArrowRight size={15} />
            </button>
          </div>

          {/* Embedded Interactive Map Preview */}
          <InteractiveMapComponent
            onSelectProperty={onViewPropertyDetail}
            onNavigateToInquiry={() => onScheduleTour('Site Map Inquiries')}
          />

        </div>
      </section>

      {/* 4. AMENITIES PREVIEW */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#183B2B]">
            Refined Living Infrastructure
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#183B2B]">
            Thoughtfully Considered. Naturally Enjoyed.
          </h2>
          <p className="text-sm sm:text-base text-[#303630]/80">
            Enjoy complete everyday conveniences seamlessly engineered to preserve the natural peace and visual serenity of the forest.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-[#FFFFFF] p-8 rounded-xl border border-[#D9D0BF]/60 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B28B5B]">
                Convenience & Power
              </span>
              <h3 className="font-serif text-2xl font-semibold text-[#183B2B]">
                Underground Utilities & Fiber
              </h3>
              <p className="text-sm text-[#303630]/80 leading-relaxed font-sans">
                City water, modern subterranean electrical conduits (50A/100A), high-speed fiber internet drops, and weekly curbside refuse collection directly at each homesite.
              </p>
            </div>
            <div className="pt-6 border-t border-[#D9D0BF]/40 mt-6 text-xs text-[#A6B49A]">
              No overhead wires · Protected views
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-8 rounded-xl border border-[#D9D0BF]/60 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B28B5B]">
                Outdoor Living
              </span>
              <h3 className="font-serif text-2xl font-semibold text-[#183B2B]">
                Riverfront & Nature Trails
              </h3>
              <p className="text-sm text-[#303630]/80 leading-relaxed font-sans">
                Direct shoreline launch for kayaks, miles of bluffs trails, community raised-bed vegetable gardens, a heritage chicken coop, and the sunset fire-circle hearth.
              </p>
            </div>
            <div className="pt-6 border-t border-[#D9D0BF]/40 mt-6 text-xs text-[#A6B49A]">
              Half-mile private water frontage
            </div>
          </div>

          <div className="bg-[#FFFFFF] p-8 rounded-xl border border-[#D9D0BF]/60 shadow-sm flex flex-col justify-between">
            <div className="space-y-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-[#B28B5B]">
                Preparedness & Safety
              </span>
              <h3 className="font-serif text-2xl font-semibold text-[#183B2B]">
                Certified Helipad & Stewardship
              </h3>
              <p className="text-sm text-[#303630]/80 leading-relaxed font-sans">
                Gated keypad entry, year-round road grading, onsite stewardship coordination, and a dedicated helipad for LifeFlight medical air transport staging.
              </p>
            </div>
            <div className="pt-6 border-t border-[#D9D0BF]/40 mt-6 text-xs text-[#A6B49A]">
              Dedicated emergency flight staging zone
            </div>
          </div>
        </div>

        <div className="text-center pt-10">
          <button
            onClick={() => onNavigate('amenities')}
            className="px-6 py-3 bg-[#183B2B] hover:bg-[#10291F] text-[#F7F4EC] text-xs font-semibold tracking-wider uppercase rounded-md transition-colors cursor-pointer shadow-md inline-flex items-center gap-2"
          >
            <span>Explore All Amenities & Services</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </section>

      {/* 5. CONSERVATION PREVIEW */}
      <section className="py-20 bg-[#10291F] text-[#F7F4EC]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-6 space-y-6">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#B28B5B]">
                Environmental Stewardship
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-medium tracking-tight text-[#F7F4EC] leading-tight">
                Preserving the Land. Respecting the Landscape.
              </h2>
              <p className="text-sm text-[#D9D0BF] leading-relaxed">
                Prior to any roadway or homesite construction, a comprehensive ecological and conservation study was conducted to inventory the property's native hardwood canopies, protect the river's limestone watershed, and establish strict buffer corridors around active bald eagle territories.
              </p>
              <div>
                <button
                  onClick={() => onNavigate('conservation')}
                  className="px-6 py-3 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer"
                >
                  Discover Our Conservation Study
                </button>
              </div>
            </div>

            <div className="lg:col-span-6 grid grid-cols-2 gap-4">
              <div className="p-6 bg-[#183B2B] rounded-xl border border-[#A6B49A]/20">
                <span className="text-xs font-mono text-[#B28B5B] block mb-1">01 / BUFFER</span>
                <h4 className="font-serif text-lg font-semibold text-[#F7F4EC] mb-1">Riparian Corridor</h4>
                <p className="text-xs text-[#D9D0BF]">Mandatory 100-foot native vegetation riverfront preservation.</p>
              </div>
              <div className="p-6 bg-[#183B2B] rounded-xl border border-[#A6B49A]/20">
                <span className="text-xs font-mono text-[#B28B5B] block mb-1">02 / HABITAT</span>
                <h4 className="font-serif text-lg font-semibold text-[#F7F4EC] mb-1">Bald Eagle Sanctuary</h4>
                <p className="text-xs text-[#D9D0BF]">330-ft protective nesting perimeter monitored by live optics.</p>
              </div>
              <div className="p-6 bg-[#183B2B] rounded-xl border border-[#A6B49A]/20">
                <span className="text-xs font-mono text-[#B28B5B] block mb-1">03 / FORESTRY</span>
                <h4 className="font-serif text-lg font-semibold text-[#F7F4EC] mb-1">Old-Growth Oaks</h4>
                <p className="text-xs text-[#D9D0BF]">Road corridors curved around mature mast-bearing hardwoods.</p>
              </div>
              <div className="p-6 bg-[#183B2B] rounded-xl border border-[#A6B49A]/20">
                <span className="text-xs font-mono text-[#B28B5B] block mb-1">04 / DARK SKY</span>
                <h4 className="font-serif text-lg font-semibold text-[#F7F4EC] mb-1">Stargazing Reserve</h4>
                <p className="text-xs text-[#D9D0BF]">Zero upward light trespass preserving Perry County night skies.</p>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 6. LIFESTYLE & EXPERIENCES */}
      <section className="py-20 lg:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto space-y-4 mb-14">
          <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#183B2B]">
            Daily Rhythm
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl font-medium text-[#183B2B]">
            Life Grounded in the Natural World
          </h2>
          <p className="text-sm text-[#303630]/80">
            From morning mist rising over the river to starlit evenings around the stone fire circle, life at The Bluffs is designed to slow down and savor.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#D9D0BF]/60 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B28B5B]">Water & Fishing</span>
            <h4 className="font-serif text-xl font-medium text-[#183B2B]">Tennessee River Exploration</h4>
            <p className="text-xs text-[#303630]/80 leading-relaxed">
              Launch a kayak from our private shoreline into calm morning waters, or fish from natural limestone shelves for smallmouth bass and catfish.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#D9D0BF]/60 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B28B5B]">Organic Harvest</span>
            <h4 className="font-serif text-xl font-medium text-[#183B2B]">Gardens, Coop & Apiary</h4>
            <p className="text-xs text-[#303630]/80 leading-relaxed">
              Tend heirloom cedar raised beds, collect fresh breakfast eggs from heritage hens, and enjoy raw wildflower honey harvested from our hillside hives.
            </p>
          </div>

          <div className="bg-[#FFFFFF] p-6 rounded-2xl border border-[#D9D0BF]/60 space-y-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B28B5B]">Community Hearth</span>
            <h4 className="font-serif text-xl font-medium text-[#183B2B]">The Fire Circle at Sunset</h4>
            <p className="text-xs text-[#303630]/80 leading-relaxed">
              Gather with neighbors around the fieldstone hearth as dusk falls over the western river bluff for quiet conversation, acoustic music, and stargazing.
            </p>
          </div>
        </div>
      </section>

      {/* 7. EAGLE CAM HOMEPAGE FEATURE BANNER */}
      <section className="py-16 bg-[#183B2B] text-[#F7F4EC] relative overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <div className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#B28B5B]">
              <Camera size={14} />
              <span>Live Observation Feed</span>
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#F7F4EC]">
              A Window Into the Wild.
            </h2>
            <p className="text-sm text-[#D9D0BF] leading-relaxed">
              Experience the natural world surrounding The Bluffs through our Eagle Cam, streaming live from an active Bald Eagle nesting territory perched high on the western bluffs.
            </p>
          </div>

          <button
            onClick={() => onNavigate('eagle-cam')}
            className="px-8 py-3.5 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors whitespace-nowrap cursor-pointer shadow-lg"
          >
            Watch the Live Cam
          </button>
        </div>
      </section>

      {/* 8. COMMUNITY OVERVIEW PREVIEW */}
      <section className="py-20 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
        <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#183B2B]">
          Comprehensive Prospectus
        </span>
        <h2 className="font-serif text-3xl sm:text-4xl font-medium text-[#183B2B]">
          The Official Community Overview & Pitch Deck
        </h2>
        <p className="text-sm text-[#303630]/80 max-w-2xl mx-auto leading-relaxed">
          Review our master plan, site economics, homesite pad specifications, and regional timeline in our comprehensive community presentation.
        </p>
        <div>
          <button
            onClick={() => onNavigate('pitch-deck')}
            className="px-6 py-3 border border-[#183B2B] text-[#183B2B] hover:bg-[#183B2B] hover:text-[#F7F4EC] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer"
          >
            View Community Overview
          </button>
        </div>
      </section>

      {/* 9. FINAL CALL TO ACTION */}
      <section className="py-24 bg-[#10291F] text-[#F7F4EC] text-center px-4 sm:px-6 lg:px-8 border-t border-[#A6B49A]/20">
        <div className="max-w-3xl mx-auto space-y-6">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B28B5B]">
            Begin Your Journey
          </span>
          <h2 className="font-serif text-4xl sm:text-5xl font-semibold tracking-tight text-[#F7F4EC] leading-tight text-balance">
            Your Next Chapter Could Begin Here.
          </h2>
          <p className="text-base text-[#D9D0BF] max-w-xl mx-auto leading-relaxed">
            Interested in discovering life at The Bluffs? Connect with our team to learn more about the community, homesite opportunities, and application process.
          </p>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onScheduleTour()}
              className="w-full sm:w-auto px-8 py-3.5 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] font-semibold text-xs tracking-wider uppercase rounded-md transition-all cursor-pointer shadow-lg flex items-center justify-center gap-2"
            >
              <Calendar size={15} />
              <span>Schedule a Private Tour</span>
            </button>
            <button
              onClick={() => onNavigate('apply')}
              className="w-full sm:w-auto px-8 py-3.5 border border-[#A6B49A]/40 text-[#F7F4EC] hover:bg-[#183B2B] font-semibold text-xs tracking-wider uppercase rounded-md transition-all cursor-pointer"
            >
              Apply to The Bluffs
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
