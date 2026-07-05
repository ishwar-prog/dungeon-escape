import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function LevelCompleteToast({ level, xpEarned, onNext, isLast }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4">
      <Card className="bg-[#5FAD65] border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] max-w-sm w-full p-8 text-center animate-scale-up">
        <CardContent className="p-0 flex flex-col items-center gap-4">
          <div className="text-6xl animate-bounce filter drop-shadow-[0_4px_0_rgba(0,0,0,0.35)]">🏆</div>
          
          <div className="flex flex-col gap-1 mt-1">
            <h2 className="font-heading text-3xl font-black text-black uppercase tracking-wider">
              Level Cleared!
            </h2>
            <p className="text-sm font-bold text-black opacity-80 uppercase tracking-wide">
              {level.concept} — {level.title}
            </p>
          </div>

          <div className="bg-[#FFB800] border-3 border-black rounded-lg px-6 py-2.5 font-heading text-2xl font-black text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] my-2">
            +{xpEarned} XP
          </div>

          <Button 
            className="w-full bg-[#2B1B3D] text-white border-2 border-black font-heading text-base font-black py-6 shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all active:translate-x-[2px] active:translate-y-[2px]"
            onClick={onNext}
          >
            {isLast ? "See Your Journey →" : "Continue to Next Level →"}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
