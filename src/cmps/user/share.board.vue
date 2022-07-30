<template>

    <section class="share-board" @click="closeMenu">

        <header>
            <div class="title">Share board</div>
            <div class="close-icon" @click="$emit('close')"></div>
        </header>

        <div class="search-container">
            <input @click.stop="openMenu('searchUser')" @input="filterUsers" class="input" type="search" placeholder="Email address or name"
              >
            <search-user v-if="menu.searchUser" ></search-user>
            <div class="select-menu">Member <span class="fa"></span></div>
        </div>

        <div class="wide btn ">Share</div>

        <ul>
            <li>
                <div class="icon fa copy-avatar"></div>
                <div class="content">
                    <div class="top">Anyone with the board share link</div>
                    <div class="bottom copy">Copy link</div>
                </div>
            </li>

            <li v-for="member in members" :key="member._id" >
                <div class="icon avatar">{{ member.username.slice(0, 1).toUpperCase() }}</div>
                <div class="content">
                    <div class="top">{{ member.username }}</div>
                    <div class="middle">{{ member.email }}</div>
                    <div class="bottom">Workspace {{ member.status || 'Admin' }}</div>
                </div>
                <div class="select-menu">Member <span class="fa"></span>
                <select>
                    <option value="member">Member</option>
                    <option value="admin">Admin</option>
                </select>
                <!-- <member-status></member-status> -->
                </div>

            </li>
        </ul>
    </section>

</template>
 <script>
import searchUser from './search.user.vue';
import memberStatus from './member.status.vue'
export default {
    name: 'ProjectApp',
    props: {
       
    },
    components: {
        searchUser,
        memberStatus,
    },
    data() {
        return {
            filteredUsers: []
        };
    },
    created() { },
    methods: {
        addMember(memberId){
            console.log(memberId);
        },
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
            board.members.forEach(member=>{
                boardMemberIds.push(member._id)
            })
            if(!boardMemberIds.includes(this.board.createdBy._id)){
                admin.isAdmin = true
                board.members.push(admin)
                
            }
            return board.members
        },
        menu() {
            return this.$store.getters.menu
        },

    },
    unmounted() { },
};
</script>
 <style>
 </style>