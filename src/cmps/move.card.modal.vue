<template>
  <app-modal>
    <template #title>Move card</template>
    <template #part-1>
      <span>Select destination</span>
    </template>
    <template #part-2>
      <form>
        <select v-model="newLocation.board" class="board-select">
          <option :value="board" v-for="board in boards" :key="board._id">
            {{ board.title }}
          </option>
        </select>
        <div class="in-board-select flex">
          <select v-model="newLocation.group" class="list-location">
            <option
              :value="group"
              v-for="group in newLocation.board.groups"
              :key="group.id"
            >
              {{ group.title }}
            </option>
          </select>
          <select v-model="newLocation.card" class="card-location">
            <option
              :value="card"
              v-for="(card, idx) in newLocation.group.cards"
              :key="card.id"
            >
              {{ idx }}
            </option>
          </select>
        </div>
        <button @click="moveCard">Move</button>
      </form>
    </template>
  </app-modal>
</template>

<script>
import appModal from './app.modal.vue'

export default {
  components: { appModal },
  props: {
    board: Object,
    group: Object,
    card: Object,
  },
  data() {
    return {
      boards: null,
      newLocation: {
        board: null,
        boardIdx: null,
        group: null,
        groupIdx: null,
        card: null,
        cardIdx: null,
      },
    }
  },
  methods: {
    moveCard() {
      this.getPos
      this.$emit('moveCard',this.newLocation)
    },
    updateBoard(board) {
      this.currBoard = { ...board }
    },
    updateGroup(group) {
      this.currGroup = { ...group }
    },
    updateCard(card) {
      this.currCard = { ...card }
    },
  },
  computed: {
    getPos() {
      this.newLocation.boardIdx = this.boards.findIndex(
        (board) => board._id === this.newLocation.board._id,
      )
      this.newLocation.groupIdx = this.newLocation.board.groups.findIndex(
        (group) => group.id === this.newLocation.group.id,
      )
      this.newLocation.cardIdx = this.newLocation.group.cards.findIndex(
        (card) => card.id === this.newLocation.card.id,
      )
    },
  },
  created() {
    this.boards = this.$store.getters.boards
    this.newLocation.board = { ...this.board }
    this.newLocation.group = { ...this.group }
    this.newLocation.card = { ...this.card }
  },
}
</script>
