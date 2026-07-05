export default function LevelCompleteToast({ level, xpEarned, onNext, isLast }) {
  return (
    <div className="modal-overlay">
      <div className="modal-card complete-card">
        <div className="complete-chest">🏆</div>
        <h2 className="complete-title">Level Cleared!</h2>
        <p className="complete-sub">
          {level.concept} — {level.title}
        </p>
        <div className="xp-pop">+{xpEarned} XP</div>
        <button className="btn btn-primary btn-glow" onClick={onNext}>
          {isLast ? "See Your Journey →" : "Continue to Next Level →"}
        </button>
      </div>
    </div>
  );
}
