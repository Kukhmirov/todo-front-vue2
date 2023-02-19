<template>
    <div v-if="currentTodo" class="edit-form">
        <h4>Задачи</h4>
        <form>
            <div class="form-group">
                <label for="title">Название</label>
                <input
                    type="text"
                    class="form-control"
                    id="title"
                    v-model="currentTodo.title"
                />
            </div>
            <div class="form-group">
                <label for="description">Description</label>
                <input type="text" class="form-control" id="description"
                    v-model="currentTodo.description"
                />
            </div>
        </form>
    
        <button class="btn btn-danger m-3"
            @click="deleteTodo"
        >
            Удалить
        </button>
    
        <button type="submit" class="btn btn-success m-3"
            @click="updateTodo"
        >
            Обновить
        </button>
            <p>{{ message }}</p>
    </div>
  
    <div v-else>
        <br />
        <p>Задача нет</p>
    </div>
</template>
  
<script>
import DataService from '@/services/dataService';

export default {
    name: "TheTutorial",
    data() {
        return {
            currentTodo: null,
            message: ''
        };
    },
    mounted() {
        this.message = '';
        this.getTodo(this.$route.params.id);
    },
    methods: {
        getTodo(id) {
            DataService.get(id)
                .then(res => {
                    this.currentTodo = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        updateTodo() {
            DataService.udate(this.currentTodo.id, this.currentTodo)
                .then(() => {
                    this.message = 'Задача обновлена успешно';
                    this.$router.push({name: 'todo'});
                })
                .catch(err => {
                    console.log(err);
                })
        },
        deleteTodo() {
            DataService.deleteById(this.currentTodo.id)
                .then(() => {
                    this.$router.push({name: 'todo'});
                })
                .catch(err => {
                    console.log(err);
                })
        },
    },
}
</script>
  
<style>
    .edit-form {
        max-width: 300px;
        margin: auto;
    }
</style>
  