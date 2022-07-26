<!-- <template>
  <section>
    <h1>User details</h1>
  </section>
</template>

<script>
export default {
  name: 'userDetails',
  components: {},
  data() {
    return {}
  },
  methods: {},
  computed: {},
  created() {},
}
</script>

<style></style> -->
<template>
  <v-calendar ref="calendar">
    <template v-slot:footer>
      <div class="bg-gray-100 text-center p-2 border-t rounded-b-lg">
        <button
          class="bg-blue-500 text-white font-medium px-2 py-1 rounded hover:bg-blue-600"
          @click="moveToToday"
        >
          Today
        </button>
      </div>
    </template>
  </v-calendar>
</template>
  <script>
export default {
  methods: {
    moveToToday() {
      this.$refs.calendar.move(new Date())
    },
  },
}
</script>
