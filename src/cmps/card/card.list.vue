<template>
  <section class="card-list">
    <Container
      orientation="vertical"
      behaviour="move"
      group-name="group-1"
      @drop="onDrop(currGroup, $event)"
      @drag-leave="dragLeave(groupIdx)"
      drag-class="card-ghost"
      drop-class="card-ghost-drop"
      :drop-placeholder="dropPlaceholderOptions"
      :get-child-payload="getChildPayload1"
    >
      <Draggable v-for="(card, idx) in cards" :key="card.id">
        <div>
          <card-preview
            @click="openCard(card.id)"
            :card="card"
            :idx="idx"
            @saveCard="saveCard"
            @removeCard="removeCard"
          />
        </div>
      </Draggable>
    </Container>
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
        newCard: {},
      },
      showCardMenu: false,
    }
  },
  methods: {
    openCard(cardId) {
      this.$router.push(`/board/${this.board._id}/${this.group.id}/${cardId}`)
    },
    dragLeave(leaving) {
      this.$emit('dragLeave', leaving)
    },
    removeCard(cardId) {
      this.$emit('removeCard', cardId)
    },
    saveCard({ card, cardIdx }) {
      this.board.groups[this.groupIdx].cards[cardIdx] = card
      this.$store.dispatch({ type: 'saveBoard', board: this.board })
    },
    getChildPayload1(index) {
      return this.cards[index]
    },
    onDrop(group, dropResult) {
      const { removedIndex, addedIndex, payload } = dropResult
      if (removedIndex === null && addedIndex === null) return
      const newGroup = { ...group }
      newGroup.cards = this.applyDrag(newGroup.cards, dropResult)
      this.$emit('groupsQ', newGroup)
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
