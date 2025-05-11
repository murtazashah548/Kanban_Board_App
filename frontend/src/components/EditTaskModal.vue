<template>
  <div 
    v-if="show" 
    class="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center z-50 p-4"
    @click.self="cancelEdit"
  >
    <div 
      class="bg-white dark:bg-gray-800 p-5 rounded-lg shadow-xl w-full max-w-md border border-gray-200 dark:border-gray-700 animate-fadeIn"
      @click.stop
    >
      <!-- Modal Header -->
      <div class="flex justify-between items-center mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
        <h2 class="text-xl font-semibold text-gray-800 dark:text-white flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
          Edit Task
        </h2>
        <button 
          @click="cancelEdit" 
          class="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 focus:outline-none"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <!-- Modal Form -->
      <form @submit.prevent="save" class="space-y-4">
        <!-- Task Name -->
        <div>
          <label for="taskName" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Task Name*
          </label>
          <input 
            id="taskName"
            v-model="name" 
            placeholder="Enter task name" 
            class="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <!-- Task Description -->
        <div>
          <label for="taskDescription" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Description
          </label>
          <textarea 
            id="taskDescription"
            v-model="description" 
            placeholder="Enter task details" 
            rows="3"
            class="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white resize-none"
          ></textarea>
        </div>

        <!-- Task Due Date -->
        <div>
          <label for="taskDueDate" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Due Date
          </label>
          <input 
            id="taskDueDate"
            v-model="dueDate" 
            type="date" 
            class="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <!-- Task Assignee -->
        <div>
          <label for="taskAssignee" class="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
            Assignee
          </label>
          <input 
            id="taskAssignee"
            v-model="assignee" 
            placeholder="Enter assignee name" 
            class="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white"
          />
        </div>

        <!-- Modal Footer -->
        <div class="flex justify-end space-x-3 pt-4 border-t border-gray-200 dark:border-gray-700">
          <button 
            type="button"
            @click="cancelEdit" 
            class="px-4 py-2 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Cancel
          </button>
          <button 
            type="submit"
            class="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md text-sm font-medium transition-colors duration-200 flex items-center"
            :disabled="!name.trim()"
            :class="{'opacity-50 cursor-not-allowed': !name.trim()}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
            Save Changes
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue'
import { updateTask } from '../services/api'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['task-updated', 'close'])

const show = ref(true)
const name = ref('')
const description = ref('')
const dueDate = ref('')
const assignee = ref('')

// Initialize form data when task prop changes
watch(() => props.task, (task) => {
  if (task) {
    name.value = task.name || ''
    description.value = task.description || ''
    dueDate.value = task.dueDate?.substring(0, 10) || ''
    assignee.value = task.assignee || ''
  }
}, { immediate: true })

const save = async () => {
  if (!name.value.trim()) return
  
  try {
    await updateTask(props.task._id, {
      name: name.value,
      description: description.value,
      dueDate: dueDate.value,
      assignee: assignee.value,
    })
    
    emit('task-updated')
    show.value = false
  } catch (error) {
    console.error('Failed to update task:', error)
  }
}

const cancelEdit = () => {
  show.value = false
  emit('close')
}
</script>

<style scoped>
@keyframes fadeIn {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fadeIn {
  animation: fadeIn 0.2s ease-out forwards;
}
</style>