
<template>
  <div
    class="bg-white dark:bg-gray-800 p-4 md:p-5 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 w-full md:w-80 min-h-[240px] flex flex-col transition-all duration-200 hover:shadow-lg"
    @dragover.prevent
    @drop="onDrop"
    @dragenter.prevent="isDragOver = true"
    @dragleave.prevent="isDragOver = false"
    @dragend.prevent="isDragOver = false"
    :class="{'ring-2 ring-blue-500 bg-blue-50 dark:bg-gray-700': isDragOver}"
  >
    <!-- Section Header -->
    <div class="flex items-center justify-between mb-3 pb-2 border-b border-gray-200 dark:border-gray-700">
      <h2 class="font-semibold text-lg text-gray-800 dark:text-white">{{ section.title }}</h2>
      <span class="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300">
        {{ tasks.length }} {{ tasks.length === 1 ? 'task' : 'tasks' }}
      </span>
    </div>
 
    <!-- Tasks Container with scroll when content overflows -->
    <div class="flex-1 space-y-2 overflow-y-auto mb-3 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600 pr-1">
      <p v-if="tasks.length === 0" class="text-gray-400 dark:text-gray-500 text-sm italic text-center py-8">
        No tasks yet. Add one below.
      </p>
      <TaskCard
        v-for="task in tasks"
        :key="task._id"
        :task="task"
        @task-deleted="handleUpdate"
      />
    </div>
 
    <!-- Add Task Button -->
    <div class="mt-auto pt-2 border-t border-gray-200 dark:border-gray-700">
      <AddTaskModal :sectionId="section._id" @task-created="handleUpdate" />
    </div>
  </div>
</template>
 
<script setup>
import { ref } from 'vue'
import TaskCard from './TaskCard.vue'
import AddTaskModal from './AddTaskModal.vue'
import { updateTask } from '../services/api'
 
const props = defineProps({
  section: {
    type: Object,
    required: true
  },
  tasks: {
    type: Array,
    default: () => []
  }
})
 
const emit = defineEmits(['task-moved'])
const isDragOver = ref(false)
 
const handleUpdate = () => emit('task-moved')
 
const onDrop = async (e) => {
  isDragOver.value = false
  const taskId = e.dataTransfer.getData("taskId")
  if (!taskId) return
  
  try {
    await updateTask(taskId, { section: props.section._id })
    emit('task-moved')
  } catch (error) {
    console.error('Failed to move task:', error)
  }
}
</script>
 
<style scoped>
/* Optional: Custom scrollbar styles */
.scrollbar-thin::-webkit-scrollbar {
  width: 4px;
}
 
.scrollbar-thumb-gray-300::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
  border-radius: 4px;
}
 
.dark .scrollbar-thumb-gray-600::-webkit-scrollbar-thumb {
  background-color: #4b5563;
}
</style>