<template>
  <form @submit.prevent="addChecklist" class="checklist-menu flex column">
    <header class="menu-header flex align-center">
      <span>Add checklist</span>
      <button @click.stop="this.$emit('closeChecklistMenu')">X</button>
    </header>
    <main class="menu-main-content flex column">
      <h3>Title</h3>
      <input v-model="newChecklist.title" type="text" />
      <select disabled name="" id="" placeholder="copy items from">
        <option value="">Comming Soon</option>
      </select>
      <button>Add</button>
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
      this.$emit('addChecklist', this.newChecklist)
    },
  },
  computed: {},
  created() {},
}
</script>
