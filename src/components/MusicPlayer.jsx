//* Packages Imports */
import { useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";

//* Styles Imports */
import "./../styles/MusicPlayer.css";

const MusicPlayer = ({
  currentAudio,
  handlePreviousTrack,
  handleNextTrack,
}) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false); // Mute state

  const { id, artist, name, cover, url } = currentAudio;

  //* Toggle Play Pause
  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  //* Calculate progress percentage
  const progress = (currentTime / duration) * 100 || 0;

  //* Handle progress bar change
  const handleProgressChange = (event) => {
    const newTime = (event.target.value / 100) * duration;
    audioRef.current.currentTime = newTime;
  };

  //* Toggle mute/unmute
  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    audioRef.current.muted = newMutedState;
  };

  //* Pause audio and reset isPlaying when currentAudio changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
      setCurrentTime(0);
      setIsMuted(false);
      audioRef.current.muted = false;
    }
  }, [currentAudio]);

  //* Update current time and duration
  useEffect(() => {
    const audio = audioRef.current;

    const updateCurrentTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);

    audio.addEventListener("timeupdate", updateCurrentTime);
    audio.addEventListener("durationchange", updateDuration);

    return () => {
      audio.removeEventListener("timeupdate", updateCurrentTime);
      audio.removeEventListener("durationchange", updateDuration);
    };
  }, []);

  return (
    <div className="musicPlayerContainer">
      <div>
        <h1 className="musicTitle">{name}</h1>
        <h2 className="musicArtist">{artist}</h2>
      </div>

      <img
        src={`https://cms.samespace.com/assets/${cover}`}
        alt={name}
        className="musicCover"
      />

      <div className="progressContainer">
        <input
          type="range"
          className="progressBar"
          value={progress}
          onChange={handleProgressChange}
        />
      </div>

      <audio ref={audioRef} src={url} />

      <div className="playPauseContainer">
        <button
          className="previousTrack"
          disabled={id === 1}
          onClick={handlePreviousTrack}
        >
          <img
            src="https://img.icons8.com/?size=100&id=91480&format=png&color=bbbbbb"
            alt="previous"
          />
        </button>

        <button onClick={togglePlayPause} className="playIcon">
          <img
            src={
              isPlaying
                ? "https://img.icons8.com/?size=100&id=61012&format=png&color=000000"
                : "https://img.icons8.com/?size=100&id=ZyOJrX7NHhIC&format=png&color=000000"
            }
            alt="play"
          />
        </button>

        <button
          className="nextTrack"
          disabled={id === 10}
          onClick={handleNextTrack}
        >
          <img
            src="https://img.icons8.com/?size=100&id=91476&format=png&color=bbbbbb"
            alt="next"
          />
        </button>

        <button onClick={toggleMute} className="muteButton">
          <img
            src={
              isMuted
                ? "https://img.icons8.com/?size=100&id=9976&format=png&color=ffffff"
                : "https://img.icons8.com/?size=100&id=9983&format=png&color=ffffff"
            }
            alt="mute/unmute"
          />
        </button>
      </div>
    </div>
  );
};

const audioShape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  sort: PropTypes.any,
  user_created: PropTypes.string.isRequired,
  date_created: PropTypes.string.isRequired,
  user_updated: PropTypes.string.isRequired,
  date_updated: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  artist: PropTypes.string.isRequired,
  accent: PropTypes.string.isRequired,
  cover: PropTypes.string.isRequired,
  top_track: PropTypes.bool.isRequired,
  url: PropTypes.string.isRequired,
});

MusicPlayer.propTypes = {
  currentAudio: audioShape,
  handlePreviousTrack: PropTypes.func.isRequired,
  handleNextTrack: PropTypes.func.isRequired,
};

export default MusicPlayer;
