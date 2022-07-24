<template>
    <section class="side-menu">
        <ul>
            <li class="active"> <span class="icon boards"></span> Boards</li>
            <li> <span class="icon home"></span> Home</li>
        </ul>

        <div class="workspaces">
            <div class="header">
                <header>workspaces</header>
                <button class="add-icon"></button>
            </div>

            <ul>
                <li>Work-1 <span class="open-icon"></span></li>
                <li>sprint 4 <span class="open-icon"></span></li>
                <li>your life sucks <span class="open-icon"></span></li>
            </ul>
        </div>
    </section>
</template>
 <script>
export default {
    name: 'ProjectApp',
    components: {},
    data() {
        return {
           
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