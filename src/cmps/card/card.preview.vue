<template>
  <section class="card-preview">
    <div class="card-preview-cover">
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
    <span>{{ card.title }}</span>
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
    return {}
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
