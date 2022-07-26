<template>
  <section class="card-actions flex column">
    <div class="suggested-tab">
      <h3>Suggested <span class="settings-icon"></span></h3>
      <div class="action-btn-container">
        <button><span class="member-icon"></span> Join</button>
      </div>
    </div>
    <div class="add-card-tab">
      <h3>Add to card</h3>
      <div class="action-btn-container">
        <button @click="openMenu('members')"><span class="member-icon"></span> Members</button>
        <!-- MEMBERS MENU  -->
        <menu-members @sendToSave="$emit('sendToSave', $event)" :card="card" v-if="menu.members" @closeMenu="closeMenu">
        </menu-members>
      </div>
      <div @click="$emit('openChecklistMenu')" class="action-btn-container">
        <button><span class="checklist-icon"></span> Checklist</button>
      </div>
      <div class="action-btn-container">
        <button>
          <img src="../../assets/icons/icons-clock.png" alt="Date icon" />
          Dates
        </button>
      </div>
      <div class="action-btn-container"></div>
      <div @click="$emit('openCoverMenu')" v-if="!isCoverOn" class="action-btn-container">
        <button><span class="cover-icon"></span> Cover</button>
      </div>



      <div class="action-btn-container">
        <button @click="openMenu('labels')">
          <span class="label-icon"></span>
          Labels
        </button>

        <menu-labels v-if="!previewMenuOpen" @closeMenu="closeMenu" @setLabel="$emit('setLabel', $event)"
          @createLabel="$emit('createLabel', $event)" :card="card"></menu-labels>
      </div>



      <menu-attachments @attachFile="attachFile" />
      <div class="action-btn-container">
        <button @click="openMenu('cover')" v-if="!isCover">
          Cover
          <menu-cover v-if="!previewMenuOpen" @setCoverColor="$emit('setCoverColor', $event)"
            @setFullCover="$emit('setFullCover', $event)" @setCoverMode="$emit('setCoverMode', $event)"
            @setCoverImg="$emit('setCoverImg', $event)" @removeCover="$emit('removeCover', $event)"
            @attachFile="$emit('attachFile', $event)" :card="card" />
        </button>
      </div>

      <div class="action-btn-container">
        <button disabled>
          <span class="custom-icon"></span> Custom Fields
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import appModal from '../app.modal.vue'
import menuAttachments from './action.attachments.vue'
import menuCover from '../menu.cover.vue'
import menuLabels from '../labels.menu.vue'
import menuMembers from '../menu/menu.members.vue'
export default {
  name: 'cardActions',
  components: {
    appModal,
    menuAttachments,
    menuCover,
    menuLabels,
    menuMembers,
  },
  props: {
    isCoverOn: Boolean,
    card: Object,
  },
  data() {
    return {}
  },
  methods: {
    attachFile(file) {
      this.$emit('attachFile', file)
    },
    openMenu(menuAction) {
      console.log(menuAction);
      this.colorIdx = 0
      this.$store.commit({ type: 'openMenu', menuAction })
      // this.$store.commit({ type: 'openMenu', menuAction:'labels' })
      this.$store.commit({ type: 'setPreviewMenuStatus', status: false })
    },
    closeMenu() {
      this.$store.commit({ type: 'closeMenu' })
    },
  },
  computed: {
    menu() {
      return this.$store.getters.menu
    },
    previewMenuOpen() {
      return this.$store.getters.previewMenuStatus
    },
    isCover() {
      return this.$store.getters.isCover
    },
  },
  created() { },
}
</script>
