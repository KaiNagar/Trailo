<template  >
    <div @click="toggleMember(member)" class="member" >
        <div class="avatar" :style="{ backgroundColor: member.color }">{{ member.username.charAt(0) }}</div>
        <div class="member-name">
            <span>{{ member.username }}</span>
            <span> ({{ member.username.split(' ').join('').slice(0, 15) }})</span>
        </div>
    </div>
    <div :class="{ 'check-icon': ids.includes(member._id) }"></div>
</template>
 <script>
export default {
    name: 'ProjectApp',
    emits: ['togglemember'],
    props: {
        member: Object,
        card: Object,
    },
    components: {},
    data() {
        return {
            lookedMemberId: null,
        };
    },
    created() {
    },
    methods: {
        toggleMember(member) {
            this.$emit('togglemember', member._id)
            
            this.$store.commit({ type: 'setCardMembersIds', card: this.card })
            // this.isCardMember(member)
        },
        isCardMember(member) {
            return this.ids.includes(member._id)
        },

    },
    computed: {
        isOnCard() {
            return this.ids.includes(this.lookedMemberId)

        },
        setIds() {
            const ids = []

            this.card.members.forEach(member => {
                ids.push(member._id)
            })
            return ids
        },
        ids(){
            return this.$store.getters.cardMemberIds
        }
     
    },
    unmounted() { },

};
</script>
 <style>
 </style>