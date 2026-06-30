import React, { useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles/main.css";
import { songs } from "./data/songs";
import AuroraBackground from "./components/AuroraBackground";
import Welcome from "./components/Welcome";
import Library from "./components/Library";
import Treasure from "./components/Treasure";
import Journey from "./components/Journey";
import Editor from "./components/Editor";
import TabBar from "./components/TabBar";

function App() {
  const [screen, setScreen] = useState("welcome");
  const [selectedSongId, setSelectedSongId] = useState(songs[0].id);
  const [lastOpened, setLastOpened] = useState(null);

  const selectedSong = useMemo(
    () => songs.find((song) => song.id === selectedSongId) || songs[0],
    [selectedSongId]
  );

  function openSong(songId) {
    setSelectedSongId(songId);
    const song = songs.find((item) => item.id === songId);
    if (song) setLastOpened(song);
    setScreen("treasure");
  }

  function go(nextScreen) {
    setScreen(nextScreen);
  }

  const showTabs = ["library", "journey", "editor"].includes(screen);

  return (
    <main className="app">
      <AuroraBackground />

      {screen === "welcome" && <Welcome onStart={() => go("library")} />}
      {screen === "library" && <Library songs={songs} onOpenSong={openSong} />}
      {screen === "treasure" && (
        <Treasure
          song={selectedSong}
          songs={songs}
          onBack={() => go("library")}
          onOpenSong={openSong}
          onSaveJourney={() => {
            setLastOpened(selectedSong);
            go("journey");
          }}
        />
      )}
      {screen === "journey" && <Journey lastOpened={lastOpened || selectedSong} />}
      {screen === "editor" && <Editor />}

      {showTabs && <TabBar current={screen} onGo={go} />}
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
