<template>
  <div class="dialog" v-if="isVisible">
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

const handleEdit = () => {
  store.dispatch('editTask', editedTask.value);
  close();
};

const close = () => {
  emit('close');
};

watch(() => props.task, (newTask) => {
  editedTask.value = { ...newTask };
});
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

.dialog-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  z-index: 1001;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  max-width: 400px;
  width: 100%;
  box-sizing: border-box;
}

form {
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: auto
}

input,
textarea,
select {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

textarea {
  height: 100px;
}

.button-group {
  display: flex;
  gap: 10px;
}
</style>
