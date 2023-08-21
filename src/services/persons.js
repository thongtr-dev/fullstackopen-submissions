import axios from "axios";

const baseUrl = "/api/persons";

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

const updateContact = async (id, newObject) => {
  const request = axios.put(`${baseUrl}/${id}`, newObject);
  const response = await request;
  return response.data;
};

const deleteContact = async (id) => axios.delete(`${baseUrl}/${id}`);
export default { getAllContacts, createContact, updateContact, deleteContact };
