import countryService from "./services/countries";
import { useState, useEffect } from "react";
import Display from "./components/Display";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    if (value) {
      countryService.getAllCountries().then((data) => {
        setCountries(data.filter((c) => c.name.common.includes(value)));
      });
    }
  }, [value]);

  const handleClickShowCountry = (name) => {
    countryService
      .getCountry(name)
      .then((returnedCountry) =>
        setCountries(
          countries.filter((c) => c.name.common === returnedCountry.name.common)
        )
      );
  };

  const handleChange = (e) => {
    // delay 1s to avoid sending too many requests to the server
    setTimeout(() => setValue(e.target.value), 1000);
  };
  return (
    <div>
      <input type='text' onChange={handleChange} />
      <Display
        countries={countries}
        inputValue={value}
        handleClickShowCountry={handleClickShowCountry}
      />
    </div>
  );
};

export default App;
