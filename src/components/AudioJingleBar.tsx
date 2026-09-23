import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Drum, Music, Sparkles, Laugh } from 'lucide-react';
import { sound } from '../utils/audio';
import { JINGLE_LYRICS } from '../data/memeData';

export const AudioJingleBar: React.FC = () => {
  const [isMuted, setIsMuted] = useState<boolean>(sound.getMuted());
  const [currentLineIndex, setCurrentLineIndex] = useState<number>(0);
  const [isPlayingDholak, setIsPlayingDholak] = useState<boolean>(false);

  // Rotate karaoke lyric lines continuously
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentLineIndex((prev) => (prev + 1) % JINGLE_LYRICS.length);
    }, 3200);
    return () => clearInterval(timer);
  }, []);

  const handleToggleMute = () => {
    const nextMuted = sound.toggleMute();
    setIsMuted(nextMuted);
    if (!nextMuted) {
      sound.playBubblePop();
    }
  };

  const handleModiDrumSolo = () => {
    setIsPlayingDholak(true);
    sound.playLaughableModiGroove();
    setTimeout(() => {
      setIsPlayingDholak(false);
    }, 1300);
  };

  const handlePlayJingleHook = () => {
    sound.playModiWashingJingleTune();
  };

  return (
    <div className="bg-amber-400 text-slate-950 border-b-3 border-slate-900 px-3 py-2 select-none shadow-sm">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Left: Jingle Ticker with Dancing Character / Icon */}
        <div className="flex items-center gap-2 overflow-hidden w-full sm:w-auto">
          <div className="flex items-center gap-1 bg-white px-2.5 py-0.5 rounded-full cartoon-card-sm shrink-0">
            <Music className="w-3.5 h-3.5 text-orange-600 animate-bounce" />
            <span className="font-bungee text-[11px] text-slate-900 uppercase">
              Jingle Ticker:
            </span>
          </div>

          {/* Karaoke moving line */}
          <div className="flex-1 truncate font-hindi font-black text-xs sm:text-sm text-slate-900 tracking-wide">
            &quot;{JINGLE_LYRICS[currentLineIndex]}&quot;
          </div>
        </div>

        {/* Right: Sound Controls & Laughable Audio Buttons */}
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <button
            type="button"
            id="jingle-tune-button"
            onClick={handlePlayJingleHook}
            className="px-2.5 py-1 rounded-full text-xs font-black cartoon-btn bg-white hover:bg-yellow-200 text-slate-900 flex items-center gap-1 cursor-pointer"
            title="Sing Washing Powder Modi jingle melody"
          >
            <Music className="w-3.5 h-3.5 text-blue-600" />
            <span>Sing Jingle!</span>
          </button>

          <button
            type="button"
            id="drum-solo-button"
            onClick={handleModiDrumSolo}
            className={`px-3 py-1 rounded-full text-xs font-black cartoon-btn flex items-center gap-1.5 cursor-pointer ${
              isPlayingDholak
                ? 'bg-red-500 text-white animate-pulse'
                : 'bg-orange-500 hover:bg-orange-400 text-white'
            }`}
            title="Play Modi Dholak Drum Groove"
          >
            <Drum className="w-3.5 h-3.5 text-yellow-300" />
            <span>{isPlayingDholak ? '🥁 Dhol Dhamaal!' : 'Dhol Beat'}</span>
          </button>

          <button
            type="button"
            id="toggle-audio-mute"
            onClick={handleToggleMute}
            className="p-1.5 rounded-full bg-white hover:bg-slate-100 border-2 border-slate-900 text-slate-800 transition-colors cursor-pointer"
            title={isMuted ? 'Unmute Cartoon Sounds' : 'Mute Sounds'}
          >
            {isMuted ? (
              <VolumeX className="w-4 h-4 text-red-500" />
            ) : (
              <Volume2 className="w-4 h-4 text-emerald-600" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

