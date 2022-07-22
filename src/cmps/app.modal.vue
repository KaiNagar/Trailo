<template>
    <section class="modal">
        <div class="m-header">
            <slot name="title">Title</slot>
            <button @click.stop="$emit('closeModal')">X</button>
        </div>

        <section class="content" v-for="(item, idx) in items" :key="idx" @click="$emit('openBoard', item._id)">
            <slot name="content-1"></slot>
        </section>

        <section class="m-actions">
            <slot name="attachments"></slot>
            <slot name="attach-link"></slot>
            <slot name="tip"></slot>
        </section>
    </section>


</template>
 <script>
export default {
    name: 'appModal',
    props: {
        newItems: Array,
    },
    components: {},
    data() {
        return {
            items: null
        };
    },
    created() {
        this.items = this.newItems
    },
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>