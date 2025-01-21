import axios from "axios";
const baseUrl = "/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = async (newObject) => {
  console.log(newObject);
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
};

const edit = async (curObject, id) => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.put(`${baseUrl}/${id}`, curObject, config);
  return response.data;
};

const addOneLike = async (curObject, id) => {
  const newObject = { ...curObject, likes: curObject.likes + 1 };
  const response = await edit(newObject, id);
  return response;
};

const del = async (id) => {
  const config = {
    headers: { Authorization: token },
  };

  await axios.delete(`${baseUrl}/${id}`, config);
};

export default { setToken, getAll, create, edit, addOneLike, del };
