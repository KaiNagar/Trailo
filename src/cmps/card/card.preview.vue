<template>
  <section>
    <button @click="$emit('openCard', card.id)">Read</button>
    <router-link to="/home">
      <section class="card-preview">
        {{ card.title }}

        <div class="labels">
          <div
            class="label"
            v-for="(label, idx) in card.labels"
            :key="idx"
            :style="{ 'background-color': label }"
          ></div>
        </div>
      </section>
    </router-link>
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
  methods: {},
  computed: {},
  created() {},
}
</script>

<style></style>
