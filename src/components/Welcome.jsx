export default function Welcome({ onStart }) {
  return (
    <section className="screen active">
      <div className="center">
        <div className="mark gold">♪</div>
        <h1 className="gold">AUREA</h1>
        <p className="claim">BENVENUTO IN AUREA</p>
        <p className="subtitle">La musica finalmente sarà compresa</p>
        <p>Ogni canzone custodisce un tesoro.</p>
        <button className="btn" onClick={onStart}>Esplora la Biblioteca</button>
      </div>
    </section>
  );
}
