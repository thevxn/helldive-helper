<template>
  <header class="container mx-auto flex min-w-full snap-start flex-col justify-center pt-4 text-center">
    <div class="flex flex-col items-center justify-center gap-4 sm:flex-row">
      <img class="sm:ml-auto" src="/logo.png" width="50px" height="50px" />
      <h1 class="text-center font-semibold sm:mr-auto">Helldive Helper</h1>
    </div>
    <div class="flex flex-col sm:flex-row">
      <!-- Invisible copy of the right side buttons to keep the logo & text centered -->
      <div
        class="mr-auto hidden flex-row items-center justify-center gap-2 justify-self-end sm:invisible sm:ml-6 sm:flex">
        <span>Squad members: {{ playerCount }}</span>
        <button
          :disabled="playerCount === 4"
          class="bg-diagonal-hover h-8 w-8 snap-center place-self-center rounded border-2 border-solid border-yellow-300 bg-yellow-300 font-bold text-black hover:text-yellow-300 active:bg-yellow-300 active:bg-none active:text-black">
          +
        </button>
        <button
          :disabled="playerCount === 1"
          class="bg-diagonal-hover h-8 w-8 snap-center place-self-center rounded border-2 border-solid border-yellow-300 bg-yellow-300 font-bold text-black hover:text-yellow-300 active:bg-yellow-300 active:bg-none active:text-black">
          -
        </button>
      </div>
      <h2 class="p-4 text-justify font-semibold sm:text-center">
        Build up your team composition & share with your friends!
      </h2>
      <div class="flex flex-row items-center justify-center gap-2 justify-self-end sm:ml-auto sm:mr-6">
        <span class="font-bold">Squad members: {{ playerCount }}</span>
        <button
          :disabled="playerCount === 4"
          class="h-8 w-8 snap-center place-self-center rounded border-2 border-solid font-bold"
          :class="
            playerCount === 4
              ? 'text-yellow  border-gray-800 bg-black opacity-70 hover:cursor-not-allowed'
              : 'bg-diagonal-hover border-yellow-300 bg-yellow-300 text-black hover:text-yellow-300 active:bg-yellow-300 active:bg-none active:text-black'
          "
          @click="$emit('addMember')">
          +
        </button>
        <button
          :disabled="playerCount === 1"
          class="h-8 w-8 snap-center place-self-center rounded border-2 border-solid font-bold"
          :class="
            playerCount === 1
              ? 'text-yellow  border-gray-800 bg-black opacity-70 hover:cursor-not-allowed'
              : 'bg-diagonal-hover border-yellow-300 bg-yellow-300 text-black hover:text-yellow-300 active:bg-yellow-300 active:bg-none active:text-black'
          "
          @click="$emit('removeMember')">
          -
        </button>
      </div>
    </div>
  </header>
</template>

<script setup lang="ts">
  defineEmits(['addMember', 'removeMember'])
  defineProps<{ playerCount: number }>()
</script>

<style scoped></style>
