<template>
  <div class="avatars">
    <div
      v-for="member in members"
      :key="member._id"
      class="avatar"
      :style="{ backgroundColor: member.color }"
    >
      {{ member.username.charAt(0) }}
    </div>
    <button class="add avatar add-icon" @click="openMenu('previewMembers')"></button>
  </div>
  <!-- MEMBERS MENU -->
  <menu-members
    class="preview"
    v-if="menu.previewMembers"
    :card="card"
    @sendToSave="$emit('sendtosave', $event)"
    @closeMenu="closeMenu"
  ></menu-members>
</template>
 <script>
import menuMembers from './menu/menu.members.vue'
export default {
  name: 'ProjectApp',
  emits: ['sendtosave', 'closemenu'],
  components: {
    menuMembers,
  },
  props: {
    card: Object,
    members: Array,
  },
  data() {
    return {}
  },
  methods: {
    openMenu(menuAction) {
      this.$store.commit({ type: 'openMenu', menuAction })
    },
    closeMenu() {
      this.$store.commit({ type: 'closeMenu' })
    },
  },
  computed: {
    members() {
      return this.card.members
    },
    avatarStr() {
      let avatarStr = ''
      this.members.forEach((member) => {
        member.username.split(' ').forEach((memberName) => {
          avatarStr += memberName.charAt(0)
        })
      })
      return avatarStr
    },
    menu() {
      return this.$store.getters.menu
    },
    users() {
      return this.$store.getters.users
    },
  },
  unmounted() {},
}
</script>
 <style>
</style>