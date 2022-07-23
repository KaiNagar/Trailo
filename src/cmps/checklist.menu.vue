<template>
  <form @submit.prevent="addChecklist" class="checklist-menu flex column">
    <header class="menu-header flex align-center">
      <span>Add checklist</span>
      <span
        class="close-list-btn"
        @click="this.$emit('closeChecklistMenu')"
        >X</span
      >
    </header>
    <main class="menu-main-content flex column">
      <label for="checklist-title">Title</label>
      <input id="checklist-title" v-model="newChecklist.title" type="text" />
      <label for="copy-item">Copy items from...</label>
      <select disabled id="copy-item" placeholder="copy items from">
        <option value="">(none)</option>
      </select>
      <button class="add-checklist-btn">Add</button>
    </main>
  </form>
</template>

<script>
export default {
  props: {
    getCurrPos: Object,
    newChecklist: Object,
  },
  components: {},
  data() {
    return {}
  },
  methods: {
    addChecklist() {
      if(!this.newChecklist.title) return
      this.$emit('addChecklist', this.newChecklist)
    },
  },
  computed: {},
  created() {},
}
</script>
