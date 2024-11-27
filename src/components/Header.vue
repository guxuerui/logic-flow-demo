<script setup lang="ts">
// is or not darkMode
const isDarkMode = computed(() => {
  return isDark.value
})
</script>

<template>
  <nav class="link header font-mno pa-4">
    <div>
      <a href="/" class="c-gray-500 hover:c-black dark:hover:c-white">
        Home
      </a>
    </div>
    <div style="padding-top: 0.3rem">
      <button
        class="vertical-sub c-gray-800 icon-btn dark:c-gray-400 hover:c-black !outline-none dark:hover:c-white"
        @click="toggleDark()"
      >
        <div v-if="isDarkMode" i-carbon-moon />
        <div v-else i-carbon-sun />
      </button>
      <a
        class="ml-3 vertical-sub c-gray-400 hover:c-black dark:hover:c-white"
        rel="noreferrer"
        href="https://github.com/guxuerui"
        target="_blank"
        title="GitHub"
      >
        <span class="inline-block" i-carbon-logo-github />
      </a>
    </div>
  </nav>
</template>

<style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .link div a {
    transition: color 0.2s ease-in-out;
  }
</style>
