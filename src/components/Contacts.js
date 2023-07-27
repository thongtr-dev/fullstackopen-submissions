const Contact = ({ contact, handleDelete }) => (
  <p>
    {contact.name} {contact.phone}
    <button onClick={handleDelete}>delete</button>
  </p>
);

const Contacts = ({ contacts, filter, deleteContactHandler }) => {
  if (contacts.length) {
    if (filter.length) {
      return contacts
        .filter((contact) =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((contact) => <Contact key={contact.name} contact={contact} />);
    }
    return contacts.map((contact) => (
      <Contact
        key={contact.id}
        contact={contact}
        handleDelete={() => deleteContactHandler(contact.id)}
      />
    ));
  } else return "...";
};

export default Contacts;
