<template>
  <Header
    :player-count="playerCount"
    @add-member="home.addMember(), playerCount < 4 ? playerCount++ : null"
    @remove-member="home.removeMember(), playerCount > 1 ? playerCount-- : null" />
  <Suspense>
    <HomeView ref="home" />
  </Suspense>
  <Footer />
</template>

<script setup lang="ts">
  import { ref, watch } from 'vue'

  import HomeView from './views/System/HomeView.vue'

  import Footer from '@/components/partials/PFooter.vue'
  import Header from '@/components/partials/PHeader.vue'

  const home = ref()

  const playerCount = ref(4)

  // https://github.com/vuejs/core/issues/1990
  watch(home, () => {
    playerCount.value = home.value.playerCount
  })
</script>

<style></style>
