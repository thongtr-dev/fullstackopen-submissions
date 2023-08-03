import axios from "axios";
import weatherService from "./weather";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const baseSingleCountryURL =
  "https://studies.cs.helsinki.fi/restcountries/api/name";

const getAllCountries = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getCountry = async (countryName) => {
  const countryResponse = await axios.get(
    `${baseSingleCountryURL}/${countryName}`
  );
  const lat = countryResponse.data.capitalInfo.latlng[0];
  const lon = countryResponse.data.capitalInfo.latlng[1];
  const weatherResponseData = await weatherService.getWeatherData(lat, lon);
  return {
    ...countryResponse.data,
    capitalWeatherData: {
      temp: weatherResponseData.main.temp,
      icon: weatherResponseData.weather[0].icon,
      windSpeed: weatherResponseData.wind.speed,
    },
  };
};

export default {
  getAllCountries,
  getCountry,
};
