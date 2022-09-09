<script setup>
import { useAuthStore } from '@/stores'
import { RouterView } from 'vue-router'
import { backgrounds, shareStorage } from './helpers'

const authStore = useAuthStore()
shareStorage()
const newBackground = () => {
  const randomNoRepeats = (array) => {
    let copy = array.slice(0)

    return function () {
      if (copy.length < 1) {
        copy = array.slice(0)
      }

      const index = Math.floor(Math.random() * copy.length)
      const item = copy[index]
      copy.splice(index, 1)

      return item
    }
  }

  const randomBackground = randomNoRepeats(backgrounds)()

  document.body.style.backgroundColor = randomBackground.backgroundColor
  document.body.style.backgroundImage = randomBackground.backgroundImage
  document.body.style.backgroundSize = randomBackground?.backgroundSize
}
newBackground()
</script>

<template>
  <nav v-show="authStore.user" class="navbar">
    <button type="button" @click="authStore.logout()">Logout</button>
    <button type="button" @click="newBackground()">Background</button>
  </nav>
  <main class="main">
    <RouterView />
  </main>
</template>

<style>
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

html {
  font-size: calc(14px + (48 - 14) * ((100vw - 300px) / (1900 - 300)));
}

body {
  color: #222;
  font-family: Avenir;
  font-weight: 200;
  line-height: 1.5;
  opacity: 0.8;
  background-attachment: fixed;
  transition: background 0.25s ease-in;
}

h1,
h2 {
  font-weight: 400;
}

#app {
  min-height: 100vh;
  width: 100vw;
  background: rgb(0, 0, 0, 80%);
  isolation: isolate;
}

main {
  padding: 1rem;
  position: relative;
  color: #f4f4f4;
}

form {
  display: flex;
  flex-direction: column;
  align-items: start;
  gap: 0.5rem;
}

input,
button {
  margin: 0.25rem;
  padding: 0.25rem;
  border: 0;
  font: inherit;
  color: #000;
}

input {
  border-radius: 1% 88% 8% 92% / 89% 23% 87% 11%;
}

button {
  margin-top: 1rem;
  cursor: pointer;
  border-radius: 10% 89% 20% 10% / 65% 10% 68% 10%;
  transition: all 0.25s ease-in-out;
  filter: drop-shadow(2px 2px 4px #000);
}

button:hover {
  isolation: isolate;
  border-radius: 21% 99% 22% 78% / 89% 13% 87% 11%;
  filter: drop-shadow(2px 2px 6px #000);
}

fieldset {
  all: unset;
}

fieldset > * {
  display: block;
}

.view {
  height: 100%;
  width: 100%;
  position: relative;
  border-radius: 1rem;
  background: #000;
  color: #fff;
  padding: 1rem;
}

ul {
  padding-left: 1rem;
}

.invalid {
  color: #d5924f;
  font-weight: 700;
}
</style>

<style scoped>
nav {
  z-index: 1;
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
}

nav button {
  margin: 1rem;
}
</style>
