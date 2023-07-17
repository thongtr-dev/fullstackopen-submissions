import { useState } from "react";

const App = () => {
  const [contacts, setContacts] = useState([
    { name: "Arto Hellas", phone: "040-1234567" },
  ]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");

  const handleOnChange = (state) => {
    if (state === "name") return (event) => setNewName(event.target.value);
    if (state === "phone")
      return (event) => setNewPhoneNumber(event.target.value);
  };

  const addcontact = (event) => {
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
      <form onSubmit={addcontact}>
        <div>
          name: <input value={newName} onChange={handleOnChange("name")} />
        </div>
        <div>
          number:{" "}
          <input value={newPhoneNumber} onChange={handleOnChange("phone")} />
        </div>
        <div>
          <button type='submit'>add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      {contacts.length
        ? contacts.map((contact) => (
            <p key={contact.name}>
              {contact.name} {contact.phone}
            </p>
          ))
        : "..."}
    </div>
  );
};

export default App;
