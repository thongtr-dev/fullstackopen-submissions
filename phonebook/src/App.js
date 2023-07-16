import { useState } from "react";

const App = () => {
  const [persons, setPersons] = useState([{ name: "Arto Hellas" }]);
  const [newName, setNewName] = useState("");

  const handleOnChange = (event) => {
    setNewName(event.target.value);
  };

  const addPerson = (event) => {
    event.preventDefault();
    const validatedName = newName
      .toLowerCase()
      .trim()
      .split(" ")
      .filter((char) => char !== "")
      .join(" ");
    const personExist = persons.some(
      (person) => person.name.toLowerCase() === validatedName
    );
    if (personExist) {
      window.alert(`${newName} is already added to phonebook`);
      return;
    }
    setPersons(persons.concat({ name: newName }));
    setNewName("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit={addPerson}>
        <div>
          name: <input value={newName} onChange={handleOnChange} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {persons.length
        ? persons.map((person) => <p key={person.name}>{person.name}</p>)
        : "..."}
    </div>
  );
};

export default App;
