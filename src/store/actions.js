
export default {
    setShowModal({ commit }, value) {
        commit('SET_SHOW_MODAL', value);
    },
    setShowCompletedTasks({ commit }, value) {
        commit('SET_SHOW_COMPLETE_TASK', value);
    },
    setEditingTodo({ commit }, todo) {
        commit('SET_EDITING_TODO', todo);
    },
    addTodo({ commit }, todo) {
        commit('ADD_TODO', todo);
    },
    updateTodo({ commit }, updatedTodo) {
        commit('UPDATE_TODO', updatedTodo);
    },
    deleteTodo({ commit }, todoId) {
        commit('DELETE_TODO', todoId);
    }
}