<template>
  <div class="avatars" v-if="members">
    <div v-for="(member, idx) in members" :key="idx" class="avatar" :style="{ backgroundImage: `url(${member.avatar.imgUrl})` }">
     
      <div :class="{ admin: member.isAdmin || member._id === board.createdBy._id }"></div>
    </div>
  </div>

  <div class="avatars" v-else>
    <div v-for="(member, idx) in boardMembers" :key="idx" class="avatar" :style="{ backgroundImage: `url(${member.avatar.imgUrl})` }">
     
      <div :class="{ admin: member.isAdmin || member._id === board.createdBy._id }"></div>
    </div>
  </div>

  <!-- <Container
    v-else
    class="avatars flex"
    orientation="horizontal"
    behaviour="copy"
    group-name="group-1"
    @drop="onDrop($event)"
    drag-class="card-ghost"
    drop-class="card-ghost-drop"
    :get-child-payload="getChildPayload1"
  >
    <Draggable
      v-for="(member, idx) in boardMembers"
      :key="idx"
      class="avatar"
      :style="{ backgroundColor: member.color }"
    >
      {{ member.username.charAt(0).toUpperCase() }}
      <div
        :class="{ admin: member.isAdmin || member._id === board.createdBy._id }"
      ></div>
    </Draggable>
  </Container> -->

  <!-- <div class="avatars" v-else>
        <div v-for="(member, idx) in boardMembers" :key="idx" class="avatar" :style="{ backgroundColor: member.color }">
            {{ member.username.charAt(0).toUpperCase() }}
            <div :class="{ admin: member.isAdmin || member._id === board.createdBy._id }"></div>
        </div>
    </div> -->
</template>
<script>
import { Container, Draggable } from 'vue3-smooth-dnd'

export default {
  name: 'ProjectApp',
  components: { Draggable, Container },
  props: {
    card: Object,
    members: Array,
    members: Array
  },
  data() {
    return {}
  },

  methods: {
    onDrop(dropResult) {
      console.log(dropResult)
    },
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
    card(){
      return this.$store.getters.currCard
    }
  },
  created() {
    const card = this.$store.getters.currCard
    console.log(this.users)
  },
  unmounted() { },
}
</script>
<style>
</style>
