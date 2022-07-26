<template>
  <section class="card-checklist">
    <div class="checklist-icon-container">
      <span class="checklist-icon"></span>
    </div>
    <div class="checklist-action">
      <div class="checklist-header">
        <h3 @click="isEditTitle = true" v-if="!isEditTitle">
          {{ checklist.title }}
        </h3>
        <div v-else>
          <textarea
            ref="editTitle"
            :value="checklist.title"
            class="edit-title-textarea"
            type="text"
          />
          <div class="flex align-center">
            <button class="save-edit-title" @click="updateChecklist">
              Save
            </button>
            <span
              class="close-edit-title close-icon"
              @click="isEditTitle = false"
            ></span>
          </div>
        </div>
        <button
          class="delete-checklist-btn"
          v-if="!isEditTitle"
          @click="removeChecklist(idx)"
        >
          Delete
        </button>
      </div>
      <div class="progress-bar-preview">
        <span class="progress-count">{{ todosDoneCount }}</span>
        <div class="progress-bar-container">
          <div :style="todosDone" class="progress-bar"></div>
        </div>
      </div>

      <Container
        orientation="vertical"
        behaviour="move"
        class=""
        drag-class=""
        drop-class=""
        group-name="todo-1"
        lock-axis="y"
        :get-child-payload="getChildPayload1"
        :drop-placeholder="dropPlaceholderOptions"
        @drop="onDrop(checklist, $event)"
        @drag-leave="dragLeave(idx)"
      >
        <Draggable
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
            v-if="!isEditingTodo(todo)"
            >{{ todo.title }}</span
          >
          <div
            @mouseenter="isEditHover = true"
            @mouseleave="isEditHover = false"
            class="edit-todo-container"
            v-if="isEditingTodo(todo)"
          >
            <div v-if="isEditHover" class="screen-edit-todo"></div>
            <textarea type="text" v-model="todo.title" />
            <div class="flex align-center space-between">
              <div class="flex align-center">
                <button @click="saveTodo(todo, idx)" class="save-todo-btn">
                  Save
                </button>
                <div class="close-icon-container">
                  <span
                    @click.stop="closeEditTodo(todo, idx)"
                    class="close-icon"
                  ></span>
                </div>
              </div>
              <div class="flex">
                <todo-actionbar />
                <button
                  class="remove-todo-edit menu-icon"
                  @click.stop="removeTodo(idx)"
                >
                  <span class="close-icon"></span>
                </button>
              </div>
            </div>
          </div>

          <button
            v-if="!todo.isEditing"
            class="remove-todo close-icon"
            @click.stop="removeTodo(idx)"
          ></button>
        </Draggable>
      </Container>
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
import { Container, Draggable } from 'vue3-smooth-dnd'

export default {
  name: 'Checklist',
  props: {
    checklist: Object,
    idx: Number,
    card: Object,
  },
  components: { todoActionbar, Container, Draggable },
  data() {
    return {
      newItem: this.$store.getters.emptyTodo,
      isAdding: false,
      showTodoActions: false,
      isEditHover: false,
      isEditTitle: false,
      dropPlaceholderOptions: {
        className: 'todo-drag-preview',
        animationDuration: '150',
        showOnTop: true,
      },
    }
  },
  methods: {
    onDrop(checklist, dropResult) {
      const { removedIndex, addedIndex } = dropResult
      if (removedIndex === null && addedIndex === null) return
      const newChecklist = { ...checklist }
      newChecklist.todos = this.applyDrag(newChecklist.todos, dropResult)
      this.$emit('checklistQ', newChecklist)
    },
    applyDrag(arr, dragResult) {
      const { removedIndex, addedIndex, payload } = dragResult

      if (removedIndex === null && addedIndex === null) return arr
      const result = [...arr]
      let itemToAdd = payload

      if (removedIndex !== null) {
        itemToAdd = result.splice(removedIndex, 1)[0]
      }
      if (addedIndex !== null) {
        result.splice(addedIndex, 0, itemToAdd)
      }
      return result
    },
    dragLeave(cIdx) {
      this.$emit('dragLeave',cIdx)
    },
    getChildPayload1(index) {
      return this.checklist.todos[index]
    },
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
    updateChecklist() {
      const newTitle = this.$refs.editTitle.value
      this.checklist.title = newTitle
      this.$emit('saveChecklist', {
        info: { checklist: this.checklist, idx: this.idx },
      })
      this.isEditTitle = false
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
      todo.isEditing = false
      this.checklist.todos[idx].isEditing = false
      this.checklist.todos.splice(idx, 1, todo)
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
    isEditingTodo(todo) {
      return todo.isEditing
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
    this.checklistCopy = { ...this.checklist }
    this.getTodosStats
  },
}
</script>
