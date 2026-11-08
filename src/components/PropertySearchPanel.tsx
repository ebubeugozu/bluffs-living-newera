import React, { useState } from 'react';
import { Search, SlidersHorizontal, RotateCcw, MapPin, Check, ArrowRight } from 'lucide-react';
import { PropertyFilters } from '../types';

interface PropertySearchPanelProps {
  filters: PropertyFilters;
  onFilterChange: (filters: PropertyFilters) => void;
  onSearchSubmit: () => void;
  resultCount?: number;
  compact?: boolean;
}

export const PropertySearchPanel: React.FC<PropertySearchPanelProps> = ({
  filters,
  onFilterChange,
  onSearchSubmit,
  resultCount,
  compact = false,
}) => {
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleFieldChange = (field: keyof PropertyFilters, value: string) => {
    onFilterChange({
      ...filters,
      [field]: value,
    });
  };

  const handleReset = () => {
    onFilterChange({
      propertyType: 'all',
      transactionType: 'all',
      setting: 'all',
      priceRange: 'all',
      minLotSize: 'all',
      status: 'all',
      searchQuery: '',
    });
  };

  const hasActiveFilters =
    filters.propertyType !== 'all' ||
    filters.transactionType !== 'all' ||
    filters.setting !== 'all' ||
    filters.priceRange !== 'all' ||
    filters.minLotSize !== 'all' ||
    filters.searchQuery !== '';

  return (
    <div className="w-full bg-[#FFFFFF] rounded-2xl border border-[#D9D0BF]/80 shadow-2xl p-5 sm:p-7 text-[#303630]">
      
      {/* SEARCH PANEL HEADER */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 mb-4 border-b border-[#D9D0BF]/50">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-widest text-[#B28B5B] block">
            Discover Homes & Homesites
          </span>
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#183B2B]">
            Find Your Homesite at The Bluffs
          </h3>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          {hasActiveFilters && (
            <button
              onClick={handleReset}
              className="text-xs text-[#A6B49A] hover:text-[#183B2B] flex items-center gap-1 transition-colors cursor-pointer"
            >
              <RotateCcw size={12} />
              <span>Reset</span>
            </button>
          )}

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-[#183B2B] hover:text-[#B28B5B] font-medium flex items-center gap-1.5 transition-colors cursor-pointer px-2.5 py-1 rounded bg-[#F7F4EC]"
          >
            <SlidersHorizontal size={13} />
            <span>{showAdvanced ? 'Fewer Filters' : 'More Filters'}</span>
          </button>
        </div>
      </div>

      {/* CORE 4-COLUMN FILTER ROW */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Filter 1: Property Type */}
        <div>
          <label className="text-[11px] font-semibold text-[#183B2B] uppercase tracking-wider block mb-1.5">
            Property Type
          </label>
          <select
            value={filters.propertyType}
            onChange={(e) => handleFieldChange('propertyType', e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-lg text-[#303630] focus:outline-none focus:border-[#183B2B]"
          >
            <option value="all">All Properties</option>
            <option value="homesite">Homesite Building Pad</option>
            <option value="turnkey-home">Turnkey Tiny Home + Pad</option>
            <option value="riverfront-premium">Riverfront Premium Parcel</option>
          </select>
        </div>

        {/* Filter 2: Setting / Environment */}
        <div>
          <label className="text-[11px] font-semibold text-[#183B2B] uppercase tracking-wider block mb-1.5">
            Natural Setting
          </label>
          <select
            value={filters.setting}
            onChange={(e) => handleFieldChange('setting', e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-lg text-[#303630] focus:outline-none focus:border-[#183B2B]"
          >
            <option value="all">Any Setting</option>
            <option value="River Bluff View">River Bluff Sunset View</option>
            <option value="Hardwood Ridge">Hardwood Ridge Oak Haven</option>
            <option value="Wooded Meadow">Wooded Garden Meadow</option>
            <option value="Direct Riverfront">Direct Riverfront Shoreline</option>
          </select>
        </div>

        {/* Filter 3: Minimum Lot Size */}
        <div>
          <label className="text-[11px] font-semibold text-[#183B2B] uppercase tracking-wider block mb-1.5">
            Homesite Footprint
          </label>
          <select
            value={filters.minLotSize}
            onChange={(e) => handleFieldChange('minLotSize', e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-lg text-[#303630] focus:outline-none focus:border-[#183B2B]"
          >
            <option value="all">Any Size (6,000+ SF)</option>
            <option value="6500">6,500+ Sq Ft</option>
            <option value="7500">7,500+ Sq Ft</option>
            <option value="8000">8,000+ Sq Ft</option>
          </select>
        </div>

        {/* Filter 4: Price / Lease Structure */}
        <div>
          <label className="text-[11px] font-semibold text-[#183B2B] uppercase tracking-wider block mb-1.5">
            Pricing / Lease Option
          </label>
          <select
            value={filters.priceRange}
            onChange={(e) => handleFieldChange('priceRange', e.target.value)}
            className="w-full px-3 py-2 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-lg text-[#303630] focus:outline-none focus:border-[#183B2B]"
          >
            <option value="all">All Price Ranges</option>
            <option value="under-750">Under $750 / mo Pad Lease</option>
            <option value="750-900">$750 – $900 / mo Pad Lease</option>
            <option value="over-900">$900+ / mo Riverfront</option>
            <option value="turnkey">Turnkey Home Purchase ($140k+)</option>
          </select>
        </div>

      </div>

      {/* ADVANCED FILTER TOGGLE ACCORDION */}
      {showAdvanced && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4 mt-4 border-t border-[#D9D0BF]/50 animate-fadeIn">
          <div>
            <label className="text-[11px] font-semibold text-[#183B2B] uppercase tracking-wider block mb-1.5">
              Search by Keyword or Lot #
            </label>
            <div className="relative">
              <Search size={14} className="absolute left-3 top-3 text-[#A6B49A]" />
              <input
                type="text"
                placeholder="e.g. Lot 22, Oak, Sunset, Deck..."
                value={filters.searchQuery}
                onChange={(e) => handleFieldChange('searchQuery', e.target.value)}
                className="w-full pl-9 pr-3 py-2 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-lg text-[#303630] focus:outline-none focus:border-[#183B2B]"
              />
            </div>
          </div>

          <div>
            <label className="text-[11px] font-semibold text-[#183B2B] uppercase tracking-wider block mb-1.5">
              Availability Status
            </label>
            <select
              value={filters.status}
              onChange={(e) => handleFieldChange('status', e.target.value)}
              className="w-full px-3 py-2 text-xs bg-[#F7F4EC] border border-[#D9D0BF] rounded-lg text-[#303630] focus:outline-none focus:border-[#183B2B]"
            >
              <option value="all">All Availability</option>
              <option value="Available">Available Now</option>
              <option value="Under Contract">Under Contract / Reserved</option>
            </select>
          </div>
        </div>
      )}

      {/* ACTION BAR */}
      <div className="mt-5 pt-4 border-t border-[#D9D0BF]/50 flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="text-xs text-[#303630]/75">
          {resultCount !== undefined && (
            <span>
              Showing <strong className="text-[#183B2B] font-semibold">{resultCount}</strong> matching properties
            </span>
          )}
        </div>

        <button
          onClick={onSearchSubmit}
          className="w-full sm:w-auto px-7 py-3 bg-[#183B2B] hover:bg-[#10291F] text-[#F7F4EC] text-xs font-semibold tracking-wider uppercase rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <Search size={14} />
          <span>Search Available Properties</span>
          <ArrowRight size={14} />
        </button>
      </div>

    </div>
  );
};
