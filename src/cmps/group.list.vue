<template>
  <section class="group-list">
    <Container
      orientation="horizontal"
      behaviour="move"
      group-name="board-1"
      class="flex"
      @drop="onDrop"
      :get-child-payload="getChildPayload1"
    >
      <Draggable v-for="group in groups" :key="group.id">
        <article>
          <group-preview
            :group="group"
            @updateGroupTitle="updateGroup"
            @updateGroup="updateGroup"
            @onCardMove="onCardMove"
          />
        </article>
      </Draggable>
    </Container>
    <!-- <article v-for="group in groups" :key="group.id">
        <group-preview
            :group="group"
            @updateGroupTitle="updateGroup"
            @updateGroup="updateGroup"
          />
      </article> -->

    <article v-for="group in groups" :key="group.id"></article>
    <div>
      <div v-if="!showForm" class="new-group group" @click="showForm = true">
        <span
          ><img src="../styles/svgs/fa/solid/plus.svg" alt="plus-icon" /></span
        ><span class="g-list-title"> Add another list</span>
      </div>

      <div v-if="showForm" class="group new-group-form">
        <form @submit.prevent="addGroup">
          <input
            type="text"
            v-model="newGroup.title"
            ref="input"
            placeholder="Enter list title..."
          />
          <div class="g-add-list">
            <button>Add list</button>
            <span class="close-icon" @click="showForm = false"></span>
          </div>
        </form>
      </div>
    </div>
  </section>
</template>

<script>
import groupPreview from './group.preview.vue'
import { boardService } from '../services/board.service'
import { Container, Draggable } from 'vue3-smooth-dnd'

export default {
  name: 'groupList',
  props: {
    groups: Array,
  },
  components: { groupPreview, Draggable, Container },
  data() {
    return {
      showForm: false,
      newGroup: boardService.getEmptyGroup(),
      groupsCopy: [],
      groupsQ: [],
    }
  },
  methods: {
    onCardMove(newGroup) {
      const board = this.board
      if (this.groupsQ.length === 1) {
        this.$store.dispatch({ type: 'saveBoard', board })
        this.groupsQ = []
        return
      }
      this.groupsQ.push(newGroup)
      if (this.groupsQ.length === 2) {
        this.groupsQ.forEach((group) => {
          const groupIdx = board.groups.findIndex(
            (bGroup) => bGroup.id === group.id,
          )
          board.groups.splice(groupIdx, 1, group)
        })
        this.$store.dispatch({ type: 'saveBoard', board })
        this.groupsQ = []
      }
    },
    updateGroup(group) {
      this.$emit('updateGroup', group)
    },
    addGroup() {
      console.log('this.newGroup', this.newGroup)
      if (this.newGroup.title === '') return
      this.$emit('addGroup', this.newGroup)
      this.showForm = false
      this.newGroup = boardService.getEmptyGroup()
    },
    getChildPayload1(idx) {
      return idx
    },
    onDrop(dropResult) {
      const newGroups = this.applyDrag(this.groupsCopyC, dropResult)
      const newBoard = { ...this.board, groups: [...newGroups] }
      this.$store.dispatch({ type: 'saveBoard', board: { ...newBoard } })
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
  },
  computed: {
    groupsCopyC() {
      return JSON.parse(JSON.stringify(this.groups))
    },
    board() {
      return JSON.parse(JSON.stringify(this.$store.getters.currBoard))
    },
  },
  created() {
    this.groupsCopy = this.groupsCopyC
  },
}
</script>
