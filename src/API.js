import axios from "axios";

export default class API {

    static BASE_URL = 'https://localhost:7030/api/'

    static getP() {
        return axios.get(`${this.BASE_URL}Products`)
    }

    static getPById(id) {
        return axios.get(`${this.BASE_URL}Products/${id}`)
    }

    static postP(data) {
        return axios.post(`${this.BASE_URL}Products`, data)
    }

    static putP(id, data) {
        return axios.put(`${this.BASE_URL}Products/${id}`, data)
    }

    static delP(id) {
        return axios.delete(`${this.BASE_URL}Products/${id}`)
    }

    static getC() {
        return axios.get(`${this.BASE_URL}Categories`)
    }

    static postC(data) {
        return axios.post(`${this.BASE_URL}Categories`, data)
    }
}