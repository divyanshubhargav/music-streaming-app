//* Packages Imports */
import { useLayoutEffect, useState } from "react";

//* Components Imports */
import MusicList from "./components/MusicList";
import MusicPlayer from "./components/MusicPlayer";

//* Data Imports */
import { DUMMY_AUDIO } from "./data/Audio";

//* Styles Imports */
import "./App.css";

const App = () => {
  const [audios, setAudios] = useState([]);
  const [activeTrack, setActiveTrack] = useState(0);

  //* Handle Active Track
  const handleActiveTrack = (id) => {
    setActiveTrack(id);
  };

  //* Handle Next Track
  const handleNextTrack = () => {
    setActiveTrack((prevTrack) => {
      if (prevTrack < audios.length - 1) {
        return prevTrack + 1;
      } else {
        return 0;
      }
    });
  };

  //* Handle Previous Track
  const handlePreviousTrack = () => {
    setActiveTrack((prevTrack) => {
      if (prevTrack > 0) {
        return prevTrack - 1;
      } else {
        return audios.length - 1;
      }
    });
  };

  //* Fetch Audios
  const fetchAudios = async () => {
    try {
      const response = await fetch("https://cms.samespace.com/items/songs");
      const data = await response.json();
      setAudios(data.data);
    } catch (error) {
      setAudios(DUMMY_AUDIO);
      console.error(error);
    }
  };

  useLayoutEffect(() => {
    fetchAudios();
  }, []);

  return (
    <section
      className="container"
      style={{ background: audios[activeTrack]?.accent }}
    >
      {audios.length > 0 ? (
        <>
          <img
            className="logoContainer"
            src="https://storage.googleapis.com/pr-newsroom-wp/1/2023/05/Spotify_Full_Logo_RGB_White.png"
            alt="spotify"
          />

          <MusicList
            audios={audios}
            activeTrack={activeTrack}
            handleActiveTrack={handleActiveTrack}
          />

          <MusicPlayer
            currentAudio={audios[activeTrack]}
            handlePreviousTrack={handlePreviousTrack}
            handleNextTrack={handleNextTrack}
          />
        </>
      ) : (
        <div className="loader" />
      )}
    </section>
  );
};

export default App;
