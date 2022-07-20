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
    const { cardId } = this.$route.params
    let credentials = { ...this.$store.getters.cardLoc }
    credentials.cardId = cardId
    this.card = await boardService.getCardById(credentials)
  },
}
</script>
