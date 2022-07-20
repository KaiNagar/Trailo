<template>


  <router-link :to="'/board/card/' + card.id">
    <section class="card-preview">
      {{ card.title }}

      <div class="labels">
        <div class="label" v-for="(label, idx) in card.labels" :key="idx" :style="{ 'background-color': label }" >
        </div>
      </div>

    </section>
  </router-link>


</template>

<script>
export default {
  name: 'cardPreview',
  props: ['card'],
  components: {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
  created() {

  },
}
</script>

<style>
</style>
