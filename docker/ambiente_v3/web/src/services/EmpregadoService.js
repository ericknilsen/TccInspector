import axios from 'axios';

const API = 'http://localhost:3000/empregados'

const lista = () => {
    return axios.get(API)
}

const adiciona = (empregado) => {
    return axios.post(API, empregado)
}

const remove = (idEmpregado) => {
    return axios.delete(`${API}/${idEmpregado}`)
}

const EmpregadoService = {
    lista,
    adiciona,
    remove
}

export default EmpregadoService