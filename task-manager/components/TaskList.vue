<template>
  <div class="task-list">
    <h2>Task List {{ isLoading ? `${onFetchning}` : `${onFetchingDone}` }}</h2>
    <div class="filter-sort">
      <select v-model="selectedStatus" @change="updateFilter">
        <option value="">All Status</option>
        <option value="to do">To Do</option>
        <option value="in progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      
      <select v-model="selectedPriority" @change="updateFilter">
        <option value="">All Priorities</option>
        <option value="high">High</option>
        <option value="medium">Medium</option>
        <option value="low">Low</option>
      </select>

      <select v-model="sortBy" @change="updateSort">
        <option value="date">Sort by Date</option>
        <option value="priority">Sort by Priority</option>
      </select>
    </div>
    <ul>
      <li v-for="task in tasks" :key="task.id" class="task">
        <div>
          <h3>{{ task.title }} ({{ task.priority }})</h3>
          <p>{{ task.description }}</p>
          <p>Status: {{ task.status }}</p>
        </div>
        <div class="button-group">
          <button @click="openEditDialog(task)">Edit</button>
          <button @click="deleteTask(task.id)">Delete</button>
        </div>
      </li>
    </ul>

    <EditTaskDialog
      :isVisible="isEditDialogVisible"
      :task="selectedTask"
      @close="closeEditDialog"
    />
  </div>
</template>

<script setup>
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import EditTaskDialog from './dialogs/EditTaskDialog.vue';

const store = useStore();

const isLoading = ref(true)
const onFetchingDone = ref('')
const onFetchning = ref(' fetchning data...')
const selectedStatus = ref('');
const selectedPriority = ref('');
const sortBy = ref('date');
const isEditDialogVisible = ref(false);
const selectedTask = ref(null);

const tasks = computed(() => {
  const priorityOrder = ['high', 'medium', 'low'];
  const existingTasks = store.state.tasks
  const filteredTasks = selectedStatus.value && selectedPriority.value
    ? existingTasks.filter(t => t.status === selectedStatus.value && t.priority === selectedPriority.value)
    : selectedPriority.value
      ? existingTasks.filter(t => t.priority === selectedPriority.value)
      : selectedStatus.value
        ? existingTasks.filter(t => t.status === selectedStatus.value)
        : existingTasks

  return sortBy.value === 'priority'
    ? filteredTasks.sort((a, b) => {
          return priorityOrder.indexOf(a.priority) - priorityOrder.indexOf(b.priority);
    })
    : filteredTasks.sort((a, b) => a.id - b.id); // Sort by creation date (id)
});

const deleteTask = (id) => {
  try {
    store.dispatch('deleteTask', id);
  } catch(err) { console.error(err) }
};

const openEditDialog = (task) => {
  selectedTask.value = task;
  isEditDialogVisible.value = true;
};

const closeEditDialog = () => {
  isEditDialogVisible.value = false;
  selectedTask.value = null;
};

onMounted(async () => {
  try {
    isLoading.value = true
    await store.dispatch('fetchTasks')
  } catch(err) {
    console.error(err)
    onFetchingDone.value = ' fetchning data error'
  } finally {
    setTimeout(() => {
      isLoading.value = false
      onFetchingDone.value = ''
    }, 1500);
  }
})
</script>

<style scoped>
.task {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.button-group {
  display: flex;
  gap: 10px;
}
</style>
