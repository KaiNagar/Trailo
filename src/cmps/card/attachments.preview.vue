<template>
  <section class="attachments-preview">


    <div class="attch-preview-body flex">
      <div :style="{
        backgroundImage: 'url(' + file.url + ')',
      }" class="img"></div>
      <div>
        <div class="attach-title">
          {{ file.title }}.jpg <span class="arrow">↗</span>
        </div>

        <div>
          <div class="actions">
            <span>{{ createdAtFormat }}</span>
            <span class="action">Comment</span> -
            <span class="action">Delete</span> -
            <span @click="openMenu('edit')" class="action">Edit
              <app-modal @closeModal="closeMenu" v-if="menu.edit && file.isEdit">
                <template #title>Edit attachment</template>
                <template #part-1>{{ attachment }}</template>
              </app-modal>
            </span>
          </div>
          <span>IMG<span class="action" @click="makeOrRemove(file)">
              {{ toggleCover }}</span></span>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import moment from 'moment'
import appModal from '../app.modal.vue'
export default {
  name: 'ProjectApp',
  props: {
    file: Object,
    card: Object,
  },
  components: {
    appModal,
  },
  data() {
    return {}
  },
  created() {
    this.file.createdAt = (Date.now() - 1000 * 60 * 4)
  },
  methods: {
    openMenu(menuAction) {
      this.file.isEdit = true
      console.log(this.file);
      const editId = this.file.id
      // const attached = this.card.attachments.find(attachment => {
      //   if (attachment.id === this.file.id) {
      //     console.log(this.file);
      //   }
      //   return attachment.id === this.file.id
      // })
      // if (!this.file.id === attached.id) return
      // console.log(editId);
      this.$store.commit({ type: 'openMenu', menuAction })
    },
    closeMenu() {
      this.$store.commit({ type: 'closeMenu' })
    },
    makeCover(file) {
      this.$emit('makeFileCover', file)
    },
    makeOrRemove(file) {
      if (this.card.style.bgImg === this.file.url) {
        this.card.style = { bgImg: null, bgColor: null, isFull: false }
      } else this.card.style.bgImg = file.url
      this.$emit('makeOrRemove', this.card)
    },

  },
  computed: {
    toggleCover() {
      return this.card.style.bgImg === this.file.url
        ? 'Remove cover'
        : 'Make cover'
    },
    createdAtFormat() {
      const byMinutes = Math.floor(this.file.createdAt / 1000 / 60) % 60
      // console.log(moment(this.file.createdAt).fromNow());
      return moment(this.file.createdAt).fromNow()
    },
    menu() {
      return this.$store.getters.menu
    },
    edit() {
      return this.$store.getters.edit
    },
    currEdit() {
      const editId = this.file.id
      return this.$store.getters.edit[editId]
    }
  },
  unmounted() { },
}
</script>
<style>
</style>
