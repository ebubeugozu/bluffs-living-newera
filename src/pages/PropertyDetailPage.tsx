import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Share2,
  Heart,
  Images,
  MapPin,
  CheckCircle2,
  ShieldCheck,
  ChevronDown,
  ChevronUp,
  Mail,
  Phone,
  Maximize2,
  Trees,
} from 'lucide-react';
import { PropertyItem, PageId } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { PropertyCard } from '../components/PropertyCard';
import { PROPERTY_LISTINGS, PROPERTY_STATS } from '../data/communityData';

interface PropertyDetailPageProps {
  propertyId: string;
  onNavigate: (page: PageId) => void;
  onBackToProperties?: () => void;
  onSelectProperty?: (id: string) => void;
  onViewGallery?: (images: string[], initialIndex?: number) => void;
  onOpenGallery?: (property: PropertyItem) => void;
  onQuickView?: (property: PropertyItem) => void;
  onScheduleTour: (propertyTitle?: string) => void;
  isFavourite?: boolean;
  onToggleFavourite?: (id: string) => void;
}

export const PropertyDetailPage: React.FC<PropertyDetailPageProps> = ({
  propertyId,
  onNavigate,
  onBackToProperties,
  onSelectProperty,
  onViewGallery,
  onOpenGallery,
  onQuickView,
  onScheduleTour,
  isFavourite = false,
  onToggleFavourite,
}) => {
  const property = PROPERTY_LISTINGS.find((p) => p.id === propertyId) || PROPERTY_LISTINGS[0];

  const handleBack = () => {
    if (onBackToProperties) {
      onBackToProperties();
    } else {
      onNavigate('properties');
    }
  };

  const handleGalleryOpen = () => {
    if (onViewGallery) {
      onViewGallery(property.gallery, selectedGalleryIdx);
    } else if (onOpenGallery) {
      onOpenGallery(property);
    }
  };

  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);
  const [selectedGalleryIdx, setSelectedGalleryIdx] = useState<number>(0);

  // Similar properties (find 3-4 properties excluding the current one)
  const similarProperties = PROPERTY_LISTINGS.filter((p) => p.id !== property.id).slice(0, 3);

  return (
    <div className="bg-[#F7F4EC] text-[#303630]">
      
      {/* BREADCRUMB STRIP & BACK ACTION */}
      <section className="bg-[#10291F] text-[#F7F4EC] py-3.5 px-4 sm:px-6 lg:px-8 border-b border-[#A6B49A]/20">
        <div className="max-w-7xl mx-auto flex items-center justify-between text-xs">
          <button
            onClick={handleBack}
            className="flex items-center gap-1.5 text-[#D9D0BF] hover:text-[#FFFFFF] transition-colors cursor-pointer"
          >
            <ArrowLeft size={14} />
            <span>Back to All Homes & Homesites</span>
          </button>

          <div className="hidden sm:flex items-center gap-2 text-[#A6B49A]">
            <span>The Bluffs</span>
            <span>/</span>
            <span>Homesites</span>
            <span>/</span>
            <span className="text-[#F7F4EC] font-medium">Lot {property.lotNumber}</span>
          </div>
        </div>
      </section>

      {/* DEDICATED PROPERTY HERO GALLERY */}
      <section className="bg-[#183B2B] text-[#F7F4EC] py-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header Title & Pricing Row */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-[#A6B49A]/20">
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-[#10291F] text-[#B28B5B] border border-[#B28B5B]/30 text-xs font-semibold uppercase tracking-wider">
                  Lot {property.lotNumber} · {property.setting}
                </span>
                <span className="text-xs text-[#A6B49A] font-semibold">
                  {property.status}
                </span>
              </div>

              <h1 className="font-serif text-3xl sm:text-5xl font-bold tracking-tight text-[#F7F4EC]">
                {property.title}
              </h1>

              <div className="flex flex-wrap items-center gap-4 text-xs sm:text-sm text-[#D9D0BF]">
                <span className="flex items-center gap-1">
                  <MapPin size={14} className="text-[#B28B5B]" />
                  <span>The Bluffs at New Era, Linden, TN</span>
                </span>
                <span>·</span>
                <span>{property.lotSizeSqFt.toLocaleString()} Sq Ft Homesite</span>
                <span>·</span>
                <span>Elevation: {property.elevation}</span>
              </div>
            </div>

            {/* Price block & Tour CTA */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <div className="text-left sm:text-right">
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#A6B49A] block">
                  Lease / Purchase Rate
                </span>
                <div className="font-serif text-3xl sm:text-4xl font-bold text-[#F7F4EC]">
                  {property.priceDisplay}
                </div>
              </div>

              <button
                onClick={() => onScheduleTour(property.title)}
                className="px-6 py-3.5 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] font-semibold text-xs tracking-wider uppercase rounded-md transition-all shadow-lg flex items-center gap-2 cursor-pointer whitespace-nowrap"
              >
                <Calendar size={15} />
                <span>Schedule Private Tour</span>
              </button>
            </div>
          </div>

          {/* Large Multi-Image Gallery Showcase */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
            
            {/* Primary Featured View */}
            <div className="lg:col-span-8 relative aspect-[16/10] rounded-xl overflow-hidden shadow-2xl bg-[#10291F]">
              <ImageWithFallback
                src={property.gallery[selectedGalleryIdx] || property.heroImage}
                alt={property.title}
                category="home"
                className="w-full h-full object-cover"
              />

              <button
                onClick={handleGalleryOpen}
                className="absolute bottom-4 right-4 z-10 px-4 py-2 bg-black/70 hover:bg-black/90 text-white backdrop-blur-md rounded-md text-xs font-semibold flex items-center gap-2 cursor-pointer transition-colors"
              >
                <Images size={15} />
                <span>View All {property.gallery.length} Photos</span>
              </button>
            </div>

            {/* Thumbnail Stack */}
            <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-4">
              {property.gallery.slice(0, 3).map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedGalleryIdx(idx)}
                  className={`relative aspect-video rounded-xl overflow-hidden border-2 transition-all cursor-pointer ${
                    selectedGalleryIdx === idx ? 'border-[#B28B5B] shadow-lg' : 'border-transparent opacity-75 hover:opacity-100'
                  }`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`${property.title} thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* PROPERTY SPECIFICATIONS & FULL CONTENT */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* LEFT 8 COLUMNS: DETAILED WRITEUP, SPECS, FAQS */}
          <div className="lg:col-span-8 space-y-10">
            
            {/* Property Overview */}
            <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#D9D0BF]/80 shadow-sm space-y-4">
              <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#183B2B] block">
                Homesite Overview
              </span>
              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#183B2B]">
                About Lot {property.lotNumber} at The Bluffs
              </h2>
              <p className="text-sm text-[#303630]/85 font-sans leading-relaxed">
                {property.fullDescription}
              </p>

              {/* Key Features Bullet List */}
              <div className="pt-4 border-t border-[#D9D0BF]/50">
                <h4 className="text-xs uppercase font-bold text-[#183B2B] tracking-wider mb-3">
                  Key Distinctive Features
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {property.features.map((feat, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#303630]/85">
                      <CheckCircle2 size={15} className="text-[#183B2B] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Specifications Matrix */}
            <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#D9D0BF]/80 shadow-sm space-y-4">
              <h3 className="font-serif text-2xl font-semibold text-[#183B2B]">
                Site Dimensions & Technical Parameters
              </h3>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs pt-2">
                <div className="p-3 bg-[#F7F4EC] rounded-lg border border-[#D9D0BF]/50">
                  <span className="text-[10px] uppercase text-[#A6B49A] font-bold block">Lot Footprint</span>
                  <span className="text-sm font-semibold text-[#183B2B]">{property.lotSizeSqFt.toLocaleString()} sq ft</span>
                </div>
                <div className="p-3 bg-[#F7F4EC] rounded-lg border border-[#D9D0BF]/50">
                  <span className="text-[10px] uppercase text-[#A6B49A] font-bold block">Dimensions</span>
                  <span className="text-sm font-semibold text-[#183B2B]">{property.dimensions}</span>
                </div>
                <div className="p-3 bg-[#F7F4EC] rounded-lg border border-[#D9D0BF]/50">
                  <span className="text-[10px] uppercase text-[#A6B49A] font-bold block">Elevation</span>
                  <span className="text-sm font-semibold text-[#183B2B]">{property.elevation}</span>
                </div>
                <div className="p-3 bg-[#F7F4EC] rounded-lg border border-[#D9D0BF]/50">
                  <span className="text-[10px] uppercase text-[#A6B49A] font-bold block">Setting</span>
                  <span className="text-sm font-semibold text-[#183B2B]">{property.setting}</span>
                </div>
              </div>

              {/* Commissioned Utilities */}
              <div className="pt-4 border-t border-[#D9D0BF]/50">
                <h4 className="text-xs uppercase font-bold text-[#183B2B] tracking-wider mb-2">
                  Commissioned Utilities at Pad
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#303630]/85">
                  {property.utilitiesReady.map((u, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[#B28B5B]" />
                      <span>{u}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Property FAQs */}
            {property.faqs && property.faqs.length > 0 && (
              <div className="bg-[#FFFFFF] p-8 rounded-2xl border border-[#D9D0BF]/80 shadow-sm space-y-4">
                <h3 className="font-serif text-2xl font-semibold text-[#183B2B]">
                  Frequently Asked Questions About Lot {property.lotNumber}
                </h3>
                <div className="space-y-3">
                  {property.faqs.map((faq, idx) => (
                    <div key={idx} className="border border-[#D9D0BF]/60 rounded-lg overflow-hidden">
                      <button
                        onClick={() => setExpandedFaq(expandedFaq === idx ? null : idx)}
                        className="w-full p-4 text-left font-semibold text-xs text-[#183B2B] flex items-center justify-between hover:bg-[#F7F4EC] transition-colors"
                      >
                        <span>{faq.question}</span>
                        {expandedFaq === idx ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>
                      {expandedFaq === idx && (
                        <div className="p-4 pt-0 text-xs text-[#303630]/80 leading-relaxed bg-[#F7F4EC]/50">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

          </div>

          {/* RIGHT 4 COLUMNS: INQUIRY & TOUR ACTION CARD */}
          <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-24">
            
            <div className="bg-[#FFFFFF] p-7 rounded-2xl border border-[#D9D0BF]/80 shadow-lg space-y-5">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-[#B28B5B] block mb-1">
                  Private Reservation
                </span>
                <h3 className="font-serif text-2xl font-bold text-[#183B2B]">
                  Inquire About Lot {property.lotNumber}
                </h3>
                <p className="text-xs text-[#303630]/75 mt-1 leading-relaxed">
                  Connect with our community director to reserve this homesite or schedule an on-site walk.
                </p>
              </div>

              <div className="space-y-3">
                <button
                  onClick={() => onScheduleTour(property.title)}
                  className="w-full py-3 bg-[#183B2B] hover:bg-[#10291F] text-[#F7F4EC] text-xs font-semibold tracking-wider uppercase rounded-md transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
                >
                  <Calendar size={14} />
                  <span>Schedule Private Tour</span>
                </button>

                <button
                  onClick={() => onNavigate('apply')}
                  className="w-full py-3 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] text-xs font-semibold tracking-wider uppercase rounded-md transition-colors cursor-pointer shadow-sm"
                >
                  Apply for This Homesite
                </button>
              </div>

              <div className="pt-4 border-t border-[#D9D0BF]/50 text-xs space-y-2 text-[#303630]/80">
                <div className="flex items-center gap-2">
                  <Mail size={14} className="text-[#B28B5B]" />
                  <a href={`mailto:${PROPERTY_STATS.contactEmail}`} className="hover:underline">
                    {PROPERTY_STATS.contactEmail}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <ShieldCheck size={14} className="text-[#183B2B]" />
                  <span>No application fees or deposit required to inquire</span>
                </div>
              </div>
            </div>

            {/* Quick Map Link Card */}
            <div className="bg-[#183B2B] text-[#F7F4EC] p-6 rounded-2xl border border-[#A6B49A]/20 space-y-3">
              <span className="text-[10px] uppercase tracking-wider font-semibold text-[#B28B5B] block">
                Master Site Location
              </span>
              <h4 className="font-serif text-lg font-semibold">
                View Lot {property.lotNumber} on the 140-Acre Map
              </h4>
              <p className="text-xs text-[#D9D0BF]">
                Explore how Lot {property.lotNumber} connects to the river trails, helipad, and community hearth.
              </p>
              <button
                onClick={() => onNavigate('map')}
                className="w-full py-2 bg-[#F7F4EC] text-[#183B2B] hover:bg-white text-xs font-semibold rounded transition-colors"
              >
                Open Interactive Map
              </button>
            </div>

          </div>

        </div>
      </section>

      {/* SIMILAR PROPERTIES SECTION */}
      {similarProperties.length > 0 && (
        <section className="py-16 bg-[#F7F4EC] border-t border-[#D9D0BF]/60">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
              <div>
                <span className="text-xs uppercase tracking-[0.2em] font-semibold text-[#183B2B] block">
                  Compare Homesites
                </span>
                <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[#183B2B]">
                  Similar Homesites & Living Options
                </h3>
              </div>
              <button
                onClick={handleBack}
                className="text-xs font-semibold text-[#183B2B] hover:text-[#B28B5B] underline underline-offset-4 cursor-pointer"
              >
                View All {PROPERTY_LISTINGS.length} Properties
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {similarProperties.map((sim) => (
                <PropertyCard
                  key={sim.id}
                  property={sim}
                  onViewGallery={(p) => {
                    if (onOpenGallery) onOpenGallery(p);
                    else if (onViewGallery) onViewGallery(p.gallery, 0);
                  }}
                  onQuickView={(p) => {
                    if (onQuickView) onQuickView(p);
                    else if (onSelectProperty) onSelectProperty(p.id);
                  }}
                  onViewFullProperty={(id) => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                    if (onSelectProperty) {
                      onSelectProperty(id);
                    } else {
                      window.location.hash = `property/${id}`;
                    }
                  }}
                  onEnquire={() => onScheduleTour(sim.title)}
                />
              ))}
            </div>
          </div>
        </section>
      )}

    </div>
  );
};
