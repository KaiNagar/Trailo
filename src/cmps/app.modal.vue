<template>
    <section class="modal">
        <div class="m-header">
            <span>
                <slot name="title">Title</slot>
            </span>
            <button>X</button>

        </div>
    </section>


</template>
 <script>
export default {
    name: 'appModal',
    components: {},
    data() {
        return {};
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>