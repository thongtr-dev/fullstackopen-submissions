const Contact = ({ contact }) => (
  <p>
    {contact.name} {contact.phone}
  </p>
);

const Contacts = ({ contacts, filter }) => {
  if (contacts.length) {
    if (filter.length) {
      return contacts
        .filter((contact) =>
          contact.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map((contact) => <Contact key={contact.name} contact={contact} />);
    }
    return contacts.map((contact) => (
      <Contact key={contact.id} contact={contact} />
    ));
  } else return "...";
};

export default Contacts;
