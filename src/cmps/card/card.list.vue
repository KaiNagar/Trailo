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
      boardId: null,
      groupId: null,
    }
  },
  methods: {
    openCard(cardId) {
      this.$router.push(`/board/${this.boardId}/${this.groupId}/${cardId}`)
    },
    saveGroup(card){
      console.log(card);
    }
  },
  computed: {},
  created() {
    this.boardId = this.$store.getters.boardId
    this.groupId = this.$store.getters.groupId
  },
}
</script>

<style></style>
