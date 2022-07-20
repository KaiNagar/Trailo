<template>
  <section>
    <div v-for="card in cards" :key="card._id">
      <card-preview @openCard="openCard" :card="card" :saveGroup="saveGroup"/>
    </div>
  </section>
</template>

<script>
import cardPreview from './card.preview.vue'
export default {
  props: ['cards'],
  components: { cardPreview },
  data() {
    return {
      board: null,
      group: null,
    }
  },
  methods: {
    openCard(cardId) {
      this.$router.push(`/board/${this.board._id}/${this.group.id}/${cardId}`)
    },
    saveGroup(card){
      console.log(card);
    }
  },
  computed: {},
  created() {
    this.board = this.$store.getters.currBoard
    this.group = this.$store.getters.currGroup
  },
}
</script>

<style></style>
