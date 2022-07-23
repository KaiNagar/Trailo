<template>
  <section class="card-list">
    <div v-for="card in cards" :key="card._id">
      <card-preview
        @openCard="openCard"
        :card="card"
        @click="openCard(card.id)"
      />
    </div>
    <router-view></router-view>
  </section>
</template>

<script>
import cardPreview from './card.preview.vue'
export default {
  props: {
    cards: Object,
  },
  components: { cardPreview },
  data() {
    return {
      board: null,
      group: null,
    }
  },
  methods: {
    openCard(cardId) {
      console.log(this.board._id , this.group.id , cardId);
      this.$router.push(`/board/${this.board._id}/${this.group.id}/${cardId}`)
    },
  },
  computed: {},
  created() {
    this.board = this.$store.getters.currBoard
    this.group = this.$store.getters.currGroup
  },
}
</script>

<style></style>
