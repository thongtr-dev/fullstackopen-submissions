const CountryName = ({ countryName, handleClick }) => (
  <li>
    {countryName}
    <button onClick={handleClick}>show</button>
  </li>
);

export default CountryName;
