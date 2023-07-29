const OneCountryData = ({ country }) => {
  const countryLanguages = [];
  (function () {
    for (let key in country.languages) {
      countryLanguages.push({ key: key, lang: country.languages[key] });
    }
  })();
  return (
    <div>
      <h1>{country.name.common}</h1>
      <p>capital {country.capital}</p>
      <p>area {country.area}</p>
      <strong>languages:</strong>
      <ul>
        {countryLanguages.map((language) => (
          <li key={`${country.name.common.toLowerCase()}-${language.key}`}>
            {language.lang}
          </li>
        ))}
      </ul>
      <img src={`${country.flags.png}`} alt={`${country.name.common} flag`} />
    </div>
  );
};

export default OneCountryData;
