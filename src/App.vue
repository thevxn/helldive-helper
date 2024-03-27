<template>
  <Header />
  <RouterView v-slot="{ Component }">
    <template v-if="Component">
      <Suspense>
        <!-- main content -->
        <component :is="Component" />
        <!-- loading state -->
        <template #fallback>
          <main>
            <article>Loading...</article>
          </main>
        </template>
      </Suspense>
    </template>
  </RouterView>

  <Footer />
</template>

<script setup lang="ts">
  import { RouterView } from 'vue-router'

  import Footer from '@/components/partials/PFooter.vue'
  import Header from '@/components/partials/PHeader.vue'
</script>

<style></style>
