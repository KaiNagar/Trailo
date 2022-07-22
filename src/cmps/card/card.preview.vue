<template>
  <section class="card-preview">
    <div v-if="card.style.bgColor || card.style.bgImg" class="card-preview-cover">
      <div :class="showCardCoverClass" :style="showCardCover"></div>
    </div>
    <!-- <div class="labels">
      <div
        class="card-preview-label"
        v-for="(label, idx) in card.labels"
        :key="idx"
        :style="{ 'background-color': label }"
      >
        <p>{{ label.title }}</p>
      </div> -->
    <!-- </div> -->
    <div class="card-title">
      <span>{{ card.title }}</span>
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
    }
  },
  methods: {},
  computed: {
    showCardCover() {
      if (this.card.style.bgImg) return { backgroundImage: 'url(' + this.card.style.bgImg + ')' }
      return { backgroundColor: this.card.style.bgColor }
    },
    showCardCoverClass() {
      if (this.card.style.bgImg) return 'card-img'
      return 'card-color'
    },
  },
  created() {
    this.board = this.$store.getters.currBoard
    this.group = this.$store.getters.currGroup
  },
}
</script>

<style>
</style>
