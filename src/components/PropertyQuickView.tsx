import React from 'react';
import {
  X,
  Heart,
  Share2,
  MapPin,
  Maximize2,
  Calendar,
  CheckCircle2,
  ArrowRight,
  Compass,
  Zap,
  Droplets,
  Wifi,
} from 'lucide-react';
import { PropertyItem } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface PropertyQuickViewProps {
  property: PropertyItem | null;
  isOpen: boolean;
  onClose: () => void;
  onViewFullProperty: (id: string) => void;
  onOpenGallery: (property: PropertyItem) => void;
  onEnquire: (property: PropertyItem) => void;
  isFavourite?: boolean;
  onToggleFavourite?: (id: string) => void;
}

export const PropertyQuickView: React.FC<PropertyQuickViewProps> = ({
  property,
  isOpen,
  onClose,
  onViewFullProperty,
  onOpenGallery,
  onEnquire,
  isFavourite = false,
  onToggleFavourite,
}) => {
  if (!isOpen || !property) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/70 backdrop-blur-sm animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label={`Quick view: ${property.title}`}
    >
      <div className="w-full max-w-2xl bg-[#FFFFFF] text-[#303630] rounded-2xl border border-[#D9D0BF] shadow-2xl overflow-hidden flex flex-col max-h-[92vh] animate-slideUp">
        
        {/* HEADER MEDIA SECTION */}
        <div className="relative h-64 sm:h-72 w-full bg-[#183B2B] flex-shrink-0">
          <ImageWithFallback
            src={property.heroImage}
            alt={property.title}
            category="home"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

          {/* Top actions */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
            <span className="px-3 py-1 rounded bg-[#10291F]/90 text-[#F7F4EC] text-xs font-semibold uppercase tracking-wider border border-[#A6B49A]/30">
              {property.status} · {property.setting}
            </span>

            <div className="flex items-center gap-2">
              {onToggleFavourite && (
                <button
                  onClick={() => onToggleFavourite(property.id)}
                  className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                    isFavourite
                      ? 'bg-red-500 text-white'
                      : 'bg-black/40 text-white hover:bg-black/70'
                  }`}
                  aria-label="Save to favourites"
                >
                  <Heart size={16} fill={isFavourite ? 'currentColor' : 'none'} />
                </button>
              )}
              <button
                onClick={onClose}
                className="p-2 rounded-full bg-black/40 text-white hover:bg-black/70 backdrop-blur-md transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {/* Property Title & Price on Hero overlay */}
          <div className="absolute bottom-4 left-6 right-6 z-10 text-[#F7F4EC]">
            <span className="text-[11px] font-mono uppercase tracking-widest text-[#B28B5B]">
              LOT {property.lotNumber} · {property.dimensions}
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold leading-tight">
              {property.title}
            </h3>
            <div className="flex items-center gap-4 mt-1 text-sm font-medium">
              <span className="text-[#F7F4EC] font-semibold">{property.priceDisplay}</span>
              <span className="text-[#A6B49A]">·</span>
              <span className="text-[#D9D0BF]">{property.lotSizeSqFt.toLocaleString()} Sq Ft Homesite</span>
            </div>
          </div>
        </div>

        {/* CONTENT BODY */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-6 flex-1 text-xs sm:text-sm">
          
          {/* Overview text */}
          <p className="text-[#303630]/85 leading-relaxed font-sans">
            {property.fullDescription}
          </p>

          {/* Key Specifications Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-[#F7F4EC] p-4 rounded-xl border border-[#D9D0BF]/60 text-xs">
            <div>
              <span className="text-[#A6B49A] uppercase tracking-wider text-[10px] block">Setting</span>
              <strong className="text-[#183B2B]">{property.setting}</strong>
            </div>
            <div>
              <span className="text-[#A6B49A] uppercase tracking-wider text-[10px] block">Orientation</span>
              <strong className="text-[#183B2B]">{property.orientation}</strong>
            </div>
            <div>
              <span className="text-[#A6B49A] uppercase tracking-wider text-[10px] block">Elevation</span>
              <strong className="text-[#183B2B]">{property.elevation}</strong>
            </div>
            <div>
              <span className="text-[#A6B49A] uppercase tracking-wider text-[10px] block">Pad Dimensions</span>
              <strong className="text-[#183B2B]">{property.dimensions}</strong>
            </div>
          </div>

          {/* Utilities & Infrastructure */}
          <div>
            <h4 className="font-serif text-base font-semibold text-[#183B2B] mb-2">
              Homesite Infrastructure & Readiness
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[#303630]/85">
              {property.utilitiesReady.map((util, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <CheckCircle2 size={14} className="text-[#183B2B] shrink-0" />
                  <span>{util}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Gallery preview strip */}
          {property.gallery && property.gallery.length > 0 && (
            <div>
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-serif text-base font-semibold text-[#183B2B]">
                  Property Gallery ({property.gallery.length} Images)
                </h4>
                <button
                  onClick={() => onOpenGallery(property)}
                  className="text-xs text-[#183B2B] hover:text-[#B28B5B] font-semibold underline underline-offset-2 cursor-pointer"
                >
                  View Fullscreen Lightbox
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                {property.gallery.slice(0, 3).map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => onOpenGallery(property)}
                    className="relative aspect-video rounded-lg overflow-hidden border border-[#D9D0BF] hover:opacity-90 transition-opacity cursor-pointer group"
                  >
                    <ImageWithFallback
                      src={img}
                      alt={`${property.title} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

        </div>

        {/* FOOTER ACTIONS */}
        <div className="p-4 sm:p-6 bg-[#F7F4EC] border-t border-[#D9D0BF]/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <button
            onClick={() => onViewFullProperty(property.id)}
            className="w-full sm:w-auto px-5 py-2.5 bg-[#FFFFFF] border border-[#183B2B] text-[#183B2B] hover:bg-[#183B2B] hover:text-[#F7F4EC] text-xs font-semibold rounded-md transition-colors cursor-pointer flex items-center justify-center gap-2"
          >
            <span>View Full Property Page</span>
            <ArrowRight size={14} />
          </button>

          <button
            onClick={() => onEnquire(property)}
            className="w-full sm:w-auto px-6 py-2.5 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] text-xs font-semibold rounded-md transition-colors cursor-pointer shadow-sm"
          >
            Enquire About Lot {property.lotNumber}
          </button>
        </div>

      </div>
    </div>
  );
};
