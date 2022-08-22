<template>
  <section class="share-board" @click="closeMenu">
    <header>
      <div class="title">Share board</div>
      <div class="close-icon" @click="$emit('close')"></div>
    </header>

    <div class="search-container">
      <input
        @click.stop="openMenu('searchUser')"
        @input="filterUsers"
        class="input"
        v-focus
        type="search"
        placeholder="Email address or name"
      />
      <search-user v-if="menu.searchUser" @addmember="addMember"></search-user>
      <div class="select-menu header">
        {{ newMemberStatus }} <span class="fa"></span>

        <select @change="changeNewMemberStatus">
          <option value="member">Member</option>
          <option value="admin">Admin</option>
        </select>
      </div>
    </div>

    <div class="wide btn">Share</div>

    <ul>
      <li>
        <div class="icon fa copy-avatar"></div>
        <div class="content">
          <div class="top">Anyone with the board share link</div>
          <div class="bottom copy">Copy link</div>
        </div>
      </li>

      <li v-for="member in members" :key="member._id">
        <div :style="{ backgroundImage: `url(${member.avatar.imgUrl})` }" class="icon avatar"></div>
        <div class="content">
          <div class="top">
            {{ member.username }} <span v-if="member._id === loggedId">(you)</span>
          </div>
          <div class="middle">{{ member.email }}</div>
          <div class="bottom" v-if="member._id === loggedId">Workspace Admin</div>
          <div class="bottom" v-else>Workspace Guest</div>
        </div>
        <div class="select-menu">
          {{ memberStatus }}<span class="fa"></span>
          <select @change="changeMemberStatus($event, member._id)">
            <option value="member">Member</option>
            <option value="admin">Admin</option>
            <option value="remove" v-if="member._id !== loggedId">Remove</option>
          </select>
        </div>
      </li>
    </ul>
  </section>
</template>
 <script>
import searchUser from './search.user.vue'
export default {
  name: 'ProjectApp',
  props: {},
  components: {
    searchUser,
  },
  data() {
    return {
      filteredUsers: [],
      newMemberStatus: 'Member',
      memberStatus: 'Member',
    }
  },
  created() {},
  methods: {
    changeNewMemberStatus(ev) {
      this.newMemberStatus =
        ev.target.value.charAt(0).toUpperCase() + ev.target.value.slice(1, ev.target.value.length)
    },
    changeMemberStatus(ev, memberId) {
      const newBoard = JSON.parse(JSON.stringify(this.board))
      const idx = newBoard.members.findIndex((member) => member._id === memberId)
      if (ev.target.value === 'remove') {
        newBoard.members.splice(idx, 1)
      } else {
        this.memberStatus =
          ev.target.value.charAt(0).toUpperCase() + ev.target.value.slice(1, ev.target.value.length)
        const userToUpdate = newBoard.members[idx]
      }
      this.$store.dispatch({ type: 'saveBoard', board: newBoard })
      this.$store.commit({ type: 'setBoardMembersIds', board: newBoard })
    },
    addMember(updatedUser) {
      if (this.boardMemberIds.includes(updatedUser._id)) return
      if (this.newMemberStatus === 'Admin') {
        updatedUser.isAdmin = true
      } else {
        updatedUser.isAdmin = false
      }
      const newBoard = JSON.parse(JSON.stringify(this.board))
      if (!newBoard.members.length || !newBoard.members) newBoard.members = []
      newBoard.members.push(updatedUser)
      this.$store.commit({ type: 'setBoardMembersIds', board: newBoard })
      this.$store.dispatch({ type: 'saveBoard', board: newBoard })
    },
    editMember() {},
    filterUsers(ev) {
      this.filteredUsers = []
      const regex = new RegExp(ev.target.value, 'i')
      let filteredUsers = this.users.filter((user) => regex.test(user.username))
      this.$store.commit({ type: 'setFilteredUsers', filteredUsers })
    },
    openMenu(menuAction) {
      this.$store.commit({ type: 'openMenu', menuAction })
    },
    closeMenu() {
      this.$store.commit({ type: 'closeMenu' })
    },
    loggedUser() {},
  },
  computed: {
    users() {
      return this.$store.getters.users
    },
    board() {
      return this.$store.getters.currBoard
    },
    createdBy() {
      return this.board.createdBy._id
    },
    members() {
      const admin = JSON.parse(JSON.stringify(this.board.createdBy))
      const members = [this.board.createdBy]
      const board = JSON.parse(JSON.stringify(this.board))
      let boardMemberIds = []
      board.members.forEach((member) => {
        boardMemberIds.push(member._id)
      })
      if (!boardMemberIds.includes(this.board.createdBy._id)) {
        admin.isAdmin = true
        board.members.push(admin)
      }
      return board.members
    },
    menu() {
      return this.$store.getters.menu
    },
    loggedId() {
      return this.$store.getters.loggedUser._id
    },
    boardMemberIds() {
      return this.$store.getters.boardMemberIds
    },
  },
}
</script>
