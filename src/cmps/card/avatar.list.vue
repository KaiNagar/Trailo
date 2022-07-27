<template>
    <div class="avatars">
        <div v-for="member in members" :key="member._id" class="avatar" :style="{ backgroundColor: member.color }">
            {{ member.username.charAt(0) }}</div>
    </div>
</template>
 <script>
export default {
    name: 'ProjectApp',
    components: {},
    props: {
        card: Object
    },
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {
        members() {
            return this.card.members
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