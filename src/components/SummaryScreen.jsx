import LEVELS from "../data/levels";
import LANGUAGES from "../data/languages";
import Confetti from "./Confetti";
import { Particles } from "./Atmosphere";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export default function SummaryScreen({ stats, language, onReplay, onChangeLanguage }) {
  const accuracy =
    stats.attempts > 0 ? Math.round((stats.successesFirstTry / LEVELS.length) * 100) : 100;
  const concepts = [...new Set(LEVELS.map((l) => l.concept))];
  const langName = LANGUAGES.find((l) => l.id === language)?.name;
  const langIcon = LANGUAGES.find((l) => l.id === language)?.icon;

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center py-16 px-4 bg-[#2B1B3D] overflow-hidden select-none">
      <Confetti fire={true} />
      <Particles />

      <div className="relative z-10 max-w-2xl w-full flex flex-col items-center gap-8">
        
        {/* Victory Banner */}
        <Card className="w-full bg-[#5FAD65] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] text-black text-center transform -rotate-1 py-8 px-6 transition-transform hover:rotate-0 duration-300">
          <div className="text-6xl mb-3 animate-bounce inline-block filter drop-shadow-[0_4px_0_rgba(0,0,0,0.4)]">👑</div>
          <h1 className="font-heading text-4xl md:text-5xl font-black uppercase drop-shadow-[2px_2px_0_white]">
            Dungeon Cleared!
          </h1>
          <p className="font-base text-lg font-bold mt-2 uppercase tracking-wide opacity-90">
            You escaped using {langName} {langIcon}
          </p>
        </Card>

        {/* Stats Summary Panel */}
        <Card className="w-full bg-[#F5E6C8] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] p-6">
          <CardHeader className="p-0 pb-4 border-b-2 border-black/10 mb-6">
            <CardTitle className="font-heading text-xl font-black text-black uppercase tracking-wide text-center">
              📊 Mission Statistics
            </CardTitle>
          </CardHeader>
          <CardContent className="p-0 flex flex-col gap-6">
            
            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              
              <div className="bg-white border-2 border-black rounded-lg p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center">
                <div className="font-heading text-2xl font-black text-[#E8543E]">
                  {LEVELS.length}/{LEVELS.length}
                </div>
                <div className="text-[10px] text-[#8B8594] font-black uppercase mt-1">Levels Cleared</div>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center">
                <div className="font-heading text-2xl font-black text-[#FFB800]">
                  {stats.totalXP}
                </div>
                <div className="text-[10px] text-[#8B8594] font-black uppercase mt-1">Total XP Earned</div>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center">
                <div className="font-heading text-2xl font-black text-[#8B5CF6]">
                  {stats.hintsUsed}
                </div>
                <div className="text-[10px] text-[#8B8594] font-black uppercase mt-1">Hints Grabbed</div>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center">
                <div className="font-heading text-2xl font-black text-[#5FAD65]">
                  {stats.solutionsRevealed}
                </div>
                <div className="text-[10px] text-[#8B8594] font-black uppercase mt-1">Solutions Viewed</div>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center">
                <div className="font-heading text-2xl font-black text-[#E8543E]">
                  {accuracy}%
                </div>
                <div className="text-[10px] text-[#8B8594] font-black uppercase mt-1">First-Try Accuracy</div>
              </div>

              <div className="bg-white border-2 border-black rounded-lg p-4 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] text-center">
                <div className="font-heading text-2xl font-black text-[#FFB800]">
                  {stats.maxStreak}
                </div>
                <div className="text-[10px] text-[#8B8594] font-black uppercase mt-1">Best Streak</div>
              </div>

            </div>

            {/* Concepts Mastered section */}
            <div className="flex flex-col gap-3 border-t-2 border-black/10 pt-6">
              <div className="text-xs font-black text-[#8B8594] uppercase tracking-wider text-center">
                🎓 Concepts Mastered
              </div>
              <div className="flex flex-wrap gap-2 justify-center">
                {concepts.map((concept) => (
                  <span
                    key={concept}
                    className="bg-[#FFF8EB] border-2 border-black rounded-md px-3 py-1 text-xs font-bold text-black shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]"
                  >
                    💡 {concept}
                  </span>
                ))}
              </div>
            </div>

          </CardContent>
        </Card>

        {/* Action Controls */}
        <div className="flex flex-col md:flex-row gap-4 w-full justify-center">
          <Button
            className="bg-[#FFB800] text-black border-3 border-black font-heading text-base font-black px-6 py-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
            onClick={onChangeLanguage}
          >
            🌍 Replay in a New Language
          </Button>
          <Button
            className="bg-white text-black border-3 border-black font-heading text-base font-black px-6 py-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all"
            onClick={onReplay}
          >
            🔁 Replay in {langName}
          </Button>
        </div>

      </div>
    </div>
  );
}
