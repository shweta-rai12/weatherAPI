import React, { useState } from "react";
import axios from "axios";

const Weather = () => {
  const [city, setCity] = useState("London");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchWeather = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axios.get(
        `http://api.weatherapi.com/v1/current.json?key=608e09aabd31453992f152714242311&q=${city}&aqi=no`
      );
      setWeather(response.data);
    } catch (err) {
      setError("Failed to fetch weather data. Please check the city name.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div>
      <h1>Weather App</h1>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter City Name"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {weather && (
        <div>
          <h2>
            {weather.location.name}, {weather.location.country}
          </h2>
          <p>Temperature: {weather.current.temp_c}°C</p>
          <p>Condition: {weather.current.condition.text}</p>
          <img src={weather.current.condition.icon} alt="Weather Icon" />
        </div>
      )}
    </div>
  );
};

export default Weather;
