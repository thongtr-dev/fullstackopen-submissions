import { useState } from "react";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Contacts from "./components/Contacts";

const App = () => {
  const [contacts, setContacts] = useState([
    { name: "Arto Hellas", phone: "040-123456" },
    { name: "Ada Lovelace", phone: "39-44-5323523" },
    { name: "Dan Abramov", phone: "12-43-234345" },
    { name: "Mary Poppendieck", phone: "39-23-6423122" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");

  const handleOnChange = (state) => {
    if (state === "name") return (event) => setNewName(event.target.value);
    if (state === "phone")
      return (event) => setNewPhoneNumber(event.target.value);
    if (state === "filter") return (event) => setFilter(event.target.value);
  };

  const addContact = (event) => {
    event.preventDefault();
    if (!newName.length || !newPhoneNumber.length) {
      window.alert("Please fill in the required fields.");
      return;
    }
    const validatedName = newName
      .toLowerCase()
      .trim()
      .split(" ")
      .filter((char) => char !== "")
      .join(" ");
    const contactExist = contacts.some(
      (contact) => contact.name.toLowerCase() === validatedName
    );
    if (contactExist) {
      window.alert(`${newName} is already added to phonebook.`);
      return;
    }

    const phoneNumberPattern =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (!phoneNumberPattern.test(newPhoneNumber)) {
      window.alert(
        `Invalid phone number "${newPhoneNumber}". Please try again.`
      );
      return;
    }

    setContacts(contacts.concat({ name: newName, phone: newPhoneNumber }));
    setNewName("");
    setNewPhoneNumber("");
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChange={handleOnChange} />
      <h3>Add a new</h3>
      <Form
        handleSubmit={addContact}
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        handleChange={handleOnChange}
      />
      <h3>Numbers</h3>
      <Contacts contacts={contacts} filter={filter} />
    </div>
  );
};

export default App;
