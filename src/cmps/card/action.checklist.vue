<template>
  <section class="card-checklist">
    <div class="checklist-icon">
      <img
        src="https://cdn-icons.flaticon.com/png/512/2440/premium/2440972.png?token=exp=1658390307~hmac=3f013390315ecbdaec4f9d1514b8ec42"
        alt="Checklist icon"
      />
    </div>
    <div class="checklist-action">
      <div class="checklist-header">
        <h3>{{ checklist.title }}</h3>
        <button class="delete-checklist-btn">Delete</button>
      </div>
      <div class="progress-bar-preview">
        <span class="progress-count">0%</span>
        <div class="progress-bar-container">
          <div class="progress-bar"></div>
        </div>
      </div>

      <div
        class="todo-container"
        v-for="(todo, idx) in checklist.todos"
        :key="idx"
      >
        <input
          class="todo-checkbox"
          @change="saveChecklist"
          v-model="todo.isDone"
          type="checkbox"
        />
        <span class="check-mark"></span>
        <span
          class="todo-title"
          v-if="!isEditing"
          @click.stop="isEditing = true"
          >{{ todo.title }}</span
        >
        <input v-else @change="updateTodo" type="text" :value="todo.title" />
        <button @click="removeTodo(idx)">X</button>
      </div>

      <form class="flex column" @submit.prevent="saveChecklist">
        <input ref="newItemInput" type="text" placeholder="Add an item" />
      </form>
    </div>
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
      isEditing: false,
    }
  },
  methods: {
    saveChecklist() {
      this.newItem.title = this.$refs.newItemInput.value
      this.checklist.todos.push(JSON.parse(JSON.stringify(this.newItem)))

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
    updateTodo() {
      this.$emit('saveChecklist', {
        info: { checklist: this.checklist, idx: this.idx },
      })
    },
  },
  computed: {},
  created() {},
}
</script>
