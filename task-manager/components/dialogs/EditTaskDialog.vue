<template>
  <div class="dialog" v-if="isVisible">
    <div class="dialog-overlay" @click="close"></div>
    <div class="dialog-content">
      <h2>Edit Task</h2>
      <form @submit.prevent="handleEdit">
        <input 
          v-model="editedTask.title" 
          placeholder="Enter Task Title" 
          required 
        />
        <textarea 
          v-model="editedTask.description" 
          placeholder="Enter Task Description" 
          required
        ></textarea>
        
        <select v-model="editedTask.priority">
          <option value="high">High</option>
          <option value="medium">Medium</option>
          <option value="low">Low</option>
        </select>
        
        <select v-model="editedTask.status">
          <option value="to do">To Do</option>
          <option value="in progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>

        <div class="button-group">
          <button type="submit" @click="handleEdit">Save Changes</button>
          <button type="button" @click="close">Cancel</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useStore } from 'vuex';

const props = defineProps({
  isVisible: Boolean,
  task: Object
});

const emit = defineEmits(['close', 'update']);

const store = useStore();
const editedTask = ref({ ...props.task });

watch(() => props.task, (newTask) => {
  editedTask.value = { ...newTask };
});

const handleEdit = () => {
  store.dispatch('editTask', editedTask.value);
  emit('close');
};

const close = () => {
  emit('close');
};
</script>

<style scoped>
.dialog {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.dialog-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
}

.dialog-content {
  background-color: white;
  padding: 20px; /* Padding for spacing */
  border-radius: 8px;
  z-index: 1001;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 400px; /* Maximum width for the dialog */
  width: 100%; /* Full width relative to dialog */
  box-sizing: border-box; /* Include padding in width calculation */
}

form {
  display: flex;
  flex-direction: column; /* Stack form elements */
  width: 90%; /* Use full width of dialog */
  margin: auto
}

input,
textarea,
select {
  width: 100%; /* Full width for inputs */
  padding: 10px;
  margin: 10px 0; /* Space between inputs */
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box; /* Include padding in width */
}

textarea {
  height: 100px; /* Set a height for the textarea */
}

.button-group {
  display: flex;
  gap: 10px; /* Space between buttons */
}
</style>
