window.AureaTreasureEngine = {
  songs: [],

  async load() {
    const response = await fetch("data/songs.json");
    this.songs = await response.json();
    this.render(this.songs[0]);
  },

  render(song) {
    if (!song) return;
    const treasure = song.treasure;

    this.set("[data-song-title]", song.title);
    this.set("[data-song-artist]", song.artist);
    this.set("[data-player-title]", song.title);
    this.set("[data-player-artist]", song.artist);
    this.set("[data-mini-title]", song.title);
    this.set("[data-mini-artist]", song.artist);
    this.set("[data-discovery-title]", song.title);
    this.set("[data-journey-song]", song.title);
    this.set("[data-journey-first]", song.title);
    this.set("[data-treasure-title]", song.title);

    this.set("[data-treasure-verse]", `“${treasure.verse}”`);
    this.set("[data-treasure-verse-note]", treasure.verseNote);
    this.set("[data-treasure-meaning]", treasure.interpretation.meaning);
    this.set("[data-treasure-context]", treasure.facts.context);
    this.set("[data-treasure-emotion]", treasure.interpretation.emotion);
    this.set("[data-treasure-revelation]", treasure.revelation);
    this.set("[data-treasure-listen-again]", `✨ ${treasure.listenAgain}`);
    this.set("[data-echo-text]", song.echoes[0].text);
    this.set("[data-journey-revelation]", treasure.revelation);
    this.set("[data-journey-constellation]", song.constellations[0]);
    this.renderConstellations(song.constellations);
  },

  renderConstellations(constellations) {
    const row = document.querySelector("#constellation-row");
    if (!row) return;
    row.innerHTML = constellations.map((name) => `
      <article class="card mini-card">
        🌌<strong>${name}</strong><span>Costellazione</span>
      </article>
    `).join("");
  },

  set(selector, value) {
    document.querySelectorAll(selector).forEach((element) => element.textContent = value);
  }
};
