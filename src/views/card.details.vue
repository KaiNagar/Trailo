<template>
  <div class="card-details-container">
    <section class="card-details">
      <button>Cover</button>
      <h1>{{ card.title }}</h1>
      <p>in list____</p>
      <p>labels</p>
      <div>{{ labelsToShow }}</div>
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
    onChecklist() {},
  },
  computed: {
    currBoard() {
      return this.$store.getters.currBoard
    },
    labelsToShow() {
      return this.currBoard?.labels.filter((label) => this.card.labelIds.includes(label.id))
    },
  },
  async created() {
    const { cardId, groupId } = this.$route.params
    const currGroup = this.currBoard.groups.find((group) => group.id === groupId)
    const currCard = currGroup.cards.find((card) => card.id === cardId)
    this.card = currCard
  },
}
</script>
