<template>
    <div class="action-btn-container">

        <button @click.stop="openMenu('attachments')"> Attachments
            <app-modal @closeModal="closeMenu" v-if="menu.attachments">
                <template #title>Attachments</template>
                <template #attachments>
                    <ul>
                        <div class="computer">
                            <li class="cmp">Computer</li>
                            <input @change="addFile" type="file">
                        </div>
                        <li>Trello</li>
                        <li>Google Drive</li>
                        <li>Dropbox</li>
                        <li>Box</li>
                        <li>OneDrive</li>
                    </ul>
                </template>

                <template #attach-link>
                    <div class="link-box">
                        <span class="link">Attach a link</span>
                        <input type="text">
                    </div>
                    <button>Attach</button>
                </template>

                <template #tip>
                    <p>Tip: You can drag and drop files and links onto cards to upload them.</p>
                </template>
            </app-modal>
        </button>
    </div>
</template>
 <script>
import appModal from '../app.modal.vue'
export default {
    name: 'ProjectApp',
    components: {
        appModal,
    },
    data() {
        return {
            file: {
                computer: null
            }
        };
    },
    created() {

    },
    methods: {
        openMenu(menuAction) {
            this.$store.commit({ type: 'openMenu', menuAction })
        },
        closeMenu() {
            this.$store.commit({ type: 'closeMenu' })
        },
        addFile(ev) {
            if (!ev.target.files.length) return
            const attachedFile = ev.target.files[0]
        }
    },
    computed: {
        menu() {
            return this.$store.getters.menu
        }
    },
    unmounted() { },
};
</script>
 <style>
 </style>