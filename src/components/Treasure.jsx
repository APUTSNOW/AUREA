export default function Treasure({ song, songs, onBack, onOpenSong, onSaveJourney }) {
  const treasure = song.treasure;
  const thread = song.goldenThreads?.[0];
  const related = thread ? songs.find((item) => item.id === thread.relatedSongId) : null;

  return (
    <section className="screen active">
      <button className="back" onClick={onBack}>‹</button>

      <div className="scroll">
        <p className="label">Tesoro</p>
        <h2 className="gold">{song.title}</h2>
        <p>{song.artist}</p>

        <article className="parchment">
          <h3>📜 Il Verso</h3>
          <div className="quote">“{treasure.verse}”</div>
          <p>{treasure.verseNote}</p>

          <h3>🕯️ Il Significato</h3>
          <p>{treasure.interpretation.meaning}</p>

          <h3>🌍 Il Contesto</h3>
          <p>{treasure.facts.context}</p>

          <h3>❤️ L’Emozione</h3>
          <p>{treasure.interpretation.emotion}</p>

          <h3>✨ La Rivelazione</h3>
          <p>{treasure.revelation}</p>

          <div className="seal">✨ {treasure.listenAgain}</div>
        </article>

        <article className="card echo-card">
          <p className="label">🕊️ L’Eco</p>
          <p>{song.echoes?.[0]?.text || "L’Eco resta in silenzio per questo Tesoro."}</p>
        </article>

        {related && (
          <article className="card thread-card">
            <p className="label">🌌 Filo d’Oro</p>
            <h3>{related.title}</h3>
            <p>{thread.reason}</p>
            <button className="inline-btn" onClick={() => onOpenSong(related.id)}>
              Apri il Tesoro collegato
            </button>
          </article>
        )}

        <button className="btn" onClick={onSaveJourney}>Salva nel Mio Viaggio</button>
      </div>
    </section>
  );
}
