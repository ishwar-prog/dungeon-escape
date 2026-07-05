import { useRef } from "react";
import LEVELS from "../data/levels";
import LANGUAGES from "../data/languages";
import { Particles } from "./Atmosphere";
import StatBadge from "./StatBadge";
import DungeonPath from "./DungeonPath";

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
}) {
  const textareaRef = useRef(null);

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

  return (
    <div className="screen level-screen">
      <Particles />
      <header className="game-header">
        <div className="header-left">
          <span className="header-badge">
            Level {level.id}/{totalLevels}
          </span>
          <span className="header-concept">{level.concept}</span>
        </div>
        <div className="header-stats">
          <StatBadge icon="⭐" label="XP" value={xp} color="#FFB800" />
          <StatBadge icon="🔥" label="Streak" value={streak} color="#E8543E" />
        </div>
      </header>

      <div className="level-body">
        <DungeonPath
          levels={LEVELS}
          progress={{ completedLevels: LEVELS.slice(0, levelIndex).map((l) => l.id) }}
          currentLevelId={level.id}
          onJump={() => {}}
        />

        <main className="level-main">
          <div className="stone-card">
            <div className="stone-card-header">
              <h2 className="level-title">
                <span className="level-emoji">🚪</span> {level.title}
              </h2>
              <span className="concept-tag">{level.concept}</span>
            </div>
            <p className="level-prompt">{level.prompt}</p>

            <div className="test-cases">
              <div className="test-cases-label">Sample cases</div>
              {level.tests.map((t, i) => (
                <div key={i} className="test-case-row">
                  <span className="test-in">{t.input}</span>
                  <span className="test-arrow">→</span>
                  <span className="test-out">{t.expected}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="editor-card">
            <div className="editor-topbar">
              <span className="editor-lang">
                {LANGUAGES.find((l) => l.id === language)?.icon}{" "}
                {LANGUAGES.find((l) => l.id === language)?.name}
              </span>
              <span className="editor-signature">{level.signature}</span>
            </div>
            <textarea
              ref={textareaRef}
              className="code-editor"
              value={code}
              onChange={(e) => onCodeChange(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              autoCapitalize="off"
              autoCorrect="off"
            />
          </div>

          {feedback && (
            <div className={`feedback-banner feedback-${feedback.type}`}>
              {feedback.type === "success" ? "✅" : "🌱"} {feedback.message}
            </div>
          )}

          <div className="action-row">
            <button className="btn btn-ghost" onClick={onHint}>
              💡 Hint
            </button>
            <button className="btn btn-ghost" onClick={onSolution}>
              📜 Reveal Solution
            </button>
            <button className="btn btn-primary" onClick={onSubmit}>
              ⚔️ Submit Solution
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
