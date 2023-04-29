import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Weather = () => {
  const [weather, setWeather] = useState({});
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`https://api.weatherapi.com/v1/current.json?key=fbd426d4cac9483bbc9154407232904&q=Kolkata`);
        setWeather(response.data);
      } catch (error) {
        setError('Error fetching data');
      }
    };

    fetchData();
  }, []);

  if (error) {
    return <div>{error}</div>;
  }

  if (!weather.current) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col">
  <div className="flex flex-row items-center justify-center">
    <h2 className="mr-2 text-3xl font-bold text-gray-800">{weather.location.name}</h2>
    <div className="mr-2 text-3xl font-medium text-gray-600">{weather.current.condition.text}</div>
  </div>
  <div className="flex flex-row items-center justify-center">
    <div className="mr-2 text-2xl font-medium text-gray-600">{weather.current.temp_c}°C</div>
    <img src={`https:${weather.current.condition.icon}`} alt="weather icon" />
  </div>
</div>

  );
};

export default Weather;
