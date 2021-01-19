import axios from 'axios'
import env from './env'
var http = null // not possible to create a private property in JavaScript, so we move it outside of the class, so that it's only accessible within this module

class APIProvider {
    constructor({ url }) {
        http = axios.create({
            baseURL: url,
            headers: { 'Content-Type': 'application/json' }
        })
    }

    login(token) {
        http.defaults.headers.common.Authorization = `Bearer ${token}`
    }

    logout() {
        http.defaults.headers.common.Authorization = ''
    }

    // REST Methods
    find({ resource, query }) {
        return http.get(resource, {
            params: query
        })
    }

    get({ resource, id, query }) {
        return http.get(`${resource}/${id}`, {
            params: query
        })
    }

    create({ resource, data, query, token }) {
        return http.post(resource, data, {
            params: query
        }, this.login(token))
    }

    update({ resource, id, data, query, token }) {
        return http.put(`${resource}/${id}`, data, {
            params: query
        }, this.login(token))
    }

    destroy({ resource, id, token }) {
        return http.delete(`${resource}/${id}`, this.login(token))
    }
}

export default new APIProvider({
    url: env.ROOT_API  // We assume 'https://api.example.com/v1' is set as the env variable
})