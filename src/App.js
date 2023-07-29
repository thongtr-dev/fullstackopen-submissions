import { useState, useEffect } from "react";
import personService from "./services/persons";
import Filter from "./components/Filter";
import Form from "./components/Form";
import Contacts from "./components/Contacts";
import Notification from "./components/Notification";

const App = () => {
  const [contacts, setContacts] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [filter, setFilter] = useState("");
  const [noti, setNoti] = useState("");
  const [isSuccessNoti, setIsSuccessNoti] = useState(false);

  useEffect(() => {
    personService
      .getAllContacts()
      .then((allContacts) => setContacts(allContacts));
  }, []);

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
    const newContact = { name: newName, phone: newPhoneNumber };

    const phoneNumberPattern =
      /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

    if (!phoneNumberPattern.test(newPhoneNumber)) {
      window.alert(
        `Invalid phone number "${newPhoneNumber}". Please try again.`
      );
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
      const nameToFind = `${newName
        .trim()
        .split(" ")
        .filter((char) => char !== "")
        .map((word) => word[0].toUpperCase().concat(word.slice(1)))
        .join(" ")}`;

      const isReplace = window.confirm(
        `${nameToFind} is already added to phonebook, replace the old number with a new one?`
      );
      if (isReplace) {
        const contactToReplace = contacts.find(
          (contact) => contact.name === nameToFind
        );
        personService
          .updateContact(contactToReplace.id, {
            ...contactToReplace,
            phone: newPhoneNumber,
          })
          .then((returnedContact) => {
            setContacts(
              contacts.map((contact) =>
                contact.id === returnedContact.id ? returnedContact : contact
              )
            );
            setIsSuccessNoti(true);
            setNoti(`Changed ${returnedContact.name} phone number`);
            setTimeout(() => setNoti(""), 5000);
            setNewName("");
            setNewPhoneNumber("");
          })
          .catch((error) => {
            setNoti(
              `Information of ${contactToReplace.name} has already been removed from server`
            );
            setTimeout(() => setNoti(""), 5000);
            setIsSuccessNoti(false);
            setContacts(
              contacts.filter((contact) => contact.id !== contactToReplace.id)
            );
          });
      } else return;
    } else {
      personService.createContact(newContact).then((returnedContact) => {
        setContacts(contacts.concat(returnedContact));
        setNoti(`Added ${returnedContact.name}`);
        setTimeout(() => setNoti(""), 5000);
        setIsSuccessNoti(true);
        setNewName("");
        setNewPhoneNumber("");
      });
    }
  };

  const deleteContactHandler = (id) => {
    const matchedContact = contacts.find((contact) => contact.id === id);
    const isDelete = window.confirm(`Delete ${matchedContact.name}?`);
    if (isDelete) {
      personService.deleteContact(id);
      setContacts(contacts.filter((contact) => contact.id !== id));
    } else return;
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={noti} isSuccess={isSuccessNoti} />
      <Filter filter={filter} handleChange={handleOnChange} />
      <h3>Add a new</h3>
      <Form
        handleSubmit={addContact}
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        handleChange={handleOnChange}
      />
      <h3>Numbers</h3>
      <Contacts
        contacts={contacts}
        filter={filter}
        deleteContactHandler={deleteContactHandler}
      />
    </div>
  );
};

export default App;
