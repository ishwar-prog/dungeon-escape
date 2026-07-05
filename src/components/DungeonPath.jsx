import { Fragment } from "react";

export default function DungeonPath({ levels, progress, currentLevelId, onJump }) {
  return (
    <div className="flex flex-col items-center w-full">
      <div className="flex flex-col items-center gap-1.5 w-full py-2">
        {levels.map((lvl, i) => {
          const done = progress.completedLevels.includes(lvl.id);
          const unlocked =
            lvl.id === 1 || progress.completedLevels.includes(lvl.id - 1);
          const isCurrent = lvl.id === currentLevelId;

          let btnClass = "w-11 h-11 rounded-full border-3 border-black flex items-center justify-center font-heading font-black text-sm transition-all ";
          
          if (isCurrent) {
            btnClass += "bg-[#FFB800] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] ring-4 ring-[#FFB800]/40 animate-bounce";
          } else if (done) {
            btnClass += "bg-[#5FAD65] text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]";
          } else if (unlocked) {
            btnClass += "bg-white text-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] hover:bg-[#FFF8EB] hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]";
          } else {
            btnClass += "bg-[#8B8594]/25 text-[#8B8594] border-dashed border-gray-400 opacity-60 cursor-not-allowed";
          }

          let connectorClass = "w-1 h-5 border-l-2 border-black border-dashed ";
          if (done) {
            connectorClass = "w-1 h-5 bg-black ";
          }

          return (
            <Fragment key={lvl.id}>
              <button
                className={btnClass}
                disabled={!unlocked}
                onClick={() => unlocked && onJump(lvl.id)}
                title={`${lvl.id}. ${lvl.concept}`}
              >
                {done ? "✓" : unlocked ? lvl.id : "🔒"}
              </button>
              {i < levels.length - 1 && (
                <div className={connectorClass} />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
