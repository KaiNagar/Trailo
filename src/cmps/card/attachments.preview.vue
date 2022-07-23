<template>
    <section class="attachments-preview" >
        <img class="details-icon" src="../../styles/svgs/fa/solid/paperclip.svg">
        <header>
            <span>Attachments</span>
        </header>

        <div class="body">
            <img src="">
            <!-- <div>{{ file.name }}</div> -->
            <div> THIS IS URL NAME</div>

            <div class="actions">
                <span>Added 5 minutes ago - </span>
                <span class="action">Comment</span>
                <span class="action">Delete</span>
                <span class="action">Edit</span>
            </div>
            <footer><span class="action">Make cover</span></footer>
        </div>

    </section>
</template>
 <script>
export default {
    name: 'ProjectApp',
    props: {
        file: Object
    },
    components: {},
    data() {
        return {
            files: []
        };
    },
    created() { },
    methods: {},
    computed: {},
    unmounted() { },
};
</script>
 <style>
 </style>