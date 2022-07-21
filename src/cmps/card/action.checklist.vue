<template>
  <section class="card-checklist">
    <h1>{{ checklist.title }}</h1>
    <div>0%</div>

    <div v-for="(todo, idx) in checklist.todos" :key="idx">
      <input type="text" :value="todo.title" />
    </div>
      <!-- <button v-show="!isEditTitle" @click="onAddItem">Add an item</button> -->
<!-- 
    <div v-show="isEditTitle" class="checklist-todo">
      <form class="flex column" @submit.prevent="addTodo">
        <input type="text" v-model="newItem.title" placeholder="Add an item" />
        <button @click="addTodo">Add</button>
      </form>
      <button @click="isEditTitle = false">Cancel</button>
    </div> -->
  </section>
</template>

<script>
export default {
  name: 'Checklist',
  props: {
    checklist: Object,
  },
  components: {},
  data() {
    return {
      isEditTitle: true,
      newItem: { title: null, isDone: false },
      todos:[],
    }
  },
  methods: {
    addTodo() {
      this.checklist.todos.push(this.newItem)
      this.$emit('addTodo', this.checklist)
      console.log('i dont know', this.checklist)
    },
    onAddItem() {
      this.isEditTitle = true
    },
  },
  computed: {},
  created() {},
}
</script>
