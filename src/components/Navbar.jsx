import React from 'react';
import { Sparkles, Brain, Gamepad2, Volume2, Flame, HeartHandshake } from 'lucide-react';
import { sound } from '../utils/audio';

export default function Navbar({ activeTab, setActiveTab }) {
  const navItems = [
    { id: 'converter', label: '🍀 럭키비키 변환기', icon: Sparkles, color: 'hover:text-pink-400' },
    { id: 'quiz', label: '🧠 도파민 진단소', icon: Brain, color: 'hover:text-cyan-400' },
    { id: 'game', label: '🎮 도파민 서바이버', icon: Gamepad2, color: 'hover:text-lime-400' },
    { id: 'soundboard', label: '🔊 밈 사운드보드', icon: Volume2, color: 'hover:text-yellow-400' },
  ];

  const handleTabClick = (id) => {
    sound.playPop();
    setActiveTab(id);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#121216]/90 backdrop-blur-md border-b-2 border-zinc-800 px-4 py-3 shadow-md">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Logo & Title */}
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => handleTabClick('converter')}>
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#FF5E97] to-[#FFDF00] p-[2px] shadow-brutal flex items-center justify-center animate-pulse-fast">
            <div className="w-full h-full bg-black rounded-[10px] flex items-center justify-center text-xl">
              🧠
            </div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-extrabold text-lg tracking-tight bg-gradient-to-r from-[#FF5E97] via-[#FFDF00] to-[#00F0FF] bg-clip-text text-transparent">
                DopamineLab 2026
              </span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#CCFF00] text-black uppercase tracking-wider">
                Vicky Mode
              </span>
            </div>
            <p className="text-xs text-zinc-400 hidden sm:block">
              억까를 행운으로! 2026 SNS 트렌드 뇌 연구소
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <nav className="flex items-center gap-1.5 sm:gap-2 bg-zinc-900/80 p-1.5 rounded-2xl border border-zinc-800 overflow-x-auto max-w-full">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => handleTabClick(item.id)}
                className={`flex items-center gap-1.5 px-3 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all duration-200 whitespace-nowrap ${
                  isActive
                    ? 'bg-gradient-to-r from-[#FF5E97] to-[#A855F7] text-white shadow-brutal translate-x-[-1px] translate-y-[-1px]'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
                }`}
              >
                <Icon className={`w-4 h-4 ${isActive ? 'animate-bounce-slow' : ''}`} />
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
