import React, { useState, useMemo } from 'react';
import { Search, Filter, Compass, MapPin, SlidersHorizontal, ArrowRight, Heart } from 'lucide-react';
import { PropertyItem, PropertyFilters, PageId } from '../types';
import { PropertyCard } from '../components/PropertyCard';
import { PropertySearchPanel } from '../components/PropertySearchPanel';
import { PROPERTY_LISTINGS } from '../data/communityData';

interface PropertiesBrowsePageProps {
  onNavigate: (page: PageId) => void;
  onViewPropertyDetail: (id: string) => void;
  onViewGallery: (property: PropertyItem) => void;
  onQuickView: (property: PropertyItem) => void;
  onScheduleTour: (propertyTitle: string) => void;
  favouriteIds: string[];
  onToggleFavourite: (id: string) => void;
  initialFilters?: PropertyFilters;
}

export const PropertiesBrowsePage: React.FC<PropertiesBrowsePageProps> = ({
  onNavigate,
  onViewPropertyDetail,
  onViewGallery,
  onQuickView,
  onScheduleTour,
  favouriteIds,
  onToggleFavourite,
  initialFilters,
}) => {
  const [filters, setFilters] = useState<PropertyFilters>(
    initialFilters || {
      propertyType: 'all',
      transactionType: 'all',
      setting: 'all',
      priceRange: 'all',
      minLotSize: 'all',
      status: 'all',
      searchQuery: '',
    }
  );

  const [activeQuickFilter, setActiveQuickFilter] = useState<string>('all');

  // Filter listings
  const filteredProperties = useMemo(() => {
    return PROPERTY_LISTINGS.filter((prop) => {
      // Quick filter
      if (activeQuickFilter === 'riverfront' && prop.setting !== 'River Bluff View' && prop.setting !== 'Direct Riverfront') {
        return false;
      }
      if (activeQuickFilter === 'ridge' && prop.setting !== 'Hardwood Ridge') {
        return false;
      }
      if (activeQuickFilter === 'turnkey' && prop.propertyType !== 'turnkey-home') {
        return false;
      }
      if (activeQuickFilter === 'available' && prop.status !== 'Available') {
        return false;
      }

      // Property type
      if (filters.propertyType !== 'all' && prop.propertyType !== filters.propertyType) {
        return false;
      }

      // Natural setting
      if (filters.setting !== 'all' && prop.setting !== filters.setting) {
        return false;
      }

      // Min lot size
      if (filters.minLotSize !== 'all') {
        const minSize = parseInt(filters.minLotSize, 10);
        if (prop.lotSizeSqFt < minSize) return false;
      }

      // Status
      if (filters.status !== 'all' && prop.status !== filters.status) {
        return false;
      }

      // Price range
      if (filters.priceRange === 'under-750') {
        if (!prop.monthlyLease || parseInt(prop.monthlyLease.replace(/\D/g, ''), 10) >= 750) {
          return false;
        }
      }
      if (filters.priceRange === '750-900') {
        const val = parseInt(prop.monthlyLease?.replace(/\D/g, '') || '0', 10);
        if (val < 750 || val > 900) return false;
      }
      if (filters.priceRange === 'over-900') {
        const val = parseInt(prop.monthlyLease?.replace(/\D/g, '') || '0', 10);
        if (val <= 900) return false;
      }
      if (filters.priceRange === 'turnkey') {
        if (prop.propertyType !== 'turnkey-home') return false;
      }

      // Search query
      if (filters.searchQuery.trim() !== '') {
        const q = filters.searchQuery.toLowerCase();
        const matches =
          prop.title.toLowerCase().includes(q) ||
          prop.lotNumber.toLowerCase().includes(q) ||
          prop.shortDesc.toLowerCase().includes(q) ||
          prop.setting.toLowerCase().includes(q);
        if (!matches) return false;
      }

      return true;
    });
  }, [filters, activeQuickFilter]);

  return (
    <div className="bg-[#F7F4EC] text-[#303630]">
      
      {/* PAGE HERO HEADER */}
      <section className="bg-[#183B2B] text-[#F7F4EC] py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#A6B49A]/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B28B5B]">
            The Bluffs at New Era · Inventory
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-[#F7F4EC] text-balance">
            Homes & Homesites
          </h1>
          <p className="text-base sm:text-lg text-[#D9D0BF] max-w-2xl mx-auto font-light leading-relaxed">
            Spacious 6,000+ sq ft wooded building pads and turnkey certified tiny homes overlooking the Tennessee River in Linden, TN.
          </p>
        </div>
      </section>

      {/* FILTER ACCORDION / SEARCH PANEL */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8 relative z-20">
        <PropertySearchPanel
          filters={filters}
          onFilterChange={setFilters}
          onSearchSubmit={() => {}}
          resultCount={filteredProperties.length}
        />
      </section>

      {/* QUICK SEGMENTED FILTER STRIP */}
      <section className="pt-10 pb-4 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#D9D0BF]/60 pb-4">
          <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-1">
            {[
              { id: 'all', label: 'All Inventory' },
              { id: 'available', label: 'Available Now' },
              { id: 'riverfront', label: 'River Bluff & Riverfront' },
              { id: 'ridge', label: 'Hardwood Ridge' },
              { id: 'turnkey', label: 'Turnkey Tiny Homes' },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveQuickFilter(tab.id)}
                className={`px-3.5 py-1.5 text-xs font-semibold rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                  activeQuickFilter === tab.id
                    ? 'bg-[#183B2B] text-[#F7F4EC] shadow-sm'
                    : 'bg-[#FFFFFF] text-[#303630] border border-[#D9D0BF] hover:bg-[#F7F4EC]'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs text-[#303630]/75">
            {favouriteIds.length > 0 && (
              <span className="flex items-center gap-1.5 font-semibold text-[#183B2B]">
                <Heart size={14} className="text-red-500 fill-red-500" />
                <span>{favouriteIds.length} Saved</span>
              </span>
            )}
            <button
              onClick={() => onNavigate('map')}
              className="text-[#183B2B] hover:text-[#B28B5B] font-semibold underline underline-offset-4 cursor-pointer"
            >
              View on Master Map →
            </button>
          </div>
        </div>
      </section>

      {/* PROPERTIES GRID */}
      <section className="py-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {filteredProperties.length === 0 ? (
          <div className="bg-[#FFFFFF] p-12 rounded-2xl border border-[#D9D0BF] text-center max-w-md mx-auto space-y-4">
            <Compass size={36} className="text-[#A6B49A] mx-auto" />
            <h3 className="font-serif text-2xl font-bold text-[#183B2B]">
              No Matching Homesites Found
            </h3>
            <p className="text-xs text-[#303630]/75 leading-relaxed">
              Try adjusting your filter settings or search query. You can also connect with our community director for upcoming Phase 2 releases.
            </p>
            <button
              onClick={() => {
                setActiveQuickFilter('all');
                setFilters({
                  propertyType: 'all',
                  transactionType: 'all',
                  setting: 'all',
                  priceRange: 'all',
                  minLotSize: 'all',
                  status: 'all',
                  searchQuery: '',
                });
              }}
              className="px-5 py-2.5 bg-[#183B2B] text-[#F7F4EC] text-xs font-semibold rounded-md hover:bg-[#10291F]"
            >
              Reset All Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProperties.map((prop) => (
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
        )}
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="py-16 bg-[#183B2B] text-[#F7F4EC] text-center px-4 sm:px-6 lg:px-8 border-t border-[#A6B49A]/20">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl sm:text-4xl font-semibold">
            Want to Walk the Land in Person?
          </h2>
          <p className="text-sm text-[#D9D0BF] max-w-xl mx-auto leading-relaxed">
            Experience the natural quiet, elevation breezes, and river views firsthand. We schedule private, personalized tours of available homesites Thursday through Sunday.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => onScheduleTour('General Homesite Tour')}
              className="px-7 py-3 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer"
            >
              Schedule Private Land Tour
            </button>
            <button
              onClick={() => onNavigate('map')}
              className="px-7 py-3 border border-[#A6B49A]/40 text-[#F7F4EC] hover:bg-[#10291F] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer"
            >
              Open Interactive Site Map
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
