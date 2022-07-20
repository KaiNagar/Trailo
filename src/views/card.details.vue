<template>
  <div v-if="card" class="card-details-container">
    <section class="card-details flex space-between">
      <div>
        <router-link :to="'/board/' + board._id">X</router-link>
        <!-- <button>Cover</button> -->
        <h1>{{ card.title }}</h1>
        <p>in list____</p>
        <p>labels</p>
        <div v-for="label in labelsToShow" :key="label.id">
          <span :style="labelColor(label.color)">{{ label.title }}</span>
        </div>
        <button @click="labelMenu = !labelMenu">+</button>
        <div v-if="labelMenu" class="label-menu">
          <span
            @click="addLabel(label)"
            :style="labelColor(label.color)"
            v-for="label in board.labels"
            :key="label.id"
          >
            {{ label.title }}</span
          >
        </div>
      </div>
      <div>
        <card-actions />
      </div>

      <!-- <button @click="onChecklist">+Checklist</button>

      <article v-for="(checklist, idx) in card.checklists" :key="idx">
        <action-checklist :checklist="checklist" />
      </article> -->
    </section>
  </div>
</template>

<script>
import actionChecklist from '../cmps/card/action.checklist.vue'
import cardActions from '../cmps/card/card.actions.vue'

export default {
  name: 'cardDetails',
  components: { actionChecklist, cardActions },
  data() {
    return {
      board: null,
      group: null,
      card: null,
      labelMenu: false,
    }
  },
  methods: {
    labelColor(color) {
      return { backgroundColor: color }
    },
    addLabel(newLabel) {
      this.card.labelIds.push(newLabel.id)
      const cardIdx = this.group.cards.findIndex(
        (card) => card.id === this.card.id,
      )
      const groupIdx = this.board.groups.findIndex(
        (group) => group.id === this.group.id,
      )
      this.board.groups[groupIdx].cards[cardIdx] = this.card
      this.$store.dispatch({
        type: 'saveBoard',
        board: JSON.parse(JSON.stringify(this.board)),
      })
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
    this.board = JSON.parse(JSON.stringify(currBoard))
    const currGroup = currBoard.groups.find((group) => group.id === groupId)
    this.group = JSON.parse(JSON.stringify(currGroup))
    const currCard = currGroup.cards.find((card) => card.id === cardId)
    this.card = JSON.parse(JSON.stringify(currCard))
  },
}
</script>
