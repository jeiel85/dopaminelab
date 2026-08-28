import React, { useState } from 'react';
import Navbar from './components/Navbar';
import LuckyVickyConverter from './components/LuckyVickyConverter';
import DopamineTest from './components/DopamineTest';
import DopamineGame from './components/DopamineGame';
import Soundboard from './components/Soundboard';
import { Sparkles, Heart, Zap, Coffee, ShieldAlert } from 'lucide-react';
import { sound } from './utils/audio';

export default function App() {
  const [activeTab, setActiveTab] = useState('converter'); // 'converter', 'quiz', 'game', 'soundboard'

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white flex flex-col selection:bg-[#FF5E97] selection:text-black">
      {/* Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Area */}
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-6 md:py-10">
        {activeTab === 'converter' && <LuckyVickyConverter />}
        {activeTab === 'quiz' && <DopamineTest />}
        {activeTab === 'game' && <DopamineGame />}
        {activeTab === 'soundboard' && <Soundboard />}
      </main>

      {/* Footer */}
      <footer className="mt-auto border-t-2 border-zinc-800 bg-[#121216]/80 py-8 px-4 text-center">
        <div className="max-w-4xl mx-auto space-y-3">
          <div className="flex items-center justify-center gap-2 text-sm font-bold text-zinc-300">
            <span>🧠 DopamineLab 2026</span>
            <span>•</span>
            <span className="text-[#FF5E97]">럭키비키 뇌 탈출기</span>
          </div>
          <p className="text-xs text-zinc-500 max-w-lg mx-auto">
            본 서비스는 현대인의 과도한 숏폼 도파민 중독과 일상 억까를 유쾌한 초긍정 마인드와 밈으로 치유하기 위해 제작된 인터랙티브 웹 앱입니다.
          </p>
          <div className="flex items-center justify-center gap-3 pt-2 text-[11px] text-zinc-400">
            <span className="px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700">
              🍀 원영적 사고 탑재
            </span>
            <span className="px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700">
              ⚡ Web Audio 엔진
            </span>
            <span className="px-2.5 py-1 rounded-full bg-zinc-800 border border-zinc-700">
              📱 인스타 스토리 호환
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
