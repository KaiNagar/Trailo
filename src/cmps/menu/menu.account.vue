<template>
  <app-modal class="menu-account" @closeModal="closeMenu">
    <template #title>Account</template>
    <template #part-1>
      <div class="user">
        <div class="avatar" :style="{ backgroundImage: `url(${user.avatar.imgUrl})` }"></div>
        <div class="info">
          <header>{{ user.username }}</header>
          <span>{{ user.email }}</span>
        </div>
      </div>
      <div class="logout" @click="signout">Logout</div>
    </template>
  </app-modal>
</template>
 <script>
import appModal from '../app.modal.vue'
export default {
  name: 'ProjectApp',
  components: {
    appModal,
  },
  data() {
    return {}
  },
  methods: {
    closeMenu() {
      this.$store.commit({ type: 'closeMenu' })
    },
    signout() {
      this.$store.commit({ type: 'logout' })
      this.$router.push('/')
    },
  },
  computed: {
    user() {
      return this.$store.getters.loggedUser
    },
  },
}
</script>
 <style>
</style>