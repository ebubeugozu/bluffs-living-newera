import React from 'react';
import { Mail, Instagram, Facebook, ArrowUpRight, Compass, ShieldCheck, Lock } from 'lucide-react';
import { PageId } from '../types';
import { PROPERTY_STATS } from '../data/communityData';

interface FooterProps {
  onNavigate: (page: PageId) => void;
  onOpenAdmin: () => void;
  onOpenResidentPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onNavigate,
  onOpenAdmin,
  onOpenResidentPortal,
}) => {
  const currentYear = new Date().getFullYear();

  const handleNav = (page: PageId) => {
    onNavigate(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#10291F] text-[#F7F4EC] border-t border-[#A6B49A]/20 pt-16 pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* TOP BRAND & NEWSLETTER STRIP */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-12 border-b border-[#A6B49A]/15">
          
          {/* BRAND IDENTITY */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2">
              <Compass className="text-[#B28B5B]" size={24} />
              <span className="font-serif text-2xl font-bold tracking-wider text-[#F7F4EC]">
                THE BLUFFS AT NEW ERA
              </span>
            </div>
            
            <p className="text-xs uppercase tracking-widest text-[#B28B5B] font-semibold">
              Linden, Perry County, Tennessee
            </p>

            <p className="text-sm text-[#D9D0BF] leading-relaxed max-w-md font-sans">
              A private, boutique nature-focused tiny-home residential retreat across 140 acres overlooking half a mile of the Tennessee River. Designed around privacy, open skies, and genuine community living.
            </p>

            {/* Direct Contact Email */}
            <div className="pt-2">
              <a
                href={`mailto:${PROPERTY_STATS.contactEmail}`}
                className="inline-flex items-center gap-2 text-sm text-[#F7F4EC] hover:text-[#B28B5B] transition-colors group"
              >
                <Mail size={16} className="text-[#B28B5B]" />
                <span className="underline underline-offset-4 decoration-[#B28B5B]/50 group-hover:decoration-[#B28B5B]">
                  {PROPERTY_STATS.contactEmail}
                </span>
                <ArrowUpRight size={14} className="opacity-70 group-hover:opacity-100" />
              </a>
            </div>
          </div>

          {/* COMMUNITY EXPLORATION LINKS */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#A6B49A] font-semibold mb-3">
              Explore Community
            </h4>
            <ul className="space-y-2 text-sm text-[#D9D0BF]">
              <li>
                <button
                  onClick={() => handleNav('home')}
                  className="hover:text-[#F7F4EC] transition-colors cursor-pointer"
                >
                  Home
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('about')}
                  className="hover:text-[#F7F4EC] transition-colors cursor-pointer"
                >
                  About the Land & Vision
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('map')}
                  className="hover:text-[#F7F4EC] transition-colors cursor-pointer"
                >
                  Interactive Property Map
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('amenities')}
                  className="hover:text-[#F7F4EC] transition-colors cursor-pointer"
                >
                  Amenities & Utilities
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('conservation')}
                  className="hover:text-[#F7F4EC] transition-colors cursor-pointer"
                >
                  Conservation Study
                </button>
              </li>
              <li>
                <button
                  onClick={() => handleNav('eagle-cam')}
                  className="hover:text-[#F7F4EC] transition-colors cursor-pointer"
                >
                  Live Eagle Cam
                </button>
              </li>
            </ul>
          </div>

          {/* DISCOVERY & ENGAGEMENT */}
          <div className="md:col-span-4 space-y-4">
            <h4 className="text-xs uppercase tracking-widest text-[#A6B49A] font-semibold mb-3">
              Resident & Inquiries
            </h4>
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => handleNav('request-info')}
                className="w-full text-center py-2 px-4 rounded-md border border-[#A6B49A]/40 text-[#F7F4EC] hover:bg-[#183B2B] text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                Request Information & Tour
              </button>
              <button
                onClick={() => handleNav('apply')}
                className="w-full text-center py-2 px-4 rounded-md bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] text-xs font-semibold tracking-wider uppercase transition-colors"
              >
                Submit Resident Application
              </button>
              <button
                onClick={onOpenResidentPortal}
                className="w-full flex items-center justify-center gap-2 text-center py-2 px-4 rounded-md bg-[#183B2B]/60 text-[#A6B49A] hover:text-[#F7F4EC] text-xs font-medium transition-colors"
              >
                <Lock size={12} />
                <span>Resident Portal (DocuSign Lease Vault)</span>
              </button>
            </div>

            {/* Social channels */}
            <div className="pt-3">
              <span className="text-[11px] uppercase tracking-wider text-[#A6B49A] block mb-2 font-medium">
                Official Channels
              </span>
              <div className="flex items-center gap-4 text-sm text-[#D9D0BF]">
                <a
                  href="https://instagram.com/bluffsnewera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#B28B5B] transition-colors"
                >
                  <Instagram size={16} />
                  <span>@bluffsnewera</span>
                </a>
                <a
                  href="https://facebook.com/bluffsnewera"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 hover:text-[#B28B5B] transition-colors"
                >
                  <Facebook size={16} />
                  <span>@bluffsnewera</span>
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* BOTTOM METADATA & DISCLAIMERS */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-[#A6B49A]">
          <div>
            <p>
              © {currentYear} The Bluffs at New Era. All rights reserved. Linden, Tennessee.
            </p>
            <p className="text-[11px] text-[#A6B49A]/70 mt-1 max-w-2xl">
              The Bluffs at New Era is a private residential tiny-home community. Homesite configurations and community amenities are subject to local permitting, natural conditions, and seasonal covenants.
            </p>
          </div>

          <div className="flex items-center gap-4 text-xs text-[#D9D0BF]">
            <button
              onClick={() => handleNav('pitch-deck')}
              className="hover:text-[#FFFFFF] underline underline-offset-2"
            >
              Pitch Deck
            </button>
            <button
              onClick={() => handleNav('transportation')}
              className="hover:text-[#FFFFFF] underline underline-offset-2"
            >
              Distances & Access
            </button>
            <button
              onClick={onOpenAdmin}
              className="flex items-center gap-1 text-[#A6B49A] hover:text-[#B28B5B]"
              title="Admin Inquiries Hub"
            >
              <ShieldCheck size={14} />
              <span>Admin Records</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
