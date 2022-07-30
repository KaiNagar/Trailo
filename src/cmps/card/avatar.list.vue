
<template>
    <div class="avatars">
        <div v-for="member in members" :key="member._id" class="avatar" :style="{ backgroundColor: member.color }">
            {{ member.username.charAt(0).toUpperCase() }}
            <div :class="{ admin: member.isAdmin}"></div>
        </div>

    </div>
</template>
 <script>
export default {
    name: 'ProjectApp',
    components: {},
    props: {
        card: Object,
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
        members() {
            const memeberIds = this.$store.getters.boardMemberIds 
            const members = [] 
            this.users.filter(user =>{
               return memeberIds.forEach(memberId =>{
                    if (memberId === user._id){
                        members.push(user)
                    }
                })
            })
            
            return members
        },
    },
    unmounted() { },
};
</script>
 <style>
 </style>