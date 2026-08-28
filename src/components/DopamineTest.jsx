import React, { useState } from 'react';
import { Brain, ArrowRight, RotateCcw, Share2, Sparkles, CheckCircle2, Award, Pill } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QUIZ_QUESTIONS, QUIZ_RESULTS, calculateQuizResult } from '../data/quizData';
import { sound } from '../utils/audio';

export default function DopamineTest() {
  const [currentStep, setCurrentStep] = useState(0); // 0 to 7: questions, 8: result
  const [userAnswers, setUserAnswers] = useState([]);
  const [result, setResult] = useState(null);
  const [copied, setCopied] = useState(false);

  // Handle option select
  const handleSelectOption = (option) => {
    sound.playPop();
    const updated = [...userAnswers, option];
    setUserAnswers(updated);

    if (currentStep + 1 < QUIZ_QUESTIONS.length) {
      setCurrentStep(currentStep + 1);
    } else {
      // Calculate results
      const res = calculateQuizResult(updated);
      setResult(res);
      setCurrentStep(QUIZ_QUESTIONS.length);
      sound.playFanfare();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  };

  // Reset Quiz
  const handleReset = () => {
    sound.playCoin();
    setCurrentStep(0);
    setUserAnswers([]);
    setResult(null);
  };

  // Copy result
  const handleCopyResult = () => {
    sound.playPop();
    if (!result) return;
    const text = `🧠 [2026 SNS 도파민 진단서]\n\n나의 유형: ${result.title}\n"${result.subtitle}"\n\n${result.prescription}\n\n👉 나도 도파민 진단받기: DopamineLab 2026`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // SVG Radar Chart Generator
  const renderRadarChart = (stats) => {
    const size = 260;
    const center = size / 2;
    const radius = 95;

    const labels = [
      { key: 'dopamine', name: '도파민 수치' },
      { key: 'focus', name: '집중력 잔여' },
      { key: 'lucky', name: '럭키비키력' },
      { key: 'meme', name: '밈 적응력' },
      { key: 'algo', name: '알고리즘 침식' }
    ];

    const count = labels.length;
    const angleStep = (Math.PI * 2) / count;

    // Generate Polygon Points
    const points = labels.map((item, i) => {
      const val = stats[item.key] || 50;
      const r = (val / 100) * radius;
      const angle = i * angleStep - Math.PI / 2;
      const x = center + r * Math.cos(angle);
      const y = center + r * Math.sin(angle);
      return `${x},${y}`;
    }).join(' ');

    return (
      <div className="relative flex flex-col items-center justify-center my-4">
        <svg width={size} height={size} className="overflow-visible">
          {/* Background circles / webs */}
          {[0.25, 0.5, 0.75, 1].map((scale, idx) => (
            <polygon
              key={idx}
              points={labels.map((_, i) => {
                const angle = i * angleStep - Math.PI / 2;
                const x = center + radius * scale * Math.cos(angle);
                const y = center + radius * scale * Math.sin(angle);
                return `${x},${y}`;
              }).join(' ')}
              fill="none"
              stroke="rgba(255, 255, 255, 0.15)"
              strokeWidth="1.5"
            />
          ))}

          {/* Web Axis Lines */}
          {labels.map((_, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return (
              <line
                key={i}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="rgba(255, 255, 255, 0.15)"
                strokeWidth="1.5"
              />
            );
          })}

          {/* Value Polygon */}
          <polygon
            points={points}
            fill="rgba(255, 94, 151, 0.35)"
            stroke="#FF5E97"
            strokeWidth="3"
          />

          {/* Value Points */}
          {labels.map((item, i) => {
            const val = stats[item.key] || 50;
            const r = (val / 100) * radius;
            const angle = i * angleStep - Math.PI / 2;
            const x = center + r * Math.cos(angle);
            const y = center + r * Math.sin(angle);
            return (
              <circle
                key={i}
                cx={x}
                cy={y}
                r="4"
                fill="#FFDF00"
                stroke="#000"
                strokeWidth="2"
              />
            );
          })}

          {/* Label Texts */}
          {labels.map((item, i) => {
            const angle = i * angleStep - Math.PI / 2;
            const x = center + (radius + 24) * Math.cos(angle);
            const y = center + (radius + 24) * Math.sin(angle);
            return (
              <text
                key={i}
                x={x}
                y={y}
                fill="#CBD5E1"
                fontSize="11"
                fontWeight="bold"
                textAnchor="middle"
                dominantBaseline="central"
              >
                {item.name} ({stats[item.key]}%)
              </text>
            );
          })}
        </svg>
      </div>
    );
  };

  const isQuizDone = currentStep >= QUIZ_QUESTIONS.length;
  const currentQ = QUIZ_QUESTIONS[currentStep];

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-fadeIn">
      {/* Header */}
      <div className="bg-[#18181f] border-2 border-zinc-800 rounded-3xl p-6 md:p-8 shadow-brutal text-center">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#00F0FF]/20 border border-[#00F0FF]/40 text-[#00F0FF] text-xs font-black uppercase mb-3">
          <Brain className="w-4 h-4" />
          2026 숏폼 도파민 뇌 건강 검진
        </div>
        <h1 className="text-2xl md:text-3xl font-black text-white mb-2">
          전국민 쇼츠 뇌 & 도파민 중독 자가진단
        </h1>
        <p className="text-zinc-400 text-xs md:text-sm max-w-xl mx-auto">
          알고리즘에 절여진 나의 뇌 상태를 8개 현실 공감 문항으로 정밀 분석하고 맞춤형 처방전을 발급해 드립니다!
        </p>

        {/* Progress Bar (During Quiz) */}
        {!isQuizDone && (
          <div className="mt-6">
            <div className="flex justify-between text-xs font-bold text-zinc-400 mb-2">
              <span>문항 {currentStep + 1} / {QUIZ_QUESTIONS.length}</span>
              <span className="text-[#FF5E97]">{Math.round(((currentStep) / QUIZ_QUESTIONS.length) * 100)}% 진행</span>
            </div>
            <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
              <div
                className="h-full bg-gradient-to-r from-[#FF5E97] via-[#FFDF00] to-[#00F0FF] transition-all duration-300 rounded-full"
                style={{ width: `${((currentStep + 1) / QUIZ_QUESTIONS.length) * 100}%` }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Quiz Body */}
      {!isQuizDone && currentQ && (
        <div className="bg-[#18181f] border-2 border-zinc-800 rounded-3xl p-6 md:p-8 shadow-brutal space-y-6">
          <div className="flex items-start gap-4">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-[#FF5E97] to-[#FFDF00] text-black font-black text-lg flex items-center justify-center flex-shrink-0 shadow-brutal">
              Q{currentQ.id}
            </div>
            <h2 className="text-lg md:text-xl font-bold text-white leading-relaxed pt-1">
              {currentQ.question}
            </h2>
          </div>

          <div className="space-y-3 pt-2">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleSelectOption(option)}
                className="w-full text-left p-4 md:p-5 rounded-2xl bg-zinc-900/90 border-2 border-zinc-700/80 hover:border-[#FF5E97] hover:bg-zinc-800 text-zinc-200 hover:text-white transition-all text-sm md:text-base font-medium flex items-center justify-between group shadow-sm active:scale-[0.99]"
              >
                <span>{option.text}</span>
                <ArrowRight className="w-5 h-5 text-zinc-500 group-hover:text-[#FF5E97] group-hover:translate-x-1 transition-all flex-shrink-0 ml-2" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result Screen */}
      {isQuizDone && result && (
        <div className={`bg-gradient-to-b ${result.bgGradient} bg-[#18181f] border-2 border-zinc-700 rounded-3xl p-6 md:p-8 shadow-brutal space-y-6`}>
          
          {/* Result Header */}
          <div className="text-center space-y-2">
            <div className="inline-block px-4 py-1.5 rounded-full text-xs font-black bg-black/60 border border-white/20 text-white uppercase tracking-wider mb-2">
              진단 완료 • {result.badge}
            </div>
            <h2 className="text-2xl md:text-4xl font-black text-white">
              {result.title}
            </h2>
            <p className="text-sm md:text-base text-zinc-300 font-bold">
              "{result.subtitle}"
            </p>
          </div>

          {/* Radar Chart */}
          <div className="bg-black/50 border border-zinc-700/60 rounded-3xl p-4 flex flex-col items-center">
            <span className="text-xs font-black text-zinc-400 uppercase tracking-wider">
              📊 오각형 뇌 역량 분석표
            </span>
            {renderRadarChart(result.stats)}
          </div>

          {/* Description Box */}
          <div className="bg-black/40 border border-zinc-700/60 rounded-2xl p-5 space-y-3">
            <h3 className="text-sm font-black text-[#FFDF00] flex items-center gap-2">
              <Award className="w-4 h-4" /> 뇌 상태 정밀 소견서
            </h3>
            <p className="text-zinc-200 text-sm md:text-base leading-relaxed">
              {result.description}
            </p>
          </div>

          {/* Prescription Box */}
          <div className="bg-gradient-to-r from-pink-500/20 to-purple-500/20 border-2 border-[#FF5E97]/40 rounded-2xl p-5 space-y-2">
            <h3 className="text-sm font-black text-[#FF5E97] flex items-center gap-2">
              <Pill className="w-4 h-4" /> 2026 맞춤형 뇌 힐링 처방전
            </h3>
            <p className="text-white text-sm md:text-base font-bold leading-relaxed">
              {result.prescription}
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-3">
            <button
              onClick={handleCopyResult}
              className="flex-1 py-3.5 bg-gradient-to-r from-[#FF5E97] to-[#00F0FF] text-black font-black text-sm rounded-2xl shadow-brutal transition-all flex items-center justify-center gap-2"
            >
              <Share2 className="w-4 h-4" />
              {copied ? '진단서 복사 완료!' : '진단 결과 친구에게 공유'}
            </button>
            <button
              onClick={handleReset}
              className="px-6 py-3.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-sm rounded-2xl border border-zinc-700 transition-all flex items-center justify-center gap-2"
            >
              <RotateCcw className="w-4 h-4" />
              다시 진단하기
            </button>
          </div>

        </div>
      )}
    </div>
  );
}
