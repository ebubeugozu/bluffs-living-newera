import React from 'react';
import { Heart, Eye, Images, ArrowRight, MapPin, Maximize2, CheckCircle2 } from 'lucide-react';
import { PropertyItem } from '../types';
import { ImageWithFallback } from './ImageWithFallback';

interface PropertyCardProps {
  property: PropertyItem;
  onViewGallery: (property: PropertyItem) => void;
  onQuickView: (property: PropertyItem) => void;
  onViewFullProperty: (id: string) => void;
  onEnquire: (property: PropertyItem) => void;
  isFavourite?: boolean;
  onToggleFavourite?: (id: string) => void;
}

export const PropertyCard: React.FC<PropertyCardProps> = ({
  property,
  onViewGallery,
  onQuickView,
  onViewFullProperty,
  onEnquire,
  isFavourite = false,
  onToggleFavourite,
}) => {
  return (
    <div className="bg-[#FFFFFF] rounded-2xl border border-[#D9D0BF]/80 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col group">
      
      {/* CARD IMAGE CONTAINER */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#183B2B]">
        <ImageWithFallback
          src={property.heroImage}
          alt={property.title}
          category="home"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Status & Setting Badge */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-1 items-start">
          <span className="px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#10291F]/90 text-[#F7F4EC] border border-[#A6B49A]/30 backdrop-blur-sm">
            Lot {property.lotNumber} · {property.setting}
          </span>
          {property.status !== 'Available' && (
            <span className="px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#B28B5B] text-[#10291F]">
              {property.status}
            </span>
          )}
        </div>

        {/* Top Right Favourite & Gallery Action */}
        <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5">
          {onToggleFavourite && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                onToggleFavourite(property.id);
              }}
              className={`p-2 rounded-full backdrop-blur-md transition-colors cursor-pointer ${
                isFavourite
                  ? 'bg-red-500 text-white'
                  : 'bg-black/40 text-white hover:bg-black/70'
              }`}
              aria-label="Add to favourites"
            >
              <Heart size={14} fill={isFavourite ? 'currentColor' : 'none'} />
            </button>
          )}

          {/* Action 1: VIEW GALLERY BUTTON */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onViewGallery(property);
            }}
            className="p-2 rounded-full bg-black/40 hover:bg-black/70 text-white backdrop-blur-md transition-colors cursor-pointer flex items-center gap-1 text-[11px] font-medium"
            title="View Photo Gallery"
            aria-label="View photo gallery"
          >
            <Images size={14} />
            <span className="text-[10px] pr-0.5 font-mono">{property.gallery.length}</span>
          </button>
        </div>

        {/* Action 2: QUICK VIEW BUTTON OVERLAY ON HOVER */}
        <div className="absolute inset-x-0 bottom-3 px-3 z-10 opacity-90 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(property);
            }}
            className="w-full py-2 bg-[#10291F]/90 hover:bg-[#183B2B] text-[#F7F4EC] backdrop-blur-md rounded-md text-xs font-semibold tracking-wider uppercase transition-colors flex items-center justify-center gap-1.5 shadow-md cursor-pointer border border-[#A6B49A]/30"
          >
            <Eye size={14} className="text-[#B28B5B]" />
            <span>Quick View Specifications</span>
          </button>
        </div>
      </div>

      {/* CARD CONTENT BODY */}
      <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
        
        <div>
          {/* Price & Size Strip */}
          <div className="flex items-baseline justify-between gap-2 mb-1.5">
            <span className="font-serif text-xl sm:text-2xl font-bold text-[#183B2B]">
              {property.priceDisplay}
            </span>
            <span className="text-xs text-[#A6B49A] font-semibold">
              {property.lotSizeSqFt.toLocaleString()} sq ft
            </span>
          </div>

          <h3
            onClick={() => onViewFullProperty(property.id)}
            className="font-serif text-lg sm:text-xl font-semibold text-[#303630] group-hover:text-[#183B2B] transition-colors cursor-pointer leading-snug line-clamp-1"
          >
            {property.title}
          </h3>

          <p className="text-xs text-[#303630]/75 line-clamp-2 mt-1.5 leading-relaxed">
            {property.shortDesc}
          </p>

          {/* Key attributes bullet list */}
          <div className="mt-3 pt-3 border-t border-[#D9D0BF]/50 grid grid-cols-2 gap-y-1 text-[11px] text-[#303630]/80">
            <div>
              <span className="text-[#A6B49A] block text-[9px] uppercase">Orientation</span>
              <span className="font-medium text-[#183B2B]">{property.orientation}</span>
            </div>
            <div>
              <span className="text-[#A6B49A] block text-[9px] uppercase">Dimensions</span>
              <span className="font-medium text-[#183B2B]">{property.dimensions}</span>
            </div>
          </div>
        </div>

        {/* CARD FOOTER ACTIONS */}
        <div className="pt-3 border-t border-[#D9D0BF]/50 flex items-center gap-2">
          {/* Action 3: VIEW FULL PROPERTY */}
          <button
            onClick={() => onViewFullProperty(property.id)}
            className="flex-1 py-2 px-3 bg-[#183B2B] hover:bg-[#10291F] text-[#F7F4EC] text-xs font-semibold tracking-wider uppercase rounded-md transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>View Details</span>
            <ArrowRight size={13} />
          </button>

          <button
            onClick={() => onEnquire(property)}
            className="py-2 px-3 bg-[#F7F4EC] hover:bg-[#D9D0BF]/50 text-[#183B2B] border border-[#D9D0BF] text-xs font-semibold rounded-md transition-colors cursor-pointer"
            title="Enquire About This Homesite"
          >
            Enquire
          </button>
        </div>

      </div>

    </div>
  );
};
