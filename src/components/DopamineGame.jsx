import React, { useRef, useEffect, useState } from 'react';
import { Play, RotateCcw, Trophy, Sparkles, Volume2, Shield, Flame, Heart } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/audio';

export default function DopamineGame() {
  const canvasRef = useRef(null);
  const [gameState, setGameState] = useState('ready'); // 'ready', 'playing', 'gameover'
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('dopamine_highscore') || '0', 10);
  });
  const [lives, setLives] = useState(3);
  const [fever, setFever] = useState(0); // 0 to 100
  const [isShield, setIsShield] = useState(false);
  const [character, setCharacter] = useState('🧠'); // 🧠, 🍀, 🤖, 🦄

  const gameRef = useRef({
    player: { x: 200, y: 460, size: 40, targetX: 200 },
    items: [],
    particles: [],
    spawnTimer: 0,
    feverTime: 0,
    shieldTime: 0,
    animId: null,
    score: 0,
    lives: 3,
    fever: 0,
    width: 400,
    height: 540
  });

  // Start / Restart Game
  const startGame = () => {
    sound.playLucky();
    setGameState('playing');
    setScore(0);
    setLives(3);
    setFever(0);
    setIsShield(false);

    const g = gameRef.current;
    g.score = 0;
    g.lives = 3;
    g.fever = 0;
    g.items = [];
    g.particles = [];
    g.spawnTimer = 0;
    g.feverTime = 0;
    g.shieldTime = 0;
    g.player.x = g.width / 2;
    g.player.targetX = g.width / 2;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const g = gameRef.current;
    g.width = canvas.width = 440;
    g.height = canvas.height = 580;

    // Mouse / Touch Move handlers
    const handlePointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const scale = g.width / rect.width;
      g.player.targetX = (clientX - rect.left) * scale;
    };

    // Keyboard handlers
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        g.player.targetX = Math.max(30, g.player.targetX - 45);
      } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        g.player.targetX = Math.min(g.width - 30, g.player.targetX + 45);
      }
    };

    canvas.addEventListener('mousemove', handlePointerMove);
    canvas.addEventListener('touchmove', handlePointerMove, { passive: true });
    window.addEventListener('keydown', handleKeyDown);

    // Main Game Loop
    let lastTime = performance.now();

    const loop = (time) => {
      const dt = Math.min(0.1, (time - lastTime) / 1000);
      lastTime = time;

      // Update logic
      if (gameState === 'playing') {
        // Player smooth lerp
        g.player.x += (g.player.targetX - g.player.x) * 0.2;
        g.player.x = Math.max(30, Math.min(g.width - 30, g.player.x));

        // Fever / Shield timer
        if (g.shieldTime > 0) {
          g.shieldTime -= dt;
          if (g.shieldTime <= 0) setIsShield(false);
        }

        if (g.feverTime > 0) {
          g.feverTime -= dt;
          if (g.feverTime <= 0) {
            g.fever = 0;
            setFever(0);
          }
        }

        // Spawn items / obstacles
        g.spawnTimer += dt;
        const spawnInterval = g.feverTime > 0 ? 0.25 : 0.65;
        if (g.spawnTimer > spawnInterval) {
          g.spawnTimer = 0;
          spawnEntity(g);
        }

        // Move entities & collision
        for (let i = g.items.length - 1; i >= 0; i--) {
          const item = g.items[i];
          item.y += item.speed * (g.feverTime > 0 ? 1.4 : 1.0) * dt * 60;

          // Check collision with player
          const dist = Math.hypot(item.x - g.player.x, item.y - g.player.y);
          if (dist < g.player.size / 2 + item.size / 2) {
            // Collision occurred
            if (item.type === 'good') {
              // Collect good item
              sound.playCoin();
              g.score += item.score;
              setScore(g.score);

              // Add fever
              if (g.feverTime <= 0) {
                g.fever = Math.min(100, g.fever + item.fever);
                setFever(g.fever);
                if (g.fever >= 100) {
                  g.feverTime = 6.0; // 6s fever
                  sound.playLucky();
                }
              }

              if (item.shield) {
                g.shieldTime = 6.0;
                setIsShield(true);
                sound.playLucky();
              }

              createParticles(g, item.x, item.y, '#CCFF00', 8);
              g.items.splice(i, 1);
              continue;
            } else {
              // Hit obstacle
              if (g.shieldTime > 0 || g.feverTime > 0) {
                // Shield destroys obstacle
                sound.playPop();
                g.score += 50;
                setScore(g.score);
                createParticles(g, item.x, item.y, '#FF5E97', 10);
                g.items.splice(i, 1);
                continue;
              } else {
                // Take damage
                sound.playHit();
                g.lives -= 1;
                setLives(g.lives);
                createParticles(g, item.x, item.y, '#FF0055', 12);
                g.items.splice(i, 1);

                if (g.lives <= 0) {
                  // Game Over
                  setGameState('gameover');
                  if (g.score > highScore) {
                    setHighScore(g.score);
                    localStorage.setItem('dopamine_highscore', g.score.toString());
                    confetti({ particleCount: 120, spread: 80 });
                  }
                  break;
                }
                continue;
              }
            }
          }

          // Remove out of bounds
          if (item.y > g.height + 40) {
            g.items.splice(i, 1);
          }
        }
      }

      // Update particles
      for (let i = g.particles.length - 1; i >= 0; i--) {
        const p = g.particles[i];
        p.x += p.vx;
        p.y += p.vy;
        p.alpha -= dt * 1.5;
        if (p.alpha <= 0) g.particles.splice(i, 1);
      }

      // RENDER
      renderCanvas(ctx, g, character);

      g.animId = requestAnimationFrame(loop);
    };

    g.animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(g.animId);
      canvas.removeEventListener('mousemove', handlePointerMove);
      canvas.removeEventListener('touchmove', handlePointerMove);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [gameState, highScore, character]);

  // Helper: Spawn Entity
  function spawnEntity(g) {
    const isFever = g.feverTime > 0;
    const isObstacle = !isFever && Math.random() < 0.42;

    const goodTypes = [
      { emoji: '🍬', score: 100, fever: 12, size: 28, speed: 3.2, name: '도파민' },
      { emoji: '🍀', score: 250, fever: 25, size: 30, speed: 3.8, name: '럭키비키' },
      { emoji: '🪙', score: 500, fever: 30, size: 32, speed: 4.2, name: '떡상코인' },
      { emoji: '✨', score: 200, fever: 20, size: 32, speed: 3.5, shield: true, name: '무적쉴드' }
    ];

    const badTypes = [
      { emoji: '⏰', name: '월요일 알람', size: 32, speed: 3.5 },
      { emoji: '🪫', name: '배터리 1%', size: 32, speed: 4.0 },
      { emoji: '🗣️', name: '잔소리', size: 32, speed: 3.2 },
      { emoji: '💀', name: '읽씹', size: 30, speed: 4.5 }
    ];

    if (isObstacle) {
      const bad = badTypes[Math.floor(Math.random() * badTypes.length)];
      g.items.push({
        x: 30 + Math.random() * (g.width - 60),
        y: -30,
        type: 'bad',
        emoji: bad.emoji,
        name: bad.name,
        size: bad.size,
        speed: bad.speed + Math.random() * 1.2
      });
    } else {
      const good = goodTypes[Math.floor(Math.random() * goodTypes.length)];
      g.items.push({
        x: 30 + Math.random() * (g.width - 60),
        y: -30,
        type: 'good',
        emoji: good.emoji,
        score: good.score,
        fever: good.fever,
        shield: good.shield,
        size: good.size,
        speed: good.speed + Math.random() * 1.0
      });
    }
  }

  // Helper: Create Particles
  function createParticles(g, x, y, color, count) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 2 + Math.random() * 4;
      g.particles.push({
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        alpha: 1.0,
        size: 3 + Math.random() * 4,
        color
      });
    }
  }

  // Helper: Render Frame
  function renderCanvas(ctx, g, charEmoji) {
    // Background
    ctx.fillStyle = g.feverTime > 0 ? '#260B24' : '#101014';
    ctx.fillRect(0, 0, g.width, g.height);

    // Fever Background Stars / Grid
    ctx.strokeStyle = g.feverTime > 0 ? 'rgba(255, 94, 151, 0.25)' : 'rgba(255, 255, 255, 0.05)';
    ctx.lineWidth = 1.5;
    for (let x = 0; x < g.width; x += 40) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, g.height);
      ctx.stroke();
    }

    // Render Falling Items
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';

    g.items.forEach((item) => {
      ctx.font = `${item.size}px Pretendard, sans-serif`;
      ctx.fillText(item.emoji, item.x, item.y);
    });

    // Render Particles
    g.particles.forEach((p) => {
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.alpha;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.globalAlpha = 1.0;

    // Render Shield / Aura around player
    if (g.shieldTime > 0 || g.feverTime > 0) {
      ctx.strokeStyle = g.feverTime > 0 ? '#FF5E97' : '#00F0FF';
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.arc(g.player.x, g.player.y, g.player.size / 2 + 12, 0, Math.PI * 2);
      ctx.stroke();

      ctx.fillStyle = g.feverTime > 0 ? 'rgba(255, 94, 151, 0.2)' : 'rgba(0, 240, 255, 0.2)';
      ctx.fill();
    }

    // Render Player
    ctx.font = '38px Pretendard, sans-serif';
    ctx.fillText(charEmoji, g.player.x, g.player.y);
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-fadeIn">
      {/* Game Header */}
      <div className="bg-[#18181f] border-2 border-zinc-800 rounded-3xl p-5 md:p-6 shadow-brutal flex flex-col md:flex-row items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#CCFF00]/20 border border-[#CCFF00]/40 text-[#CCFF00] text-xs font-black uppercase mb-1.5">
            <Flame className="w-3.5 h-3.5" />
            하이퍼 캐주얼 밈 아케이드
          </div>
          <h1 className="text-xl md:text-2xl font-black text-white">
            도파민 서바이버 : 알고리즘 탈출기
          </h1>
          <p className="text-xs md:text-sm text-zinc-400">
            억까(월요일 알람, 배터리 1%)를 피하고 도파민 사탕과 럭키 클로버를 모으세요!
          </p>
        </div>

        {/* Character Selector */}
        <div className="flex items-center gap-2 bg-zinc-900/90 p-2 rounded-2xl border border-zinc-800">
          <span className="text-xs font-bold text-zinc-400 pl-2">캐릭터:</span>
          {['🧠', '🍀', '🤖', '🦄'].map((c) => (
            <button
              key={c}
              onClick={() => {
                sound.playPop();
                setCharacter(c);
              }}
              className={`w-9 h-9 text-lg rounded-xl flex items-center justify-center transition-all ${
                character === c
                  ? 'bg-[#FF5E97] shadow-brutal scale-110'
                  : 'hover:bg-zinc-800'
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      </div>

      {/* Game Arena & HUD */}
      <div className="flex flex-col md:flex-row items-center justify-center gap-6">
        
        {/* Left/Main Canvas Box */}
        <div className="relative bg-[#121216] border-2 border-zinc-800 rounded-3xl p-3 shadow-brutal-pink">
          
          {/* In-Game HUD Overlay */}
          <div className="absolute top-6 left-6 right-6 flex items-center justify-between pointer-events-none z-10">
            {/* Score */}
            <div className="bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-zinc-700 font-mono text-sm font-black text-white flex items-center gap-2">
              <Trophy className="w-4 h-4 text-[#FFDF00]" />
              <span>{score}</span>
            </div>

            {/* Lives */}
            <div className="bg-black/70 backdrop-blur-md px-3.5 py-1.5 rounded-xl border border-zinc-700 font-mono text-sm font-black text-[#FF5E97] flex items-center gap-1">
              {[...Array(3)].map((_, i) => (
                <Heart
                  key={i}
                  className={`w-4 h-4 ${i < lives ? 'fill-[#FF5E97] text-[#FF5E97]' : 'text-zinc-600'}`}
                />
              ))}
            </div>
          </div>

          {/* Fever Bar Overlay */}
          <div className="absolute bottom-6 left-6 right-6 pointer-events-none z-10">
            <div className="w-full h-2.5 bg-black/70 rounded-full border border-zinc-700 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-[#FF5E97] via-[#FFDF00] to-[#CCFF00] transition-all duration-150"
                style={{ width: `${fever}%` }}
              />
            </div>
          </div>

          {/* Canvas */}
          <canvas
            ref={canvasRef}
            className="w-[340px] sm:w-[380px] h-[500px] rounded-2xl cursor-crosshair border border-zinc-800/80"
          />

          {/* Ready Overlay */}
          {gameState === 'ready' && (
            <div className="absolute inset-0 bg-black/80 backdrop-blur-sm rounded-3xl flex flex-col items-center justify-center p-6 text-center z-20 space-y-4">
              <div className="w-16 h-16 rounded-3xl bg-[#CCFF00] text-black font-black text-3xl flex items-center justify-center shadow-brutal animate-bounce-slow">
                {character}
              </div>
              <div>
                <h3 className="text-xl font-black text-white mb-1">알고리즘 탈출 준비!</h3>
                <p className="text-xs text-zinc-300">
                  마우스 / 터치 드래그 또는 방향키(A/D)로 캐릭터를 움직이세요!
                </p>
              </div>
              <button
                onClick={startGame}
                className="px-8 py-3.5 bg-gradient-to-r from-[#FF5E97] to-[#CCFF00] text-black font-black text-sm rounded-2xl shadow-brutal hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <Play className="w-5 h-5 fill-black" />
                게임 시작!
              </button>
            </div>
          )}

          {/* Game Over Overlay */}
          {gameState === 'gameover' && (
            <div className="absolute inset-0 bg-black/85 backdrop-blur-md rounded-3xl flex flex-col items-center justify-center p-6 text-center z-20 space-y-4">
              <div className="text-4xl animate-wiggle">💀</div>
              <div>
                <span className="text-xs font-black text-[#FF5E97] uppercase">GAME OVER</span>
                <h3 className="text-2xl font-black text-white mt-1">도파민 방전!</h3>
                <p className="text-sm font-bold text-zinc-300 mt-2">
                  최종 점수: <span className="text-[#FFDF00] font-mono text-lg">{score}점</span>
                </p>
                {score >= highScore && score > 0 && (
                  <span className="inline-block mt-1 px-3 py-1 bg-[#CCFF00] text-black text-xs font-black rounded-full">
                    🎉 최고 기록 달성!
                  </span>
                )}
              </div>

              <button
                onClick={startGame}
                className="px-8 py-3.5 bg-gradient-to-r from-[#FF5E97] to-[#FFDF00] text-black font-black text-sm rounded-2xl shadow-brutal hover:scale-105 active:scale-95 transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-5 h-5" />
                다시 도전하기
              </button>
            </div>
          )}

        </div>

        {/* Right: Info & Controls */}
        <div className="w-full md:w-72 space-y-4">
          {/* Stats Card */}
          <div className="bg-[#18181f] border-2 border-zinc-800 rounded-3xl p-5 shadow-brutal space-y-3">
            <h4 className="text-xs font-black text-zinc-400 uppercase tracking-wider">
              🏆 내 랭킹 스코어
            </h4>
            <div className="flex items-center justify-between">
              <span className="text-sm text-zinc-300 font-bold">최고 기록 :</span>
              <span className="text-xl font-black text-[#FFDF00] font-mono">{highScore}점</span>
            </div>
          </div>

          {/* Guide Card */}
          <div className="bg-[#18181f] border-2 border-zinc-800 rounded-3xl p-5 shadow-brutal space-y-3">
            <h4 className="text-xs font-black text-zinc-400 uppercase tracking-wider">
              🎮 아이템 & 억까 도감
            </h4>
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/80">
                <span>🍬 도파민 캔디</span>
                <span className="font-bold text-[#CCFF00]">+100점</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/80">
                <span>🍀 럭키 클로버</span>
                <span className="font-bold text-[#CCFF00]">+250점 (피버)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/80">
                <span>🪙 떡상 코인</span>
                <span className="font-bold text-[#FFDF00]">+500점</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-zinc-900/80">
                <span>✨ 무적 실드</span>
                <span className="font-bold text-[#00F0FF]">6초 무적</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-xl bg-rose-950/30 border border-rose-800/40 text-rose-300">
                <span>⏰ 🪫 🗣️ 억까들</span>
                <span className="font-bold">-1 목숨</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
