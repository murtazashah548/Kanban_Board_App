import EditTaskModal from './EditTaskModal.vue'
 
const showModal = ref(false)
const showEdit = () => showModal.value = true
<template>
  <div>
    <!-- Task Card -->
    <div
      class="bg-white dark:bg-gray-800 p-3 rounded-lg border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow transition-all duration-200 relative group"
      draggable="true"
      @dragstart="dragStart"
      @dragend="dragEnd"
      :class="{'opacity-50': isDragging}"
    >
      <!-- Task Header with Title and Actions -->
      <div class="flex justify-between items-start mb-2">
        <h3 class="font-medium text-gray-800 dark:text-gray-200 pr-6 break-words">{{ task.name }}</h3>
        
        <!-- Action buttons - appear on hover on desktop -->
        <div class="absolute top-2 right-2 flex space-x-1 opacity-0 group-hover:opacity-100 md:transition-opacity md:duration-200">
          <button 
            @click="showEdit" 
            class="p-1 rounded-full text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900 transition-colors"
            title="Edit task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
            </svg>
          </button>
          <button 
            @click="confirmDelete" 
            class="p-1 rounded-full text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900 transition-colors"
            title="Delete task"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Task Description -->
      <p v-if="task.description" class="text-sm text-gray-600 dark:text-gray-400 mb-2 break-words">
        {{ task.description }}
      </p>
      
      <!-- Task Details -->
      <div class="mt-3 space-y-2">
        <!-- Due Date Badge -->
        <div v-if="task.dueDate" class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-500 dark:text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span 
            class="text-xs px-2 py-0.5 rounded-full" 
            :class="getDueDateClasses(task.dueDate)"
          >
            {{ formatDate(task.dueDate) }}
          </span>
        </div>
        
        <!-- Assignee Badge -->
        <div class="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-3 w-3 text-gray-500 dark:text-gray-400 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          <span class="text-xs text-gray-600 dark:text-gray-400">
            {{ task.assignee || "Unassigned" }}
          </span>
        </div>
      </div>

      <!-- Mobile action buttons - always visible on mobile -->
      <div class="mt-3 pt-2 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2 md:hidden">
        <button 
          @click="showEdit" 
          class="px-2 py-1 rounded text-xs font-medium text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900"
        >
          Edit
        </button>
        <button 
          @click="confirmDelete" 
          class="px-2 py-1 rounded text-xs font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900"
        >
          Delete
        </button>
      </div>
      
      <!-- Drag indicator -->
      <div class="absolute top-1/2 left-0 -ml-1 w-2 h-8 bg-gray-300 dark:bg-gray-600 rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center cursor-grab">
        <div class="w-0.5 h-4 bg-gray-400 dark:bg-gray-500 mx-0.5"></div>
        <div class="w-0.5 h-4 bg-gray-400 dark:bg-gray-500 mx-0.5"></div>
      </div>
    </div>

    <!-- Edit Modal -->
    <EditTaskModal 
      :task="task" 
      v-if="showModal" 
      @task-updated="$emit('task-deleted'); showModal = false" 
      @close="showModal = false"
    />

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteConfirm" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 max-w-sm w-full">
        <h3 class="text-lg font-medium text-gray-900 dark:text-white mb-4">Confirm Delete</h3>
        <p class="text-gray-700 dark:text-gray-300">Are you sure you want to delete this task? This action cannot be undone.</p>
        <div class="mt-6 flex justify-end space-x-3">
          <button 
            @click="showDeleteConfirm = false" 
            class="px-4 py-2 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm font-medium"
          >
            Cancel
          </button>
          <button 
            @click="removeTask" 
            class="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { deleteTask } from '../services/api'
import EditTaskModal from './EditTaskModal.vue'

const props = defineProps({
  task: {
    type: Object,
    required: true
  }
})

const emit = defineEmits(['task-deleted'])

const showModal = ref(false)
const showDeleteConfirm = ref(false)
const isDragging = ref(false)

const showEdit = () => showModal.value = true
const confirmDelete = () => showDeleteConfirm.value = true

const dragStart = (e) => {
  isDragging.value = true
  e.dataTransfer.setData("taskId", props.task._id)
  
  // This makes the drag image nicer
  setTimeout(() => {
    e.target.style.opacity = '0.4'
  }, 0)
}

const dragEnd = (e) => {
  isDragging.value = false
  e.target.style.opacity = '1'
}

const removeTask = async () => {
  try {
    await deleteTask(props.task._id)
    emit('task-deleted')
    showDeleteConfirm.value = false
  } catch (error) {
    console.error('Failed to delete task:', error)
  }
}

// Format date to be more readable
const formatDate = (dateString) => {
  if (!dateString) return ''
  
  const date = new Date(dateString)
  const today = new Date()
  const tomorrow = new Date(today)
  tomorrow.setDate(tomorrow.getDate() + 1)
  
  // Check if date is today or tomorrow
  if (date.toDateString() === today.toDateString()) {
    return 'Today'
  } else if (date.toDateString() === tomorrow.toDateString()) {
    return 'Tomorrow'
  }
  
  // Otherwise return formatted date
  return new Date(dateString).toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric'
  })
}

// Get appropriate classes for due date badge
const getDueDateClasses = (dateString) => {
  if (!dateString) return 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
  
  const dueDate = new Date(dateString)
  const today = new Date()
  
  // Clear time portion for accurate comparison
  dueDate.setHours(0, 0, 0, 0)
  today.setHours(0, 0, 0, 0)
  
  if (dueDate < today) {
    return 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200' // Overdue
  } else if (dueDate.getTime() === today.getTime()) {
    return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200' // Due today
  } else {
    return 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200' // Future
  }
}
</script>