<template>
  <navbar class="glassy"/>
  <router-view/>
</template>

<script>
import Navbar from './components/Navbar.vue';

export default {
  components: {
    Navbar
  }
}
</script>