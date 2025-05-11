<template>
  <div class="app-background">
    <main class="min-h-screen p-4 md:p-6 lg:p-8 relative z-10">
      <KanbanBoard />
    </main>
  </div>
</template>

<script setup>
import KanbanBoard from './views/KanbanBoard.vue'
</script>

<style>
/* Global background styles that will apply to every page */
:root {
  --gradient-start: #f8fafc;
  --gradient-mid: #eef2ff;
  --gradient-end: #e0e7ff;
  --dot-color: rgba(99, 102, 241, 0.1);
}

.dark {
  --gradient-start: #0f172a;
  --gradient-mid: #1e293b;
  --gradient-end: #1e1b4b;
  --dot-color: rgba(99, 102, 241, 0.2);
}

body {
  margin: 0;
  padding: 0;
  background-color: var(--gradient-start);
}

.app-background {
  position: relative;
  min-height: 100vh;
  background: linear-gradient(135deg, var(--gradient-start) 0%, var(--gradient-mid) 50%, var(--gradient-end) 100%);
  background-attachment: fixed;
  overflow: hidden;
}

.app-background::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-image: 
    radial-gradient(var(--dot-color) 2px, transparent 2px),
    radial-gradient(var(--dot-color) 2px, transparent 2px);
  background-size: 30px 30px;
  background-position: 0 0, 15px 15px;
  opacity: 0.5;
  z-index: 1;
}

/* Decorative elements */
.app-background::after {
  content: "";
  position: fixed;
  top: -50vh;
  right: -50vh;
  width: 100vh;
  height: 100vh;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(99, 102, 241, 0.07) 0%, rgba(99, 102, 241, 0.03) 50%, transparent 70%);
  z-index: 0;
}

@media (prefers-reduced-motion: no-preference) {
  /* Subtle animation for the background elements */
  @keyframes float {
    0% { transform: translateY(0) rotate(0deg); }
    50% { transform: translateY(-20px) rotate(5deg); }
    100% { transform: translateY(0) rotate(0deg); }
  }
  
  .app-background::after {
    animation: float 20s ease-in-out infinite;
  }
}

/* Optional: Add smooth transitions for dark mode changes */
.app-background, .app-background::before, .app-background::after {
  transition: background 0.3s ease-in-out, background-color 0.3s ease-in-out;
}
</style>