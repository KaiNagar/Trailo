<template>
  <section class="attachments-preview">
    <div class="attch-preview-body flex">
      <div
        :style="{
          backgroundImage: 'url(' + file.url + ')',
        }"
        class="img"
      ></div>
      <div>
        <div class="attach-title">{{ file.title }}.jpg <span class="arrow">↗</span></div>

        <div class="actions preview">
          <span>Added {{ createdAtFormat }}</span> - <span class="action">Comment</span> -
          <span class="action" @click="setFileToDelete(file)"
            >Delete
            <!-- DELETE MODAL -->
            <app-modal v-if="menu.deleteAttachment" @closeModal="closeMenu">
              <template #title> Delete attachment?</template>
              <template #part-1>
                <div class="warning">
                  There is no undo. This will remove this label from all cards and destroy its
                  history.
                </div>
                <button @click="removeAttachment" class="delete wide btn">Delete</button>
              </template>
            </app-modal>
          </span>
          -
          <span @click="openMenu('edit')" class="action"
            >Edit
            <app-modal @closeModal="closeMenu" v-if="menu.edit && file.isEdit">
              <template #title>Edit attachment</template>
              <template #part-1>
                <div class="edit-menu">
                  <header>Link name</header>
                  <input class="input" type="text" v-model="file.title" />
                  <button @click="update">Update</button>
                </div>
              </template>
            </app-modal>
          </span>
        </div>
        <div class="toggle-cover flex align-center">
          <span class="cover-icon"></span>
          <span class="action" @click="makeOrRemove(file)"> {{ toggleCover }}</span>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import moment from 'moment'
import appModal from '../app.modal.vue'
import menuAttachments from './menu.attachments.vue'
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
    return {
      fileToDelete: null,
    }
  },
  created() {
    this.file.isEdit = false
    this.file.createdAt = Date.now() - 1000 * 60 * 4
  },
  methods: {
    setFileToDelete(file) {
      this.fileToDelete = file
      this.openMenu('deleteAttachment')
    },
    removeAttachment() {
      this.$emit('removeAttachment', this.fileToDelete.id)
    },
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
      return this.card.style.bgImg === this.file.url ? 'Remove cover' : 'Make cover'
    },
    createdAtFormat() {
      const byMinutes = Math.floor(this.file.createdAt / 1000 / 60) % 60
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
    },
  },
}
</script>
<style>
</style>
