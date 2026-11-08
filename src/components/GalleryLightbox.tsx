import React, { useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Maximize2 } from 'lucide-react';
import { ImageWithFallback } from './ImageWithFallback';

export type LightboxImageItem = string | { url: string; title?: string; caption?: string };

interface GalleryLightboxProps {
  isOpen: boolean;
  images: LightboxImageItem[];
  currentIndex?: number;
  initialIndex?: number;
  onClose: () => void;
  onIndexChange?: (index: number) => void;
}

export const GalleryLightbox: React.FC<GalleryLightboxProps> = ({
  isOpen,
  images,
  currentIndex,
  initialIndex = 0,
  onClose,
  onIndexChange,
}) => {
  const [internalIndex, setInternalIndex] = React.useState(initialIndex);

  React.useEffect(() => {
    if (currentIndex !== undefined) {
      setInternalIndex(currentIndex);
    } else if (initialIndex !== undefined) {
      setInternalIndex(initialIndex);
    }
  }, [currentIndex, initialIndex, isOpen]);

  const activeIndex = currentIndex !== undefined ? currentIndex : internalIndex;

  const handleIndexChange = (newIdx: number) => {
    setInternalIndex(newIdx);
    if (onIndexChange) {
      onIndexChange(newIdx);
    }
  };

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowRight') handleIndexChange((activeIndex + 1) % images.length);
      if (e.key === 'ArrowLeft') handleIndexChange((activeIndex - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, activeIndex, images.length, onClose]);

  if (!isOpen || images.length === 0) return null;

  const rawItem = images[activeIndex] || images[0];
  const currentImage = typeof rawItem === 'string' ? { url: rawItem, title: undefined, caption: undefined } : rawItem;

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col justify-between bg-black/95 backdrop-blur-md animate-fadeIn text-[#F7F4EC] select-none p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label="Image gallery lightbox"
    >
      {/* TOP BAR */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <div>
          <span className="text-xs font-mono uppercase tracking-widest text-[#B28B5B] block">
            THE BLUFFS AT NEW ERA · GALLERY
          </span>
          <h4 className="font-serif text-lg font-medium text-white truncate max-w-md">
            {currentImage.title || 'Property Photograph'}
          </h4>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-xs font-mono text-white/60">
            {activeIndex + 1} / {images.length}
          </span>
          <button
            onClick={onClose}
            className="p-2 text-white/70 hover:text-white rounded-lg bg-white/10 hover:bg-white/20 transition-colors cursor-pointer"
            aria-label="Close gallery"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      {/* CENTER IMAGE DISPLAY */}
      <div className="relative flex-1 flex items-center justify-center my-4 overflow-hidden">
        {/* Previous Button */}
        <button
          onClick={() => handleIndexChange((activeIndex - 1 + images.length) % images.length)}
          className="absolute left-2 sm:left-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
          aria-label="Previous photograph"
        >
          <ChevronLeft size={24} />
        </button>

        {/* Image Display */}
        <div className="max-w-5xl max-h-[75vh] w-full h-full flex flex-col items-center justify-center">
          <ImageWithFallback
            src={currentImage.url}
            alt={currentImage.title || 'The Bluffs at New Era'}
            caption={currentImage.caption}
            className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg shadow-2xl"
          />
          {currentImage.caption && (
            <p className="text-xs text-white/80 mt-3 text-center max-w-xl font-light">
              {currentImage.caption}
            </p>
          )}
        </div>

        {/* Next Button */}
        <button
          onClick={() => handleIndexChange((activeIndex + 1) % images.length)}
          className="absolute right-2 sm:right-4 z-20 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all cursor-pointer"
          aria-label="Next photograph"
        >
          <ChevronRight size={24} />
        </button>
      </div>

      {/* BOTTOM THUMBNAIL STRIP */}
      {images.length > 1 && (
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 border-t border-white/10 no-scrollbar">
          {images.map((img, idx) => {
            const url = typeof img === 'string' ? img : img.url;
            const title = typeof img === 'string' ? `Thumbnail ${idx + 1}` : (img.title || `Thumbnail ${idx + 1}`);
            return (
              <button
                key={idx}
                onClick={() => handleIndexChange(idx)}
                className={`relative w-16 h-12 rounded overflow-hidden flex-shrink-0 border-2 transition-all cursor-pointer ${
                  activeIndex === idx ? 'border-[#B28B5B] scale-105 opacity-100' : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <img
                  src={url}
                  alt={title}
                  className="w-full h-full object-cover"
                />
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
};
