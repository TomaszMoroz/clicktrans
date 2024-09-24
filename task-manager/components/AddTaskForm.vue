<template>
  <form @submit.prevent="addTask">
    <h2>Add Task</h2>
    <input v-model="task.title" placeholder="Task Title" required />
    <textarea v-model="task.description" placeholder="Task Description" required></textarea>

    <select v-model="task.priority">
      <option value="high">High</option>
      <option value="medium">Medium</option>
      <option value="low">Low</option>
    </select>

    <select v-model="task.status">
      <option value="to do">To Do</option>
      <option value="in progress">In Progress</option>
      <option value="completed">Completed</option>
    </select>

    <div class="button-group">
      <button type="submit">Add Task</button>
    </div>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useStore } from 'vuex';

const store = useStore();
const task = ref({
  title: '',
  description: '',
  priority: 'medium', // Default value
  status: 'to do',    // Default value
});

const addTask = () => {
  // Here we commit the ADD_TASK mutation instead of dispatching an action
  store.commit('ADD_TASK', { ...task.value, id: Date.now() });
  
  // Reset the form fields after adding the task
  task.value = { title: '', description: '', priority: 'medium', status: 'to do' };
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

input,
textarea,
select {
  width: 100%; /* Make inputs full width */
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Ensures padding and border are included in width */
}

textarea {
  height: 100px; /* Set a height for the textarea */
}

.button-group {
  display: flex;
  gap: 10px; /* Add space between buttons */
}
</style>
