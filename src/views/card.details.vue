<template>
  <!-- <div class="screen"></div> -->
  <section class="card-details">
    <button>Cover</button>
    <h1>{{ card.title }}</h1>
    <p>in list____</p>
    <p>labels</p>
    <div>hi</div>
  </section>
</template>

<script>
import { boardService } from '../services/board.service'

export default {
  name: 'cardDetails',
  components: {},
  data() {
    return {
      card: {},
    }
  },
  methods: {
    boardLabels() {
      console.log('label')
    },
  },
  computed: {},
  async created() {
    const { boardId, cardId, groupId } = this.$route.params
    const currBoard = await boardService.getById(boardId)
    const currGroup = currBoard.groups.find((group) => group.id === groupId)
    const currCard = currGroup.cards.find((card) => card.id === cardId)
    this.card = currCard
  },
}
</script>
