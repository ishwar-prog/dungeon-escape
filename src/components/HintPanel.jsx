export default function HintPanel({ level, hintIndex, onMore, onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card hint-card" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <span className="modal-icon">💡</span>
          <h3>Torchlight Hint</h3>
          <button className="modal-close" onClick={onClose}>
            ✕
          </button>
        </div>
        <div className="hint-list">
          {level.hints.slice(0, hintIndex + 1).map((h, i) => (
            <div key={i} className="hint-item">
              <span className="hint-num">{i + 1}</span>
              <p>{h}</p>
            </div>
          ))}
        </div>
        {hintIndex < level.hints.length - 1 ? (
          <button className="btn btn-secondary" onClick={onMore}>
            Reveal another hint ({hintIndex + 2}/{level.hints.length})
          </button>
        ) : (
          <p className="hint-exhausted">That's all the hints — you've got this!</p>
        )}
      </div>
    </div>
  );
}
