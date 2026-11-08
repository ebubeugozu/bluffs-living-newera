import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ChevronDown, Lock, ShieldCheck, Calendar, MapPin, Compass } from 'lucide-react';
import { PageId } from '../types';

interface HeaderProps {
  currentPage: PageId;
  onNavigate: (page: PageId) => void;
  onOpenAdmin: () => void;
  onOpenResidentPortal: () => void;
  submissionCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentPage,
  onNavigate,
  onOpenAdmin,
  onOpenResidentPortal,
  submissionCount,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setOpenDropdown(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleDropdown = (name: string) => {
    setOpenDropdown((prev) => (prev === name ? null : name));
  };

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-[#10291F]/98 backdrop-blur-md shadow-md border-b border-[#A6B49A]/20 py-3'
          : 'bg-[#183B2B] text-[#F7F4EC] border-b border-[#A6B49A]/15 py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* BRAND WORDMARK */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer shrink-0"
        >
          <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wider text-[#F7F4EC] group-hover:text-[#B28B5B] transition-colors whitespace-nowrap">
            THE BLUFFS
          </span>
          <span className="block text-[9px] tracking-[0.25em] uppercase text-[#A6B49A] group-hover:text-[#F7F4EC] transition-colors font-sans">
            At New Era · Linden, TN
          </span>
        </button>

        {/* DESKTOP STRUCTURED NAVIGATION WITH LOGICAL DROPDOWNS */}
        <nav ref={dropdownRef} className="hidden lg:flex items-center gap-5 xl:gap-6 text-xs xl:text-sm font-medium text-[#D9D0BF]">
          
          {/* HOME */}
          <button
            onClick={() => handleNavClick('home')}
            className={`py-1 transition-colors whitespace-nowrap cursor-pointer ${
              currentPage === 'home'
                ? 'text-[#FFFFFF] font-semibold border-b-2 border-[#B28B5B]'
                : 'hover:text-[#FFFFFF]'
            }`}
          >
            Home
          </button>

          {/* THE COMMUNITY DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('community')}
              onMouseEnter={() => setOpenDropdown('community')}
              className={`flex items-center gap-1 py-1 transition-colors cursor-pointer whitespace-nowrap ${
                currentPage === 'about' || currentPage === 'map' || currentPage === 'conservation'
                  ? 'text-[#FFFFFF] font-semibold border-b-2 border-[#B28B5B]'
                  : 'hover:text-[#FFFFFF]'
              }`}
            >
              <span>The Community</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${openDropdown === 'community' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'community' && (
              <div
                onMouseLeave={() => setOpenDropdown(null)}
                className="absolute left-0 mt-2 w-56 bg-[#10291F] border border-[#A6B49A]/30 rounded-lg shadow-xl py-2 z-50"
              >
                <button
                  onClick={() => handleNavClick('about')}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer ${
                    currentPage === 'about' ? 'bg-[#183B2B] text-[#FFFFFF] font-semibold' : 'text-[#D9D0BF] hover:bg-[#183B2B] hover:text-[#FFFFFF]'
                  }`}
                >
                  About the Community
                </button>
                <button
                  onClick={() => handleNavClick('map')}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer ${
                    currentPage === 'map' ? 'bg-[#183B2B] text-[#FFFFFF] font-semibold' : 'text-[#D9D0BF] hover:bg-[#183B2B] hover:text-[#FFFFFF]'
                  }`}
                >
                  Community Map & Directory
                </button>
                <button
                  onClick={() => handleNavClick('conservation')}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer ${
                    currentPage === 'conservation' ? 'bg-[#183B2B] text-[#FFFFFF] font-semibold' : 'text-[#D9D0BF] hover:bg-[#183B2B] hover:text-[#FFFFFF]'
                  }`}
                >
                  Conservation Study
                </button>
                <button
                  onClick={() => handleNavClick('eagle-cam')}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer ${
                    currentPage === 'eagle-cam' ? 'bg-[#183B2B] text-[#FFFFFF] font-semibold' : 'text-[#D9D0BF] hover:bg-[#183B2B] hover:text-[#FFFFFF]'
                  }`}
                >
                  Live Eagle Cam
                </button>
              </div>
            )}
          </div>

          {/* HOMES & HOMESITES DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('homes')}
              onMouseEnter={() => setOpenDropdown('homes')}
              className={`flex items-center gap-1 py-1 transition-colors cursor-pointer whitespace-nowrap ${
                currentPage === 'properties'
                  ? 'text-[#FFFFFF] font-semibold border-b-2 border-[#B28B5B]'
                  : 'hover:text-[#FFFFFF]'
              }`}
            >
              <span>Homes & Homesites</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${openDropdown === 'homes' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'homes' && (
              <div
                onMouseLeave={() => setOpenDropdown(null)}
                className="absolute left-0 mt-2 w-60 bg-[#10291F] border border-[#A6B49A]/30 rounded-lg shadow-xl py-2 z-50"
              >
                <button
                  onClick={() => handleNavClick('properties')}
                  className="w-full text-left px-4 py-2 text-xs text-[#D9D0BF] hover:bg-[#183B2B] hover:text-[#FFFFFF] cursor-pointer"
                >
                  Browse Homes & Homesites
                </button>
                <button
                  onClick={() => {
                    handleNavClick('properties');
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-[#D9D0BF] hover:bg-[#183B2B] hover:text-[#FFFFFF] cursor-pointer"
                >
                  Property Search & Filters
                </button>
                <button
                  onClick={() => handleNavClick('pitch-deck')}
                  className="w-full text-left px-4 py-2 text-xs text-[#D9D0BF] hover:bg-[#183B2B] hover:text-[#FFFFFF] cursor-pointer"
                >
                  Community Pitch Deck & Prospectus
                </button>
              </div>
            )}
          </div>

          {/* LIVING HERE DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => toggleDropdown('living')}
              onMouseEnter={() => setOpenDropdown('living')}
              className={`flex items-center gap-1 py-1 transition-colors cursor-pointer whitespace-nowrap ${
                currentPage === 'amenities' || currentPage === 'resident-services' || currentPage === 'rentals'
                  ? 'text-[#FFFFFF] font-semibold border-b-2 border-[#B28B5B]'
                  : 'hover:text-[#FFFFFF]'
              }`}
            >
              <span>Living Here</span>
              <ChevronDown size={13} className={`transition-transform duration-200 ${openDropdown === 'living' ? 'rotate-180' : ''}`} />
            </button>

            {openDropdown === 'living' && (
              <div
                onMouseLeave={() => setOpenDropdown(null)}
                className="absolute left-0 mt-2 w-56 bg-[#10291F] border border-[#A6B49A]/30 rounded-lg shadow-xl py-2 z-50"
              >
                <button
                  onClick={() => handleNavClick('amenities')}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer ${
                    currentPage === 'amenities' ? 'bg-[#183B2B] text-[#FFFFFF] font-semibold' : 'text-[#D9D0BF] hover:bg-[#183B2B] hover:text-[#FFFFFF]'
                  }`}
                >
                  Lifestyle & Amenities
                </button>
                <button
                  onClick={() => handleNavClick('resident-services')}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer ${
                    currentPage === 'resident-services' ? 'bg-[#183B2B] text-[#FFFFFF] font-semibold' : 'text-[#D9D0BF] hover:bg-[#183B2B] hover:text-[#FFFFFF]'
                  }`}
                >
                  Resident Services
                </button>
                <button
                  onClick={() => handleNavClick('rentals')}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer ${
                    currentPage === 'rentals' ? 'bg-[#183B2B] text-[#FFFFFF] font-semibold' : 'text-[#D9D0BF] hover:bg-[#183B2B] hover:text-[#FFFFFF]'
                  }`}
                >
                  Managed Rentals
                </button>
                <button
                  onClick={() => handleNavClick('events')}
                  className={`w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer ${
                    currentPage === 'events' ? 'bg-[#183B2B] text-[#FFFFFF] font-semibold' : 'text-[#D9D0BF] hover:bg-[#183B2B] hover:text-[#FFFFFF]'
                  }`}
                >
                  Community Events Calendar
                </button>
              </div>
            )}
          </div>

          {/* GALLERY */}
          <button
            onClick={() => handleNavClick('gallery')}
            className={`py-1 transition-colors whitespace-nowrap cursor-pointer ${
              currentPage === 'gallery'
                ? 'text-[#FFFFFF] font-semibold border-b-2 border-[#B28B5B]'
                : 'hover:text-[#FFFFFF]'
            }`}
          >
            Gallery
          </button>

          {/* LOCATION */}
          <button
            onClick={() => handleNavClick('location')}
            className={`py-1 transition-colors whitespace-nowrap cursor-pointer ${
              currentPage === 'location' || currentPage === 'transportation'
                ? 'text-[#FFFFFF] font-semibold border-b-2 border-[#B28B5B]'
                : 'hover:text-[#FFFFFF]'
            }`}
          >
            Location
          </button>

        </nav>

        {/* PRIMARY CALL TO ACTIONS: PROMINENT 'SCHEDULE A PRIVATE TOUR' BUTTON */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('tour')}
            className={`px-4 py-2 text-xs font-semibold tracking-wide rounded-md transition-all whitespace-nowrap cursor-pointer shadow-md flex items-center gap-2 ${
              currentPage === 'tour' || currentPage === 'request-info'
                ? 'bg-[#c29865] text-[#10291F]'
                : 'bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F]'
            }`}
          >
            <Calendar size={14} />
            <span>Schedule a Private Tour</span>
          </button>

          <button
            onClick={() => handleNavClick('apply')}
            className={`px-3.5 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer border ${
              currentPage === 'apply'
                ? 'bg-[#F7F4EC] text-[#183B2B] border-[#F7F4EC]'
                : 'border-[#A6B49A]/40 text-[#F7F4EC] hover:bg-[#10291F] hover:border-[#F7F4EC]'
            }`}
          >
            Apply
          </button>

          {/* ADMIN VAULT SHORTCUT ICON */}
          <button
            onClick={onOpenAdmin}
            title={`Admin Submissions Hub (${submissionCount} records)`}
            className="p-2 text-[#A6B49A] hover:text-[#F7F4EC] rounded-md transition-colors cursor-pointer hover:bg-[#10291F]"
          >
            <ShieldCheck size={18} />
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={() => handleNavClick('tour')}
            className="px-3 py-1.5 bg-[#B28B5B] text-[#10291F] font-semibold text-xs rounded"
          >
            Tour
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#F7F4EC] hover:text-[#B28B5B] transition-colors cursor-pointer"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* MOBILE COLLAPSIBLE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#10291F] border-b border-[#A6B49A]/20 px-6 py-6 animate-fadeIn max-h-[85vh] overflow-y-auto">
          <div className="space-y-4 mb-6">
            
            {/* Home */}
            <button
              onClick={() => handleNavClick('home')}
              className={`w-full text-left py-1 text-base font-serif cursor-pointer ${
                currentPage === 'home' ? 'text-[#B28B5B] font-bold' : 'text-[#F7F4EC]'
              }`}
            >
              Home
            </button>

            {/* The Community Group */}
            <div className="pt-2 border-t border-[#A6B49A]/15">
              <span className="text-[10px] uppercase font-bold text-[#A6B49A] tracking-wider block mb-2">
                The Community
              </span>
              <div className="space-y-2 pl-2">
                <button
                  onClick={() => handleNavClick('about')}
                  className="block text-sm text-[#D9D0BF] hover:text-[#FFFFFF]"
                >
                  About the Community
                </button>
                <button
                  onClick={() => handleNavClick('map')}
                  className="block text-sm text-[#D9D0BF] hover:text-[#FFFFFF]"
                >
                  Community Map & Directory
                </button>
                <button
                  onClick={() => handleNavClick('conservation')}
                  className="block text-sm text-[#D9D0BF] hover:text-[#FFFFFF]"
                >
                  Conservation Study
                </button>
                <button
                  onClick={() => handleNavClick('eagle-cam')}
                  className="block text-sm text-[#D9D0BF] hover:text-[#FFFFFF]"
                >
                  Live Eagle Cam
                </button>
              </div>
            </div>

            {/* Homes & Homesites Group */}
            <div className="pt-2 border-t border-[#A6B49A]/15">
              <span className="text-[10px] uppercase font-bold text-[#A6B49A] tracking-wider block mb-2">
                Homes & Homesites
              </span>
              <div className="space-y-2 pl-2">
                <button
                  onClick={() => handleNavClick('properties')}
                  className="block text-sm text-[#D9D0BF] hover:text-[#FFFFFF]"
                >
                  Browse Homes & Homesites
                </button>
                <button
                  onClick={() => handleNavClick('properties')}
                  className="block text-sm text-[#D9D0BF] hover:text-[#FFFFFF]"
                >
                  Property Search & Filters
                </button>
                <button
                  onClick={() => handleNavClick('pitch-deck')}
                  className="block text-sm text-[#D9D0BF] hover:text-[#FFFFFF]"
                >
                  Community Pitch Deck
                </button>
              </div>
            </div>

            {/* Living Here Group */}
            <div className="pt-2 border-t border-[#A6B49A]/15">
              <span className="text-[10px] uppercase font-bold text-[#A6B49A] tracking-wider block mb-2">
                Living Here
              </span>
              <div className="space-y-2 pl-2">
                <button
                  onClick={() => handleNavClick('amenities')}
                  className="block text-sm text-[#D9D0BF] hover:text-[#FFFFFF]"
                >
                  Lifestyle & Amenities
                </button>
                <button
                  onClick={() => handleNavClick('resident-services')}
                  className="block text-sm text-[#D9D0BF] hover:text-[#FFFFFF]"
                >
                  Resident Services
                </button>
                <button
                  onClick={() => handleNavClick('rentals')}
                  className="block text-sm text-[#D9D0BF] hover:text-[#FFFFFF]"
                >
                  Managed Rentals
                </button>
                <button
                  onClick={() => handleNavClick('events')}
                  className="block text-sm text-[#D9D0BF] hover:text-[#FFFFFF]"
                >
                  Events Calendar
                </button>
              </div>
            </div>

            {/* Gallery & Location */}
            <div className="pt-2 border-t border-[#A6B49A]/15 space-y-2">
              <button
                onClick={() => handleNavClick('gallery')}
                className="block text-sm text-[#D9D0BF] hover:text-[#FFFFFF]"
              >
                Community Gallery
              </button>
              <button
                onClick={() => handleNavClick('location')}
                className="block text-sm text-[#D9D0BF] hover:text-[#FFFFFF]"
              >
                Location & Distances
              </button>
            </div>

            {/* Resident Portal */}
            <div className="pt-2 border-t border-[#A6B49A]/15">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenResidentPortal();
                }}
                className="text-left py-1 text-xs text-[#B28B5B] flex items-center gap-2 cursor-pointer"
              >
                <Lock size={12} />
                <span>Resident Portal (Document Vault)</span>
              </button>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="flex flex-col gap-2.5 pt-4 border-t border-[#A6B49A]/20">
            <button
              onClick={() => handleNavClick('tour')}
              className="w-full py-2.5 text-center text-xs font-semibold rounded-md bg-[#B28B5B] text-[#10291F] flex items-center justify-center gap-2 shadow-md"
            >
              <Calendar size={14} />
              <span>Schedule a Private Tour</span>
            </button>
            <button
              onClick={() => handleNavClick('apply')}
              className="w-full py-2.5 text-center text-xs font-semibold rounded-md border border-[#A6B49A]/40 text-[#F7F4EC]"
            >
              Apply to The Bluffs
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
