import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api/all";
const baseSingleCountryURL =
  "https://studies.cs.helsinki.fi/restcountries/api/name";

const getAllCountries = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const getCountry = async (countryName) => {
  const request = axios.get(`${baseSingleCountryURL}/${countryName}`);
  const response = await request;
  return response.data;
};

export default {
  getAllCountries,
  getCountry,
};
