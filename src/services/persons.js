import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAllContacts = async () => {
  const request = axios.get(baseUrl);
  const response = await request;
  return response.data;
};

const createContact = async (newObject) => {
  const request = axios.post(baseUrl, newObject);
  const response = await request;
  return response.data;
};

const deleteContact = async (id) => axios.delete(`${baseUrl}/${id}`);
export default { getAllContacts, createContact, deleteContact };
