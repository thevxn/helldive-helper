<template>
  <main class="container flex flex-col flex-wrap sm:flex-row min-w-full p-8 gap-8 sm:gap-6">
    <div
      :class="`w-full sm:w-5/12 xl:w-1/5 min-h-screen mx-auto bg-gray-500 rounded-md p-8`"
      v-for="member in data.memberList"
      :key="member.name">
      <ul>
        <li>{{ member.stratagemCodeList }}</li>
      </ul>
      <label for="name">Squad Member Name:</label>
      <input
        id="name"
        name="squad-member-name"
        type="text"
        :placeholder="member.name"
        class="bg-slate-700 w-full"
        v-model="member.name" />
      <label for="primary">Primary Weapon:</label>
      <select name="primary" id="primary" class="bg-slate-700 w-full" v-model="member.primaryWeaponCode">
        <option v-for="weapon in primaryWeaponCodeList" :key="weapon" :value="weapon">
          {{ (weapons.primary as typeof weapons.primary)[weapon].displayName }}
        </option>
      </select>
      <label for="secondary" class="w-full">Secondary Weapon:</label>
      <select name="secondary" id="secondary" class="bg-slate-700 w-full">
        <option v-for="weapon in secondaryWeaponCodeList" :key="weapon" :value="weapon">
          {{ (weapons.secondary as typeof weapons.secondary)[weapon].displayName }}
        </option>
      </select>
    </div>
  </main>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'

  import { primaryWeaponCodeList, secondaryWeaponCodeList, weapons } from '@/utils/weapons'

  const data = reactive({
    memberList: [
      {
        name: 'player1',
        primaryWeaponCode: 'LIBERATOR' as keyof typeof weapons.primary,
        secondaryWeaponCode: 'PEACEMAKER' as keyof typeof weapons.secondary,
        stratagemCodeList: ['STRAT1']
      },
      {
        name: 'player2',
        primaryWeaponCode: 'DILIGENCE' as keyof typeof weapons.primary,
        secondaryWeaponCode: 'PEACEMAKER' as keyof typeof weapons.secondary,
        stratagemCodeList: ['STRAT1']
      },
      {
        name: 'player3',
        primaryWeaponCode: 'LIBERATOR' as keyof typeof weapons.primary,
        secondaryWeaponCode: 'PEACEMAKER' as keyof typeof weapons.secondary,
        stratagemCodeList: ['STRAT1']
      },
      {
        name: 'player4',
        primaryWeaponCode: 'LIBERATOR' as keyof typeof weapons.primary,
        secondaryWeaponCode: 'PEACEMAKER' as keyof typeof weapons.secondary,
        stratagemCodeList: ['STRAT1']
      }
    ]
  })
  // const playerCount = data.memberList.length
</script>

<style scoped></style>
