<template>
  <section>
    <app-modal v-if="menu.dates" @closeModal="closeMenu">
      <template #title>Dates</template>
      <template #part-1>
        <form>
          <div class="date-calender-container">
            <v-date-picker v-model="date" @click="onDayClick" />
          </div>
          <input :value="date" />
        </form>
      </template>
    </app-modal>
  </section>
</template>

<script>
import appModal from '../app.modal.vue'
import { Calendar, DatePicker } from 'v-calendar'
export default {
  name: 'dateMenu',
  components: {
    appModal,
    Calendar,
    DatePicker,
  },
  data() {
    return {
      date: new Date(),
      selectedDate: null,
    }
  },
  methods: {
    openMenu(menuAction) {
      this.$store.commit({ type: 'openMenu', menuAction })
    },
    closeMenu() {
      this.$store.commit({ type: 'closeMenu' })
    },
    onDayClick(event) {
      console.log(event)

      // this.date = event.date
    },
  },
  computed: {
    dates() {
      return this.days.map((day) => day.date)
    },
    attributes() {
      return this.dates.map((date) => ({
        highlight: true,
        dates: date,
      }))
    },
    menu() {
      return this.$store.getters.menu
    },
  },
  created() {},
  unmounted() {},
}
</script>

<style>
</style>
