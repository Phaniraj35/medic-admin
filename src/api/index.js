import axios from "axios";

const BASE_URL = 'http://localhost:3000/medicines'

export const fetchDrugs = () => {
    return axios.get(BASE_URL)
}

export const postDrugs = async data => {
    return await axios.post(BASE_URL, data);
}

export const deleteDrug = async drugId => {
    return await axios.delete(`${BASE_URL}/${drugId}`)
}

export const putDrug = async (drugId, data) => {
    return await axios.put(`${BASE_URL}/${drugId}`, data)
}