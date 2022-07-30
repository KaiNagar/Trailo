<template>

    <div class="avatars">
        <div v-for="(member, idx) in members" :key="idx" class="avatar" :style="{ backgroundColor: member.color }">
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
    },
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {
        members(){
            return this.card.members
        }
    },
    unmounted() { },
};
</script>
 <style>
 </style>