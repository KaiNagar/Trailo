<template>

    <section>

        <div class="action-btn-container attachments-btn">

            <button @click.stop="openMenu('attachments')">
                <span class="attach-icon"></span> Attachments
                <app-modal @closeModal="closeMenu" v-if="menu.attachments">
                    <template #title>Attachments</template>
                    <template #part-1>
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

                    <template #part-2>
                        <form @submit.prevent="readLink" class="link-box">
                            <span class="link">Attach a link</span>
                            <input class="input" v-model="url" type="url">
                            <button>Attach</button>
                        </form>
                    </template>

                    <template #part-3>
                        <p>Tip: You can drag and drop files and links onto cards to upload them.</p>
                    </template>
                </app-modal>
            </button>
        </div>
    </section>
</template>
 <script>
import appModal from '../app.modal.vue'
export default {
    name: 'ProjectApp',
    emits: ['attachFile'],
   
    components: {
        appModal,
    },
    data() {
        return {
            url: null,
            file: {}


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
            var file = ev.target.files[0]
            var fReader = new FileReader()
            fReader.readAsDataURL(file)
            fReader.onloadend = (event) => {
                this._makeFileObj(event.target.result)
                this.closeMenu()
            }
        },
        _makeFileObj(url) {
            this.file = { id: this._makeId(), title: 'new file', url }
            this.$emit('attachFile', this.file)
        },
        readLink() {
            const url = this.url
            this._makeFileObj(url)
            this.closeMenu()
        },
        _makeId(length = 8) {
            var text = ''
            var possible =
                'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
            for (var i = 0; i < length; i++) {
                text += possible.charAt(Math.floor(Math.random() * possible.length))
            }
            return text
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