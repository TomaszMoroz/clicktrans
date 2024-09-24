import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    tasks: [],
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    EDIT_TASK(state, updatedTask) {
      const index = state.tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
    DELETE_TASK(state, id) {
      state.tasks = state.tasks.filter(task => task.id !== id);
    },
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      // API call to fetch tasks
      const response = await axios.get('/api/tasks');
      commit('SET_TASKS', response.data);
    },
    addTask({ commit }, task) {
      // Mock or API call to add a task
      commit('ADD_TASK', task);
    },
    editTask({ commit }, updatedTask) {
      // Mock or API call to edit a task
      commit('EDIT_TASK', updatedTask);
    },
    deleteTask({ commit }, id) {
      // Mock or API call to delete a task
      commit('DELETE_TASK', id);
    },
  },
  getters: {
    filterTasksByStatus: (state) => (status) => {
      return state.tasks.filter(task => task.status === status);
    },
    filterTasksByPriority: (state) => (priority) => {
      return state.tasks.filter(task => task.priority === priority);
    },
    sortedTasksByCreation: (state) => {
      return [...state.tasks].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    },
  }
});

export default store;
