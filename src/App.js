import countryService from "./services/countries";
import { useState, useEffect } from "react";
import Display from "./components/Display";

const App = () => {
  const [value, setValue] = useState("");
  const [countries, setCountries] = useState(null);

  useEffect(() => {
    if (value) {
      countryService.getAllCountries().then((data) => {
        const countries = data.filter((c) => c.name.common.includes(value));
        if (countries.length === 1) {
          countryService
            .getCountry(countries[0].name.common)
            .then((returnedCountry) => setCountries([returnedCountry]));
        } else setCountries(countries);
      });
    }
  }, [value]);

  const handleClickShowCountry = (name) => {
    countryService.getCountry(name).then((returnedCountry) => {
      setCountries([returnedCountry]);
    });
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
