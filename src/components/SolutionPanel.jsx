export default function SolutionPanel({ level, language, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card solution-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-icon">📜</span>
          <h3>Ancient Solution</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <pre className="code-block">
          <code>{level.solution[language]}</code>
        </pre>
        <div className="solution-explain">
          <p>{level.explanation}</p>
          <div className="complexity-chip">⏱ {level.complexity}</div>
        </div>
      </div>
    </div>
  );
}
