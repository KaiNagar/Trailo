<template>
  <div v-if="card" class="card-details-container">
    <section class="card-details">
      <router-link :to="'/board/' + board._id">X</router-link>
      <button>Cover</button>
      <h1>{{ card.title }}</h1>
      <p>in list____</p>
      <p>labels</p>
      <div v-for="label in labelsToShow" :key="label.id">
        <span :style="labelColor(label.color)">{{ label.title }}</span>
      </div>
      <button @click="onChecklist">+Checklist</button>
      <article v-for="(checklist, idx) in card.checklists" :key="idx">
        <action-checklist :checklist="checklist" />
      </article>
    </section>
  </div>
</template>

<script>
import actionChecklist from '../cmps/card/action.checklist.vue'

export default {
  name: 'cardDetails',
  components: { actionChecklist },
  data() {
    return {
      board: null,
      card: {},
    }
  },
  methods: {
    labelColor(color) {
      return { backgroundColor: color }
    },
  },
  computed: {
    labelsToShow() {
      let labelsToShow = []
      this.board.labels.filter((boardLabel) => {
        this.card.labelIds.forEach((id) => {
          if (id === boardLabel.id) labelsToShow.push(boardLabel)
        })
      })
      return labelsToShow
    },
  },
  created() {
    const { cardId, groupId, boardId } = this.$route.params
    const currBoard = this.$store.getters.boards.find(
      (board) => board._id === boardId,
    )
    this.board = currBoard
    const currGroup = currBoard.groups.find((group) => group.id === groupId)
    const currCard = currGroup.cards.find((card) => card.id === cardId)
    this.card = currCard
  },
}
</script>
