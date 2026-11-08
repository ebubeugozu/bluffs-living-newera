import React, { useState, useEffect } from 'react';
import { Menu, X, ChevronDown, Lock, ShieldCheck } from 'lucide-react';
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
  const [moreDropdownOpen, setMoreDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (page: PageId) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    setMoreDropdownOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks: { id: PageId; label: string }[] = [
    { id: 'about', label: 'About' },
    { id: 'map', label: 'Interactive Map' },
    { id: 'amenities', label: 'Amenities' },
    { id: 'conservation', label: 'Conservation' },
    { id: 'eagle-cam', label: 'Eagle Cam' },
  ];

  const secondaryLinks: { id: PageId; label: string }[] = [
    { id: 'events', label: 'Events' },
    { id: 'transportation', label: 'Transportation & Distances' },
    { id: 'pitch-deck', label: 'Community Pitch Deck' },
  ];

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-[#10291F]/95 backdrop-blur-md shadow-md border-b border-[#A6B49A]/20 py-3.5'
          : 'bg-[#183B2B] text-[#F7F4EC] border-b border-[#A6B49A]/15 py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-6">
        
        {/* BRAND WORDMARK (Single text element) */}
        <button
          onClick={() => handleNavClick('home')}
          className="text-left group cursor-pointer shrink-0"
        >
          <span className="font-serif text-xl sm:text-2xl font-semibold tracking-wider text-[#F7F4EC] group-hover:text-[#B28B5B] transition-colors whitespace-nowrap">
            THE BLUFFS
          </span>
          <span className="block text-[9px] tracking-[0.25em] uppercase text-[#A6B49A] group-hover:text-[#F7F4EC] transition-colors font-sans">
            At New Era · Tennessee
          </span>
        </button>

        {/* DESKTOP NAVIGATION LINKS */}
        <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#D9D0BF]">
          {navLinks.map((link) => (
            <button
              key={link.id}
              onClick={() => handleNavClick(link.id)}
              className={`transition-colors whitespace-nowrap py-1 cursor-pointer ${
                currentPage === link.id
                  ? 'text-[#FFFFFF] font-semibold border-b-2 border-[#B28B5B]'
                  : 'hover:text-[#FFFFFF]'
              }`}
            >
              {link.label}
            </button>
          ))}

          {/* MORE DROPDOWN */}
          <div className="relative">
            <button
              onClick={() => setMoreDropdownOpen(!moreDropdownOpen)}
              className={`flex items-center gap-1 py-1 transition-colors cursor-pointer whitespace-nowrap ${
                secondaryLinks.some((l) => l.id === currentPage)
                  ? 'text-[#FFFFFF] font-semibold border-b-2 border-[#B28B5B]'
                  : 'hover:text-[#FFFFFF]'
              }`}
            >
              <span>Explore More</span>
              <ChevronDown size={14} className={`transition-transform duration-200 ${moreDropdownOpen ? 'rotate-180' : ''}`} />
            </button>

            {moreDropdownOpen && (
              <div className="absolute right-0 mt-2 w-64 bg-[#10291F] border border-[#A6B49A]/30 rounded-lg shadow-xl py-2 z-50">
                {secondaryLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => handleNavClick(link.id)}
                    className={`w-full text-left px-4 py-2 text-xs transition-colors cursor-pointer ${
                      currentPage === link.id
                        ? 'bg-[#183B2B] text-[#FFFFFF] font-semibold'
                        : 'text-[#D9D0BF] hover:bg-[#183B2B] hover:text-[#FFFFFF]'
                    }`}
                  >
                    {link.label}
                  </button>
                ))}
                <div className="border-t border-[#A6B49A]/20 my-1" />
                <button
                  onClick={() => {
                    setMoreDropdownOpen(false);
                    onOpenResidentPortal();
                  }}
                  className="w-full text-left px-4 py-2 text-xs text-[#B28B5B] hover:bg-[#183B2B] flex items-center gap-2 cursor-pointer"
                >
                  <Lock size={12} />
                  <span>Resident Portal (Future-Ready)</span>
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* PRIMARY CALL TO ACTIONS */}
        <div className="hidden sm:flex items-center gap-3 shrink-0">
          <button
            onClick={() => handleNavClick('request-info')}
            className={`px-4 py-2 text-xs font-semibold rounded-md transition-colors whitespace-nowrap cursor-pointer border ${
              currentPage === 'request-info'
                ? 'bg-[#F7F4EC] text-[#183B2B] border-[#F7F4EC]'
                : 'border-[#A6B49A]/40 text-[#F7F4EC] hover:bg-[#10291F] hover:border-[#F7F4EC]'
            }`}
          >
            Request Information
          </button>

          <button
            onClick={() => handleNavClick('apply')}
            className={`px-4 py-2 text-xs font-semibold tracking-wide rounded-md transition-all whitespace-nowrap cursor-pointer shadow-sm ${
              currentPage === 'apply'
                ? 'bg-[#c29865] text-[#10291F]'
                : 'bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F]'
            }`}
          >
            Apply Now
          </button>

          {/* ADMIN VAULT SHORTCUT ICON */}
          <button
            onClick={onOpenAdmin}
            title={`Admin Submissions Hub (${submissionCount} records)`}
            className="relative p-2 text-[#A6B49A] hover:text-[#F7F4EC] rounded-md transition-colors cursor-pointer hover:bg-[#10291F]"
          >
            <ShieldCheck size={18} />
            {submissionCount > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#B28B5B]"></span>
            )}
          </button>
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="flex items-center gap-2 lg:hidden">
          <button
            onClick={onOpenAdmin}
            title="Admin Submissions"
            className="p-2 text-[#A6B49A] hover:text-[#F7F4EC]"
          >
            <ShieldCheck size={18} />
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-[#F7F4EC] hover:text-[#B28B5B] transition-colors"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

      </div>

      {/* MOBILE COLLAPSIBLE DRAWER */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#10291F] border-b border-[#A6B49A]/20 px-6 py-6 animate-fadeIn">
          <div className="flex flex-col space-y-3 mb-6">
            <button
              onClick={() => handleNavClick('home')}
              className={`text-left py-2 text-base font-serif cursor-pointer ${
                currentPage === 'home' ? 'text-[#B28B5B] font-bold' : 'text-[#F7F4EC]'
              }`}
            >
              Home
            </button>
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left py-2 text-base font-serif cursor-pointer ${
                  currentPage === link.id ? 'text-[#B28B5B] font-bold' : 'text-[#F7F4EC]'
                }`}
              >
                {link.label}
              </button>
            ))}
            {secondaryLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => handleNavClick(link.id)}
                className={`text-left py-2 text-base font-serif cursor-pointer ${
                  currentPage === link.id ? 'text-[#B28B5B] font-bold' : 'text-[#F7F4EC]'
                }`}
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenResidentPortal();
              }}
              className="text-left py-2 text-sm text-[#A6B49A] flex items-center gap-2 cursor-pointer"
            >
              <Lock size={14} />
              <span>Resident Portal (Future Integration)</span>
            </button>
          </div>

          <div className="flex flex-col gap-2.5 pt-4 border-t border-[#A6B49A]/20">
            <button
              onClick={() => handleNavClick('request-info')}
              className="w-full py-2.5 text-center text-xs font-semibold rounded-md border border-[#A6B49A]/40 text-[#F7F4EC] cursor-pointer"
            >
              Request Information
            </button>
            <button
              onClick={() => handleNavClick('apply')}
              className="w-full py-2.5 text-center text-xs font-semibold rounded-md bg-[#B28B5B] text-[#10291F] cursor-pointer"
            >
              Apply Now
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
