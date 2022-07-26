<template>
  <section>
    <app-modal v-if="menu.dates" @closeModal="closeMenu">
      <template #title>Dates</template>
      <template #part-1>
        <div>
          <form>
            <v-date-picker class="date-action flex" v-model="date" />
          </form>
        </div>
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
  },
  computed: {
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
