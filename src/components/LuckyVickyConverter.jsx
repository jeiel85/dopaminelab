import React, { useState } from 'react';
import { Sparkles, RefreshCw, Send, Copy, Share2, Image as ImageIcon, Flame, Heart, Zap, Bot, Bell } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PRESET_SITUATIONS, generateFourPerspectives } from '../data/presets';
import { sound } from '../utils/audio';
import CardCanvas from './CardCanvas';

export default function LuckyVickyConverter() {
  const [currentSituation, setCurrentSituation] = useState(PRESET_SITUATIONS[0]);
  const [customInput, setCustomInput] = useState('');
  const [activePersona, setActivePersona] = useState('lucky');
  const [showStudio, setShowStudio] = useState(false);
  const [copiedKey, setCopiedKey] = useState(null);

  // Handle preset selection
  const handleSelectPreset = (preset) => {
    sound.playPop();
    setCurrentSituation(preset);
    if (activePersona === 'lucky') sound.playLucky();
    else if (activePersona === 't_fact') sound.playTFact();
    else if (activePersona === 'buddha') sound.playBuddha();
    else if (activePersona === 'shorts') sound.playShorts();
  };

  // Handle custom input generation
  const handleCustomSubmit = (e) => {
    e.preventDefault();
    if (!customInput.trim()) return;

    sound.playLucky();
    confetti({
      particleCount: 70,
      spread: 60,
      origin: { y: 0.7 }
    });

    const generated = generateFourPerspectives(customInput);
    setCurrentSituation(generated);
    setCustomInput('');
  };

  // Copy text handler
  const handleCopyText = (key, text) => {
    sound.playPop();
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Open Studio modal with specific persona
  const handleOpenStudio = (personaKey) => {
    setActivePersona(personaKey);
    sound.playCoin();
    setShowStudio(true);
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Hero Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-r from-[#FF2E93]/20 via-[#7928CA]/20 to-[#00F0FF]/20 border-2 border-zinc-800 p-6 md:p-8 backdrop-blur-xl shadow-brutal">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#FF5E97]/20 border border-[#FF5E97]/40 text-[#FF5E97] text-xs font-black uppercase mb-3">
            <Sparkles className="w-3.5 h-3.5 animate-spin-slow" />
            2026 SNS 트렌드 멘탈 치트키
          </div>
          <h1 className="text-2xl md:text-4xl font-black tracking-tight text-white leading-tight mb-2">
            어떤 억까(불행)도 황금빛 행운으로!<br />
            <span className="bg-gradient-to-r from-[#FF5E97] via-[#FFDF00] to-[#00F0FF] bg-clip-text text-transparent">
              원영적 사고 & 4대 페르소나 변환기
            </span>
          </h1>
          <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
            짜증나는 일상 상황을 입력하면 <strong>원영적 사고(럭키비키)</strong>, <strong>극T 팩폭</strong>, <strong>해탈 스님</strong>, <strong>숏폼 도파민 뇌</strong>로 즉시 재해석해 드립니다!
          </p>
        </div>
      </div>

      {/* Input Section */}
      <div className="bg-[#18181f] border-2 border-zinc-800 rounded-3xl p-5 md:p-6 shadow-brutal">
        <form onSubmit={handleCustomSubmit} className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={customInput}
              onChange={(e) => setCustomInput(e.target.value)}
              placeholder="예: 버스 탔는데 지갑 안 가져옴, 연휴 끝났는데 내일 월요일, 커피 쏟음..."
              className="flex-1 bg-zinc-900/90 border-2 border-zinc-700 focus:border-[#FF5E97] rounded-2xl px-4 py-3.5 text-sm md:text-base text-white placeholder-zinc-500 outline-none transition-all"
            />
            <button
              type="submit"
              className="px-6 py-3.5 bg-gradient-to-r from-[#FF5E97] to-[#FFDF00] hover:from-[#ff4b8b] hover:to-[#ffd900] text-black font-black text-sm md:text-base rounded-2xl shadow-brutal active:translate-x-0.5 active:translate-y-0.5 transition-all flex items-center justify-center gap-2 whitespace-nowrap"
            >
              <Sparkles className="w-5 h-5" />
              럭키비키 가동!
            </button>
          </div>
        </form>

        {/* Quick Presets */}
        <div className="mt-5">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 mb-2.5">
            <Flame className="w-4 h-4 text-orange-400" />
            <span>자주 겪는 일상 억까 모음 (클릭해서 바로보기) :</span>
          </div>
          <div className="flex flex-wrap gap-2">
            {PRESET_SITUATIONS.map((preset) => {
              const isSelected = currentSituation.title === preset.title;
              return (
                <button
                  key={preset.id}
                  onClick={() => handleSelectPreset(preset)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? 'bg-[#FF5E97] text-white border-pink-400 shadow-brutal translate-x-[-1px] translate-y-[-1px]'
                      : 'bg-zinc-900/80 text-zinc-300 border-zinc-700/60 hover:bg-zinc-800 hover:text-white'
                  }`}
                >
                  <span>{preset.icon}</span>
                  <span>{preset.title}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Current Active Situation Title */}
      <div className="flex items-center justify-between bg-zinc-900/90 border border-zinc-800 px-5 py-4 rounded-2xl">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{currentSituation.icon || '⚡'}</span>
          <div>
            <span className="text-[11px] font-black text-[#FF5E97] uppercase tracking-wider block">CURRENT SITUATION</span>
            <h2 className="text-base md:text-lg font-black text-white">"{currentSituation.title}"</h2>
          </div>
        </div>
        <button
          onClick={() => {
            sound.playCoin();
            const random = PRESET_SITUATIONS[Math.floor(Math.random() * PRESET_SITUATIONS.length)];
            setCurrentSituation(random);
          }}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 rounded-xl text-xs font-bold text-zinc-200 transition-all"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          랜덤 억까
        </button>
      </div>

      {/* 4 Perspectives Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* 1. 💖 원영적 사고 (럭키비키) */}
        <div className="relative group bg-gradient-to-b from-[#FF5E97]/15 to-[#1E1E24] border-2 border-[#FF5E97]/60 rounded-3xl p-6 shadow-brutal transition-all hover:border-[#FF5E97] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl p-2 rounded-2xl bg-[#FF5E97]/20 border border-[#FF5E97]/30">💖</span>
                <div>
                  <h3 className="font-black text-lg text-white">원영적 사고 (럭키비키)</h3>
                  <span className="text-xs text-[#FF5E97] font-bold">LUCKY VICKY 100% ✨</span>
                </div>
              </div>
              <button
                onClick={() => sound.playLucky()}
                className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#FF5E97]/30 hover:bg-[#FF5E97] text-white transition-all"
              >
                샤방 사운드 🔔
              </button>
            </div>
            <p className="text-zinc-100 text-base md:text-lg font-medium leading-relaxed bg-black/40 p-4 rounded-2xl border border-pink-500/20 mb-4">
              {currentSituation.lucky}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/80">
            <button
              onClick={() => handleCopyText('lucky', currentSituation.lucky)}
              className="flex-1 py-2 bg-zinc-800/80 hover:bg-zinc-700 text-xs font-bold rounded-xl text-zinc-200 transition-all flex items-center justify-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              {copiedKey === 'lucky' ? '복사됨!' : '텍스트 복사'}
            </button>
            <button
              onClick={() => handleOpenStudio('lucky')}
              className="flex-1 py-2 bg-[#FF5E97] hover:bg-[#ff4b8b] text-xs font-black text-white rounded-xl shadow-brutal transition-all flex items-center justify-center gap-1.5"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              인스타 짤 카드 만들기
            </button>
          </div>
        </div>

        {/* 2. 🧊 극T 팩폭 사고 */}
        <div className="relative group bg-gradient-to-b from-[#00F0FF]/15 to-[#1E1E24] border-2 border-[#00F0FF]/60 rounded-3xl p-6 shadow-brutal transition-all hover:border-[#00F0FF] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl p-2 rounded-2xl bg-[#00F0FF]/20 border border-[#00F0FF]/30">🧊</span>
                <div>
                  <h3 className="font-black text-lg text-white">극T 팩폭 보고서</h3>
                  <span className="text-xs text-[#00F0FF] font-bold">FACT CHECK 100% 🤖</span>
                </div>
              </div>
              <button
                onClick={() => sound.playTFact()}
                className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#00F0FF]/30 hover:bg-[#00F0FF] hover:text-black text-cyan-200 transition-all"
              >
                팩폭 부저 🚨
              </button>
            </div>
            <p className="text-zinc-100 text-base md:text-lg font-medium leading-relaxed bg-black/40 p-4 rounded-2xl border border-cyan-500/20 mb-4">
              {currentSituation.t_fact}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/80">
            <button
              onClick={() => handleCopyText('t_fact', currentSituation.t_fact)}
              className="flex-1 py-2 bg-zinc-800/80 hover:bg-zinc-700 text-xs font-bold rounded-xl text-zinc-200 transition-all flex items-center justify-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              {copiedKey === 't_fact' ? '복사됨!' : '텍스트 복사'}
            </button>
            <button
              onClick={() => handleOpenStudio('t_fact')}
              className="flex-1 py-2 bg-[#00F0FF] hover:bg-[#00d4e0] text-xs font-black text-black rounded-xl shadow-brutal transition-all flex items-center justify-center gap-1.5"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              인스타 짤 카드 만들기
            </button>
          </div>
        </div>

        {/* 3. 🧘 극락왕생 해탈 스님 */}
        <div className="relative group bg-gradient-to-b from-[#FFDF00]/15 to-[#1E1E24] border-2 border-[#FFDF00]/60 rounded-3xl p-6 shadow-brutal transition-all hover:border-[#FFDF00] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl p-2 rounded-2xl bg-[#FFDF00]/20 border border-[#FFDF00]/30">🧘</span>
                <div>
                  <h3 className="font-black text-lg text-white">극락왕생 해탈적 사고</h3>
                  <span className="text-xs text-[#FFDF00] font-bold">ZEN NIRVANA 🔔</span>
                </div>
              </div>
              <button
                onClick={() => sound.playBuddha()}
                className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#FFDF00]/30 hover:bg-[#FFDF00] hover:text-black text-yellow-200 transition-all"
              >
                목탁 소리 🪵
              </button>
            </div>
            <p className="text-zinc-100 text-base md:text-lg font-medium leading-relaxed bg-black/40 p-4 rounded-2xl border border-yellow-500/20 mb-4">
              {currentSituation.buddha}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/80">
            <button
              onClick={() => handleCopyText('buddha', currentSituation.buddha)}
              className="flex-1 py-2 bg-zinc-800/80 hover:bg-zinc-700 text-xs font-bold rounded-xl text-zinc-200 transition-all flex items-center justify-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              {copiedKey === 'buddha' ? '복사됨!' : '텍스트 복사'}
            </button>
            <button
              onClick={() => handleOpenStudio('buddha')}
              className="flex-1 py-2 bg-[#FFDF00] hover:bg-[#e6c800] text-xs font-black text-black rounded-xl shadow-brutal transition-all flex items-center justify-center gap-1.5"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              인스타 짤 카드 만들기
            </button>
          </div>
        </div>

        {/* 4. 🚀 도파민 숏폼 알고리즘 뇌 */}
        <div className="relative group bg-gradient-to-b from-[#A855F7]/15 to-[#1E1E24] border-2 border-[#A855F7]/60 rounded-3xl p-6 shadow-brutal transition-all hover:border-[#A855F7] flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="text-2xl p-2 rounded-2xl bg-[#A855F7]/20 border border-[#A855F7]/30">🚀</span>
                <div>
                  <h3 className="font-black text-lg text-white">도파민 숏폼 알고리즘 뇌</h3>
                  <span className="text-xs text-[#A855F7] font-bold">ALGO VIRAL 1M+ 📱</span>
                </div>
              </div>
              <button
                onClick={() => sound.playShorts()}
                className="text-xs font-bold px-2.5 py-1 rounded-lg bg-[#A855F7]/30 hover:bg-[#A855F7] text-white transition-all"
              >
                도파민 빔 ⚡
              </button>
            </div>
            <p className="text-zinc-100 text-base md:text-lg font-medium leading-relaxed bg-black/40 p-4 rounded-2xl border border-purple-500/20 mb-4">
              {currentSituation.shorts}
            </p>
          </div>

          <div className="flex items-center gap-2 pt-2 border-t border-zinc-800/80">
            <button
              onClick={() => handleCopyText('shorts', currentSituation.shorts)}
              className="flex-1 py-2 bg-zinc-800/80 hover:bg-zinc-700 text-xs font-bold rounded-xl text-zinc-200 transition-all flex items-center justify-center gap-1.5"
            >
              <Copy className="w-3.5 h-3.5" />
              {copiedKey === 'shorts' ? '복사됨!' : '텍스트 복사'}
            </button>
            <button
              onClick={() => handleOpenStudio('shorts')}
              className="flex-1 py-2 bg-[#A855F7] hover:bg-[#9333ea] text-xs font-black text-white rounded-xl shadow-brutal transition-all flex items-center justify-center gap-1.5"
            >
              <ImageIcon className="w-3.5 h-3.5" />
              인스타 짤 카드 만들기
            </button>
          </div>
        </div>

      </div>

      {/* Card Studio Modal */}
      {showStudio && (
        <CardCanvas
          situation={currentSituation}
          selectedPersona={activePersona}
          onClose={() => setShowStudio(false)}
        />
      )}
    </div>
  );
}
