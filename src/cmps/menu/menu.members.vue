<template>
  <app-modal class="members-modal">
    <!-- HEADER -->
    <template #title>Members</template>
    <!-- SEARCH -->
    <template #part-1>
      <input type="text" class="input" placeholder="Search members">
    </template>
    <!--BOARD MEMBERS LIST -->
    <template #part-2>
      <ul class="members">
        <header>Board members</header>
        <li class="member-container" v-for="member, in boardMembers " :key="member._id">
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
  props: {
    card: Object
  },
  components: {
    appModal,
    memberPreview,

  },
  data() {
    return {
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
      this.members.forEach(member => {
        member.username.split(' ').forEach(memberName => {
          avatarStr += memberName.charAt(0)
        })
      })

      return avatarStr
    },

  },
  unmounted() { },
};
</script>
 <style>
 </style>