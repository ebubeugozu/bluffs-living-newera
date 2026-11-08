import React, { useState, useRef, useEffect } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  MapPin,
  Compass,
  Layers,
  ChevronRight,
  X,
  Maximize2,
  TreePine,
  Waves,
  Home,
  Sparkles,
  ShieldAlert,
} from 'lucide-react';
import { MapPointOfInterest } from '../types';
import { MAP_POINTS_OF_INTEREST } from '../data/communityData';

interface InteractiveMapProps {
  initialSelectedId?: string;
  onNavigateToInquiry?: () => void;
  fullHeight?: boolean;
}

export const InteractiveMapComponent: React.FC<InteractiveMapProps> = ({
  initialSelectedId,
  onNavigateToInquiry,
  fullHeight = false,
}) => {
  const [selectedPoi, setSelectedPoi] = useState<MapPointOfInterest | null>(
    () => MAP_POINTS_OF_INTEREST.find((p) => p.id === initialSelectedId) || null
  );
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [showSatelliteOverlay, setShowSatelliteOverlay] = useState<boolean>(true);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialSelectedId) {
      const match = MAP_POINTS_OF_INTEREST.find((p) => p.id === initialSelectedId);
      if (match) setSelectedPoi(match);
    }
  }, [initialSelectedId]);

  const filteredPois = MAP_POINTS_OF_INTEREST.filter((poi) => {
    if (activeCategory === 'all') return true;
    if (activeCategory === 'homesite') return poi.category === 'homesite';
    if (activeCategory === 'river') return poi.category === 'river';
    if (activeCategory === 'nature') return poi.category === 'nature';
    if (activeCategory === 'amenity') return poi.category === 'amenity';
    if (activeCategory === 'stewardship') return poi.category === 'stewardship';
    return true;
  });

  const handleZoomIn = () => setZoom((prev) => Math.min(prev + 0.35, 2.6));
  const handleZoomOut = () => setZoom((prev) => Math.max(prev - 0.35, 0.85));
  const handleReset = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setPan({
      x: e.clientX - dragStart.x,
      y: e.clientY - dragStart.y,
    });
  };

  const handleMouseUp = () => setIsDragging(false);

  const handleSelectPoi = (poi: MapPointOfInterest) => {
    setSelectedPoi(poi);
    // Smoothly nudge pan towards the selected marker
    const targetX = (50 - poi.x) * 4;
    const targetY = (50 - poi.y) * 4;
    setPan({ x: targetX, y: targetY });
  };

  return (
    <div className={`relative flex flex-col lg:flex-row bg-[#10291F] text-[#F7F4EC] rounded-2xl overflow-hidden border border-[#A6B49A]/20 shadow-2xl ${fullHeight ? 'min-h-[750px] lg:h-[820px]' : 'h-[620px] lg:h-[680px]'}`}>
      
      {/* MAP CANVAS VIEWPORT */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        className={`relative flex-1 overflow-hidden select-none cursor-${isDragging ? 'grabbing' : 'grab'} bg-[#122A20]`}
        style={{ touchAction: 'none' }}
      >
        {/* TOP CONTROLS OVERLAY */}
        <div className="absolute top-4 left-4 z-20 flex flex-wrap items-center gap-2 pointer-events-auto">
          {/* Category Filter Bar */}
          <div className="flex items-center gap-1 p-1 bg-[#183B2B]/90 backdrop-blur-md rounded-lg border border-[#A6B49A]/30 shadow-lg">
            {[
              { id: 'all', label: 'All Features' },
              { id: 'homesite', label: 'Homesites' },
              { id: 'river', label: 'River Frontage' },
              { id: 'nature', label: 'Nature & Trails' },
              { id: 'amenity', label: 'Community Gardens & Hearth' },
              { id: 'stewardship', label: 'Helipad & Entry' },
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveCategory(cat.id);
                }}
                className={`px-3 py-1.5 text-xs font-medium rounded-md whitespace-nowrap transition-colors ${
                  activeCategory === cat.id
                    ? 'bg-[#F7F4EC] text-[#183B2B] shadow-sm font-semibold'
                    : 'text-[#D9D0BF] hover:text-[#FFFFFF] hover:bg-[#10291F]/50'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* MAP NAVIGATION WIDGETS (ZOOM & LAYER) */}
        <div className="absolute top-4 right-4 z-20 flex flex-col gap-2 pointer-events-auto">
          <div className="flex flex-col bg-[#183B2B]/90 backdrop-blur-md rounded-lg border border-[#A6B49A]/30 overflow-hidden shadow-lg">
            <button
              onClick={handleZoomIn}
              title="Zoom in"
              className="p-2.5 hover:bg-[#10291F] text-[#F7F4EC] transition-colors border-b border-[#A6B49A]/20"
            >
              <ZoomIn size={16} />
            </button>
            <button
              onClick={handleZoomOut}
              title="Zoom out"
              className="p-2.5 hover:bg-[#10291F] text-[#F7F4EC] transition-colors border-b border-[#A6B49A]/20"
            >
              <ZoomOut size={16} />
            </button>
            <button
              onClick={handleReset}
              title="Reset view"
              className="p-2.5 hover:bg-[#10291F] text-[#F7F4EC] transition-colors"
            >
              <RotateCcw size={16} />
            </button>
          </div>

          <button
            onClick={() => setShowSatelliteOverlay(!showSatelliteOverlay)}
            title="Toggle Topo / Master Site Plan View"
            className="flex items-center gap-2 px-3 py-2 bg-[#183B2B]/90 backdrop-blur-md text-xs text-[#D9D0BF] hover:text-[#FFFFFF] rounded-lg border border-[#A6B49A]/30 shadow-lg transition-colors whitespace-nowrap"
          >
            <Layers size={14} className="text-[#B28B5B]" />
            <span>{showSatelliteOverlay ? 'Master Plan View' : 'Topographic Contours'}</span>
          </button>
        </div>

        {/* COMPASS ROSE & PROPERTY BADGE */}
        <div className="absolute bottom-4 left-4 z-20 pointer-events-none flex items-center gap-3 bg-[#10291F]/80 backdrop-blur-sm px-3.5 py-2 rounded-lg border border-[#A6B49A]/20">
          <Compass size={22} className="text-[#B28B5B] animate-spin-slow" />
          <div className="text-[11px] leading-tight">
            <div className="font-semibold text-[#F7F4EC]">140 ACRES · LINDEN, TN</div>
            <div className="text-[#A6B49A]">Tennessee River Mile 114.5</div>
          </div>
        </div>

        {/* SCALE INDICATOR */}
        <div className="absolute bottom-4 right-4 z-20 pointer-events-none hidden sm:flex items-center gap-2 bg-[#10291F]/80 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-[#A6B49A]/20 text-[10px] text-[#A6B49A]">
          <span>0</span>
          <div className="w-16 h-0.5 bg-[#A6B49A]"></div>
          <span>500 FT (Approx. ½ Mi Frontage)</span>
        </div>

        {/* SCALABLE SVG MAP CANVAS */}
        <div
          className="w-full h-full transition-transform duration-75 ease-out origin-center"
          style={{
            transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          }}
        >
          <svg
            viewBox="0 0 1000 800"
            className="w-full h-full select-none"
            style={{ minWidth: '950px', minHeight: '750px' }}
          >
            <defs>
              {/* River water pattern */}
              <linearGradient id="riverGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1E4D3E" />
                <stop offset="50%" stopColor="#173B30" />
                <stop offset="100%" stopColor="#0F2A21" />
              </linearGradient>

              {/* Plateau elevation gradient */}
              <linearGradient id="plateauGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1E4433" />
                <stop offset="70%" stopColor="#183B2B" />
                <stop offset="100%" stopColor="#143224" />
              </linearGradient>

              {/* Homesite pad pattern */}
              <pattern id="homesiteGrid" width="24" height="24" patternUnits="userSpaceOnUse">
                <rect width="24" height="24" fill="none" stroke="#A6B49A" strokeWidth="0.5" strokeOpacity="0.15" />
              </pattern>

              {/* Water wave texture */}
              <filter id="waterBlur">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="2" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
              </filter>
            </defs>

            {/* BASE TERRAIN: 140-ACRE TRACT BOUNDARY */}
            <rect x="0" y="0" width="1000" height="800" fill="#143023" />

            {/* TOPOGRAPHIC CONTOUR ELEVATION LINES */}
            <g stroke="#A6B49A" strokeWidth="0.75" strokeOpacity={showSatelliteOverlay ? "0.18" : "0.35"} fill="none">
              <path d="M 120,0 C 180,180 150,420 180,600 C 200,720 220,800 240,800" />
              <path d="M 200,0 C 260,190 230,410 260,610 C 290,730 310,800 330,800" />
              <path d="M 300,0 C 370,180 340,390 380,590 C 410,720 440,800 460,800" />
              <path d="M 420,0 C 490,170 460,370 510,580 C 550,710 580,800 600,800" />
              <path d="M 560,0 C 620,160 590,360 650,570 C 690,700 730,800 750,800" />
              <path d="M 700,0 C 760,150 730,350 790,560 C 830,690 870,800 890,800" />
              <path d="M 840,0 C 900,140 870,340 930,550 C 960,680 990,780 1000,800" />
            </g>

            {/* FOREST CANOPY CLUSTERS */}
            <g fill="#183B2B" fillOpacity="0.6">
              <circle cx="280" cy="180" r="65" />
              <circle cx="340" cy="150" r="50" />
              <circle cx="490" cy="220" r="75" />
              <circle cx="740" cy="210" r="85" />
              <circle cx="830" cy="380" r="95" />
              <circle cx="680" cy="460" r="65" />
              <circle cx="460" cy="490" r="55" />
              <circle cx="380" cy="650" r="70" />
              <circle cx="580" cy="710" r="60" />
            </g>

            {/* THE TENNESSEE RIVER (WEST BOUNDARY - APPROX 1/2 MILE) */}
            <path
              d="M 0,0 L 150,0 C 130,120 90,260 110,410 C 130,550 90,690 60,800 L 0,800 Z"
              fill="url(#riverGrad)"
            />
            {/* River flow shimmer waves */}
            <g stroke="#A6B49A" strokeWidth="1.2" strokeOpacity="0.25" fill="none">
              <path d="M 20,40 C 45,90 40,160 45,240 C 50,320 35,420 50,520 C 60,620 40,710 25,780" />
              <path d="M 60,20 C 85,80 80,150 85,230 C 90,310 75,410 88,510 C 95,610 80,700 45,780" />
              <path d="M 100,5 C 120,70 110,140 115,220 C 120,300 100,400 112,500 C 118,600 100,690 70,780" />
            </g>

            {/* LIMESTONE RIVER BLUFF LEDGE */}
            <path
              d="M 150,0 C 130,120 90,260 110,410 C 130,550 90,690 60,800"
              stroke="#B28B5B"
              strokeWidth="4"
              strokeDasharray="4 2"
              fill="none"
              strokeOpacity="0.5"
            />
            <text x="75" y="120" transform="rotate(75, 75, 120)" fill="#A6B49A" fontSize="13" letterSpacing="3" fillOpacity="0.7" className="font-serif">
              TENNESSEE RIVER · WEST BOUNDARY
            </text>

            {/* PROPERTY PERIMETER PROPERTY LINE */}
            <polygon
              points="150,0 990,0 990,790 60,790 90,690 110,410 90,260 130,120"
              fill="url(#homesiteGrid)"
              stroke="#B28B5B"
              strokeWidth="1.5"
              strokeDasharray="8 4"
              strokeOpacity="0.45"
            />

            {/* MAIN INTERNAL ACCESS ROAD & DRIVEWAY */}
            <g stroke="#D9D0BF" strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.85">
              {/* Main Entrance Drive winding down from gate */}
              <path d="M 920,720 C 860,700 810,680 770,620 C 720,550 670,480 620,440 C 560,390 490,360 410,340 C 350,330 280,310 240,300" />
              {/* Secondary loop toward meadow homesites */}
              <path d="M 620,440 C 580,480 540,540 520,610 C 500,670 450,710 390,720" strokeWidth="4.5" />
              {/* Ridge spur */}
              <path d="M 770,620 C 750,530 730,430 700,340 C 680,270 650,210 610,180" strokeWidth="4" />
              {/* Helipad spur */}
              <path d="M 810,680 L 810,640" strokeWidth="4" />
            </g>

            {/* DOTTED WALKING & NATURE TRAILS */}
            <g stroke="#B28B5B" strokeWidth="2.5" strokeDasharray="5 4" strokeLinecap="round" fill="none" opacity="0.8">
              {/* Ridge to River Overlook Trail */}
              <path d="M 610,180 C 510,170 410,180 320,190 C 250,210 200,240 180,220" />
              {/* River Shoreline Descent Trail */}
              <path d="M 240,300 C 210,330 180,380 160,420 C 150,450 140,500 150,560 C 160,620 180,680 220,710" />
              {/* Meadow Garden Loop */}
              <path d="M 520,610 C 470,600 420,580 390,530 C 370,490 390,440 410,340" />
            </g>

            {/* HOMESITE PADS (PLOTTED 6,000+ SQ FT CLUSTERS) */}
            {/* Ridgeview Lots 1-10 */}
            <g fill="#10291F" stroke="#A6B49A" strokeWidth="1" strokeOpacity="0.4">
              <rect x="680" y="240" width="34" height="26" rx="2" />
              <rect x="660" y="280" width="34" height="26" rx="2" />
              <rect x="640" y="320" width="34" height="26" rx="2" />
              <rect x="620" y="360" width="34" height="26" rx="2" />
              <rect x="645" y="210" width="34" height="26" rx="2" />
              <text x="690" y="230" fill="#A6B49A" fontSize="9" opacity="0.6">LOTS 1–10 (6,000+ SF)</text>
            </g>

            {/* Forest Meadow Lots 11-20 */}
            <g fill="#10291F" stroke="#A6B49A" strokeWidth="1" strokeOpacity="0.4">
              <rect x="530" y="520" width="32" height="24" rx="2" />
              <rect x="490" y="550" width="32" height="24" rx="2" />
              <rect x="450" y="580" width="32" height="24" rx="2" />
              <rect x="480" y="620" width="32" height="24" rx="2" />
              <text x="470" y="510" fill="#A6B49A" fontSize="9" opacity="0.6">LOTS 11–20 (MEADOW)</text>
            </g>

            {/* River Bluff Lots 21-28 */}
            <g fill="#10291F" stroke="#B28B5B" strokeWidth="1.2" strokeOpacity="0.6">
              <rect x="290" y="270" width="36" height="28" rx="2" />
              <rect x="330" y="310" width="36" height="28" rx="2" />
              <rect x="310" y="360" width="36" height="28" rx="2" />
              <text x="290" y="260" fill="#B28B5B" fontSize="9" opacity="0.8">RIVER BLUFF LOTS 21–28</text>
            </g>

            {/* CERTIFIED HELIPAD MARKING */}
            <g transform="translate(800, 620)">
              <circle cx="0" cy="0" r="18" fill="#183B2B" stroke="#F7F4EC" strokeWidth="1.5" />
              <text x="0" y="5" textAnchor="middle" fill="#F7F4EC" fontSize="14" fontWeight="bold">H</text>
            </g>

            {/* POI PINS / CLICKABLE MARKERS */}
            {filteredPois.map((poi) => {
              const posX = poi.x * 10;
              const posY = poi.y * 8;
              const isSelected = selectedPoi?.id === poi.id;

              return (
                <g
                  key={poi.id}
                  transform={`translate(${posX}, ${posY})`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectPoi(poi);
                  }}
                  className="cursor-pointer group"
                >
                  {/* Subtle beacon pulse for selected marker */}
                  {isSelected && (
                    <circle
                      cx="0"
                      cy="0"
                      r="22"
                      fill="#B28B5B"
                      fillOpacity="0.3"
                      className="animate-ping"
                    />
                  )}

                  {/* Marker Pin Base */}
                  <circle
                    cx="0"
                    cy="0"
                    r={isSelected ? "14" : "11"}
                    fill={isSelected ? "#F7F4EC" : "#183B2B"}
                    stroke={isSelected ? "#183B2B" : "#B28B5B"}
                    strokeWidth={isSelected ? "2.5" : "1.8"}
                    className="transition-all duration-200 group-hover:scale-125 shadow-lg"
                  />

                  {/* Category icon or indicator */}
                  <circle
                    cx="0"
                    cy="0"
                    r="4"
                    fill={
                      poi.category === 'homesite'
                        ? '#B28B5B'
                        : poi.category === 'river'
                        ? '#A6B49A'
                        : poi.category === 'nature'
                        ? '#4ADE80'
                        : '#F7F4EC'
                    }
                  />

                  {/* Marker Label Tag */}
                  <g transform="translate(0, -18)" className="pointer-events-none">
                    <rect
                      x="-60"
                      y="-16"
                      width="120"
                      height="18"
                      rx="4"
                      fill="#10291F"
                      fillOpacity="0.88"
                      stroke="#A6B49A"
                      strokeWidth="0.5"
                    />
                    <text
                      x="0"
                      y="-4"
                      textAnchor="middle"
                      fill="#F7F4EC"
                      fontSize="9"
                      fontWeight="600"
                      className="tracking-tight"
                    >
                      {poi.name.length > 20 ? poi.name.slice(0, 18) + '...' : poi.name}
                    </text>
                  </g>
                </g>
              );
            })}
          </svg>
        </div>
      </div>

      {/* SIDEBAR INSPECTOR & LOCATION BROWSER */}
      <div className="w-full lg:w-96 bg-[#183B2B] flex flex-col border-t lg:border-t-0 lg:border-l border-[#A6B49A]/20 shadow-2xl z-30">
        
        {/* INSPECTOR HEADER */}
        <div className="p-4 border-b border-[#A6B49A]/20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin size={18} className="text-[#B28B5B]" />
            <h3 className="font-serif text-lg font-medium text-[#F7F4EC]">
              Property Directory
            </h3>
          </div>
          <span className="text-xs text-[#A6B49A]">
            {filteredPois.length} Points of Interest
          </span>
        </div>

        {/* ACTIVE SELECTION DETAIL CARD (IF SELECTED) */}
        {selectedPoi ? (
          <div className="p-5 border-b border-[#A6B49A]/20 bg-[#10291F]/70 flex-shrink-0 animate-fadeIn">
            <div className="flex items-start justify-between gap-3 mb-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#B28B5B]">
                {selectedPoi.category.toUpperCase()} · {selectedPoi.elevation || '700 FT ELEVATION'}
              </span>
              <button
                onClick={() => setSelectedPoi(null)}
                className="text-[#A6B49A] hover:text-[#F7F4EC] p-1"
                title="Close details"
              >
                <X size={16} />
              </button>
            </div>

            <h4 className="font-serif text-xl font-medium text-[#F7F4EC] mb-2 leading-snug">
              {selectedPoi.name}
            </h4>

            <p className="text-xs text-[#D9D0BF] leading-relaxed mb-4">
              {selectedPoi.longDesc}
            </p>

            {/* Key Features List */}
            <div className="mb-4">
              <span className="text-[11px] font-semibold text-[#A6B49A] uppercase tracking-wider block mb-2">
                Location Highlights
              </span>
              <ul className="space-y-1.5">
                {selectedPoi.features.map((feat, idx) => (
                  <li key={idx} className="text-xs text-[#F7F4EC] flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#B28B5B]" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            {selectedPoi.category === 'homesite' && onNavigateToInquiry && (
              <button
                onClick={onNavigateToInquiry}
                className="w-full py-2.5 px-4 bg-[#B28B5B] hover:bg-[#c29865] text-[#10291F] font-semibold text-xs tracking-wider uppercase rounded-md transition-colors"
              >
                Inquire About This Homesite
              </button>
            )}
          </div>
        ) : (
          <div className="p-4 bg-[#10291F]/40 border-b border-[#A6B49A]/15 text-xs text-[#D9D0BF]">
            <p className="italic">
              Click any point on the map or select from the list below to inspect elevations, homesite dimensions, and natural features.
            </p>
          </div>
        )}

        {/* SCROLLABLE LIST OF ALL POIs */}
        <div className="flex-1 overflow-y-auto divide-y divide-[#A6B49A]/10">
          {filteredPois.map((poi) => {
            const isSelected = selectedPoi?.id === poi.id;
            return (
              <div
                key={poi.id}
                onClick={() => handleSelectPoi(poi)}
                className={`p-3.5 hover:bg-[#10291F]/50 cursor-pointer transition-colors flex items-center justify-between gap-3 ${
                  isSelected ? 'bg-[#10291F] border-l-2 border-[#B28B5B]' : ''
                }`}
              >
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-0.5">
                    <span className="text-[10px] uppercase text-[#A6B49A] font-medium tracking-wide">
                      {poi.category}
                    </span>
                    {poi.elevation && (
                      <span className="text-[10px] text-[#D9D0BF]/60">· {poi.elevation}</span>
                    )}
                  </div>
                  <h5 className="text-sm font-medium text-[#F7F4EC] truncate">
                    {poi.name}
                  </h5>
                  <p className="text-xs text-[#D9D0BF]/70 line-clamp-1 mt-0.5">
                    {poi.shortDesc}
                  </p>
                </div>
                <ChevronRight size={14} className="text-[#A6B49A] shrink-0" />
              </div>
            );
          })}
        </div>

      </div>
    </div>
  );
};
