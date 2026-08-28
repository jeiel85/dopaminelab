import React, { useRef, useEffect } from 'react';
import { Download, Copy, Share2, Sparkles, Check } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export default function CardCanvas({ situation, selectedPersona, onClose }) {
  const canvasRef = useRef(null);
  const [copied, setCopied] = React.useState(false);
  const [cardTheme, setCardTheme] = React.useState('y2k-pink'); // 'y2k-pink', 'cyber-neon', 'zen-calm', 'dark-gold'
  const [aspectRatio, setAspectRatio] = React.useState('story'); // 'story' (9:16) or 'square' (1:1)

  const personaTitles = {
    lucky: {
      name: "✨ 원영적 사고 (완전 럭키비키잔앙)",
      badge: "LUCKY VICKY 100%",
      sub: "세상 모든 억까는 나의 행복을 위한 빌드업 🍀",
      icon: "💖",
      content: situation.lucky
    },
    t_fact: {
      name: "🧊 극T 팩폭 보고서",
      badge: "FACT CHECK 100%",
      sub: "감정 소모 0g! 손익 계산 및 팩트 기반 솔루션 🤖",
      icon: "🧊",
      content: situation.t_fact
    },
    buddha: {
      name: "🧘 극락왕생 해탈적 사고",
      badge: "ZEN NIRVANA",
      sub: "삼라만상의 이치를 깨달은 무소유 드립 🔔",
      icon: "🧘",
      content: situation.buddha
    },
    shorts: {
      name: "🚀 도파민 숏폼 알고리즘 뇌",
      badge: "ALGO VIRAL 1M+",
      sub: "이걸로 릴스 찍으면 100만뷰 떡상 각 🎬",
      icon: "⚡",
      content: situation.shorts
    }
  };

  const currentPersona = personaTitles[selectedPersona] || personaTitles.lucky;

  const themes = {
    'y2k-pink': {
      bg1: '#FF2E93',
      bg2: '#7928CA',
      cardBg: '#180B26',
      accent: '#FFDF00',
      text: '#FFFFFF',
      badgeBg: '#FF5E97',
      name: '💖 Y2K 핑크'
    },
    'cyber-neon': {
      bg1: '#00F0FF',
      bg2: '#0038FF',
      cardBg: '#091326',
      accent: '#CCFF00',
      text: '#FFFFFF',
      badgeBg: '#00F0FF',
      name: '⚡ 사이버 네온'
    },
    'zen-calm': {
      bg1: '#10B981',
      bg2: '#064E3B',
      cardBg: '#06281E',
      accent: '#FFDF00',
      text: '#FFFFFF',
      badgeBg: '#10B981',
      name: '🧘 해탈 무소유'
    },
    'dark-gold': {
      bg1: '#F59E0B',
      bg2: '#18181B',
      cardBg: '#121214',
      accent: '#FF5E97',
      text: '#FFFFFF',
      badgeBg: '#F59E0B',
      name: '👑 럭셔리 골드'
    }
  };

  // Canvas Drawing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    const width = aspectRatio === 'story' ? 1080 : 1080;
    const height = aspectRatio === 'story' ? 1920 : 1080;

    canvas.width = width;
    canvas.height = height;

    const theme = themes[cardTheme];

    // 1. Background Gradient
    const bgGradient = ctx.createLinearGradient(0, 0, width, height);
    bgGradient.addColorStop(0, theme.bg1);
    bgGradient.addColorStop(1, theme.bg2);
    ctx.fillStyle = bgGradient;
    ctx.fillRect(0, 0, width, height);

    // Decorative geometric background shapes / grid
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 2;
    const gridSize = 60;
    for (let x = 0; x < width; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, height);
      ctx.stroke();
    }
    for (let y = 0; y < height; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(width, y);
      ctx.stroke();
    }

    // 2. Center Card Container
    const cardMargin = 60;
    const cardX = cardMargin;
    const cardY = aspectRatio === 'story' ? 180 : 80;
    const cardW = width - cardMargin * 2;
    const cardH = aspectRatio === 'story' ? height - 360 : height - 160;

    // Card Shadow (Neo-brutalism offset)
    ctx.fillStyle = '#000000';
    roundRect(ctx, cardX + 16, cardY + 16, cardW, cardH, 36);
    ctx.fill();

    // Card Body
    ctx.fillStyle = theme.cardBg;
    roundRect(ctx, cardX, cardY, cardW, cardH, 36);
    ctx.fill();
    ctx.strokeStyle = '#FFFFFF';
    ctx.lineWidth = 6;
    ctx.stroke();

    // 3. Header inside card
    // Badge Top
    const badgeW = 340;
    const badgeH = 54;
    const badgeX = cardX + 50;
    const badgeY = cardY + 50;
    
    ctx.fillStyle = theme.badgeBg;
    roundRect(ctx, badgeX, badgeY, badgeW, badgeH, 27);
    ctx.fill();
    ctx.fillStyle = '#000000';
    ctx.font = 'bold 24px Pretendard, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(currentPersona.badge, badgeX + badgeW / 2, badgeY + 36);

    // Top Right Watermark
    ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
    ctx.font = 'bold 22px Pretendard, sans-serif';
    ctx.textAlign = 'right';
    ctx.fillText('@DopamineLab 2026', cardX + cardW - 50, cardY + 85);

    // Situation Title Box
    const situY = badgeY + 90;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.07)';
    roundRect(ctx, cardX + 40, situY, cardW - 80, 150, 24);
    ctx.fill();
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
    ctx.lineWidth = 2;
    ctx.stroke();

    ctx.fillStyle = theme.accent;
    ctx.font = 'bold 22px Pretendard, sans-serif';
    ctx.textAlign = 'left';
    ctx.fillText('⚡ 발생한 억까 상황 :', cardX + 70, situY + 45);

    ctx.fillStyle = '#FFFFFF';
    ctx.font = '900 32px Pretendard, sans-serif';
    wrapText(ctx, `"${situation.title}"`, cardX + 70, situY + 95, cardW - 140, 42);

    // Persona Title & Icon
    const contentStartY = situY + 200;
    ctx.fillStyle = theme.accent;
    ctx.font = '900 40px Pretendard, sans-serif';
    ctx.fillText(`${currentPersona.icon} ${currentPersona.name}`, cardX + 50, contentStartY);

    ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
    ctx.font = 'bold 22px Pretendard, sans-serif';
    ctx.fillText(currentPersona.sub, cardX + 50, contentStartY + 45);

    // Content Bubble Box
    const contentBoxY = contentStartY + 75;
    const contentBoxH = aspectRatio === 'story' ? cardH - (contentBoxY - cardY) - 130 : cardH - (contentBoxY - cardY) - 100;
    
    ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
    roundRect(ctx, cardX + 40, contentBoxY, cardW - 80, contentBoxH, 24);
    ctx.fill();
    ctx.strokeStyle = theme.badgeBg;
    ctx.lineWidth = 3;
    ctx.stroke();

    // Main Perspective Quote Text
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 36px Pretendard, sans-serif';
    wrapText(ctx, currentPersona.content, cardX + 80, contentBoxY + 70, cardW - 160, 56);

    // Bottom Footer in Card
    const footerY = cardY + cardH - 60;
    ctx.fillStyle = theme.accent;
    ctx.font = '900 24px Pretendard, sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText('🍀 행운 복사 완료! 오늘 하루도 럭키비키잔앙 ✨', width / 2, footerY);

    // Outside Card Footer
    if (aspectRatio === 'story') {
      ctx.fillStyle = '#FFFFFF';
      ctx.font = 'bold 26px Pretendard, sans-serif';
      ctx.fillText('📱 캡처하거나 인스타그램 스토리/스레드에 공유해보세요!', width / 2, height - 80);
    }

  }, [situation, selectedPersona, cardTheme, aspectRatio]);

  // Helper for rounded rectangle
  function roundRect(ctx, x, y, width, height, radius) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
  }

  // Helper for text wrapping
  function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
    const words = text.split(' ');
    let line = '';
    let currentY = y;

    for (let n = 0; n < words.length; n++) {
      const testLine = line + words[n] + ' ';
      const metrics = ctx.measureText(testLine);
      const testWidth = metrics.width;
      if (testWidth > maxWidth && n > 0) {
        ctx.fillText(line, x, currentY);
        line = words[n] + ' ';
        currentY += lineHeight;
      } else {
        line = testLine;
      }
    }
    ctx.fillText(line, x, currentY);
  }

  // Download Image
  const handleDownload = () => {
    sound.playCoin();
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    });

    const canvas = canvasRef.current;
    if (!canvas) return;

    const link = document.createElement('a');
    link.download = `럭키비키_짤_${Date.now()}.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  // Copy to Clipboard
  const handleCopy = async () => {
    sound.playPop();
    const canvas = canvasRef.current;
    if (!canvas) return;

    try {
      canvas.toBlob(async (blob) => {
        if (blob) {
          await navigator.clipboard.write([
            new ClipboardItem({ 'image/png': blob })
          ]);
          setCopied(true);
          setTimeout(() => setCopied(false), 2500);
        }
      });
    } catch (err) {
      console.warn("Clipboard copy failed, fallback to text copy", err);
      navigator.clipboard.writeText(`${currentPersona.name}\n\n"${situation.title}"\n\n${currentPersona.content}\n\n- @DopamineLab 2026`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#18181f] border-2 border-zinc-700 rounded-3xl p-5 max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col md:flex-row gap-6">
        
        {/* Left: Preview Canvas */}
        <div className="flex-1 flex flex-col items-center justify-center bg-black/40 p-3 rounded-2xl border border-zinc-800">
          <canvas
            ref={canvasRef}
            className="max-h-[60vh] w-auto h-auto rounded-xl shadow-lg border border-zinc-700 object-contain"
          />
          <span className="text-xs text-zinc-500 mt-2 font-mono">
            {aspectRatio === 'story' ? '1080 × 1920 (Story Size)' : '1080 × 1080 (Square Feed)'}
          </span>
        </div>

        {/* Right: Controls & Options */}
        <div className="w-full md:w-80 flex flex-col justify-between gap-4">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black flex items-center gap-2 text-white">
                <Sparkles className="w-5 h-5 text-[#FF5E97]" />
                인스타 짤 카드 스튜디오
              </h3>
              <button
                onClick={onClose}
                className="text-zinc-400 hover:text-white text-sm font-bold bg-zinc-800 px-2.5 py-1 rounded-lg"
              >
                닫기 ✕
              </button>
            </div>

            {/* Ratio Toggle */}
            <div>
              <label className="text-xs font-bold text-zinc-400 block mb-1.5">카드 비율 선택</label>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setAspectRatio('story')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    aspectRatio === 'story'
                      ? 'bg-[#FF5E97] text-white border-pink-400 shadow-brutal'
                      : 'bg-zinc-800/80 text-zinc-300 border-zinc-700'
                  }`}
                >
                  📱 9:16 (인스타 스토리)
                </button>
                <button
                  onClick={() => setAspectRatio('square')}
                  className={`py-2 px-3 rounded-xl text-xs font-bold border transition-all ${
                    aspectRatio === 'square'
                      ? 'bg-[#FF5E97] text-white border-pink-400 shadow-brutal'
                      : 'bg-zinc-800/80 text-zinc-300 border-zinc-700'
                  }`}
                >
                  ⬛ 1:1 (피드/스레드)
                </button>
              </div>
            </div>

            {/* Theme Picker */}
            <div>
              <label className="text-xs font-bold text-zinc-400 block mb-1.5">테마 컬러</label>
              <div className="grid grid-cols-2 gap-2">
                {Object.entries(themes).map(([key, t]) => (
                  <button
                    key={key}
                    onClick={() => {
                      sound.playPop();
                      setCardTheme(key);
                    }}
                    className={`py-2 px-3 rounded-xl text-xs font-bold border text-left transition-all ${
                      cardTheme === key
                        ? 'border-white text-white bg-zinc-800 shadow-md ring-2 ring-[#FF5E97]'
                        : 'border-zinc-700/60 text-zinc-400 bg-zinc-900/60 hover:bg-zinc-800'
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Selected Persona Indicator */}
            <div className="p-3 bg-zinc-900/90 rounded-xl border border-zinc-800 text-xs">
              <span className="text-zinc-400 block">선택된 페르소나 :</span>
              <span className="font-bold text-white text-sm mt-0.5 block">{currentPersona.name}</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-2 pt-2 border-t border-zinc-800">
            <button
              onClick={handleDownload}
              className="w-full py-3 bg-gradient-to-r from-[#FF5E97] to-[#FFDF00] text-black font-black text-sm rounded-xl shadow-brutal hover:opacity-95 transition-all flex items-center justify-center gap-2"
            >
              <Download className="w-4 h-4" />
              고화질 PNG 이미지 저장
            </button>

            <button
              onClick={handleCopy}
              className="w-full py-2.5 bg-zinc-800 hover:bg-zinc-700 text-zinc-200 font-bold text-xs rounded-xl border border-zinc-700 transition-all flex items-center justify-center gap-2"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-green-400" />
                  <span className="text-green-400">클립보드에 복사 완료!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  이미지 / 텍스트 클립보드 복사
                </>
              )}
            </button>
          </div>

        </div>

      </div>
    </div>
  );
}
