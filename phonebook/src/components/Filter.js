const Filter = ({ filter, handleChange }) => (
  <span>
    filter shown with <input value={filter} onChange={handleChange("filter")} />
  </span>
);

export default Filter;
