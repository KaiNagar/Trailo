<template>
  <div class="avatars">
    <div
      v-for="(member, idx) in boardMembers"
      :key="idx"
      class="avatar"
      :style="{ backgroundColor: member.color }"
    >
      {{ member.username.charAt(0).toUpperCase() }}
      <div :class="{ admin: member.isAdmin || member._id === board.createdBy._id }"></div>
    </div>
  </div>
</template>
<script>
import { Container, Draggable } from 'vue3-smooth-dnd'

export default {
  name: 'ProjectApp',
  components: { Draggable, Container },
  props: {
    card: Object,
    members: Array,
    members: Array,
  },
  data() {
    return {}
  },

  methods: {
    getChildPayload1(index) {
      return this.boardMembers[index]
    },
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    board() {
      return this.$store.getters.currBoard
    },
    boardMembers() {
      const memeberIds = this.$store.getters.boardMemberIds
      const members = []
      this.users.filter((user) => {
        return memeberIds.forEach((memberId) => {
          if (memberId === user._id) {
            members.unshift(user)
          }
        })
      })

      return this.board.members || members
    },
    cardMembers() {
      const memeberIds = this.$store.getters.cardMemberIds
      const members = []
      this.users.filter((user) => {
        return memeberIds.forEach((memberId) => {
          if (memberId === user._id) {
            members.unshift(user)
          }
        })
      })
      return this.$store.getters.cardMemberIds
    },
    card() {
      return this.$store.getters.currCard
    },
  },
  created() {
    const card = this.$store.getters.currCard
  },
  unmounted() {},
}
</script>
<style>
</style>
