export default function TabBar({ current, onGo }) {
  const tabs = [
    ["library", "▥", "Biblioteca"],
    ["journey", "◉", "Viaggio"],
    ["editor", "✎", "Editor"],
  ];

  return (
    <nav className="tabs premium-tabs">
      {tabs.map(([id, icon, label]) => (
        <button
          key={id}
          className={current === id ? "active" : ""}
          onClick={() => onGo(id)}
        >
          <b>{icon}</b>
          {label}
        </button>
      ))}
    </nav>
  );
}
