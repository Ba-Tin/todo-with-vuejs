export default {
    SET_SHOW_MODAL(state, value) {
        state.showModal = value;
    },
    SET_SHOW_COMPLETE_TASK(state, value) {
        state.showCompletedTasks = value
    },
    SET_EDITING_TODO(state, todo) {
        state.editingTodo = todo;
    },
    ADD_TODO(state, todo) {
        state.todoList.unshift(todo);
    },
    UPDATE_TODO(state, updatedTodo) {
        const index = state.todoList.findIndex(todo => todo.id === updatedTodo.id);
        if (index !== -1) {
            state.todoList.splice(index, 1, updatedTodo);
        }
    },
    DELETE_TODO(state, todoId) {
        state.todoList = state.todoList.filter(todo => todo.id !== todoId);
    }
}