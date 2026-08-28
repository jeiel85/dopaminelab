import React, { useState } from 'react';
import { Volume2, Sparkles, Zap, Flame, Radio } from 'lucide-react';
import confetti from 'canvas-confetti';
import { SOUNDBOARD_ITEMS } from '../data/soundboardData';
import { sound } from '../utils/audio';

export default function Soundboard() {
  const [activeItem, setActiveItem] = useState(null);

  const handlePlaySound = (item) => {
    setActiveItem(item.id);
    if (sound[item.soundKey]) {
      sound[item.soundKey]();
    }

    // Trigger visual confetti / particle burst
    confetti({
      particleCount: 30,
      spread: 50,
      origin: { y: 0.6 }
    });

    setTimeout(() => {
      setActiveItem(null);
    }, 400);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#18181f] border-2 border-zinc-800 rounded-3xl p-6 md:p-8 shadow-brutal text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#FFDF00]/20 border border-[#FFDF00]/40 text-[#FFDF00] text-xs font-black uppercase mb-3">
          <Radio className="w-4 h-4 animate-pulse" />
          2026 바이럴 밈 사운드보드
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
          도파민 밈 사운드 & 챌린지 믹서
        </h1>
        <p className="text-zinc-400 text-xs md:text-sm max-w-xl mx-auto">
          버튼을 누를 때마다 Web Audio 엔진이 실시간 합성하는 찰진 밈 사운드와 비주얼 이펙트를 즐겨보세요!
        </p>
      </div>

      {/* Soundboard Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {SOUNDBOARD_ITEMS.map((item) => {
          const isActive = activeItem === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handlePlaySound(item)}
              className={`relative overflow-hidden bg-gradient-to-br ${item.color} p-[3px] rounded-3xl transition-all duration-150 active:scale-95 shadow-brutal ${
                isActive ? 'scale-105 ring-4 ring-white translate-x-[-2px] translate-y-[-2px]' : 'hover:scale-[1.02]'
              }`}
            >
              <div className="w-full h-full bg-[#121216]/95 hover:bg-[#121216]/85 rounded-[22px] p-5 flex flex-col items-center justify-center text-center space-y-2 transition-all">
                <span className="text-3xl filter drop-shadow-md animate-bounce-slow">
                  {item.emoji}
                </span>
                <span className="font-black text-white text-sm md:text-base leading-tight">
                  {item.title}
                </span>
                <span className="text-[11px] text-zinc-400 font-bold">
                  {item.subtitle}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Interactive Meme Tip */}
      <div className="bg-[#18181f] border border-zinc-800 rounded-2xl p-5 text-center text-xs text-zinc-400">
        💡 <strong>꿀팁</strong>: 친구와 통화하거나 카톡할 때 적절한 타이밍에 팩폭 부저나 럭키비키 팡파레를 눌러보세요!
      </div>
    </div>
  );
}
