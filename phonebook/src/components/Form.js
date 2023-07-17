const Form = ({ handleSubmit, newName, newPhoneNumber, handleChange }) => (
  <form onSubmit={handleSubmit}>
    <div>
      name: <input value={newName} onChange={handleChange("name")} />
    </div>
    <div>
      number: <input value={newPhoneNumber} onChange={handleChange("phone")} />
    </div>
    <div>
      <button type='submit'>add</button>
    </div>
  </form>
);
export default Form;
