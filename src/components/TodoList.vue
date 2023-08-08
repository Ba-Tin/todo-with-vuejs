<template lang="">
   <div class="container mt-2 border p-3">
    <div class="row text-center mb-2">
        <h1>Todo App</h1>
    </div>
    <div class="text-end ">
      <button @click="handleAddTodo" class="btn btn-primary">Thêm</button>
    </div>
    <div class="row text-center">
        <table class="table table-striped">
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Tên</th>
                    <th>Trạng thái</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(item, index) in todoList" :key="item.id">
                    <td>{{index + 1}}</td>  
                    <td>{{item.content}}</td>
                    <td><input type="checkbox" v-model="item.status"  @change="handleCompleteTask(item)"></td>
                    <td>
                        <button class="btn btn-secondary" @click="handleUpdatedTodo(item)" style="margin-right:1rem">
                            <i class="bx bxs-edit"></i> Sửa
                        </button>
                        <button class="btn btn-danger" @click="handleDeleteTodo(item)">
                            <i class="bx bx-trash"></i> Xóa
                        </button>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
    <modal-form v-if='showModal'
     :closeModal="handleShowModal" 
     :todoEdit="editingTodo"
     :onSave = "handleSave"/>
   </div>
</template>
<script>
import ModalForm from './ModalForm.vue';
import { toast } from 'vue3-toastify';
export default {
    data() {
        return {
            showModal: false,
            todoList: [{
                content: "Đi chợ",
                status: false
            },
            {
                content: "Nấu cơm",
                status: false
            }, {
                content: "Rửa chén",
                status: false
            }],
            editingTodo: null,
        }

    },
    components: {
        ModalForm
    },
    methods: {
        handleShowModal() {
            this.showModal = !this.showModal
        },
        handleAddTodo() {
            this.editingTodo = null;
            this.showModal = true;
        },
        handleUpdatedTodo(item) {
            this.editingTodo = item;
            this.showModal = true;
        },
        handleDeleteTodo(item) {
            this.todoList = this.todoList.filter((task) => task.id !== item.id);
            toast.success("Công việc đã được xóa!", { duration: 1500 });

        },
        handleCompleteTask(item) {
            if (item.status) {
                const confirmDelete = confirm("Bạn đã hoàn thành công việc. Bạn có muốn xóa task này đi không?");
                if (confirmDelete) {
                    this.todoList = this.todoList.filter((task) => task.id !== item.id);
                    toast.success("Công việc đã được xóa!", { duration: 1500 });
                } else {
                    item.status = true;
                }
            }
        },
        handleSave(item) {
            if (this.editingTodo) {
                const updatedTodo = this.todoList.map((u) => {
                    if (u.id === this.editingTodo.id) {
                        return { ...u, ...item };
                    }
                    return u;
                });
                this.todoList = updatedTodo;
                toast.success('Cập nhật thành công!', { duration: 1500 });
            } else {
                const newTodo = { ...item, id: Date.now(), status: false };
                this.todoList = ([newTodo, ...this.todoList]);
                toast.success('Thêm thành công!', { duration: 1500 });
            }
            this.showModal = false
        }

    }
}
</script>
<style lang="css"></style>