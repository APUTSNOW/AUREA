window.AureaEditor = {
  storageKey: "aurea.editor.draft",

  init() {
    const form = document.querySelector("#treasure-form");
    const preview = document.querySelector("#preview-draft");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const draft = this.buildDraft(form);
      localStorage.setItem(this.storageKey, JSON.stringify(draft, null, 2));
      this.renderDraft(draft);
      this.setStatus("Bozza salvata nel browser");
    });

    preview?.addEventListener("click", () => {
      const draft = this.buildDraft(form);
      this.renderDraft(draft);
    });

    const saved = localStorage.getItem(this.storageKey);
    if (saved) {
      this.renderDraft(JSON.parse(saved));
      this.setStatus("Bozza locale disponibile");
    }
  },

  buildDraft(form) {
    const data = new FormData(form);
    const title = data.get("title") || "Nuova canzone";
    const id = String(title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

    return {
      id,
      title,
      artist: data.get("artist") || "",
      album: data.get("album") || "",
      year: data.get("year") || "",
      language: "unknown",
      constellations: String(data.get("constellations") || "").split(",").map(v => v.trim()).filter(Boolean),
      treasure: {
        name: data.get("treasureName") || "",
        verse: data.get("verse") || "",
        verseNote: data.get("verseNote") || "",
        facts: { context: data.get("context") || "" },
        interpretation: {
          meaning: data.get("meaning") || "",
          emotion: data.get("emotion") || ""
        },
        revelation: data.get("revelation") || "",
        listenAgain: "Riascoltala con occhi nuovi."
      },
      echoes: [
        {
          title: "Una possibile lettura",
          text: data.get("echo") || ""
        }
      ],
      goldenThreads: []
    };
  },

  renderDraft(draft) {
    const output = document.querySelector("#draft-output");
    if (output) output.textContent = JSON.stringify(draft, null, 2);
  },

  setStatus(text) {
    document.querySelectorAll("[data-editor-status]").forEach((el) => el.textContent = text);
  }
};
