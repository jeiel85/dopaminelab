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
          <a
            href="https://github.com/jeiel85/dopaminelab"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub에서 도파민 연구소 소스 코드 보기 (새 창)"
            className="inline-flex items-center gap-1.5 pt-1 text-xs text-zinc-500 hover:text-[#FF5E97] focus-visible:text-[#FF5E97] transition-colors"
          >
            <svg viewBox="0 0 16 16" width="14" height="14" fill="currentColor" aria-hidden="true">
              <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
            </svg>
            <span>소스 코드 · GitHub</span>
          </a>
        </div>
      </footer>
    </div>
  );
}
