//* Packages Imports */
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import clsx from "clsx";

//* Components Imports */
import SearchBar from "./Searchbar";

//* Styles Imports */
import "./../styles/MusicList.css";

const MusicList = ({ audios, activeTrack, handleActiveTrack }) => {
  const [activeTab, setActiveTab] = useState("For You");
  const [audiosList, setAudiosList] = useState([]);

  //* Handle Tab Change
  const handleTabChange = (tab) => {
    setActiveTab(tab);
    if (tab === "Top Tracks") {
      const topTracks = audios.filter((audio) => audio.top_track);
      setAudiosList(topTracks);
    } else {
      setAudiosList(audios);
    }
  };

  //* Handle Search Functionality
  const handleSearch = (query) => {
    if (query === "") {
      setAudiosList(audios);
      return;
    }
    const searchResults = audiosList.filter((audio) =>
      audio.name.toLowerCase().includes(query)
    );
    setAudiosList(searchResults);
  };

  //* Set Audios List
  useEffect(() => {
    if (audios.length > 0) {
      setAudiosList(audios);
    }
  }, [audios]);

  return (
    <div className="musicListContainer">
      <div className="tabContainer">
        {["For You", "Top Tracks"].map((tab) => (
          <button
            key={tab}
            className={clsx("tab", {
              active: activeTab === tab,
            })}
            onClick={() => handleTabChange(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <SearchBar handleSearch={handleSearch} />

      {console.log(activeTrack)}

      <div className="audioContainer">
        {audiosList.length > 0 &&
          audiosList.map((audio, index) => (
            <div
              key={audio.id}
              className={clsx("audioRecord", {
                "active": activeTrack === index,
              })}
              onClick={() => handleActiveTrack(index)}
            >
              <div className="titleContainer">
                <img
                  src={`https://cms.samespace.com/assets/${audio.cover}`}
                  alt="title"
                />
                <div className="textContainer">
                  <span>{audio.name}</span>
                  <span>{audio.artist}</span>
                </div>
              </div>

              <div className="duration">4.16</div>
            </div>
          ))}
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

MusicList.propTypes = {
  audios: PropTypes.arrayOf(audioShape).isRequired,
  activeTrack: PropTypes.number.isRequired,
  handleActiveTrack: PropTypes.func.isRequired,
};

export default MusicList;
