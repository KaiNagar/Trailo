<template>

  <app-modal class="members-modal" @closeModal="$emit('closeMenu')">
    <!-- HEADER -->
    <template #title>Members</template>
    <!-- SEARCH -->
    <template #part-1>
      <input type="text" class="input" @input="filterMembers" placeholder="Search members">
    </template>
    <!--BOARD MEMBERS LIST -->
    <template #part-2>
      <ul class="members">
        <header>Board members</header>
        <li class="member-container" v-for="member in boardMembers " :key="member._id">
          <!-- MEMBER PREVIEW -->
          <member-preview :member="member" :card="card" @togglemember="toggleMember" />
        </li>
      </ul>
    </template>
  </app-modal>

</template>

 <script>
import memberPreview from './member.preview.vue';
import appModal from '../app.modal.vue';
export default {
  name: 'ProjectApp',
  emits: ['closeMenu', 'sendToSave'],
  props: {
    card: Object
  },
  components: {
    appModal,
    memberPreview,
  },
  data() {
    return {
      filterUsers:[]
    };
  },
  methods: {
    toggleMember(memberId) {
      // IDX CARD FROM BOARD
      const idx = this.board.members.findIndex(member => {
        return member._id === memberId
      })
      // CHECK IF MEMBER ON CARD
      const cardMemberIdx = this.card.members.findIndex(member => {
        return member._id === memberId
      })
      // PUSH OR SPLICE
      if (cardMemberIdx === -1) {
        this.card.members.push(this.board.members[idx])
      } else {
        this.card.members.splice(cardMemberIdx, 1)
      }
      this.$emit('sendToSave', this.card)
    },
    // filterUsers(ev) {
    //   this.filteredUsers = []
    //   const regex = new RegExp(ev.target.value, 'i')
    //   this.filteredUsers = this.users.filter((user) => regex.test(user.username))
      
    // },
  },
  created() {


  },
  computed: {
    board() {
      return this.$store.getters.currBoard
    },
    boardMembers() {
      return this.board.members || []
    },
    avatarStr() {
      let avatarStr = ''
      this.card.members.forEach(member => {
        member.username.split(' ').forEach(memberName => {
          avatarStr += memberName.charAt(0)
        })
      })
      return avatarStr
    },
    users() {
      return this.$store.getters.users
    },
    boardMembers() {
      return this.$store.getters.currBoard.members
    },
  },
  unmounted() { },
};
</script>
 <style>
 </style>