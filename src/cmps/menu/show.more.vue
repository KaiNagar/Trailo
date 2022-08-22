<template>
  <section class="show-menu flex column">
    <div class="menu-header">
      <h3>Menu</h3>
      <button @click="$emit('closeMoreMenu')">
        <span class="close-icon"></span>
      </button>
    </div>
    <hr />
    <div class="menu-options flex column">
      <div class="change-cover" @click="$emit('openStyleMenu')">
        <div :style="bgMini" class="mini-img"></div>
        <span class="cover-txt">Change background</span>
      </div>
      <div class="dashboard" @click="$emit('openDashboard')">
        <span class="dash-icon"></span>
        <span class="cover-txt">Dashboard</span>
      </div>
    </div>

    <hr />
    <div class="board-activity">
      <div class="activity-header">
        <span class="activity-icon"></span>
        <h3 class="activity-txt">Activity</h3>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      changeBackground: false,
    }
  },
  computed: {
    bgMini() {
      if (this.board.style.bgColor) return { backgroundColor: this.board.style.bgColor }
      else {
        const url = this.board.style.bgImg
        return { backgroundImage: 'url(' + url + ')' }
      }
    },
    board() {
      return JSON.parse(JSON.stringify(this.$store.getters.currBoard))
    },
  },
}
</script>
