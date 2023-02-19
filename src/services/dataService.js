import http from './http-common';

class DataService {
    create(data) {
        return http.post("/todo", data);
    }
    getAll() {
        return http.get("/todo");
    }
    searchTitle(data) {
        return http.get(`/todo?title=${data}`)
    }
    get(id) {
        return http.get(`/todo/${id}`)
    }
    udate(id, data) {
        return http.put(`/todo/${id}`, data)
    }
    deleteById(id) {
        return http.delete(`/todo/${id}`)
    }
    removeAll() {
        return http.delete('/todo');
    }
}

export default new DataService();