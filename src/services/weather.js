import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather";

const getWeatherData = async (lat, lon) => {
  const response = await axios.get(
    `${baseUrl}?lat=${lat}&lon=${lon}&appid=${process.env.REACT_APP_OPEN_WEATHER_MAP_API_KEY}&units=metric`
  );
  return response.data;
};

export default {
  getWeatherData,
};
