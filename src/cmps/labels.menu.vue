<template>
  <section>
    <div class="action-btn-container">
      <button @click="openMenu('labels')">
        <span class="label-icon"></span>
        Labels
      </button>
    </div>

    <app-modal v-if="menu.labels" @closeModal="closeMenu">
      <template #title>Labels</template>
      <template #part-1>
        <input type="text" placeholder="Search labels..."
      /></template>

      <template #part-2>
        <h3>Labels</h3>
        <div v-for="label in labels" :key="label.id" class="labels">
          <div class="label" :style="{ 'background-color': label.hex }">
            <div class="icon edit"></div>

            <div class="pad">
              <div class="top"></div>
              <div class="bottom"></div>
            </div>
          </div>
        </div>
      </template>

      <template #part-3>
        <button>Create a new label</button>
      </template>
    </app-modal>
  </section>

  <!-- <section v-if="menu.labelso">
    <div class="labels-menu">
      <header>
        <h3>Labels</h3>
        <button class="close-label-menu" @click="$emit('closeLabelsMenu')">
          X
        </button>
      </header>
      <hr />
      <input type="text" placeholder="Search labels..." />
      <main>
        <h3>Labels</h3>
        <div
          class="board-label flex space-between align-center"
          @click="setLabel(label, labelSelected(label.id))"
          v-for="label in labels"
          :key="label.id"
          :style="labelColor(label.color)"
        >
          {{ label.title }}
          <span v-if="labelSelected(label.id)">V</span>
          <span>E</span>
        </div>
        <button class="create-label">Create a new label</button>
        <hr />
        <button disabled class="disabled-btn color-blind-btn">
          Enable color blind friendly mode
        </button>
      </main>
    </div>
  </section> -->
</template>

<script>
import appModal from './app.modal.vue'
export default {
  props: {
    card: Object,
  },
  components: {
    appModal,
  },
  data() {
    return {
      labels: [
        { title: '', id: this._makeId, hex: '#61bd4f' },
        { title: '', id: this._makeId, hex: '#ff9f1a' },
        { title: '', id: this._makeId, hex: '#eb5a46' },
        { title: '', id: this._makeId, hex: '#c377e0' },
        { title: '', id: this._makeId, hex: '#c377e0' },
        { title: '', id: this._makeId, hex: '#0079bf' },
        { title: '', id: this._makeId, hex: '#0079bf' },
        { title: '', id: this._makeId, hex: '#0079bf' },
        { title: '', id: this._makeId, hex: '#ff78cb' },
      ],
    }
  },
  methods: {
    labelColor(color) {
      return { backgroundColor: color }
    },
    labelSelected(labelId) {
      if (this.card.labelIds.includes(labelId)) return true
      else return false
    },
    setLabel(newLabel, active) {
      if (!active) {
        this.card.labelIds.push(newLabel.id)
      } else {
        const labelIdx = this.card.labelIds.findIndex(
          (id) => newLabel.id === id,
        )
        this.card.labelIds.splice(labelIdx, 1)
      }
      this.$emit('setLabel', this.card)
    },
    openMenu(menuAction) {
      this.$store.commit({ type: 'openMenu', menuAction })
    },
    closeMenu() {
      this.$store.commit({ type: 'closeMenu' })
    },
    _makeId(length = 8) {
      var text = ''
      var possible =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      return text
    },
  },
  computed: {
    menu() {
      return this.$store.getters.menu
    },
  },
  created() {
    // console.log(this.board);
  },
  unmounted() {},
}
</script>

<style></style>
