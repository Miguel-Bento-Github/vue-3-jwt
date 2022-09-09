<script setup>
import { storeToRefs } from 'pinia'

import { useAuthStore, useUsersStore } from '@/stores'

const authStore = useAuthStore()
const { user: authUser } = storeToRefs(authStore)

const usersStore = useUsersStore()
const { users } = storeToRefs(usersStore)

usersStore.getAllUsers()
</script>

<template>
  <section class="home">
    <h1>Hi {{ authUser?.firstName }}</h1>
    <p>You're logged in</p>

    <h2>Users from secure api endpoint:</h2>
    <ul v-if="users.length">
      <li v-for="user in users" :key="user.id">
        {{ user.firstName }} {{ user.lastName }}
      </li>
    </ul>

    <div v-if="users.loading" class="loading">Loading...</div>
    <div v-if="users.error" class="invalid">
      Error loading users: {{ users.error }}
    </div>
  </section>
</template>
