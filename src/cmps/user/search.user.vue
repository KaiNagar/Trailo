<template>
    <section class="search-user">
        <ul>

            <li v-for="user in users" :key="user._id" @click="addMember(user)">
                <div class="icon avatar">{{ user.username.slice(0, 1).toUpperCase() }}</div>
                <div class="content">
                    <div class="top">{{ user.username }}</div>
                    <div class="bottom">Hasn't logged in recently</div>
                </div>
            </li>
        </ul>
    </section>

</template>
 <script>
export default {
    name: 'ProjectApp',
    props: {

    },
    components: {},
    data() {
        return {
            userSearch: '',
            
        };
    },
    created() {

    },
    methods: {
        addMember(user) {
            console.log(this.board.members);
            const newBoard = JSON.parse(JSON.stringify(this.board))
            const updatedUser = JSON.parse(JSON.stringify(user))
            updatedUser.isAdmin = false
            if (!newBoard.members.length || !newBoard.members) newBoard.members = []
            newBoard.members.push(updatedUser)
            this.$store.commit({ type: 'setBoardMembersIds', board : newBoard , loggedUser :updatedUser })
            this.$store.dispatch({ type: 'saveBoard', board: newBoard })
        },
    },
    computed: {
        users() {
            return this.$store.getters.filteredUsers || this.$store.getters.users
        },
        board() {
            return this.$store.getters.currBoard
        }
    },
    unmounted() { },

};
</script>
 <style>
 </style>