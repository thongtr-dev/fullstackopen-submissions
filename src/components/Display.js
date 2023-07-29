import OneCountryData from "./OneCountryData";
import CountryName from "./CountryName";

const Display = ({ countries, inputValue }) => {
  if (countries) {
    if (countries.length > 10) {
      return <p>Too many matches, specify another filter</p>;
    } else if (
      countries.length <= 10 &&
      countries.length !== 1 &&
      countries.length !== 0
    ) {
      // show the data for a single country if the input value is exactly the same as its name
      const matchedCountry = countries.find(
        (c) => c.name.common === inputValue
      );
      if (matchedCountry) {
        return <OneCountryData country={matchedCountry} />;
      } else
        return (
          <ul>
            {countries.map((c) => (
              <CountryName
                key={c.name.common.toLowerCase()}
                countryName={c.name.common}
              />
            ))}
          </ul>
        );
    } else if (countries.length === 1) {
      return <OneCountryData country={countries[0]} />;
    } else if (countries.length === 0)
      return <p>No matches found. Please try again.</p>;
  } else {
    return <p>Type country name</p>;
  }
};

export default Display;
