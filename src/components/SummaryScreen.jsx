import LEVELS from "../data/levels";
import LANGUAGES from "../data/languages";
import Confetti from "./Confetti";
import { Particles } from "./Atmosphere";

export default function SummaryScreen({ stats, language, onReplay, onChangeLanguage }) {
  const accuracy =
    stats.attempts > 0 ? Math.round((stats.successesFirstTry / 20) * 100) : 100;
  const concepts = [...new Set(LEVELS.map((l) => l.concept))];

  return (
    <div className="screen summary-screen">
      <Confetti fire={true} />
      <Particles />
      <div className="summary-content">
        <div className="summary-chest">👑</div>
        <h1 className="summary-title">Dungeon Cleared!</h1>
        <p className="summary-sub">
          You escaped using {LANGUAGES.find((l) => l.id === language)?.name}{" "}
          {LANGUAGES.find((l) => l.id === language)?.icon}
        </p>

        <div className="summary-grid">
          <div className="summary-stat">
            <div className="summary-stat-value">20/20</div>
            <div className="summary-stat-label">Levels Cleared</div>
          </div>
          <div className="summary-stat">
            <div className="summary-stat-value">{stats.totalXP}</div>
            <div className="summary-stat-label">Total XP</div>
          </div>
          <div className="summary-stat">
            <div className="summary-stat-value">{stats.hintsUsed}</div>
            <div className="summary-stat-label">Hints Used</div>
          </div>
          <div className="summary-stat">
            <div className="summary-stat-value">{stats.solutionsRevealed}</div>
            <div className="summary-stat-label">Solutions Viewed</div>
          </div>
          <div className="summary-stat">
            <div className="summary-stat-value">{accuracy}%</div>
            <div className="summary-stat-label">First-Try Accuracy</div>
          </div>
          <div className="summary-stat">
            <div className="summary-stat-value">{stats.maxStreak}</div>
            <div className="summary-stat-label">Best Streak</div>
          </div>
        </div>

        <div className="concepts-mastered">
          <div className="concepts-label">Concepts Mastered</div>
          <div className="concept-chips">
            {concepts.map((c) => (
              <span key={c} className="concept-chip">
                {c}
              </span>
            ))}
          </div>
        </div>

        <div className="summary-actions">
          <button className="btn btn-primary btn-glow" onClick={onChangeLanguage}>
            🌍 Replay in a New Language
          </button>
          <button className="btn btn-secondary" onClick={onReplay}>
            🔁 Replay in {LANGUAGES.find((l) => l.id === language)?.name}
          </button>
        </div>
      </div>
    </div>
  );
}
