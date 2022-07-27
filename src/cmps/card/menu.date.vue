<template>
  <section>
    <app-modal v-if="menu.dates" @closeModal="closeMenu">
      <template #title>Dates</template>
      <template #part-1>
        <thead class="date-calender-container">
          <tr>
            <th>
              <v-calendar class="date-calender" :attributes="attributes" @dayclick="onDayClick" />
            </th>
          </tr>
          <!-- <div class="date-calender-container">
          <v-calendar class="date-calender" :attributes="attributes" @dayclick="onDayClick" /> -->
        </thead>
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
      days: [],
    }
  },
  methods: {
    openMenu(menuAction) {
      console.log(menuAction)
      this.$store.commit({ type: 'openMenu', menuAction })
    },
    closeMenu() {
      this.$store.commit({ type: 'closeMenu' })
    },
    onDayClick(day) {
      const idx = this.days.findIndex((d) => d.id === day.id)
      if (idx >= 0) {
        this.days.splice(idx, 1)
      } else {
        this.days.push({
          id: day.id,
          date: day.date,
        })
      }
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
