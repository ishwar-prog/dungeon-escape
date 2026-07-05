import { useState, useRef, useEffect } from "react";
import LANGUAGES from "../data/languages";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import DungeonPath from "./DungeonPath";

const INVENTORY_ITEMS = [
  { id: "key", name: "Old Key", icon: "🔑", desc: "An old rusty key. Looks like it opens a locked vault.", conceptId: 1, count: 1 },
  { id: "potion", name: "Health Potion", icon: "🧪", desc: "A red bubbling elixir. Smells like strawberries and recovery.", conceptId: 3, count: 2 },
  { id: "scroll", name: "Magic Scroll", icon: "📜", desc: "A parchment containing ancient runes of sorting algorithms.", conceptId: 5, count: 1 },
  { id: "cog", name: "Stacking Cog", icon: "⚙️", desc: "A heavy metallic cog. Useful for lifters and stacking mechanisms.", conceptId: 9, count: 1 },
  { id: "gem", name: "Shadow Gem", icon: "💎", desc: "A dark violet gemstone that glows in presence of queue operations.", conceptId: 11, count: 3 },
  { id: "coin", name: "Gold Coin", icon: "🪙", desc: "A shiny coin stamped with a linked chain emblem.", conceptId: 13, count: 5 },
  { id: "skull", name: "Cursed Skull", icon: "💀", desc: "A small ivory skull. Whispers clues about hash tables.", conceptId: 15, count: 1 },
  { id: "rope", name: "Escape Rope", icon: "🪢", desc: "A sturdy rope woven from binary tree branches.", conceptId: 17, count: 1 },
  { id: "candle", name: "Lit Candle", icon: "🕯️", desc: "A wax candle casting light on deep graph pathways.", conceptId: 19, count: 2 },
];

export default function LevelScreen({
  level,
  levelIndex,
  totalLevels,
  language,
  code,
  onCodeChange,
  onSubmit,
  onHint,
  onSolution,
  feedback,
  xp,
  streak,
  health,
  timeLeft,
  gameState,
  onTryAgain,
  onChangeLanguage,
  completedLevels,
}) {
  const textareaRef = useRef(null);
  const [selectedItem, setSelectedItem] = useState(INVENTORY_ITEMS[0]);

  // Handle global keyboard interactions: [E] to focus editor, [Ctrl+Enter] to submit
  useEffect(() => {
    const handleGlobalKeyDown = (e) => {
      if (gameState === "gameover") return;

      // Ctrl+Enter or Cmd+Enter to submit
      if (e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        onSubmit();
        return;
      }

      // E or e to focus editor (when not typing)
      if (e.key === "e" || e.key === "E") {
        if (
          document.activeElement?.tagName !== "TEXTAREA" &&
          document.activeElement?.tagName !== "INPUT"
        ) {
          e.preventDefault();
          if (textareaRef.current) {
            textareaRef.current.focus();
            textareaRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
          }
        }
      }
    };
    window.addEventListener("keydown", handleGlobalKeyDown);
    return () => window.removeEventListener("keydown", handleGlobalKeyDown);
  }, [onSubmit, gameState]);

  // Handle Tab indentation in editor
  const handleKeyDown = (e) => {
    if (e.key === "Tab") {
      e.preventDefault();
      const el = textareaRef.current;
      const start = el.selectionStart;
      const end = el.selectionEnd;
      const newVal = code.slice(0, start) + "    " + code.slice(end);
      onCodeChange(newVal);
      requestAnimationFrame(() => {
        el.selectionStart = el.selectionEnd = start + 4;
      });
    }
  };

  // Format time (MM:SS)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  // Determine if item is unlocked based on completed levels/concepts
  const isItemUnlocked = (item) => {
    return completedLevels.some((id) => id >= item.conceptId);
  };

  return (
    <div className="min-h-screen w-full bg-[#1A1023] text-black font-base flex flex-col p-4 md:p-6 select-none relative">
      
      {/* RPG TOP HUD HEADER */}
      <header className="w-full bg-[#F5E6C8] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg p-4 flex flex-wrap gap-4 items-center justify-between z-10 mb-6">
        
        {/* Menu & Level Info */}
        <div className="flex items-center gap-3">
          <Button 
            variant="neutral" 
            size="icon" 
            className="border-2 border-black w-10 h-10 bg-[#FFB800]"
            onClick={onChangeLanguage}
            title="Return to Menu"
          >
            ☰
          </Button>
          <div className="flex flex-col">
            <span className="font-heading text-lg font-black text-black leading-none uppercase">
              Dungeon Level {level.id}
            </span>
            <span className="text-xs text-[#8B8594] font-bold uppercase tracking-wider mt-1">
              Concept: {level.concept}
            </span>
          </div>
        </div>

        {/* Stats HUD */}
        <div className="flex flex-wrap items-center gap-3">
          {/* Health Bar (Hearts) */}
          <div className="flex items-center gap-1.5 bg-[#FFF8EB] border-2 border-black rounded-md px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            <span className="text-xs font-black mr-1 uppercase">HEALTH</span>
            <div className="flex gap-0.5 text-base">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="filter drop-shadow-[1px_1px_0_rgba(0,0,0,0.8)]">
                  {i < health ? "❤️" : "🖤"}
                </span>
              ))}
            </div>
          </div>

          {/* Countdown Clock */}
          <div className={`flex items-center gap-2 border-2 border-black rounded-md px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] font-heading font-black text-white ${timeLeft < 300 ? "bg-[#E8543E] animate-pulse" : "bg-[#2B1B3D]"}`}>
            <span className="text-xs font-bold uppercase tracking-wide opacity-80">TIME LEFT</span>
            <span className="text-lg tracking-wider">{formatTime(timeLeft)}</span>
          </div>

          {/* XP Badge */}
          <div className="bg-[#FFB800] border-2 border-black rounded-md px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5">
            <span className="text-sm">⭐</span>
            <span className="font-heading font-black text-sm uppercase">{xp} XP</span>
          </div>

          {/* Streak Badge */}
          <div className="bg-[#E8543E] text-white border-2 border-black rounded-md px-3 py-1.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1.5">
            <span className="text-sm">🔥</span>
            <span className="font-heading font-black text-sm uppercase">{streak} STREAK</span>
          </div>
        </div>
      </header>

      {/* THREE-COLUMN WORKSPACE GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 flex-1 items-start z-10">
        
        {/* LEFT COLUMN: DUNGEON MAP PATH */}
        <aside className="lg:col-span-2 bg-[#F5E6C8] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg p-4 flex flex-col h-full max-h-[70vh] lg:max-h-[82vh] overflow-hidden">
          <div className="font-heading font-black text-base uppercase text-center border-b-2 border-black pb-2 mb-4 tracking-wider">
            🗺️ Dungeon Map
          </div>
          <div className="flex-1 overflow-y-auto pr-1 custom-scroll">
            <DungeonPath
              levels={Array.from({ length: totalLevels }).map((_, i) => ({ id: i + 1, concept: `Lvl ${i + 1}` }))}
              progress={{ completedLevels }}
              currentLevelId={level.id}
              onJump={() => {}}
            />
          </div>
        </aside>

        {/* CENTER COLUMN: MAIN VIEWPORT, PROMPT, & EDITOR */}
        <main className="lg:col-span-7 flex flex-col gap-6 w-full">
          
          {/* first-person 3D Dungeon Visual Viewport */}
          <Card className="bg-[#1A1023] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden relative group">
            {/* Viewport SVG drawing */}
            <svg viewBox="0 0 800 400" className="w-full h-auto aspect-[2/1] block">
              {/* Back wall/End of corridor */}
              <rect x="300" y="120" width="200" height="160" fill="#201726" stroke="#000000" strokeWidth="3" />
              
              {/* Closed / Open Dungeon Exit Door */}
              {feedback?.type === "success" ? (
                // Open Door path
                <g>
                  {/* Glowing exit path */}
                  <rect x="350" y="140" width="100" height="140" fill="#FFE58A" />
                  <path d="M350 280 L450 280 L450 140 L350 140 Z" fill="url(#exitGlow)" />
                  {/* Door frame */}
                  <rect x="348" y="138" width="104" height="144" fill="none" stroke="#000000" strokeWidth="4" />
                  {/* Open door panel swung left */}
                  <polygon points="350,140 300,120 300,280 350,280" fill="#6B4A2E" stroke="#000000" strokeWidth="3" />
                  <text x="310" y="210" fontSize="16" fill="#F5E6C8" fontWeight="bold" transform="rotate(-15, 310, 210)">🚪</text>
                </g>
              ) : (
                // Closed Door path with Skull Lock
                <g>
                  <rect x="350" y="140" width="100" height="140" fill="#5D2A8E" stroke="#000000" strokeWidth="4" />
                  {/* Wood planks texture lines */}
                  <line x1="383" y1="140" x2="383" y2="280" stroke="#000000" strokeWidth="2" />
                  <line x1="416" y1="140" x2="416" y2="280" stroke="#000000" strokeWidth="2" />
                  {/* Locked sign */}
                  <circle cx="400" cy="210" r="22" fill="#E8543E" stroke="#000000" strokeWidth="3" />
                  <text x="388" y="218" fontSize="24" filter="drop-shadow(1px 1px 0 rgba(0,0,0,0.5))">💀</text>
                </g>
              )}

              {/* Corridor wall perspective lines */}
              {/* Left Wall */}
              <polygon points="0,0 300,120 300,280 0,400" fill="#2E1D3B" stroke="#000000" strokeWidth="4" />
              {/* Right Wall */}
              <polygon points="800,0 500,120 500,280 800,400" fill="#2E1D3B" stroke="#000000" strokeWidth="4" />
              {/* Floor */}
              <polygon points="0,400 300,280 500,280 800,400" fill="#1C1026" stroke="#000000" strokeWidth="4" />
              {/* Ceiling */}
              <polygon points="0,0 300,120 500,120 800,0" fill="#3E2652" stroke="#000000" strokeWidth="4" />

              {/* Perspective bricks on left/right walls */}
              <line x1="150" y1="60" x2="150" y2="340" stroke="#000000" strokeWidth="2" opacity="0.4" />
              <line x1="650" y1="60" x2="650" y2="340" stroke="#000000" strokeWidth="2" opacity="0.4" />
              
              {/* Wall torches with flame flickers */}
              {/* Left Wall Torch */}
              <g transform="translate(100, 160)">
                <polygon points="-5,15 5,15 8,45 -8,45" fill="#6B4A2E" stroke="#000000" strokeWidth="2" />
                <ellipse cx="0" cy="5" rx="12" ry="16" fill="#FFB800" className="animate-pulse" />
                <ellipse cx="0" cy="8" rx="7" ry="10" fill="#E8543E" />
                <text x="-8" y="-5" fontSize="12">🔥</text>
              </g>
              {/* Right Wall Torch */}
              <g transform="translate(700, 160)">
                <polygon points="-5,15 5,15 8,45 -8,45" fill="#6B4A2E" stroke="#000000" strokeWidth="2" />
                <ellipse cx="0" cy="5" rx="12" ry="16" fill="#FFB800" className="animate-pulse" />
                <ellipse cx="0" cy="8" rx="7" ry="10" fill="#E8543E" />
                <text x="-8" y="-5" fontSize="12">🔥</text>
              </g>

              {/* Viewport Overlay Info Text */}
              <rect x="15" y="15" width="220" height="35" rx="4" fill="#000000" fillOpacity="0.75" />
              <text x="25" y="37" fill="#FFB800" fontSize="14" fontWeight="bold" fontFamily="monospace">
                ESCAPE: SOLVE. SURVIVE.
              </text>

              {/* Target Crosshair */}
              <line x1="400" y1="185" x2="400" y2="215" stroke="#FFB800" strokeWidth="2" opacity="0.8" />
              <line x1="385" y1="200" x2="415" y2="200" stroke="#FFB800" strokeWidth="2" opacity="0.8" />

              {/* Gradient Definitions */}
              <defs>
                <radialGradient id="exitGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#FFE58A" stopOpacity="1" />
                  <stop offset="100%" stopColor="#FFB800" stopOpacity="0" />
                </radialGradient>
              </defs>
            </svg>

            {/* Interact Prompt Label overlay */}
            <button
              onClick={() => {
                if (textareaRef.current) {
                  textareaRef.current.focus();
                  textareaRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
                }
              }}
              className="absolute bottom-4 right-4 bg-[#FFB800] border-2 border-black rounded px-3 py-1.5 text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none transition-all uppercase cursor-pointer hover:bg-[#FFD363] text-black"
            >
              INTERACT [E]
            </button>
          </Card>

          {/* Level Prompt Info Card */}
          <Card className="bg-[#F5E6C8] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
            <CardHeader className="pb-2 border-b-2 border-black flex flex-row items-center justify-between">
              <CardTitle className="font-heading text-xl font-black text-black">
                🚪 {level.title}
              </CardTitle>
              <span className="bg-[#8B5CF6] text-white border-2 border-black rounded-md px-2 py-0.5 text-xs font-bold uppercase tracking-wider shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]">
                {level.xp} XP
              </span>
            </CardHeader>
            <CardContent className="pt-4 flex flex-col gap-4">
              <p className="font-semibold text-sm md:text-base leading-relaxed text-black">
                {level.prompt}
              </p>
              
              {/* Test Cases Panel */}
              <div className="bg-[#FFF8EB] border-2 border-black rounded-lg p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                <div className="text-xs font-black text-[#8B8594] mb-2 uppercase tracking-wide">
                  Sample Test Cases
                </div>
                <div className="flex flex-col gap-1.5 font-mono text-xs">
                  {level.tests.map((test, idx) => (
                    <div key={idx} className="flex items-center gap-2 border-b border-black/10 pb-1 last:border-0 last:pb-0">
                      <span className="font-bold text-black bg-black/5 px-1.5 py-0.5 rounded">INPUT:</span>
                      <span className="text-[#8B5CF6] font-semibold">{test.input}</span>
                      <span className="text-[#E8543E] font-bold">➔</span>
                      <span className="font-bold text-black bg-black/5 px-1.5 py-0.5 rounded">EXPECTED:</span>
                      <span className="text-[#1B6B2A] font-semibold">{test.expected}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Editor Workspace Card */}
          <Card className="bg-[#1E1428] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-hidden">
            <div className="bg-[#2B1B3D] px-4 py-2 border-b-3 border-black flex justify-between items-center text-xs font-bold">
              <span className="text-[#FFB800] font-heading text-sm uppercase tracking-wide">
                💻 {LANGUAGES.find((lang) => lang.id === language)?.name} Code Forge
              </span>
              <span className="font-mono text-[#F5E6C8] opacity-80">
                {level.signature}
              </span>
            </div>
            <textarea
              ref={textareaRef}
              className="w-full min-h-[220px] bg-[#1E1428] text-[#F0E6FF] font-mono text-sm leading-relaxed p-4 border-none outline-none resize-y custom-scroll"
              value={code}
              onChange={(e) => onCodeChange(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
            />
          </Card>

          {/* Feedback banners */}
          {feedback && (
            <div className={`p-4 border-3 border-black rounded-lg shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] font-bold text-sm ${feedback.type === "success" ? "bg-[#5FAD65] text-[#06280C]" : "bg-[#F5E6C8] text-black"}`}>
              {feedback.type === "success" ? "✅ " : "💡 "} {feedback.message}
            </div>
          )}

          {/* Interactive controls */}
          <div className="flex flex-wrap gap-4 w-full justify-between items-center mt-2">
            <div className="flex gap-3">
              <Button
                variant="neutral"
                className="bg-white border-2 border-black hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                onClick={onHint}
              >
                💡 Hint
              </Button>
              <Button
                variant="neutral"
                className="bg-white border-2 border-black hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)]"
                onClick={onSolution}
              >
                📜 Solution
              </Button>
            </div>
            <Button
              className="bg-[#FFB800] text-black border-2 border-black font-heading text-lg font-black tracking-wide px-6 py-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all active:translate-x-[2px] active:translate-y-[2px]"
              onClick={onSubmit}
            >
              ⚔️ Submit Solution
            </Button>
          </div>
        </main>

        {/* RIGHT COLUMN: INVENTORY PANEL */}
        <aside className="lg:col-span-3 bg-[#F5E6C8] border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-lg p-4 flex flex-col gap-4">
          <div className="font-heading font-black text-base uppercase text-center border-b-2 border-black pb-2 tracking-wider">
            🎒 Inventory
          </div>

          {/* 3x3 Grid of Items */}
          <div className="grid grid-cols-3 gap-2.5 bg-[#FFF8EB] border-2 border-black rounded-lg p-2.5 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
            {INVENTORY_ITEMS.map((item) => {
              const unlocked = isItemUnlocked(item);
              const isSelected = selectedItem?.id === item.id;
              return (
                <button
                  key={item.id}
                  className={`aspect-square rounded border-2 border-black flex flex-col items-center justify-center relative transition-all ${
                    unlocked
                      ? isSelected
                        ? "bg-[#FFB800] shadow-none translate-x-[1px] translate-y-[1px]"
                        : "bg-white hover:bg-white/80 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]"
                      : "bg-[#8B8594]/20 opacity-40 cursor-not-allowed"
                  }`}
                  disabled={!unlocked}
                  onClick={() => unlocked && setSelectedItem(item)}
                  title={unlocked ? item.name : `Locked: Clear level ${item.conceptId} concept`}
                >
                  <span className="text-2xl filter drop-shadow-[1px_1px_0_rgba(0,0,0,0.15)]">
                    {unlocked ? item.icon : "🔒"}
                  </span>
                  {unlocked && (
                    <span className="absolute bottom-1 right-1 text-[10px] font-black bg-black text-white rounded-full w-4 h-4 flex items-center justify-center border border-white">
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* Selected Item details card */}
          <Card className="bg-[#FFF8EB] border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex-1 min-h-[140px] flex flex-col justify-between p-3.5">
            {selectedItem ? (
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 border-b border-black/10 pb-1.5">
                  <span className="text-3xl">{selectedItem.icon}</span>
                  <div className="flex flex-col">
                    <span className="font-heading font-black text-sm uppercase text-black leading-none">
                      {selectedItem.name}
                    </span>
                    <span className="text-[10px] text-[#8B8594] font-bold mt-0.5">
                      CONCEPT ITEM
                    </span>
                  </div>
                </div>
                <p className="text-xs font-semibold text-black leading-relaxed">
                  {selectedItem.desc}
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center text-center h-full text-xs text-[#8B8594] font-bold p-4">
                Select an item in your bag to inspect it
              </div>
            )}
            {selectedItem && (
              <div className="text-[10px] text-right font-black tracking-wider text-[#8B8594] uppercase mt-2">
                Concept Lvl: {selectedItem.conceptId}
              </div>
            )}
          </Card>
        </aside>
      </div>

      {/* GAME OVER SCREEN OVERLAY */}
      {gameState === "gameover" && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#E8543E] border-4 border-black rounded-lg shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-md w-full p-8 text-center flex flex-col items-center gap-6 animate-scale-up">
            <div className="text-6xl animate-bounce">💀</div>
            
            <div className="flex flex-col gap-1">
              <h2 className="font-heading text-4xl md:text-5xl font-black text-black uppercase tracking-wider">
                Game Over
              </h2>
              <span className="bg-black text-[#FFB800] border-2 border-[#FFB800] rounded px-3 py-1 font-heading text-lg font-black tracking-widest uppercase mt-2">
                Time's Up!
              </span>
            </div>

            <p className="font-base text-lg font-black text-black">
              You failed to escape the dungeon chambers in time!
            </p>

            <div className="grid grid-cols-2 gap-4 w-full bg-white border-2 border-black rounded-md p-4 text-left shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
              <div>
                <div className="text-[10px] text-[#8B8594] font-black uppercase">Time Survived</div>
                <div className="font-heading text-xl font-black text-black">00:00</div>
              </div>
              <div>
                <div className="text-[10px] text-[#8B8594] font-black uppercase">Puzzles Solved</div>
                <div className="font-heading text-xl font-black text-black">
                  {completedLevels.length} / {totalLevels}
                </div>
              </div>
            </div>

            <div className="flex gap-4 w-full mt-2">
              <Button
                className="flex-1 bg-[#FFB800] text-black border-2 border-black font-heading text-base font-black py-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                onClick={onTryAgain}
              >
                Try Again
              </Button>
              <Button
                className="flex-1 bg-white text-black border-2 border-black font-heading text-base font-black py-4 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
                onClick={onChangeLanguage}
              >
                Main Menu
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
