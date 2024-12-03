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
    <div class="markdown-body relative h-12">
      <img class="visit-img" scale-30 src="https://count.getloli.com/@minecraft?name=minecraft&theme=minecraft&padding=7&offset=0&align=center&scale=1&pixelated=1&darkmode=auto" alt="">
    </div>
  </nav>
</template>

<style>
.visit-img {
  position: absolute;
  top: -130%;
  left: -35%;
}
</style>
