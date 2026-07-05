import { Fragment } from "react";

export default function DungeonPath({ levels, progress, currentLevelId, onJump }) {
  return (
    <div className="dungeon-path">
      <div className="path-title">The Path</div>
      <div className="path-scroll">
        {levels.map((lvl, i) => {
          const done = progress.completedLevels.includes(lvl.id);
          const unlocked =
            lvl.id === 1 || progress.completedLevels.includes(lvl.id - 1);
          const isCurrent = lvl.id === currentLevelId;
          return (
            <Fragment key={lvl.id}>
              <button
                className={`path-node ${done ? "path-done" : ""} ${
                  isCurrent ? "path-current" : ""
                } ${!unlocked ? "path-locked" : ""}`}
                disabled={!unlocked}
                onClick={() => unlocked && onJump(lvl.id)}
                title={`${lvl.id}. ${lvl.concept}`}
              >
                {done ? "✓" : unlocked ? lvl.id : "🔒"}
              </button>
              {i < levels.length - 1 && (
                <div className={`path-link ${done ? "path-link-done" : ""}`} />
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}
