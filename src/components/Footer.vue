<script setup lang="ts">
const router = useRouter()
const goBack = () => router.back()
</script>

<template>
  <nav mt-6 text-sm>
    <div class="markdown-body cursor-pointer">
      <a @click="goBack">cd ..</a>
    </div>
    <div class="markdown-body">
      <a href="/">cd ~</a>
    </div>
  </nav>
</template>
