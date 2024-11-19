import axios from 'axios'
const baseUrl = 'http://localhost:3001/persons'

const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

const create = newEntry => {
    const request = axios.post(baseUrl, newEntry)
    return request.then(response => response.data)
}

const del = id => {
    return axios.delete(`${baseUrl}/${id}`)

}

const edit = (id, data) => {
    return axios.patch(`${baseUrl}/${id}`, data)
}


export default { getAll, create, del, edit}