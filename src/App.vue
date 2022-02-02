<template>
  <div>
    <nav-bar></nav-bar>
    <router-view v-slot="{Component}">
      <transition name="animate_route" mode="out-in">
        <component :is="Component"></component>
      </transition>
    </router-view>
  </div>
</template>

<script>
import NavBar from './components/shared/NavBar.vue'
export default {
  components: {NavBar},
  name: 'App',
}
</script>

<style>
/* route transition */
.animate_route-enter-from {
  opacity: 0;
}

.animate_route-enter-active {
  transition: all 0.3s ease-in;
}

.animate_route-leave-to {
  opacity: 0;
}
</style>
