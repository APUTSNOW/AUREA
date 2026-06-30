window.AureaGoldenThreadEngine = {
  render() {
    const songs = window.AureaTreasureEngine.songs;
    const current = songs[0];
    if (!current) return;

    const firstThread = current.goldenThreads[0];
    const related = songs.find((song) => song.id === firstThread.relatedSongId);
    if (!related) return;

    this.set("[data-thread-title]", `Dopo ${current.title}`);
    this.set("[data-thread-reason]", firstThread.reason);
    this.set("[data-related-title]", related.title);
    this.set("[data-related-artist]", related.artist);
    this.set("[data-related-reason]", firstThread.reason);
    this.set("[data-related-explanation]", firstThread.explanation);
  },

  set(selector, value) {
    document.querySelectorAll(selector).forEach((element) => element.textContent = value);
  }
};
