import React, { useState } from 'react';
import { Image as ImageIcon, Trees, Mountain, Waves, Compass } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackSrc?: string;
  category?: 'nature' | 'river' | 'home' | 'amenity' | 'general';
  caption?: string;
  badge?: string;
  aspectRatioClass?: string;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  alt = 'The Bluffs at New Era',
  fallbackSrc,
  category = 'nature',
  caption,
  badge,
  className = '',
  aspectRatioClass = 'aspect-[16/10]',
  ...props
}) => {
  const [hasError, setHasError] = useState(false);
  const [useFallbackSrc, setUseFallbackSrc] = useState(false);

  const handleError = () => {
    if (fallbackSrc && !useFallbackSrc) {
      setUseFallbackSrc(true);
    } else {
      setHasError(true);
    }
  };

  const currentSrc = useFallbackSrc && fallbackSrc ? fallbackSrc : src;

  if (hasError || !currentSrc) {
    return (
      <div
        className={`relative overflow-hidden bg-gradient-to-br from-[#10291F] via-[#183B2B] to-[#122A20] text-[#F7F4EC] flex flex-col items-center justify-center p-6 text-center border border-[#A6B49A]/20 select-none ${aspectRatioClass} ${className}`}
        role="img"
        aria-label={alt}
      >
        {/* Subtle decorative background topography */}
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <svg viewBox="0 0 400 300" className="w-full h-full object-cover">
            <path d="M 0,150 Q 100,80 200,140 T 400,120 L 400,300 L 0,300 Z" fill="#A6B49A" />
            <path d="M 0,180 Q 120,120 240,190 T 400,160 L 400,300 L 0,300 Z" fill="#D9D0BF" />
          </svg>
        </div>

        {badge && (
          <span className="absolute top-3 left-3 px-2 py-0.5 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#10291F]/90 text-[#B28B5B] border border-[#B28B5B]/30">
            {badge}
          </span>
        )}

        <div className="relative z-10 flex flex-col items-center max-w-xs space-y-2">
          <div className="p-3 rounded-full bg-[#10291F] border border-[#A6B49A]/30 text-[#B28B5B]">
            {category === 'river' ? (
              <Waves size={24} />
            ) : category === 'home' ? (
              <Mountain size={24} />
            ) : category === 'amenity' ? (
              <Compass size={24} />
            ) : (
              <Trees size={24} />
            )}
          </div>
          <span className="font-serif text-lg font-medium text-[#F7F4EC] tracking-tight line-clamp-1">
            {alt}
          </span>
          {caption && (
            <p className="text-xs text-[#D9D0BF]/80 font-sans line-clamp-2">
              {caption}
            </p>
          )}
          <span className="text-[10px] text-[#A6B49A] uppercase tracking-widest pt-1">
            The Bluffs at New Era · Linden, TN
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className={`relative overflow-hidden bg-[#183B2B]/20 ${className}`}>
      {badge && (
        <span className="absolute top-3 left-3 z-10 px-2.5 py-1 rounded text-[10px] font-semibold uppercase tracking-wider bg-[#10291F]/90 text-[#B28B5B] border border-[#B28B5B]/30 backdrop-blur-sm shadow-sm pointer-events-none">
          {badge}
        </span>
      )}
      <img
        src={currentSrc}
        alt={alt}
        onError={handleError}
        loading="lazy"
        referrerPolicy="no-referrer"
        className={`w-full h-full object-cover transition-opacity duration-300 ${className}`}
        {...props}
      />
    </div>
  );
};
