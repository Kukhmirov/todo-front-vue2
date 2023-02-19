<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="title">Имя задачи</label>
                <input
                    v-model="todo.title"
                    type="text"
                    class="form-control"
                    :class="{errors: errorTitle}"
                    id="title"
                    name="title"
                    @click="errorTitle = false"
                />
            </div>
  
            <div class="form-group">
                <label for="description">Текст задачи</label>
                <input
                    class="form-control"
                    :class="{errors: errorDescr}"
                    id="description"
                    v-model="todo.description"
                    name="description"
                    @click="errorDescr = false"
                />
            </div>
    
            <button
                class="btn btn-success mt-3"
                @click="saveTodo"
            >
                Сохранить
            </button>
        </div>
  
        <div v-else>
            <h4>Задача успешно добавлена</h4>
            <button
                class="btn btn-success mt-3"
                @click="newTodo"
            >
                Создать новую
            </button>
        </div>
    </div>
</template>
  
<script>
import DataService from '@/services/dataService';
import {validationMixin} from 'vuelidate';
import {required} from 'vuelidate/lib/validators';

export default {
    name: "AddTodo",
    mixins: [validationMixin],
    data() {
        return{
            todo: {
                id: null,
                title: "",
                description: "",
            },
            submitted: false,
            errorTitle: false,
            errorDescr: false
        };
    },
    validations: {
        todo: {
                title: {required},
                description: {required},
            },
    },
    methods: {
        saveTodo() {
            if(!this.$v.todo.title.required) {
                this.errorTitle = true;
                return;
            }
            if(!this.$v.todo.description.required) {
                this.errorDescr = true;
                return;
            }
            const data = {
                title: this.todo.title,
                description: this.todo.description
            };

            DataService.create(data)
                .then(response => {
                    this.todo.id = response.data.id;
                    this.submitted = true;
                })
                .catch(err => {
                    console.log(err);
                })
        },
        newTodo() {
            this.submitted = false;
            this.todo = {};
        },
    },
};
</script>
  
<style>
    .submit-form {
        max-width: 300px;
        margin: auto;
    }
    .errors {
        border: 1px solid #ff0000;
    }
</style>
  