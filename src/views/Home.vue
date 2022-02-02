<template>
  <div class="relative">
    <div v-if="isSuccess()" class="absolute top-10 right-10"></div>
    <h2 class="font-bold text-3xl">Main Feed</h2>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'
import {useToast} from 'vue-toastification'

export default {
  data: () => ({
    toast: useToast(),
  }),
  methods: {
    ...mapActions({
      getCurrentUser: 'auth/getCurrentUser',
    }),
    ...mapGetters({
      isSuccess: 'auth/isSuccess',
    }),
  },
  mounted() {
    this.getCurrentUser()
  },
  updated() {
    if (this.isSuccess()) {
      this.toast.success(this.isSuccess(), {timeout: 2000})
    }
  },
}
</script>

<style scoped></style>
