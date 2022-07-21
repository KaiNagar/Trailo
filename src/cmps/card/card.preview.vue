<template>
  <section class="card-preview" @click="$emit('openCard', card.id)">
    <div class="card-preview-cover">
      <div :class="showCardCoverClass" :style="showCardCover"></div>
    </div>
    <div class="labels">
      <div
        class="card-preview-label"
        v-for="(label, idx) in card.labels"
        :key="idx"
        :style="{ 'background-color': label }"
      >
        <p>{{ label.title }}</p>
      </div>
    </div>
    <h1>{{ card.title }}</h1>
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
      isEditTitle: false,
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
  created() {},
}
</script>

<style>
</style>
