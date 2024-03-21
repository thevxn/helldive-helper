<template>
  <main class="container flex flex-col sm:flex-row mt-14 min-w-full p-8 gap-8 sm:gap-6">
    <div
      :class="`w-full sm:w-1/${members} min-h-screen mx-auto bg-gray-500`"
      v-for="(member, i) in memberList"
      :key="memberList[i].name">
      <ul>
        <li>{{ member.name }}</li>
        <li>{{ member.primaryWeaponCode }}</li>
        <li>{{ member.secondaryWeaponCode }}</li>
        <li>{{ member.stratagemCodeList }}</li>
      </ul>
    </div>
  </main>
</template>

<script setup lang="ts">
  const memberList = [
    {
      name: 'player1',
      primaryWeaponCode: 'PRIMARY',
      secondaryWeaponCode: 'SECONDARY',
      stratagemCodeList: ['STRAT1']
    },
    {
      name: 'player2',
      primaryWeaponCode: 'PRIMARY',
      secondaryWeaponCode: 'SECONDARY',
      stratagemCodeList: ['STRAT1']
    },
    {
      name: 'player3',
      primaryWeaponCode: 'PRIMARY',
      secondaryWeaponCode: 'SECONDARY',
      stratagemCodeList: ['STRAT1']
    }
  ]
  const members = memberList.length
</script>

<style scoped></style>
