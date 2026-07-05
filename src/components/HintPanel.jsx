import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function HintPanel({ level, hintIndex, onMore, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4" onClick={onClose}>
      <Card 
        className="bg-[#F5E6C8] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-md w-full p-6 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="p-0 pb-3 border-b-2 border-black flex flex-row items-center justify-between mb-4">
          <CardTitle className="font-heading text-xl font-black text-black flex items-center gap-2">
            <span>💡</span> Torchlight Hint
          </CardTitle>
          <button 
            className="w-8 h-8 rounded border-2 border-black bg-white flex items-center justify-center text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#E8543E] hover:text-white transition-colors"
            onClick={onClose}
          >
            ✕
          </button>
        </CardHeader>
        <CardContent className="p-0 flex flex-col gap-4">
          <div className="flex flex-col gap-3">
            {level.hints.slice(0, hintIndex + 1).map((h, i) => (
              <div key={i} className="flex gap-3 bg-white border-2 border-black rounded-lg p-3 shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] items-start">
                <span className="bg-[#FFB800] border-2 border-black rounded-full w-6 h-6 flex items-center justify-center text-xs font-heading font-black shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <p className="text-sm font-semibold leading-relaxed text-black">{h}</p>
              </div>
            ))}
          </div>

          <div className="mt-2">
            {hintIndex < level.hints.length - 1 ? (
              <Button 
                className="w-full bg-[#FFB800] text-black border-2 border-black font-heading font-black shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] hover:translate-x-boxShadowX hover:translate-y-boxShadowY hover:shadow-none transition-all py-5"
                onClick={onMore}
              >
                Reveal next hint ({hintIndex + 2}/{level.hints.length})
              </Button>
            ) : (
              <p className="text-center font-bold text-xs text-[#8B8594] uppercase tracking-wider">
                That's all the hints — you've got this!
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
