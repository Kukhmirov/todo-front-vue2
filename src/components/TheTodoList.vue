<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Search by title"
                    v-model="title"
                />
                <div class="input-group-append">
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <h4>Заметки</h4>
            <ul class="list-group">
                <li class="list-group-item"
                    :class="{ active: index == currentIndex }"
                    v-for="(todo, index) in dataTodos"
                    :key="todo.id + index"
                    @click="setActiveTodo(todo, index)"
                    >
                    {{ todo.title }}
                </li>
            </ul>

            <button class="btn btn-sm btn-danger mt-3" @click="removeAllTodos">
                Удалить все
            </button>
        </div>
        <div class="col-md-6">
            <div v-if="currentTodo">
                <h4>To-Do</h4>
                <div>
                    <label><strong>Заголовок:</strong></label> {{ currentTodo.title }}
                </div>
                <div>
                    <label><strong>Описание:</strong></label> {{ currentTodo.description }}
                </div>

                <router-link :to="'/todos/' + currentTodo.id" class="btn btn-secondary mt-2">Редактировать</router-link>
            </div>
        </div>
    </div>
</template>
  
<script>
import DataService from '@/services/dataService';

export default {
    name: "TheTodoList",
    data() {
        return {
            dataTodos: [],
            currentTodo: null,
            currentIndex: -1,
            title: ""
        };
    },
    mounted() {
        this.retrieveTodos()
    },
    watch: {
        title: {
            deep: true,
            handler() {
                this.searchTitle();
            }
        }
    },
    methods: {
        retrieveTodos() {
            DataService.getAll()
            .then(response => {
                this.dataTodos = response.data;
            })
            .catch(err => {
                console.log(err);
            });
        },
        removeAllTodos() {
            DataService.removeAll()
                .then(() => {
                    this.dataTodos = [];
                    this.currentTodo = null;
                    this.currentIndex = -1;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        searchTitle() {
            DataService.searchTitle(this.title)
                .then(res => {
                    this.dataTodos = res.data;
                })
                .catch(err => {
                    console.log(err);
                });
        },
        setActiveTodo(todo, index) {
            this.currentTodo = todo;
            this.currentIndex = index;
        },
    },
}
</script>