<script>
import { RouterLink, RouterView } from 'vue-router'
import Navbar from './components/Navbar.vue';
export default{
  components: { Navbar },
}
</script>

<template>
  <Navbar/>
  <RouterView />
</template>

<style>
* {
    margin: 0;
    padding: 0
}

html {
    height: 100%;
}
body {
    background: rgb(99, 39, 120);
    height: 100%;

}
</style>
