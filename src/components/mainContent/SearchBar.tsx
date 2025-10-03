import { useState, useEffect } from "react";
import { useWeather } from "../../context/WeatherContext";

import styles from "./SearchBar.module.css";
import iconSearch from "../../assets/icon-search.svg";

import mapboxgl from "mapbox-gl";

mapboxgl.accessToken = import.meta.env.VITE_MAPBOX_API_KEY;

type MapBoxData = {
  id: string;
  place_name: string;
  geometry: {
    coordinates: [number, number]; // longitude, latitude
  };
};

function SearchBar() {
  const [searchPlace, setSearchPlace] = useState("");
  const [results, setResults] = useState<MapBoxData[]>([]);
  const [animationShake, setAnimationShake] = useState(false);

  const { setLocation } = useWeather();

  useEffect(() => {
    if (searchPlace) {
      async function getSuggestions() {
        try {
          const response = await fetch(
            `https://api.mapbox.com/geocoding/v5/mapbox.places/${searchPlace}.json?types=place&limit=4&access_token=${mapboxgl.accessToken}`
          );
          const data = await response.json();

          console.log(data);
          setResults(data.features);
        } catch (err) {
          console.log("Error fetching suggestions:", err);
        }
      }

      getSuggestions();
    } else {
      setResults([]); // Limpa as sugestôes se não houver texto no input
    }
  }, [searchPlace]); // Roda sempre que searchPlace muda

  function handleSelectPlace(lat: number, long: number) {
    setLocation({
      latitude: lat,
      longitude: long,
    });
    setSearchPlace("");
  }

  return (
    <div className={`${styles.search_bar}`}>
      <input
        className={`${styles.input_search_bar} ${animationShake ? styles.shake_animation : ""}`}
        type="text"
        name="search"
        value={searchPlace}
        placeholder="Search for a place..."
        onChange={(e) => setSearchPlace(e.target.value)}
      />
      <i className={`${styles.icon_search_bar} ${animationShake ? styles.shake_animation : ""}`}>
        <img src={iconSearch} alt="" />
      </i>
      <button
        onClick={() => {
          if (results.length === 0) {
            setAnimationShake(true);
            setTimeout(() => setAnimationShake(false), 500);
          }
          handleSelectPlace(results[0].geometry.coordinates[1], results[0].geometry.coordinates[0]);
        }}
        className={styles.button_search_bar}
      >
        <p>Search</p>
      </button>
      {results?.length > 0 && (
        <ul className={styles.suggestions_search_bar}>
          {results?.map((result) => (
            <li
              key={result.id}
              onClick={() => handleSelectPlace(result.geometry.coordinates[1], result.geometry.coordinates[0])}
            >
              {result.place_name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
