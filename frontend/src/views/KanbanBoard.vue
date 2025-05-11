<template>
  <div>
    <h1 class="text-3xl font-bold mb-4 text-center">Kanban Board</h1>
    <div class="flex flex-wrap gap-4 justify-center">
      <Section
        v-for="section in sections"
        :key="section._id"
        :section="section"
        :tasks="tasks.filter(t => t.section._id === section._id)"
        @task-moved="fetchTasks"
      />
    </div>

    <div class="flex justify-center mt-4">
      <input v-model="newSectionTitle" placeholder="New Section" class="border p-2 rounded" />
      <button @click="addSection" class="bg-blue-500 text-white px-3 py-2 ml-2 rounded">+ Add Section</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import Section from '../components/Section.vue'
import { getSections, getTasks, createSection } from '../services/api'

const sections = ref([])
const tasks = ref([])
const newSectionTitle = ref("")

const fetchSections = async () => {
  sections.value = (await getSections()).data
}
const fetchTasks = async () => {
  tasks.value = (await getTasks()).data
}
const addSection = async () => {
  if (!newSectionTitle.value.trim()) return
  await createSection(newSectionTitle.value)
  newSectionTitle.value = ""
  fetchSections()
}

onMounted(() => {
  fetchSections()
  fetchTasks()
})
</script>
