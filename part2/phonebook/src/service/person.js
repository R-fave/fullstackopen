import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((res) => res.data);
};

const addPerson = (personObj) => {
  const request = axios.post(baseUrl, personObj);
  return request.then((res) => res.data);
};

const deletePerson = (id) => {
  return axios.delete(`${baseUrl}/${id}`);
};

const update = (id, personObj) => {
  const request = axios.put(`${baseUrl}/${id}`, personObj);
  return request.then((res) => res.data);
};

export default {
  getAll,
  addPerson,
  deletePerson,
  update,
};
