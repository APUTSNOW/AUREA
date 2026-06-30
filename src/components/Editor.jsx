import { useState } from "react";

export default function Editor() {
  const [draft, setDraft] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const title = form.get("title") || "Nuova canzone";

    const generated = {
      id: String(title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
      title,
      artist: form.get("artist") || "",
      constellations: String(form.get("constellations") || "")
        .split(",")
        .map((value) => value.trim())
        .filter(Boolean),
      treasure: {
        verse: form.get("verse") || "",
        revelation: form.get("revelation") || "",
      },
    };

    localStorage.setItem("aurea.editor.draft", JSON.stringify(generated, null, 2));
    setDraft(generated);
  }

  return (
    <section className="screen active">
      <div className="scroll">
        <p className="label">AUREA Studio</p>
        <h2 className="gold">Editor dei Tesori</h2>
        <p>Crea una bozza locale di un nuovo Tesoro.</p>

        <form className="editor-form" onSubmit={handleSubmit}>
          <label>Titolo canzone<input name="title" placeholder="Es. Imagine" /></label>
          <label>Artista<input name="artist" placeholder="Es. John Lennon" /></label>
          <label>Costellazioni<input name="constellations" placeholder="Speranza, Pace, Utopia" /></label>
          <label>Il Verso<textarea name="verse" /></label>
          <label>Rivelazione<textarea name="revelation" /></label>
          <button className="btn" type="submit">Salva bozza</button>
        </form>

        <article className="card editor-output">
          <p className="label">Bozza generata</p>
          <pre>{JSON.stringify(draft || {}, null, 2)}</pre>
        </article>
      </div>
    </section>
  );
}
