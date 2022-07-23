<template>
  <section>
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
  </section>
</template>

<script>
export default {
  props: {
    labels: Array,
    card: Object,
  },
  components: {},
  data() {
    return {}
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
  },
  computed: {},
  created() {},
  unmounted() {},
}
</script>

<style></style>
