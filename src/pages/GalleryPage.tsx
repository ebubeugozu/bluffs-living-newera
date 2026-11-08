import React, { useState } from 'react';
import { Images, Filter, ArrowRight, Eye, Calendar } from 'lucide-react';
import { PageId, GalleryPhoto } from '../types';
import { ImageWithFallback } from '../components/ImageWithFallback';
import { COMMUNITY_GALLERY_PHOTOS } from '../data/communityData';

import { LightboxImageItem } from '../components/GalleryLightbox';

interface GalleryPageProps {
  onNavigate: (page: PageId) => void;
  onOpenLightbox: (images: LightboxImageItem[], index: number) => void;
  onScheduleTour?: () => void;
}

export const GalleryPage: React.FC<GalleryPageProps> = ({
  onNavigate,
  onOpenLightbox,
  onScheduleTour = () => onNavigate('tour'),
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'River & Bluffs',
    'Homes & Architecture',
    'Nature & Trails',
    'Community Amenities',
    'Wildlife',
  ];

  const filteredPhotos = COMMUNITY_GALLERY_PHOTOS.filter((photo) => {
    if (selectedCategory === 'all') return true;
    return photo.category === selectedCategory;
  });

  const handlePhotoClick = (index: number) => {
    onOpenLightbox(
      filteredPhotos.map((p) => ({
        url: p.url,
        title: p.title,
        caption: `${p.category} · ${p.caption}`,
      })),
      index
    );
  };

  return (
    <div className="bg-[#F7F4EC] text-[#303630]">
      
      {/* HEADER */}
      <section className="bg-[#183B2B] text-[#F7F4EC] py-20 lg:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#A6B49A]/20">
        <div className="max-w-4xl mx-auto text-center space-y-4">
          <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#B28B5B]">
            Visual Photography Showcase
          </span>
          <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-[#F7F4EC] text-balance">
            The Bluffs in Pictures
          </h1>
          <p className="text-base sm:text-lg text-[#D9D0BF] max-w-2xl mx-auto font-light leading-relaxed">
            Immerse yourself in the landscape, riverfront bluffs, handcrafted tiny homes, and natural wildlife of our 140-acre community in Linden, Tennessee.
          </p>
        </div>
      </section>

      {/* FILTER BUTTONS STRIP */}
      <section className="sticky top-[61px] z-20 bg-[#F7F4EC]/95 backdrop-blur-md border-b border-[#D9D0BF]/60 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-start sm:justify-center overflow-x-auto gap-2 no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold rounded-md whitespace-nowrap transition-colors cursor-pointer ${
                selectedCategory === cat
                  ? 'bg-[#183B2B] text-[#F7F4EC] shadow-sm'
                  : 'bg-[#FFFFFF] text-[#303630] border border-[#D9D0BF] hover:bg-[#F7F4EC]'
              }`}
            >
              {cat === 'all' ? 'All Photographs' : cat}
            </button>
          ))}
        </div>
      </section>

      {/* PHOTO MASONRY GRID */}
      <section className="py-14 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredPhotos.map((photo, idx) => (
            <div
              key={photo.id}
              onClick={() => handlePhotoClick(idx)}
              className="group cursor-pointer bg-[#FFFFFF] rounded-2xl overflow-hidden border border-[#D9D0BF]/80 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col"
            >
              <div className="relative aspect-[16/11] overflow-hidden bg-[#183B2B]">
                <ImageWithFallback
                  src={photo.url}
                  alt={photo.title}
                  category="nature"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                
                <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#10291F]/90 text-[#B28B5B] border border-[#B28B5B]/30 backdrop-blur-sm">
                  {photo.category}
                </span>

                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="p-3 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/30">
                    <Eye size={20} />
                  </span>
                </div>
              </div>

              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-semibold text-[#183B2B] group-hover:text-[#B28B5B] transition-colors leading-snug">
                    {photo.title}
                  </h3>
                  <p className="text-xs text-[#303630]/75 mt-1.5 leading-relaxed font-sans">
                    {photo.caption}
                  </p>
                </div>

                <div className="pt-3 border-t border-[#D9D0BF]/40 mt-3 text-[11px] font-semibold text-[#183B2B] flex items-center gap-1 group-hover:underline">
                  <span>View Fullscreen</span>
                  <ArrowRight size={12} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FOOTER CALL TO ACTION */}
      <section className="py-20 bg-[#183B2B] text-[#F7F4EC] text-center px-4 sm:px-6 lg:px-8 border-t border-[#A6B49A]/20">
        <div className="max-w-3xl mx-auto space-y-4">
          <h2 className="font-serif text-3xl sm:text-5xl font-semibold">
            See The Bluffs in Real Life
          </h2>
          <p className="text-sm text-[#D9D0BF] max-w-xl mx-auto leading-relaxed">
            Photographs only capture a glimpse of the silence, river breeze, and scale of our 140 acres. We invite qualified prospective residents to walk the land.
          </p>
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={onScheduleTour}
              className="px-7 py-3 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer shadow-md flex items-center justify-center gap-2"
            >
              <Calendar size={14} />
              <span>Schedule a Private Tour</span>
            </button>
            <button
              onClick={() => onNavigate('properties')}
              className="px-7 py-3 border border-[#A6B49A]/40 text-[#F7F4EC] hover:bg-[#10291F] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors cursor-pointer"
            >
              Browse Available Homesites
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};
