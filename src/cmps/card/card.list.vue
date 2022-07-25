<template>
  <section class="card-list">
    <Container
      orientation="vertical"
      behaviour="move"
      group-name="group-1"
      @drop="onDrop(currGroup, $event)"
      drag-class="card-ghost"
      drop-class="card-ghost-drop"
      :drop-placeholder="dropPlaceholderOptions"
      :get-child-payload="getChildPayload1"
    >
      <Draggable v-for="card in cards" :key="card.id">
        <div>
          <card-preview :card="card" @click="openCard(card.id)" />
        </div>
      </Draggable>
    </Container>
    <router-view></router-view>
  </section>
  

</template>

<script>
import cardPreview from './card.preview.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'

export default {
  props: {
    cards: Object,
    currGroup: Object,
  },
  components: { cardPreview, Draggable, Container },
  data() {
    return {
      dropPlaceholderOptions: {
        className: 'drop-preview',
        animationDuration: '150',
        showOnTop: true,
      },
    }
  },
  methods: {
    openCard(cardId) {
      this.$router.push(`/board/${this.board._id}/${this.group.id}/${cardId}`)
    },
    getChildPayload1(index) {
      return this.cards[index]
    },
    onDrop(group, dropResult) {
      const { removedIndex, addedIndex, payload } = dropResult
      if (removedIndex === null && addedIndex === null) return
      const newGroup = { ...group }
      newGroup.cards = this.applyDrag(newGroup.cards, dropResult)

      console.log(dropResult)
      if (false) {
        console.log('in')
        const board = this.board
        const groupIdx = board.groups.findIndex(
          (bGroup) => bGroup.id === group.id,
        )
        board.groups.splice(groupIdx, 1, newGroup)
        this.$store.dispatch({ type: 'saveBoard', board })
        return
      } else {
        this.$emit('groupsQ', newGroup)
      }
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
    board() {
      return JSON.parse(JSON.stringify(this.$store.getters.currBoard))
    },
    group() {
      return JSON.parse(JSON.stringify(this.currGroup))
    },
    groupIdx() {
      return this.board.groups.findIndex((group) => group.id === this.group.id)
    },
  },
}
</script>
