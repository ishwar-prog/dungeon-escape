export default function StatBadge({ icon, label, value, color }) {
  return (
    <div className="stat-badge" style={{ "--badge-color": color }}>
      <span className="stat-icon">{icon}</span>
      <span className="stat-value">{value}</span>
      <span className="stat-label">{label}</span>
    </div>
  );
}
