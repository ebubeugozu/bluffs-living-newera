import React, { useState, useEffect } from 'react';
import {
  Camera,
  Maximize2,
  Volume2,
  VolumeX,
  Radio,
  Eye,
  Info,
  Compass,
  Sun,
  Moon,
  Clock,
  RefreshCw,
  Sliders,
} from 'lucide-react';
import { PageId } from '../types';
import { natureAudio } from '../utils/audio';

interface EagleCamPageProps {
  onNavigate: (page: PageId) => void;
}

export const EagleCamPage: React.FC<EagleCamPageProps> = ({ onNavigate }) => {
  const [streamActive, setStreamActive] = useState<boolean>(true);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const [nightVision, setNightVision] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<string>('');
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(
        now.toLocaleTimeString('en-US', {
          timeZone: 'America/Chicago',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
        }) + ' CST'
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleToggleAudio = () => {
    const active = natureAudio.toggle();
    setAudioPlaying(active);
  };

  const handleToggleFullscreen = () => {
    const playerEl = document.getElementById('eagle-cam-viewport');
    if (!playerEl) return;

    if (!document.fullscreenElement) {
      playerEl.requestFullscreen?.().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen?.().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  return (
    <div className="bg-[#10291F] text-[#F7F4EC] min-h-screen">
      
      {/* HEADER SECTION */}
      <section className="pt-16 pb-10 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#183B2B] border border-[#A6B49A]/20 text-xs font-semibold uppercase tracking-[0.25em] text-[#B28B5B]">
          <Camera size={14} />
          <span>Conservation Optical Feed</span>
        </div>
        
        <h1 className="font-serif text-4xl sm:text-6xl font-medium tracking-tight text-[#F7F4EC]">
          The Eagle's Nest. Live From The Bluffs.
        </h1>

        <p className="text-base sm:text-lg text-[#D9D0BF] max-w-2xl mx-auto font-light leading-relaxed">
          Take a closer look at the natural world surrounding The Bluffs through our live camera experience.
        </p>

        {/* FEED MODE TOGGLE (Simulate Live Stream vs Offline Fallback) */}
        <div className="pt-2 flex items-center justify-center gap-3">
          <button
            onClick={() => setStreamActive(true)}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              streamActive
                ? 'bg-[#F7F4EC] text-[#183B2B] font-semibold'
                : 'text-[#A6B49A] hover:text-[#F7F4EC] bg-[#183B2B]'
            }`}
          >
            Live Stream Active
          </button>
          <button
            onClick={() => {
              setStreamActive(false);
              if (audioPlaying) {
                natureAudio.stop();
                setAudioPlaying(false);
              }
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              !streamActive
                ? 'bg-[#F7F4EC] text-[#183B2B] font-semibold'
                : 'text-[#A6B49A] hover:text-[#F7F4EC] bg-[#183B2B]'
            }`}
          >
            Stream Offline (Fallback State)
          </button>
        </div>
      </section>

      {/* PRIMARY VIDEO PLAYER SECTION */}
      <section className="px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto pb-16">
        <div
          id="eagle-cam-viewport"
          className={`relative rounded-2xl overflow-hidden border border-[#A6B49A]/30 shadow-2xl aspect-video bg-[#0A1A13] flex flex-col justify-between ${
            nightVision ? 'contrast-125 brightness-90 hue-rotate-90' : ''
          }`}
        >
          {streamActive ? (
            /* ACTIVE LIVE STREAM SIMULATION CANVAS */
            <>
              {/* LIVE CAMERA OVERLAY HEADER */}
              <div className="relative z-20 p-4 sm:p-6 flex items-center justify-between bg-gradient-to-b from-black/70 to-transparent">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3 py-1 rounded bg-red-600/90 text-white text-[11px] font-bold uppercase tracking-widest shadow-md">
                    <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                    <span>LIVE</span>
                  </div>

                  <span className="hidden sm:inline-block text-xs font-mono text-[#F7F4EC]/90 tracking-wide">
                    CAM-01 · BLUFF CREST HIGH CANOPY
                  </span>
                </div>

                <div className="flex items-center gap-3 text-xs font-mono text-[#D9D0BF]">
                  <span className="hidden md:inline-block">LINDEN, TN · 68°F</span>
                  <span>{currentTime || '12:00:00 CST'}</span>
                </div>
              </div>

              {/* PROCEDURAL VISUAL OF HIGH PINE NEST OVERLOOKING TENNESSEE RIVER */}
              <div className="absolute inset-0 z-0 pointer-events-none select-none">
                <svg viewBox="0 0 1280 720" className="w-full h-full object-cover">
                  <defs>
                    <linearGradient id="camSky" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#2A4B3C" />
                      <stop offset="50%" stopColor="#1E3D30" />
                      <stop offset="100%" stopColor="#142C22" />
                    </linearGradient>
                    <linearGradient id="camRiver" x1="0%" y1="0%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#122A20" />
                      <stop offset="50%" stopColor="#255240" />
                      <stop offset="100%" stopColor="#173528" />
                    </linearGradient>
                  </defs>

                  {/* Sky backdrop */}
                  <rect width="1280" height="720" fill="url(#camSky)" />

                  {/* River bend in distance */}
                  <path d="M 0,380 C 450,340 750,440 1280,390 L 1280,560 C 800,600 350,510 0,540 Z" fill="url(#camRiver)" />

                  {/* Distant timber bluffs */}
                  <path d="M 0,360 Q 320,290 640,330 T 1280,310 L 1280,720 L 0,720 Z" fill="#143024" opacity="0.75" />

                  {/* Old-growth Pine Tree Trunk & Branches */}
                  <path d="M 180,720 L 290,0 L 360,0 L 260,720 Z" fill="#1B1713" />
                  <path d="M 270,360 Q 420,380 620,440 L 610,480 Q 400,430 250,420 Z" fill="#241E18" />

                  {/* Massive Stick Nest Structure (5-ft diameter) */}
                  <ellipse cx="680" cy="480" rx="220" ry="85" fill="#2D241C" />
                  <path d="M 460,480 Q 680,540 900,480 Q 780,570 580,550 Z" fill="#1C1611" />
                  {/* Nest stick textures */}
                  <g stroke="#3D3228" strokeWidth="4" strokeLinecap="round">
                    <line x1="480" y1="460" x2="590" y2="500" />
                    <line x1="520" y1="520" x2="680" y2="470" />
                    <line x1="640" y1="460" x2="820" y2="510" />
                    <line x1="720" y1="520" x2="880" y2="470" />
                    <line x1="560" y1="470" x2="740" y2="530" />
                    <line x1="610" y1="510" x2="780" y2="490" />
                  </g>

                  {/* Bald Eagle Silhouette in Nest */}
                  <g transform="translate(640, 360)">
                    {/* Eagle body */}
                    <path d="M 10,70 Q 35,30 40,0 Q 55,20 65,55 Q 75,90 55,120 Q 30,125 15,100 Z" fill="#1E1712" />
                    {/* White Head & Neck */}
                    <path d="M 35,15 Q 40,-15 55,-20 Q 70,-15 65,15 Z" fill="#F7F4EC" />
                    {/* Yellow Hooked Beak */}
                    <path d="M 62,-10 L 80,-4 L 64,5 Z" fill="#F59E0B" />
                    {/* White Tail Feathers */}
                    <path d="M 15,95 L -5,125 L 25,120 Z" fill="#F7F4EC" />
                  </g>

                  {/* Foreground pine needle sprigs */}
                  <g stroke="#183B2B" strokeWidth="2.5">
                    <line x1="90" y1="80" x2="160" y2="140" />
                    <line x1="120" y1="70" x2="180" y2="120" />
                    <line x1="150" y1="60" x2="200" y2="110" />
                  </g>

                  {/* Watermark brand */}
                  <text x="1230" y="690" textAnchor="end" fill="#F7F4EC" fontSize="13" opacity="0.4" className="font-serif">
                    THE BLUFFS AT NEW ERA · EAGLE CAM
                  </text>
                </svg>
              </div>

              {/* LIVE CAMERA OVERLAY FOOTER & CONTROLS */}
              <div className="relative z-20 p-4 sm:p-6 flex flex-wrap items-center justify-between gap-4 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                <div className="flex items-center gap-3">
                  {/* Audio Ambient Stream Button */}
                  <button
                    onClick={handleToggleAudio}
                    className={`flex items-center gap-2 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                      audioPlaying
                        ? 'bg-[#B28B5B] text-[#10291F] font-semibold'
                        : 'bg-[#183B2B]/80 text-[#F7F4EC] hover:bg-[#183B2B]'
                    }`}
                  >
                    {audioPlaying ? <Volume2 size={15} /> : <VolumeX size={15} />}
                    <span>{audioPlaying ? 'River Ambiance: ON' : 'Listen to River Ambiance'}</span>
                  </button>

                  {/* Night Vision / Infrared Mode */}
                  <button
                    onClick={() => setNightVision(!nightVision)}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                      nightVision
                        ? 'bg-emerald-600 text-white'
                        : 'bg-[#183B2B]/80 text-[#D9D0BF] hover:text-[#FFFFFF]'
                    }`}
                  >
                    {nightVision ? <Moon size={14} /> : <Sun size={14} />}
                    <span className="hidden sm:inline">{nightVision ? 'Infrared: Active' : 'Daylight Color'}</span>
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-mono text-[#A6B49A] hidden sm:inline">
                    OPTICAL ZOOM: 18x · 4K UHD
                  </span>
                  
                  <button
                    onClick={handleToggleFullscreen}
                    className="p-2 bg-[#183B2B]/80 hover:bg-[#183B2B] text-[#F7F4EC] rounded-md transition-colors cursor-pointer"
                    title="Fullscreen Mode"
                  >
                    <Maximize2 size={16} />
                  </button>
                </div>
              </div>
            </>
          ) : (
            /* FALLBACK STATE WHEN CAMERA FEED IS OFFLINE */
            <div className="m-auto text-center p-8 max-w-lg space-y-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#183B2B] border border-[#A6B49A]/30 flex items-center justify-center mx-auto text-[#B28B5B]">
                <Radio size={28} className="animate-pulse" />
              </div>

              <h3 className="font-serif text-2xl font-semibold text-[#F7F4EC]">
                Feed Temporarily Offline
              </h3>

              <p className="text-sm text-[#D9D0BF] leading-relaxed">
                The live camera feed is temporarily unavailable. Please check back soon.
              </p>

              <p className="text-xs text-[#A6B49A]">
                Our solar-powered optics automatically recharge during daylight cycles. The feed resumes once connectivity is confirmed.
              </p>

              <button
                onClick={() => setStreamActive(true)}
                className="inline-flex items-center gap-2 px-4 py-2 bg-[#183B2B] hover:bg-[#143224] text-[#F7F4EC] text-xs font-medium rounded-md transition-colors cursor-pointer border border-[#A6B49A]/20"
              >
                <RefreshCw size={13} />
                <span>Retry Connection</span>
              </button>
            </div>
          )}
        </div>
      </section>

      {/* NEST FACTS & ECOLOGY DETAILS */}
      <section className="py-16 bg-[#183B2B] text-[#F7F4EC] border-t border-[#A6B49A]/20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#B28B5B] font-semibold">
                Territory Biology
              </span>
              <h3 className="font-serif text-2xl font-semibold text-[#F7F4EC]">
                The Bald Eagle Sanctuary
              </h3>
              <p className="text-xs text-[#D9D0BF] leading-relaxed">
                The Tennessee River valley provides prime hunting territory for American Bald Eagles. The nesting pair at The Bluffs utilizes this high pine roost for seasonal courtship, egg incubation, and rearing eaglets.
              </p>
            </div>

            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#B28B5B] font-semibold">
                Nesting Schedule
              </span>
              <h3 className="font-serif text-2xl font-semibold text-[#F7F4EC]">
                Seasonal Milestones
              </h3>
              <ul className="text-xs text-[#D9D0BF] space-y-1.5">
                <li><strong className="text-[#F7F4EC]">Dec – Jan:</strong> Territory defense & nest rebuilding</li>
                <li><strong className="text-[#F7F4EC]">Feb – Mar:</strong> Egg laying & 35-day incubation</li>
                <li><strong className="text-[#F7F4EC]">Apr – May:</strong> Eaglet hatching & rapid feeding</li>
                <li><strong className="text-[#F7F4EC]">June:</strong> First flights and fledgling dispersal</li>
              </ul>
            </div>

            <div className="space-y-3">
              <span className="text-xs uppercase tracking-wider text-[#B28B5B] font-semibold">
                Observation Ethics
              </span>
              <h3 className="font-serif text-2xl font-semibold text-[#F7F4EC]">
                Zero-Intrusion Technology
              </h3>
              <p className="text-xs text-[#D9D0BF] leading-relaxed">
                The optical mast is positioned over 180 feet from the nest structure, using optical telephoto glass to eliminate physical human presence. We enforce a 330-foot ground buffer beneath the nest during active breeding.
              </p>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};
