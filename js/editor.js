window.AureaEditor = {
  init() {
    const form = document.querySelector("#treasure-form");
    if (!form) return;

    form.addEventListener("submit", (event) => {
      event.preventDefault();
      const data = new FormData(form);
      const title = data.get("title") || "Nuova canzone";
      const draft = {
        id: String(title).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""),
        title,
        artist: data.get("artist") || "",
        constellations: String(data.get("constellations") || "").split(",").map(x => x.trim()).filter(Boolean),
        treasure: {
          verse: data.get("verse") || "",
          revelation: data.get("revelation") || ""
        }
      };
      localStorage.setItem("aurea.editor.draft", JSON.stringify(draft, null, 2));
      document.querySelector("#draft-output").textContent = JSON.stringify(draft, null, 2);
    });
  }
};
