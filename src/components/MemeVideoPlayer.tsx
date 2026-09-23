import React, { useState } from 'react';
import { Tv, Sparkles, ExternalLink, Play, RotateCcw, Volume2, Maximize2, Minimize2, Laugh, Music, Drum } from 'lucide-react';
import { sound } from '../utils/audio';

interface MemeVideoPlayerProps {
  onPlayJingle?: () => void;
}

/**
 * Cartoon Retro TV Meme Video Player Component.
 * Plays the viral "Washing Powder Modi" meme video directly inside
 * a hilarious cartoon television with antennae, dials, and interactive scene markers.
 */
export const MemeVideoPlayer: React.FC<MemeVideoPlayerProps> = () => {
  const [activeTimestamp, setActiveTimestamp] = useState<number>(0);
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const [funnyReaction, setFunnyReaction] = useState<string>('🔥 Viral Ad of the Year!');

  // Pre-configured funny scenes from the video
  const sceneShortcuts = [
    { label: '🥁 Modi Drumming', time: 1, reaction: 'Dhum-taka-dhum! Modi rocks the dhol!' },
    { label: '🧼 Washing Powder Ad', time: 5, reaction: 'सारे भ्रष्टाचार चुटकियों में घुले!' },
    { label: '🏛️ Politician Ministers', time: 28, reaction: 'Har ghotalebaaz ko mantri banaya!' },
    { label: '🔤 A to Z Scams Chart', time: 49, reaction: 'A for Adani to Z for Zubin!' },
  ];

  const handleSeekScene = (time: number, reaction: string) => {
    sound.playLaughableModiGroove();
    setActiveTimestamp(time);
    setFunnyReaction(reaction);
  };

  return (
    <div className="w-full mb-6 select-none">
      {/* Cartoon TV Antenna */}
      <div className="flex justify-center -mb-2 relative z-10 pointer-events-none">
        <div className="flex items-end gap-6">
          <div className="w-1.5 h-7 bg-slate-900 rotate-[-25deg] origin-bottom rounded-full flex flex-col items-center">
            <span className="w-3.5 h-3.5 rounded-full bg-red-500 border border-slate-900 -mt-2 animate-bounce" />
          </div>
          <div className="w-1.5 h-8 bg-slate-900 rotate-[25deg] origin-bottom rounded-full flex flex-col items-center">
            <span className="w-3.5 h-3.5 rounded-full bg-yellow-400 border border-slate-900 -mt-2 animate-pulse" />
          </div>
        </div>
      </div>

      {/* Main Retro Cartoon TV Box */}
      <div className="bg-gradient-to-b from-amber-500 via-orange-500 to-amber-600 rounded-3xl p-3.5 sm:p-5 cartoon-card-lg relative overflow-hidden">
        {/* TV Top Header Bar */}
        <div className="flex items-center justify-between mb-3 px-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-600 border border-slate-900 animate-ping" />
            <span className="font-bungee text-xs sm:text-sm text-white tracking-wide flex items-center gap-1.5 drop-shadow">
              <Tv className="w-4 h-4 text-yellow-300" />
              SWACHH TV: BROADCASTING WASHING POWDER MODI...
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => {
                sound.playBubblePop();
                setIsExpanded(!isExpanded);
              }}
              className="p-1 bg-white/90 hover:bg-white text-slate-900 rounded-lg border border-slate-900 cursor-pointer transition-colors"
              title={isExpanded ? 'Compact Player' : 'Enlarge Player'}
            >
              {isExpanded ? <Minimize2 className="w-3.5 h-3.5" /> : <Maximize2 className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* The Screen Bezel */}
        <div className="relative bg-slate-950 rounded-2xl p-2 sm:p-3 cartoon-card border-3 border-slate-900 shadow-inner">
          {/* 16:9 Video Embed Container */}
          <div className={`relative w-full rounded-xl overflow-hidden bg-black transition-all duration-300 ${isExpanded ? 'aspect-video max-h-[460px]' : 'aspect-video max-h-[290px]'}`}>
            <iframe
              id="viral-meme-iframe"
              key={`video-key-${activeTimestamp}`}
              src={`https://www.youtube-nocookie.com/embed/OEIkSs5CsBE?autoplay=0&rel=0&start=${activeTimestamp}`}
              title="Washing Powder Modi Viral Video"
              className="w-full h-full border-0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </div>
    </div>
  );
};
