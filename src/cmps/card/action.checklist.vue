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
        <button class="delete-checklist-btn" @click="removeChecklist(idx)">
          Delete
        </button>
      </div>
      <div class="progress-bar-preview">
        <span class="progress-count">{{ todosDoneCount }}</span>
        <div class="progress-bar-container">
          <div :style="todosDone" class="progress-bar"></div>
        </div>
      </div>

      <div
        class="todo-container"
        v-for="(todo, idx) in checklist.todos"
        :key="idx"
        @mouseover="showTodoActions = true"
        @mouseleave="showTodoActions = false"
      >
        <input
          class="todo-checkbox"
          :checked="checked(todo)"
          @change="toggleIsDone(todo, idx)"
          type="checkbox"
        />
        <span class="check-mark"></span>
        <span
          :class="todoClass(todo)"
          class="todo-title"
          v-if="!isEditing"
          @click.stop="isEditing = true"
          >{{ todo.title }}</span
        >
        <input v-else @change="updateTodo" type="text" :value="todo.title" />
        <!-- <button v-if="showTodoActions" @click="removeTodo(idx)">X</button> -->
      </div>

      <form class="add-item-form" @submit.prevent="saveChecklist">
        <button class="add-item-btn-toggle" v-if="!isAdding" @click="isAdding = true">
          Add an item
        </button>
        <div v-else>
          <textarea ref="newItemInput" type="text" placeholder="Add an item" />
          <div class="adding-items-actions flex space-between">
            <div>
              <button class="add-item-btn">Add</button>
              <span @click="isAdding = false" class="cancel-item-btn">Cancel</span>
            </div>
            <div class="flex">
              <div>
                <span>O</span><a class="Assign-item-btn" href=""> Assign</a>
              </div>
              <div>
                <span>O</span><a class="duedate-item-btn" href=""> Due date</a>
              </div>
              <div>
                <span>O</span>
              </div>
              <div>
                <span class="emoji-item-btn">O</span>
              </div>
            </div>
          </div>
        </div>
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
      isAdding: false,
      showTodoActions: false,
    }
  },
  methods: {
    saveChecklist() {
      if (!this.$refs.newItemInput.value) return
      this.newItem.title = this.$refs.newItemInput.value
      this.checklist.todos.push(JSON.parse(JSON.stringify(this.newItem)))

      this.$emit('saveChecklist', {
        info: { checklist: this.checklist, idx: this.idx },
      })
      this.$refs.newItemInput.value = ''
    },
    removeChecklist(idx) {
      this.$emit('removeChecklist', idx)
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
    toggleIsDone(todo, idx) {
      todo.isDone = !todo.isDone
      this.checklist.todos[idx] = todo
      this.$emit('saveChecklist', {
        info: { checklist: this.checklist, idx: this.idx },
      })
    },
    checked(todo) {
      return todo.isDone ? true : false
    },
    todoClass(todo) {
      return todo.isDone ? 'done' : ''
    },
  },
  computed: {
    getTodosStats() {
      const totalTodos = this.checklist.todos.length
      const todosDone = this.checklist.todos.filter(
        (todo) => todo.isDone === true,
      ).length
      if (todosDone === 0) return 0
      return todosDone / totalTodos
    },
    todosDone() {
      const stats = this.getTodosStats
      if (stats === 1)
        return {
          backgroundColor: '#61bd4f',
          width: (this.getTodosStats * 100).toFixed(2) + '%',
          borderBottomRightRadius: 0.25 + 'rem',
          borderTopRightRadius: 0.25 + 'rem',
        }
      return { width: (this.getTodosStats * 100).toFixed(2) + '%' }
    },
    todosDoneCount() {
      return Math.floor(this.getTodosStats * 100) + '%'
    },
  },
  created() {
    this.getTodosStats
  },
}
</script>
