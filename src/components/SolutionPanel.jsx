import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default function SolutionPanel({ level, language, onClose }) {
  return (
    <div className="fixed inset-0 z-50 bg-black/75 flex items-center justify-center p-4" onClick={onClose}>
      <Card 
        className="bg-[#F5E6C8] border-4 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] max-w-lg w-full p-6 animate-scale-up"
        onClick={(e) => e.stopPropagation()}
      >
        <CardHeader className="p-0 pb-3 border-b-2 border-black flex flex-row items-center justify-between mb-4">
          <CardTitle className="font-heading text-xl font-black text-black flex items-center gap-2">
            <span>📜</span> Ancient Solution
          </CardTitle>
          <button 
            className="w-8 h-8 rounded border-2 border-black bg-white flex items-center justify-center text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#E8543E] hover:text-white transition-colors"
            onClick={onClose}
          >
            ✕
          </button>
        </CardHeader>
        <CardContent className="p-0 flex flex-col gap-4">
          {/* Scrollable Code Block Terminal */}
          <div className="bg-[#1E1428] border-3 border-black rounded-lg p-4 text-[#F0E6FF] font-mono text-sm leading-relaxed overflow-x-auto shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] max-h-[220px] custom-scroll">
            <pre><code>{level.solution[language]}</code></pre>
          </div>

          <div className="flex flex-col gap-3 mt-1">
            <p className="text-sm font-semibold text-black leading-relaxed">
              {level.explanation}
            </p>
            <div className="flex justify-between items-center mt-2">
              <span className="bg-[#8B5CF6] text-white border-2 border-black rounded-md px-3 py-1 text-xs font-bold shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] uppercase tracking-wide">
                ⏱ {level.complexity}
              </span>
              <span className="text-[10px] text-[#8B8594] font-black uppercase tracking-wider">
                DSA COMPILER RULE
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
