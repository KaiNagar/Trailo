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
        @click="openEditTodo(todo, idx)"
      >
        <input
          class="todo-checkbox"
          :checked="todo.isDone"
          @change="toggleIsDone(todo, idx)"
          @click.stop
          type="checkbox"
        />
        <span class="check-mark"></span>

        <span
          :class="todoClass(todo)"
          class="todo-title"
          v-if="!todo.isEditing"
          >{{ todo.title }}</span
        >
        <div
          @mouseenter="isEditHover = true"
          @mouseleave="isEditHover = false"
          class="edit-todo-container"
          v-if="todo.isEditing"
        >
          <div v-if="isEditHover" class="screen-edit-todo"></div>

          <textarea type="text" v-model="todo.title" />
          <div class="flex space-between">
            <div>
              <button @click="saveTodo(todo, idx)" class="save-todo-btn">
                Save
              </button>
              <span
                @click.stop="closeEditTodo(todo, idx)"
                class="cancel-todo-btn"
                >X</span
              >
            </div>
            <todo-actionbar />
            <button class="remove-todo-edit" @click.stop="removeTodo(idx)"><span></span></button>
          </div>
        </div>
        <button
          v-if="!todo.isEditing"
          class="remove-todo"
          @click.stop="removeTodo(idx)"
        >
          X
        </button>
      </div>

      <form class="add-item-form">
        <button
          class="add-item-btn-toggle"
          v-if="!isAdding"
          @click="isAdding = true"
        >
          Add an item
        </button>
        <div v-else>
          <textarea
            @keydown.enter.prevent="saveChecklist"
            ref="newItemInput"
            type="text"
            placeholder="Add an item"
          />
          <div class="adding-items-actions flex space-between">
            <div>
              <button @click="saveChecklist" class="add-item-btn">Add</button>
              <span @click="isAdding = false" class="cancel-item-btn"
                >Cancel</span
              >
            </div>

            <todo-actionbar />
          </div>
        </div>
      </form>
    </div>
  </section>
</template>

<script>
import todoActionbar from '../todo.actionbar.vue'
export default {
  name: 'Checklist',
  props: {
    checklist: Object,
    idx: Number,
  },
  components: { todoActionbar },
  data() {
    return {
      newItem: this.$store.getters.emptyTodo,
      isAdding: false,
      showTodoActions: false,
      isEditHover: false,
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
      this.newItem = this.$store.getters.emptyTodo
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
    saveTodo(todo, idx) {
      this.checklist.todos.splice(idx, 1, todo)
      this.closeEditTodo(todo, idx)
      this.$emit('saveChecklist', {
        info: { checklist: this.checklist, idx: this.idx },
      })
    },
    openEditTodo(todo, idx) {
      todo.isEditing = true
      this.checklist.todos.forEach((todo) => (todo.isEditing = false))
      this.checklist.todos[idx].isEditing = true
      this.$emit('saveChecklist', {
        info: { checklist: this.checklist, idx: this.idx },
      })
    },
    closeEditTodo(todo, idx) {
      todo.isEditing = false
      this.checklist.todos[idx].isEditing = false
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
