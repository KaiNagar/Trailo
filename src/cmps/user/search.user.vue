<template>
    <section class="search-user">
        <ul>

            <li v-for="user in users" :key="user._id" @click="addMember(user)">
                <div class="icon avatar" :style="{ backgroundImage: `url(${user.avatar.imgUrl})` }"></div>
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
            const updatedUser = JSON.parse(JSON.stringify(user))
            this.$emit('addmember', updatedUser)   
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