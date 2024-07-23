<template>
  <footer
    class="container absolute bottom-8 mx-auto mb-2 flex h-12 min-w-full flex-col-reverse justify-center gap-0 p-4 sm:bottom-4 sm:flex-row sm:gap-8 md:bottom-2 md:mb-0">
    <small class="mb-2 ml-0 text-justify font-semibold sm:text-center">
      <a href="https://discordapp.com/users/79292034447314944">Discord</a>
      <span>&nbsp;|&nbsp;</span>
      <a href="https://github.com/Tackx">GitHub</a>
      <span>&nbsp;|&nbsp;</span>
      <a class="ml-auto mr-0" href="https://buymeacoffee.com/tackx">Buy Me a Coffee</a>
    </small>

    <small class="mb-2 ml-auto mr-auto font-bold sm:mb-0">
      Made by <a href="https://discordapp.com/users/79292034447314944">tack</a>@<a href="https://www.vxn.dev">vxn.dev</a
      >. This is a fan project in no way connected to Arrowhead or the official Helldivers 2 trademark. All imagery
      kindly provided by the <a href="https://helldivers.wiki.gg">Helldivers Wiki</a>. Favicon by
      <a href="https://discordapp.com/users/501124448339099658">Ferex</a>.
    </small>

    <small class="mb-2 ml-auto font-bold sm:mb-0">v{{ version }}</small>
  </footer>
</template>

<script setup lang="ts">
  const version = APP_VERSION
</script>

<style scoped></style>
