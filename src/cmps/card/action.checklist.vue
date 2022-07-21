<template>
  <section class="card-checklist">
    <h1>{{ checklist.title }}</h1>
    <div>0%</div>

    <div v-for="(todo, idx) in checklist.todos" :key="idx">
      <input @change="saveChecklist" v-model="todo.isDone" type="checkbox" />
      <input @change="saveChecklist" type="text" :value="todo.title" />
      <button @click="removeTodo(idx)">X</button>
    </div>
    <!-- <button v-show="!isEditTitle" @click="onAddItem">Add an item</button> -->

    <!-- <div v-show="isEditTitle" class="checklist-todo"> -->
    <form class="flex column" @submit.prevent="saveChecklist">
      <input ref="newItemInput" type="text" placeholder="Add an item" />
      <!-- <button @click="addTodo">Add</button> -->
    </form>
    <!-- <button @click="isEditTitle = false">Cancel</button> -->
    <!-- </div> -->
  </section>
</template>

<script>
export default {
  name: 'Checklist',
  props: {
    checklist: Object,
    idx: Number,
  },
  components: {},
  data() {
    return {
      newItem: { title: '', isDone: false },
    }
  },
  methods: {
    saveChecklist() {
      this.newItem.title = this.$refs.newItemInput.value
      this.checklist.todos.push(this.newItem)

      this.$emit('saveChecklist', {
        info: { checklist: this.checklist, idx: this.idx },
      })
      this.$refs.newItemInput.value = ''
    },
    removeTodo(todoIdx) {
      this.checklist.todos.splice(todoIdx, 1)
      this.$emit('saveChecklist', {
        info: { checklist: this.checklist, idx: this.idx },
      })
    },
  },
  computed: {},
  created() {},
}
</script>
