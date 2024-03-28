<template>
  <footer
    class="container absolute bottom-8 mx-auto flex h-12 min-w-full flex-col-reverse justify-center gap-0 p-4 sm:bottom-4 sm:flex-row sm:gap-8 md:bottom-2">
    <small class="text-justify sm:ml-auto sm:mr-auto lg:text-center"
      >Made by <a href="https://github.com/Tackx">tack</a>@<a href="https://www.savla.dev">savla.dev</a>. This is a fan
      project in no way connected to Arrowhead or the official Helldivers 2 trademark. All imagery provided by the
      <a href="https://helldivers.wiki.gg">Helldivers Wiki</a>.
    </small>
    <small class="mb-2 ml-auto sm:mb-0 sm:ml-0">v{{ version }}</small>
  </footer>
</template>

<script setup lang="ts">
  const version = APP_VERSION
</script>

<style scoped></style>
