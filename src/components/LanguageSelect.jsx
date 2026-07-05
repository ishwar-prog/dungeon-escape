import LANGUAGES from "../data/languages";
import { Torch, Particles } from "./Atmosphere";

export default function LanguageSelect({ onSelect, progressByLang }) {
  return (
    <div className="screen lang-screen">
      <Particles />
      <Torch side="left" />
      <Torch side="right" />
      <div className="lang-content">
        <div className="game-logo">
          <div className="logo-chest">🗝️</div>
          <h1 className="game-title">DUNGEON ESCAPE</h1>
          <p className="game-subtitle">A Data Structures &amp; Algorithms Adventure</p>
        </div>

        <div className="wooden-sign">
          <p>Choose your tongue of code to begin the descent</p>
        </div>

        <div className="lang-grid">
          {LANGUAGES.map((lang) => {
            const prog = progressByLang[lang.id];
            const cleared = prog ? prog.completedLevels.length : 0;
            return (
              <button
                key={lang.id}
                className="lang-card"
                onClick={() => onSelect(lang.id)}
              >
                <div className="lang-icon">{lang.icon}</div>
                <div className="lang-name">{lang.name}</div>
                <div className="lang-flavor">{lang.ext}</div>
                <div className="lang-progress-row">
                  <div className="lang-progress-track">
                    <div
                      className="lang-progress-fill"
                      style={{ width: `${(cleared / 20) * 100}%` }}
                    />
                  </div>
                  <span className="lang-progress-text">{cleared}/20</span>
                </div>
              </button>
            );
          })}
        </div>
        <p className="lang-footnote">
          Progress is tracked separately for each language — clear the dungeon more than once!
        </p>
      </div>
    </div>
  );
}
