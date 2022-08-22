<template>
  <section class="colors-menu">
    <div class="colors-header">
      <span @click="$emit('backToStyle')" class="back-icon"></span>
      <h3>Colors</h3>
      <span @click="$emit('closeMoreMenu')" class="close-icon"></span>
    </div>
    <hr />
    <div class="all-colors">
      <div
        class="color"
        @click="setBgColor(color)"
        :style="colorStyle(color)"
        v-for="color in colors"
        :key="color.id"
      ></div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      colors: [
        { id: 'c101', color: 'rgb(0 121 191)' },
        { id: 'c102', color: 'rgb(210 144 52)' },
        { id: 'c103', color: 'rgb(81, 152, 57)' },
        { id: 'c104', color: 'rgb(176, 70, 50)' },
        { id: 'c105', color: 'rgb(137, 96, 158)' },
        { id: 'c106', color: 'rgb(205, 90, 145)' },
        { id: 'c107', color: 'rgb(75, 191, 107)' },
        { id: 'c108', color: 'rgb(0, 174, 204)' },
        { id: 'c109', color: 'rgb(131, 140, 145)' },
      ],
    }
  },
  methods: {
    colorStyle(color) {
      return { backgroundColor: color.color }
    },
    setBgColor(color) {
      this.$emit('setBgColor', color)
    },
  },
}
</script>
