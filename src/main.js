import { createApp } from 'vue'
import Tarefas from './api/tarefas'
import './css/main.css'

const apiTarefas = new Tarefas()

const app = createApp({
    data(){
        return{
            tarefas: [],
            form: {
                text: '',
                done: false
            }
        }
    },
    created(){
      this.fetchTarefas()
    },
    methods: {
        // metodos que lista as tarefas 
        async fetchTarefas(){
            this.tarefas = await apiTarefas.index()
        },
        //criando uma nova tarefa
        async createTarefa(){
            const data = await apiTarefas.store(this.form)
            this.tarefas.push(data)
            //limpando o formulario depois de preenchido
            this.form.text = ''
            this.form.done = false
        },
        //atualizando itens da tarefa
        async toggleTarefaStatus(tarefa){
          const data = await apiTarefas.update({
                ... tarefa,
                done: !tarefa.done
            })
            const index = this.tarefas.findIndex(({ id }) => id == data.id) 
            this.tarefas[index] = data 
        },
        //deletando uma tarefa
        async destroyTarefa(id){
          await apiTarefas.delete({id})

          const index = this.tarefas.findIndex((tarefa) => tarefa.id == id)
          this.tarefas.splice(index, 1)
        }
    }
})

app.mount('#app')