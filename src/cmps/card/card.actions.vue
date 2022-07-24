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
        <button><span class="member-icon"></span> Members</button>
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
      <div
        @click="$emit('openCoverMenu')"
        v-if="!isCoverOn"
        class="action-btn-container"
      >
        <button><span class="cover-icon"></span> Cover</button>
      </div>

      <menu-labels
        @setLabel="$emit('setLabel', $event)"
        :card="card"
      ></menu-labels>
      <menu-attachments @attachFile="attachFile" />

      <menu-cover
        @setCoverColor="$emit('setCoverColor', $event)"
        @setFullCover="$emit('setFullCover', $event)"
        @setCoverMode="$emit('setCoverMode', $event)"
        @setCoverImg="$emit('setCoverImg', $event)"
        @removeCover="$emit('removeCover', $event)"
        @attachFile="$emit('attachFile', $event)"
        :card="card"
      />

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
export default {
  name: 'cardActions',
  components: {
    appModal,
    menuAttachments,
    menuCover,
    menuLabels,
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
  },
  computed: {},
  created() {},
}
</script>
