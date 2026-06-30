window.AureaLibraryEngine = {
  songs: [],
  selectedSong: null,
  activeConstellation: "Tutte",

  async load() {
    const response = await fetch("data/songs.json");
    this.songs = await response.json();
    this.selectedSong = this.songs[0];
    this.renderFilters();
    this.renderLibrary(this.songs);
    this.openSong(this.selectedSong.id, false);
    this.bindSearch();
  },

  bindSearch() {
    const input = document.querySelector("#library-search");
    input?.addEventListener("input", () => this.applyFilters());
  },

  applyFilters() {
    const term = (document.querySelector("#library-search")?.value || "").toLowerCase();
    let filtered = this.songs.filter(song => {
      const haystack = [
        song.title, song.artist, song.album, ...(song.constellations || []),
        song.treasure?.name, song.treasure?.revelation
      ].join(" ").toLowerCase();

      const matchesText = haystack.includes(term);
      const matchesConstellation = this.activeConstellation === "Tutte" || song.constellations.includes(this.activeConstellation);
      return matchesText && matchesConstellation;
    });
    this.renderLibrary(filtered);
  },

  renderFilters() {
    const all = ["Tutte", ...new Set(this.songs.flatMap(song => song.constellations || []))];
    const row = document.querySelector("#constellation-filters");
    if (!row) return;
    row.innerHTML = all.map(name => `<button class="filter ${name === this.activeConstellation ? "active" : ""}" data-filter="${name}">${name}</button>`).join("");
    row.querySelectorAll("[data-filter]").forEach(button => {
      button.addEventListener("click", () => {
        this.activeConstellation = button.dataset.filter;
        this.renderFilters();
        this.applyFilters();
      });
    });
  },

  renderLibrary(songs) {
    const list = document.querySelector("#song-list");
    if (!list) return;

    list.innerHTML = songs.map(song => `
      <article class="song-card" data-song-id="${song.id}">
        <strong>${song.title}</strong>
        <span>${song.artist} · ${song.year || ""}</span>
        <div class="chips">${(song.constellations || []).map(c => `<span class="chip">${c}</span>`).join("")}</div>
      </article>
    `).join("");

    list.querySelectorAll("[data-song-id]").forEach(card => {
      card.addEventListener("click", () => {
        this.openSong(card.dataset.songId, true);
      });
    });
  },

  openSong(id, navigate = true) {
    const song = this.songs.find(item => item.id === id);
    if (!song) return;
    this.selectedSong = song;
    this.renderTreasure(song);
    this.renderGoldenThread(song);
    this.renderJourney(song);
    if (navigate) go("treasure");
  },

  renderTreasure(song) {
    const treasure = song.treasure;
    this.set("[data-treasure-title]", song.title);
    this.set("[data-treasure-artist]", song.artist);
    this.set("[data-treasure-verse]", `“${treasure.verse}”`);
    this.set("[data-treasure-verse-note]", treasure.verseNote);
    this.set("[data-treasure-meaning]", treasure.interpretation.meaning);
    this.set("[data-treasure-context]", treasure.facts.context);
    this.set("[data-treasure-emotion]", treasure.interpretation.emotion);
    this.set("[data-treasure-revelation]", treasure.revelation);
    this.set("[data-treasure-listen-again]", `✨ ${treasure.listenAgain}`);
    this.set("[data-echo-text]", song.echoes?.[0]?.text || "L’Eco resterà in silenzio per questo Tesoro.");
    this.set("[data-mini-title]", song.title);
    this.set("[data-mini-artist]", song.artist);
  },

  renderGoldenThread(song) {
    const thread = song.goldenThreads?.[0];
    const button = document.querySelector("#open-related");

    if (!thread) {
      this.set("[data-related-title]", "Nessun Filo d’Oro disponibile");
      this.set("[data-related-reason]", "Questo Tesoro non ha ancora un collegamento.");
      if (button) button.style.display = "none";
      return;
    }

    const related = this.songs.find(item => item.id === thread.relatedSongId);
    this.set("[data-related-title]", related ? related.title : "Tesoro collegato");
    this.set("[data-related-reason]", thread.reason);
    if (button && related) {
      button.style.display = "inline-block";
      button.onclick = () => this.openSong(related.id, true);
    }
  },

  renderJourney(song) {
    this.set("[data-journey-last]", song.title);
    this.set("[data-journey-revelation]", song.treasure.revelation);
    this.set("[data-journey-count]", `${new Set(this.songs.flatMap(s => s.constellations)).size} Costellazioni`);
  },

  set(selector, value) {
    document.querySelectorAll(selector).forEach(el => el.textContent = value);
  }
};
