
<template>
    <div class="avatars">
        <div v-for="member in members" :key="member._id" class="avatar" :style="{ backgroundColor: member.color }">
            {{ member.username.charAt(0).toUpperCase() }}
            <div :class="{ admin: createdBy === member._id }"></div>
        </div>

    </div>
</template>
 <script>
export default {
    name: 'ProjectApp',
    components: {},
    props: {
        card: Object,
    },
    data() {
        return {};
    },
    created() {
        console.log(this.users);
    },
    methods: {},
    computed: {

        // avatarStr() {
        //     let avatarStr = ''
        //     this.members.forEach(member => {
        //         member.username.split(' ').forEach(memberName => {
        //             avatarStr += memberName.charAt(0)
        //         })
        //     })
        //     return avatarStr
        // },
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
            const members = [this.board.createdBy]
            return members
        },
    },
    unmounted() { },
};
</script>
 <style>
 </style>