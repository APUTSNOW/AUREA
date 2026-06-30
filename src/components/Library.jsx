import { useMemo, useState } from "react";

const icons = {
  Tutte: "▦",
  Solitudine: "☾",
  Silenzio: "✧",
  Comunicazione: "◌",
  Amore: "♡",
  Assenza: "◒",
  Nostalgia: "◔",
  Distanza: "↝",
  Speranza: "✦",
  Pace: "◯",
  Utopia: "△",
  Spiritualità: "✺",
  Fragilità: "◇",
  Identità: "◈",
  Destino: "⟡",
  Teatro: "◫",
  Consolazione: "✚",
  Resistenza: "⟁",
  Dolore: "◆",
  Memoria: "◷",
  Redenzione: "✹",
  Fuga: "↗",
  Riscatto: "⬡",
  Dubbio: "?",
  Ossessione: "◎",
  Vulnerabilità: "♢",
  Illusione: "◌",
  Trappola: "⌁",
  Desiderio: "♡",
};

function coverLabel(song) {
  return song.title
    .split(" ")
    .filter(Boolean)
    .slice(0, 3)
    .map((word) => word[0])
    .join("")
    .toUpperCase();
}

export default function Library({ songs, onOpenSong }) {
  const [query, setQuery] = useState("");
  const [activeConstellation, setActiveConstellation] = useState("Tutte");

  const constellations = useMemo(() => {
    return ["Tutte", ...new Set(songs.flatMap((song) => song.constellations))];
  }, [songs]);

  const filteredSongs = useMemo(() => {
    const q = query.toLowerCase();

    return songs.filter((song) => {
      const text = [
        song.title,
        song.artist,
        song.album,
        song.year,
        song.treasure.name,
        song.treasure.revelation,
        ...song.constellations,
      ]
        .join(" ")
        .toLowerCase();

      const matchesQuery = text.includes(q);
      const matchesConstellation =
        activeConstellation === "Tutte" ||
        song.constellations.includes(activeConstellation);

      return matchesQuery && matchesConstellation;
    });
  }, [songs, query, activeConstellation]);

  return (
    <section className="screen active">
      <div className="scroll library-scroll">
        <header className="library-hero">
          <div>
            <h2 className="gold">Biblioteca</h2>
            <p>Esplora i primi Tesori di AUREA.</p>
          </div>
          <div className="hero-note gold">♪</div>
        </header>

        <label className="search-shell">
          <span>⌕</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cerca canzone, artista, tema..."
          />
        </label>

        <div className="section-heading">
          <span className="heading-icon">✦</span>
          <p className="section-title">Costellazioni</p>
        </div>

        <div className="row constellation-row">
          {constellations.map((name) => (
            <button
              key={name}
              className={`filter ${activeConstellation === name ? "active" : ""}`}
              onClick={() => setActiveConstellation(name)}
            >
              <span>{icons[name] || "✧"}</span>
              {name}
            </button>
          ))}
        </div>

        <div className="section-heading treasures-heading">
          <span className="heading-icon">▣</span>
          <p className="section-title">Tesori</p>
        </div>

        <div className="song-list">
          {filteredSongs.map((song, index) => (
            <article
              className="song-card premium-card"
              key={song.id}
              onClick={() => onOpenSong(song.id)}
              style={{ "--delay": `${index * 40}ms` }}
            >
              <div className="cover-art">
                <span>{coverLabel(song)}</span>
              </div>

              <div className="song-copy">
                <strong>{song.title}</strong>
                <span className="song-meta">
                  {song.artist} · {song.year}
                </span>
                <div className="chips">
                  {song.constellations.map((c) => (
                    <span className="chip" key={c}>{c}</span>
                  ))}
                </div>
              </div>

              <div className="open-arrow">›</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
