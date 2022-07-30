<template>
  <section class="card-actions flex column">
    <div class="suggested-tab">
      <h3>Suggested</h3>
      <div class="action-btn-container">
        <button>
          <span class="member-icon"></span><span class="txt">Join</span>
        </button>
      </div>
    </div>
    <div class="add-card-tab">
      <h3 class="add-to-card">Add to card</h3>
      <div class="action-btn-container">
        <button @click="openMenu('members')">
          <span class="member-icon"></span> <span class="txt">Members</span>
        </button>
        <!-- MEMBERS MENU  -->
        <menu-members
          v-if="menu.members"
          :card="card"
          @sendToSave="$emit('sendToSave', $event)"
          @closeMenu="closeMenu"
        >
        </menu-members>
      </div>
      <div class="action-btn-container">
        <button @click="openMenu('labels')">
          <span class="label-icon"></span>
          <span class="txt">Labels</span>
        </button>

        <menu-labels
          v-if="!previewMenuOpen"
          @closeMenu="closeMenu"
          @setLabel="$emit('setLabel', $event)"
          @createLabel="$emit('createLabel', $event)"
          :card="card"
        ></menu-labels>
      </div>
      <div @click="$emit('openChecklistMenu')" class="action-btn-container">
        <button>
          <span class="checklist-icon"></span><span class="txt">Checklist</span>
        </button>
      </div>
      <div class="action-btn-container">
        <button @click="openMenu('dates')">
          <img src="../../assets/icons/icons-clock.png" alt="Date icon" />
          <span class="txt">Dates</span>
        </button>
        <menu-date
          @removeDate="$emit('removeDate')"
          @setDate="$emit('setDate', $event)"
        />
      </div>
      <div class="action-btn-container"></div>
      <!-- <div
        @click="openMenu('cover')"
        v-if="!isCover"
        class="action-btn-container"
      >
        <button><span class="cover-icon"></span> Cover</button>
      </div> -->

      <menu-attachments @attachFile="attachFile" />

      <div class="action-btn-container">
        <button @click="openMenu('cover')" v-if="!isCover">
          <span class="cover-icon"></span><span class="txt">Cover</span>
          <menu-cover
            v-if="!previewMenuOpen"
            @setCoverColor="$emit('setCoverColor', $event)"
            @setFullCover="$emit('setFullCover', $event)"
            @setCoverMode="$emit('setCoverMode', $event)"
            @setCoverImg="$emit('setCoverImg', $event)"
            @removeCover="$emit('removeCover', $event)"
            @attachFile="$emit('attachFile', $event)"
            :card="card"
          />
        </button>
      </div>

      <div class="removing action-btn-container">
        <button v-if="!archiving" @click="archiving = true">
          <span class="archive-icon"></span>
          <span class="txt" >Archive</span>
        </button>
        <button @click="archiving = false" v-if="archiving">
          <span class="refresh-icon"></span>
          <span class="txt">Back</span>
        </button>
        <button
          class="removing-btn"
          @click="openMenu('removeCard')"
          v-if="archiving"
        >
          <span class="remove-icon"></span>
          <span class="txt">Delete</span>
          <app-modal class="removing-card-modal" v-if="menu.removeCard" @closeModal="closeMenu">
            <template #title>Delete card?</template>
            <template #part-1>
              <p class="remove-txt">
                All actions will be removed from the activity feed and you won't
                be able to re-open the card.There is no undo.
              </p>
              <button class="final-remove" @click="removeCard">Delete</button>
            </template>
          </app-modal>
        </button>
      </div>
    </div>
  </section>
</template>

<script>
import appModal from '../app.modal.vue'
import menuAttachments from './menu.attachments.vue'
import menuCover from '../menu.cover.vue'
import menuLabels from '../labels.menu.vue'
import AppModal from '../app.modal.vue'
import menuDate from './menu.date.vue'
import menuMembers from '../menu/menu.members.vue'
export default {
  name: 'cardActions',
  components: {
    appModal,
    menuAttachments,
    menuCover,
    menuLabels,
    menuDate,
    AppModal,
    menuMembers,
  },
  props: {
    isCoverOn: Boolean,
    card: Object,
  },
  data() {
    return {
      openDateMenu: false,
      archiving: false,
    }
  },
  methods: {
    removeCard() {
      this.archiving = false
      this.$emit('removeCard', this.card)
    },
    attachFile(file) {
      this.$emit('attachFile', file)
    },
    openMenu(menuAction) {
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
  created() {},
}
</script>
