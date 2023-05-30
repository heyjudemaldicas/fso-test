import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

// Services
// Get all persons
const fetchPersons = () => {
    const request = axios.get(baseUrl);
    return request.then(response => response.data);
}

// Add a person
const addPerson = (payload) => {
    const request = axios.post(baseUrl, payload);
    return request.then(response => response.data);
}

// Update a person
const updatePerson = (id, payload) => {
    const request = axios.put(`${baseUrl}/${id}`, payload);
    return request.then(response => response.data);
}

// Delete a person
const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`);
    return request.then(response => response.data);
}

export default { fetchPersons, addPerson, updatePerson, deletePerson };