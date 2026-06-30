window.AureaTreasureEngine = {
  songs: [],

  async load() {
    try {
      const response = await fetch("data/songs.json");
      this.songs = await response.json();
      this.renderFirstSong();
    } catch (error) {
      console.warn("AUREA Treasure Engine: impossibile caricare songs.json", error);
    }
  },

  getFirstSong() {
    return this.songs[0];
  },

  renderFirstSong() {
    const song = this.getFirstSong();
    if (!song) return;

    this.setText("[data-song-title]", song.title);
    this.setText("[data-song-artist]", song.artist);
    this.setText("[data-player-title]", song.title);
    this.setText("[data-player-artist]", song.artist);
    this.setText("[data-mini-title]", song.title);
    this.setText("[data-mini-artist]", song.artist);
    this.setText("[data-discovery-title]", song.title);
    this.setText("[data-journey-song]", song.title);
    this.setText("[data-journey-first]", song.title);
    this.setText("[data-treasure-title]", song.title);
  },

  setText(selector, value) {
    document.querySelectorAll(selector).forEach((element) => {
      element.textContent = value;
    });
  }
};
