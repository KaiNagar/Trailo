<template>

  <!-- <button @click="$emit('openCard', card.id)">Read</button> -->

  <section class="card-preview" @click="$emit('openCard', card.id)">
    <input type="text" v-model="card.title" @click.stop @input.stop="saveCard">

    <div class="labels">
      <div class="label" v-for="(label, idx) in card.labels" :key="idx" :style="{ 'background-color': label }"></div>
    </div>
  </section>


</template>

<script>
export default {
  name: 'cardPreview',
  props: ['card'],
  components: {},
  data() {
    return {}
  },
  methods: {
    saveCard(){
     this.$emit('saveGroup',this.card)
    }
  },
  computed: {},
  created() { },
}
</script>

<style>
</style>
