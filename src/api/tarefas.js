import axios from '../utils/axios'

export default class Tarefas{

    //listando todas as tarefas
    async index(){
        const { data } = await axios.get('/tarefas')
        return data
    }

    //inserindo uma nova tarefa
    async store({text, done}){
        const { data } = await axios.post('/tarefas', {text, done})
        return data
    }

    //atualizando uma tarefa
    async update({id, text, done}){
        const { data } = await axios.put(`/tarefas/${id}`, {id, text, done})
        return data
    }

    //deletando uma tarefa
    async delete({id}){
       await axios.delete(`/tarefas/${id}`)
    }

}