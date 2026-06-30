import { useMemo, useState } from "react";

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
      <div className="scroll">
        <h2 className="gold">Biblioteca</h2>
        <p>Esplora i primi Tesori di AUREA.</p>

        <input
          className="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Cerca canzone, artista, tema..."
        />

        <p className="section-title">Costellazioni</p>
        <div className="row">
          {constellations.map((name) => (
            <button
              key={name}
              className={`filter ${activeConstellation === name ? "active" : ""}`}
              onClick={() => setActiveConstellation(name)}
            >
              {name}
            </button>
          ))}
        </div>

        <p className="section-title">Tesori</p>
        <div className="song-list">
          {filteredSongs.map((song) => (
            <article className="song-card" key={song.id} onClick={() => onOpenSong(song.id)}>
              <strong>{song.title}</strong>
              <span>{song.artist} · {song.year}</span>
              <div className="chips">
                {song.constellations.map((c) => (
                  <span className="chip" key={c}>{c}</span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
