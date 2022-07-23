<template>
    <div class="action-btn-container">
        <button @click="openMenu('cover')">Cover

            <div class="cover-menu">
                <app-modal v-if="menu.cover" @closeModal="closeMenu">

                    <template #title>Cover</template>
                    <template #part-1>
                        <header>Size</header>
                        <div class="cover-image part">

                            <button :class="coverSize(false)" :style="setCoverSizeStyle" @click="setFullCover(false)">
                                <div class="liner black">
                                    <div class="first"></div>
                                    <div class="second"></div>
                                    <div class="circle"></div>
                                </div>
                            </button>



                            <button :class="coverSize(true)" :style="setCoverSizeStyle" @click="setFullCover(true)">
                                <div  class="liner ">
                                    <div class="first white"></div>
                                    <div class="second white"></div>
                                    <div class="circle white"></div>
                                </div>
                            </button>


                        </div>

                        <button class="remove-cover-btn" @click="removeCover">Remove cover</button>
                    </template>

                    <template #part-2>
                        <!-- <div v-if="card.style.isFull && card.style.bgImg" class="cover-color"> -->
                        <header>Text-color</header>
                        <div class="text-color part">
                            <div class="light">
                                <button :style="setCoverSizeStyle" @click="setCoverMode(false)"></button>
                                <span>white</span>
                                <div></div>
                            </div>

                            <div class="dark">
                                <button :style="setCoverSizeStyle" @click="setCoverMode(true)"></button>
                                <span>black</span>
                                <div></div>
                            </div>

                        </div>
                    </template>

                    <template #part-3>
                        <header>Colors</header>
                        <div class="colors part">
                            <button @click="setCoverColor(color)" :style="{ backgroundColor: color }"
                                class="cover-btn-pick-color" v-for="color in colors" :key="color"></button>
                        </div>
                    </template>

                    <template #part-4>
                        <div class="attachments part">
                            <header>Attachments</header>
                            <div v-if="card.attachments" class="attachments-images">
                                <button :style="{ backgroundImage: 'url(' + attachment.url + ')' }"
                                    @click="setCoverImg(attachment.url)" v-for="attachment in card.attachments"
                                    :key="attachment.id" class="set-attachment-cover"></button>

                            </div>

                            <div class="upload part">
                                <button>Upload a cover image</button>
                                <input @change="addFile" type="file">
                            </div>
                        </div>
                    </template>

                    <template #part-5>
                        <header>Photos from unsplash</header>
                        <div class="unsplash part">
                            <img v-for="(image, idx) in coverImgsUrls" :key="idx" :src="image">
                        </div>
                    </template>
                </app-modal>
<!-- 
                <section v-if="card.color">
                    <div class="menu-header">
                        <h1>Cover</h1>
                        <button @click="this.$emit('closeCoverMenu')">X</button>
                    </div>

                    <div class="cover-size">
                        <button :class="coverSize(false)" :style="setCoverSizeStyle" @click="setFullCover(false)">
                            half
                        </button>
                        <button :class="coverSize(true)" :style="setCoverSizeStyle" @click="setFullCover(true)">
                            full
                        </button>
                    </div>
                    <button class="remove-cover-btn" @click="removeCover">Remove cover</button>

                    <div v-if="card.style.isFull && card.style.bgImg" class="cover-color">
                        <button @click="setCoverMode(false)">white</button>
                        <button @click="setCoverMode(true)">black</button>
                    </div>


                    <div class="colors">
                        <button @click="setCoverColor(color)" :style="{ backgroundColor: color }"
                            class="cover-btn-pick-color" v-for="color in colors" :key="color"></button>
                    </div>


                    <div v-if="card.attachments" class="cover-attachments">
                        <button :style="{ backgroundImage: 'url(' + attachment.url + ')' }"
                            @click="setCoverImg(attachment.url)" v-for="attachment in card.attachments"
                            :key="attachment.id" class="set-attachment-cover"></button>
                    </div>


                    <button @click="setCoverImg(url)" :style="{ backgroundImage: 'url(' + url + ')' }"
                        class="cover-btn-pick-img" v-for="url in coverImgsUrls" :key="url"></button>

                </section> -->

            </div>
        </button>
    </div>
</template>



<script>
import appModal from './app.modal.vue'
export default {
    name: 'Covermenu',
    props: {
        card: Object,
    },
    components: {
        appModal,

    },
    data() {
        return {
            file: {},
            colors: [
                '#7BC86C',
                '#F5DD29',
                '#FFAF3F',
                '#EF7564',
                '#CD8DE5',
                '#5BA4CF',
                '#29CCE5',
                '#6DECA9',
                '#FF8ED4',
                '#172B4D',
            ],
            coverImgsUrls: [
                'https://images.unsplash.com/photo-1603955389958-8ab4c2025b71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                'https://images.unsplash.com/photo-1568043210943-0e8aac4b9734?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
                'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
                'https://images.unsplash.com/photo-1455218873509-8097305ee378?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fG5hdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
                'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
            ],
        }
    },
    methods: {
        setCoverColor(color) {
            this.card.style.bgImg = null
            this.card.style.bgColor = color
            this.isCoverOn = true
            this.$emit('setCoverColor', this.card)
        },
        setFullCover(isFull) {
            this.card.style.isFull = isFull
            this.$emit('setFullCover', this.card)
        },
        setCoverMode(isDarkMode) {
            this.card.style.isDarkMode = isDarkMode
            this.$emit('setCoverMode', this.card)
        },
        setCoverImg(url) {
            this.card.style.bgColor = null
            this.card.style.bgImg = url
            this.isCoverOn = true
            this.$emit('setCoverImg', this.card)
        },
        removeCover() {
            this.card.style = { isFull: false, bgColor: null, bgImg: null }
            this.$emit('removeCover', this.card)
        },
        coverSize(isFull) {
            return isFull ? 'cover-full' : 'cover-half'
        },

        openMenu(menuAction) {
            console.log();
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
            }
        },
        _makeFileObj(url) {
            this.file = { id: this._makeId(), title: 'new file', url }
            console.log(this.file);
            // this.$emit('attachFile', this.file)
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
        setCoverSizeStyle() {
            if (this.card.style.bgColor) {
                return { backgroundColor: this.card.style.bgColor }
            } else if (this.card.style.bgImg) {
                return { backgroundImage: 'url(' + this.card.style.bgImg + ')' }
            }

        },

        menu() {
            return this.$store.getters.menu
        }
    },
    created() {
    },
}
</script>
