<template>
  <section>
    <h1>Card details</h1>
    c:{{ card }}
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
  methods: {},
  computed: {},
  async created() {
    const { cardId } = this.$route.params
    let credentials = { ...this.$store.getters.cardLoc }
    credentials.cardId = cardId
    this.card = await boardService.getCardById(credentials)
  },
}
</script>
