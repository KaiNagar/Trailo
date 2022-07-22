<template>
  <section class="card-preview">
    <div
      v-if="card.style.bgColor || card.style.bgImg"
      class="card-preview-cover"
    >
      <div :class="showCardCoverClass" :style="showCardCover"></div>
    </div>
    <div class="card-preview-details">
      <div class="card-preview-labels">
        <span
          class="label-preview"
          @click.stop="toggleLabels"
          v-for="label in cardLabels"
          :style="{ backgroundColor: label.color }"
          :key="label.id"
          >{{ this.board.labelsOpen ? label.title : '' }}</span
        >
      </div>
      <div class="card-title">
        <span>{{ card.title }}</span>
      </div>

      <div
        :class="isTodosDone"
        v-if="card.checklists"
        class="card-checklist-count flex"
      >
        <img
          src="https://cdn-icons.flaticon.com/png/512/2440/premium/2440972.png?token=exp=1658390307~hmac=3f013390315ecbdaec4f9d1514b8ec42"
          alt=""
        />
        <span :class="isTodosDone">{{ checklistCount }}</span>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'cardPreview',
  props: {
    card: Object,
  },
  components: {},
  data() {
    return {
      board: null,
      group: null,
      isLabelsOpen: this.$store.getters.isLabelsOpen,
    }
  },
  methods: {
    toggleLabels() {
      const newBoard = { ...this.board }
      this.isLabelsOpen = !this.isLabelsOpen

      this.$store.commit({
        type: 'setIsLabelsOpen',
        isLabelsOpen: this.isLabelsOpen,
      })

      newBoard.labelsOpen = this.isLabelsOpen
      this.$store.dispatch({ type: 'saveBoard', board: newBoard })
    },
  },
  computed: {
    showCardCover() {
      if (this.card.style.bgImg)
        return { backgroundImage: 'url(' + this.card.style.bgImg + ')' }
      return { backgroundColor: this.card.style.bgColor }
    },
    showCardCoverClass() {
      if (this.card.style.bgImg) return 'card-img'
      return 'card-color'
    },
    checklistCount() {
      const allTodos = this.card.checklists.reduce((acc, checklist) => {
        return acc + checklist.todos.length
      }, 0)
      if (allTodos === 0) return
      let dones = 0
      this.card.checklists.filter((checklist) => {
        dones += checklist.todos.filter((todo) => todo.isDone === true).length
      })
      return `${dones}/${allTodos}`
    },
    isTodosDone() {
      const allTodos = this.card.checklists.reduce((acc, checklist) => {
        return acc + checklist.todos.length
      }, 0)
      let dones = 0
      this.card.checklists.filter((checklist) => {
        dones += checklist.todos.filter((todo) => todo.isDone === true).length
      })
      if (allTodos === dones && allTodos !== 0) {
        return 'all-todos-done'
      }
    },
    cardLabels() {
      const labels = this.board.labels
      const labelsToShow = labels.filter((label) =>
        this.card.labelIds.includes(label.id),
      )
      return labelsToShow
    },
    labelsStatus() {
      return this.isLabelsOpen ? true : false
    },
  },
  created() {
    this.board = this.$store.getters.currBoard
    this.group = this.$store.getters.currGroup
    this.isLabelsOpen = this.board.labelsOpen
  },
}
</script>

<style></style>
