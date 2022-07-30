
<template>

    <div class="avatars" v-if="members">
        <div v-for="(member, idx) in members" :key="idx" class="avatar" :style="{ backgroundColor: member.color }">
            {{ member.username.charAt(0).toUpperCase() }}
            <div :class="{ admin: member.isAdmin || member._id === board.createdBy._id }"></div>
        </div>

    </div>

    <div class="avatars" v-else>
        <div v-for="(member, idx) in boardMembers" :key="idx" class="avatar" :style="{ backgroundColor: member.color }">
            {{ member.username.charAt(0).toUpperCase() }}
            <div :class="{ admin: member.isAdmin || member._id === board.createdBy._id }"></div>
        </div>

    </div>


</template>
 <script>
export default {
    name: 'ProjectApp',
    components: {},
    props: {
        card: Object,
        members: Array
        // members:Array
    },
    data() {
        return {};
    },
    created() {
        console.log(this.members);
    },
    methods: {},
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
        boardMembers() {
            const memeberIds = this.$store.getters.boardMemberIds
            const members = []
            this.users.filter((user) => {
                return memeberIds.forEach(memberId => {
                    if (memberId === user._id) {
                        members.unshift(user)
                    }
                })
            })

            return this.board.members || members
        },
    },
    unmounted() { },
};
</script>
 <style>
 </style>