<template>

    <div class="avatars">
        <div v-for="member in members" :key="member._id" class="avatar" :style="{ backgroundColor: member.color }">
            {{ member.username.charAt(0) }}</div>
        <button class="add avatar add-icon" @click="openMenu('previewMembers')"></button>
        <!-- MEMBERS MENU -->
        <menu-members 
        class="preview" v-if="menu.previewMembers" 
        :card="card"
        @closeModal="closeMenu"
        @sendToSave="$emit('sendToSave', $event)"
        @closeMenu="closeMenu"
        ></menu-members>
    </div>

</template>
 <script>
import menuMembers from './menu/menu.members.vue';
export default {
    name: 'ProjectApp',
    components: {
        menuMembers,
    },
    props: {
        card: Object
    },
    data() {
        return {};
    },
    created() { },
    methods: {
        openMenu(menuAction) {
            this.$store.commit({ type: 'openMenu', menuAction })
        },
        closeMenu() {
            this.$store.commit({ type: 'closeMenu' })
        },
    },
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
        menu() {
            return this.$store.getters.menu
        },

    },
    unmounted() { },
};
</script>
 <style>
 </style>