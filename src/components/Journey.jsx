export default function Journey({ lastOpened }) {
  return (
    <section className="screen active">
      <div className="scroll">
        <h2 className="gold">Il Mio Viaggio</h2>
        <p>Le tue scoperte musicali.</p>

        <article className="card list">
          <strong>Ultimo Tesoro aperto</strong>
          <span>{lastOpened?.title || "Nessuno"}</span>
        </article>

        <article className="card list">
          <strong>Ultima Rivelazione</strong>
          <span>{lastOpened?.treasure?.revelation || "Nessuna"}</span>
        </article>

        <article className="card list">
          <strong>Costellazioni</strong>
          <span>{lastOpened?.constellations?.join(", ") || "Nessuna"}</span>
        </article>
      </div>
    </section>
  );
}
