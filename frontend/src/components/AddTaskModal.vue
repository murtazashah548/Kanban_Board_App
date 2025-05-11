<template>
  <div>
    <!-- Task Form -->
    <div v-if="isFormVisible" class="mt-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 shadow-sm">
      <div class="space-y-3">
        <!-- Task Name -->
        <div>
          <label for="taskName" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Task Name*</label>
          <input 
            id="taskName"
            v-model="name" 
            placeholder="Enter task name" 
            class="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
            @keyup.enter="addTask"
          />
        </div>
        
        <!-- Task Description -->
        <div>
          <label for="taskDescription" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
          <textarea 
            id="taskDescription"
            v-model="description" 
            placeholder="Enter task details" 
            rows="2"
            class="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white resize-none"
          ></textarea>
        </div>
        
        <!-- Task Due Date -->
        <div>
          <label for="taskDueDate" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Due Date</label>
          <input 
            id="taskDueDate"
            v-model="dueDate" 
            type="date" 
            class="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        
        <!-- Task Assignee -->
        <div>
          <label for="taskAssignee" class="block text-xs font-medium text-gray-700 dark:text-gray-300 mb-1">Assignee</label>
          <input 
            id="taskAssignee"
            v-model="assignee" 
            placeholder="Enter assignee name" 
            class="w-full border border-gray-300 dark:border-gray-600 p-2 rounded-md text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
        
        <!-- Form Actions -->
        <div class="flex gap-2 pt-2">
          <button 
            @click="addTask" 
            class="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center"
            :disabled="!name.trim()"
            :class="{'opacity-50 cursor-not-allowed': !name.trim(), 'hover:bg-blue-600': name.trim()}"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Add Task
          </button>
          <button 
            @click="cancelForm" 
            class="bg-gray-200 hover:bg-gray-300 dark:bg-gray-600 dark:hover:bg-gray-500 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
    
    <!-- Show Form Button -->
    <button 
      v-if="!isFormVisible"
      @click="isFormVisible = true" 
      class="mt-3 w-full bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 py-2 px-4 rounded-md text-sm font-medium transition-colors duration-200 flex items-center justify-center"
    >
      <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
      </svg>
      Add New Task
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { createTask } from '../services/api'

const props = defineProps({
  sectionId: {
    type: String,
    required: true
  }
})

const emit = defineEmits(['task-created'])

const name = ref("")
const description = ref("")
const dueDate = ref("")
const assignee = ref("")
const isFormVisible = ref(false)

const addTask = async () => {
  if (!name.value.trim()) return
  
  try {
    await createTask({
      name: name.value,
      description: description.value,
      dueDate: dueDate.value,
      assignee: assignee.value,
      section: props.sectionId,
    })
    
    // Reset form and hide it
    resetForm()
    isFormVisible.value = false
    
    // Notify parent component
    emit('task-created')
  } catch (error) {
    console.error('Failed to create task:', error)
  }
}

const cancelForm = () => {
  resetForm()
  isFormVisible.value = false
}

const resetForm = () => {
  name.value = ""
  description.value = ""
  dueDate.value = ""
  assignee.value = ""
}
</script>