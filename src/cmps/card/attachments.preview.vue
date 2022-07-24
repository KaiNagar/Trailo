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


        <div class="actions">
          <span>{{ createdAtFormat }}</span>
          <span class="action">Comment</span> -
          <span class="action" @click="$emit('removeAttachment', file.id)">Delete</span> -
          <span @click="openMenu('edit')" class="action">Edit
            <app-modal @closeModal="closeMenu" v-if="menu.edit && file.isEdit">

              <template #title>Edit attachment</template>
              <template #part-1>
                <div class="edit-menu">
                  <header>Link name</header>
                  <input class="name" type="text" v-model="file.title">
                  <button @click="update">Update</button>
                </div>
              </template>

            </app-modal>
          </span>
        </div>
        <span>IMG<span class="action" @click="makeOrRemove(file)">
            {{ toggleCover }}</span></span>
      </div>


    </div>
  </section>
</template>
<script>
import moment from 'moment'
import appModal from '../app.modal.vue'
import menuAttachments from '../card/action.attachments.vue'
export default {
  name: 'ProjectApp',
  props: {
    file: Object,
    card: Object,
  },
  components: {
    appModal,
    menuAttachments,
  },
  data() {
    return {}
  },
  created() {
    this.file.isEdit = false
    this.file.createdAt = (Date.now() - 1000 * 60 * 4)
  },
  methods: {
    openMenu(menuAction) {
      this.$emit('setEditMenu')
      this.file.isEdit = true
      const editId = this.file.id
      this.$store.commit({ type: 'openMenu', menuAction })
    },
    closeMenu() {
      this.file.isEdit = false
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
    update() {
      this.$emit('updateAttachment', this.file)
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
