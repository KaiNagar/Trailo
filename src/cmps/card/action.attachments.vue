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
                    <form @submit.prevent="readLink" class="link-box">
                        <span class="link">Attach a link</span>
                        <input v-model="url" type="url">
                        <button>Attach</button>
                    </form>
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
        async addFile(ev) {
            let formData = new FormData();
            let photo = ev.target.files[0]

            formData.append("photo", photo);

            const ctrl = new AbortController()    // timeout
            setTimeout(() => ctrl.abort(), 5000);

            try {
                let imgUrl = await fetch('/upload/image',
                    { method: "POST", body: formData, signal: ctrl.signal });
                console.log('HTTP response code:', imgUrl.url);
                this.file = { id: this._makeId(), title: 'new file', url: imgUrl.url }
                console.log(this.file);
            } catch (e) {
                console.log('Huston we have problem...:', e);
            }
            this.closeMenu()
        },
        readLink(ev) {
            const url = this.url
            this.file = { id: this._makeId(), title: 'new file', url }
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