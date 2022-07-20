<template>
  <section>
    <div v-for="card in cards" :key="card._id">
      <card-preview :card="card" />
    </div>
  </section>
</template>

<script>
import cardPreview from './card.preview.vue'
export default {
  props: ['cards'],
  components: {cardPreview},
  data() {
    return {}
  },
  methods: {},
  computed: {},
  created() {
  },
}
</script>

<style></style>
