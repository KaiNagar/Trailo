<template>
  <section>
    <app-modal v-if="menu.dates" @closeModal="closeMenu">
      <template #title>Dates</template>
      <template #part-1>
        <form class="date-form" >
          <div class="date-calender-container"></div>
          <Datepicker
            placeholder="Select Date"
            modelType="timestamp"
            :modelValue="date"
            @update:modelValue="updateDate"
            inline
            :dayNames="dayNames"
            inlineWithInput
            textInput
            autoApply
          />
          <div class="date-txt">
            Reminders will be sent to all members and watchers of this card.
          </div>
          <button @click="setDate" id="save-date-btn">Save</button>
          <button id="remove-date-btn" @click="removeDate">Remove</button>
        </form>
      </template>
    </app-modal>
  </section>
</template>

<script>
import { getDate, getHours, getMinutes, getMonth } from 'date-fns'
import appModal from '../app.modal.vue'
export default {
  name: 'dateMenu',
  components: {
    appModal,
  },
  data() {
    return {
      date: null,
      dayNames: ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'],
      months: [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ],
    }
  },
  methods: {
    openMenu(menuAction) {
      this.$store.commit({ type: 'openMenu', menuAction })
    },
    closeMenu() {
      this.$store.commit({ type: 'closeMenu' })
    },
    setDate() {
      if (!this.date) return
      const date = getDate(this.date)
      const month = this.months[getMonth(this.date)]
      const hours = ('00' + getHours(this.date)).slice(-2)
      const minutes = ('00' + getMinutes(this.date)).slice(-2)
      const dueDate = {
        txt: `${date} ${month} at ${hours}:${minutes}`,
        timestamp: this.date,
        date,
        month,
        hours,
        minutes,
        isDone: false,
      }
      this.$emit('setDate', dueDate)
      this.date = new Date()
      this.closeMenu()
    },
    updateDate(time) {
      this.date = time
    },
    removeDate() {
      this.date = new Date()
      this.$emit('removeDate')
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

<style></style>
