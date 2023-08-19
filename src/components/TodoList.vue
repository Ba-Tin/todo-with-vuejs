<template lang="">
   <div class="container mt-2 border p-3">
    <div class="row text-center mb-2">
        <h1>Todo App</h1>
    </div>
    <div class="text-end ">
      <button class="btn btn-primary" @click="handleShowCompletedTasks">Công việc đã hoàn thành</button>
    </div>
    <div class="text-end mt-4">
      <button @click="handleAddTodo" class="btn btn-primary mr-5">Thêm</button>  
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
                <tr v-for="(item, index) in filteredTodoList" :key="item.id">
                    <td>{{index + 1}}</td>  
                    <td>{{item.content}}</td>
                    <td><input type="checkbox" v-model="item.status"  @change="handleCompleteTask(item)"></td>
                    <td>
                        <button class="btn btn-secondary" disabled @click="handleUpdatedTodo(item)" style="margin-right:1rem">
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
import { mapState, mapGetters, mapActions } from 'vuex';
export default {

    components: {
        ModalForm
    },
    computed: {
        ...mapState(['todoList', 'editingTodo', 'showModal', 'showCompletedTasks']),
        ...mapGetters(['completedTodos']),
        filteredTodoList() {
            return this.showCompletedTasks ? this.completedTodos : this.todoList;
        },
    },
    methods: {
        ...mapActions(['setShowModal', 'setEditingTodo', 'addTodo', 'updateTodo', 'deleteTodo', 'setShowCompletedTasks']),
        handleShowModal() {
            this.setShowModal(!this.showModal);
        },
        handleShowCompletedTasks() {
            this.setShowCompletedTasks(!this.showCompletedTasks)
        },
        handleAddTodo() {
            this.setEditingTodo(null);
            this.setShowModal(true);
        },
        handleUpdatedTodo(item) {
            this.setEditingTodo(item);
            this.setShowModal(true);
        },
        handleDeleteTodo(item) {
            const confirmDelete = confirm("Bạn có chắc muốn xóa công việc này?");
            if (confirmDelete) {
                this.deleteTodo(item.id);
                toast.success("Công việc đã được xóa!", { duration: 1500 });
            }
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
                this.updateTodo({ ...this.editingTodo, ...item });
                toast.success('Cập nhật thành công!', { duration: 1500 });
            } else {
                const newTodo = { ...item, id: Date.now(), status: false };
                this.addTodo(newTodo);
                toast.success('Thêm thành công!', { duration: 1500 });
            }
            this.setShowModal(false);
        }
    }

}
</script>
<style lang="css"></style>