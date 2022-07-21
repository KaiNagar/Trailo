<template>
  <section>
    <div
      :style="{ left: LabelsMenuX }"
      class="labels-menu"
    >
      <header>
        <h3>Labels</h3>
        <button class="close-label-menu" @click="isLabelMenuOpen = false">
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
          v-for="label in board.labels"
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
  </section>
</template>

<script>
export default {
  props: [],
  components: {},
  data() {
    return {}
  },
  methods: {
    labelSelected(labelId) {
      if (this.card.labelIds.includes(labelId)) return true
      else return false
    },
    setLabe(newLabel, isActive) {
      this.$emit('setLabel', (newLabel, isActive))
    },
  },
  computed: {},
  created() {},
  unmounted() {},
}
</script>

<style></style>
