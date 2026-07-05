import LANGUAGES from "../data/languages";
import { Torch, Particles } from "./Atmosphere";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

export default function LanguageSelect({ onSelect, progressByLang }) {
  return (
    <div className="relative min-h-screen w-full flex items-center justify-center py-16 px-4 bg-[#2B1B3D] overflow-hidden select-none">
      {/* Mystical retro arcade background atmospheric elements */}
      <Particles />
      <Torch side="left" />
      <Torch side="right" />

      <div className="relative z-10 max-w-3xl w-full flex flex-col items-center gap-8">
        
        {/* Retro Game Header Signboard */}
        <Card className="w-full bg-[#FFB800] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black text-center transform -rotate-1 py-8 px-6 transition-transform hover:rotate-0 duration-300">
          <div className="text-6xl mb-3 animate-bounce inline-block filter drop-shadow-[0_4px_0_rgba(0,0,0,0.4)]">🗝️</div>
          <h1 className="font-heading text-4xl md:text-6xl tracking-wider text-black font-extrabold uppercase drop-shadow-[3px_3px_0_white]">
            Dungeon Escape
          </h1>
          <p className="font-base text-lg md:text-xl font-bold mt-2 uppercase tracking-wide opacity-90">
            A Data Structures &amp; Algorithms Adventure
          </p>
        </Card>

        {/* Quest Instructions Sign */}
        <div className="bg-[#6B4A2E] border-4 border-black rounded-lg text-[#F5E6C8] px-6 py-3 font-heading text-lg font-bold shadow-[4px_4px_0px_0px_rgba(0,0,0,0.6)] transform rotate-1 text-center max-w-md w-full">
          ⚔️ Choose your tongue of code to descend ⚔️
        </div>

        {/* Language Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-4">
          {LANGUAGES.map((lang) => {
            const prog = progressByLang[lang.id];
            const cleared = prog ? prog.completedLevels.length : 0;
            const progressPercent = Math.min(100, Math.round((cleared / 20) * 100));

            return (
              <Card
                key={lang.id}
                className="cursor-pointer bg-[#F5E6C8] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[-3px] hover:translate-y-[-3px] hover:shadow-[9px_9px_0px_0px_rgba(0,0,0,1)] transition-all active:translate-x-[2px] active:translate-y-[2px] active:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex flex-col p-6 items-center text-center gap-3 group"
                onClick={() => onSelect(lang.id)}
              >
                <div className="text-5xl group-hover:scale-110 transition-transform duration-200 filter drop-shadow-[0_2px_0_rgba(0,0,0,0.2)]">
                  {lang.icon}
                </div>
                <CardHeader className="p-0 flex flex-col items-center">
                  <CardTitle className="font-heading text-2xl font-black text-black">
                    {lang.name}
                  </CardTitle>
                  <CardDescription className="text-xs text-[#8B8594] font-bold uppercase tracking-widest mt-1">
                    {lang.ext}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-0 w-full mt-4 flex flex-col gap-2">
                  <div className="flex justify-between items-center text-xs font-black text-black">
                    <span>PROGRESS</span>
                    <span>{cleared}/20 Cleared</span>
                  </div>
                  {/* Neobrutalist Custom Progress Bar */}
                  <Progress value={progressPercent} className="h-4 border-2 border-black" />
                </CardContent>
              </Card>
            );
          })}
        </div>

        <p className="text-[#F5E6C8] opacity-75 text-sm font-semibold tracking-wide text-center mt-6 max-w-md">
          Progress is saved separately for each programming language. Escaping the dungeon with all languages unlocks ultimate bragging rights!
        </p>
      </div>
    </div>
  );
}
