import { createStore } from 'vuex';
import axios from 'axios';

const store = createStore({
  state: {
    tasks: [],
  },
  mutations: {
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    EDIT_TASK(state, updatedTask) {
      const index = state.tasks.findIndex(task => task.id === updatedTask.id);
      if (index !== -1) {
        state.tasks.splice(index, 1, updatedTask);
      }
    },
    DELETE_TASK(state, taskId) {
      state.tasks = state.tasks.filter(task => task.id !== taskId);
    },
  },
  actions: {
    async fetchTasks({ commit }) {
      try {
        const response = await axios.get('http://localhost:3001/api/tasks');
        commit('SET_TASKS', response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async saveTasks({ state }) {
      try {
        await axios.post('http://localhost:3001/api/tasks', state.tasks);
      } catch (error) {
        console.error('Error saving tasks:', error);
      }
    },
    async deleteTask({ commit }, taskId) {
      commit('DELETE_TASK', taskId);
      await this.dispatch('saveTasks'); // Save the updated tasks after deletion
    },
    async editTask({ commit }, updatedTask) {
      commit('EDIT_TASK', updatedTask);
      await this.dispatch('saveTasks'); // Save the updated tasks after editing
    }
  },
  getters: {
    allTasks(state) {
      return state.tasks;
    },
  },
});

export default store;
