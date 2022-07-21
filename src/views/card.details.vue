<template>
  <div v-if="card" class="card-details-container">
    <section class="card-details flex column">
      <div
        v-if="coverShow"
        :style="cardCoverStyle"
        :class="cardCoverClass"
        class="card-cover"
      >
        <div class="cover-menu-container">
          <button
            class="cover-menu-btn"
            @click="isCoverMenuOpen = !isCoverMenuOpen"
          >
            <span>IMG</span> Cover
          </button>
        </div>
      </div>
      <div class="flex space-between">
        <div>
          <div class="close-details-container flex">
            <router-link
              class="close-details-btn flex"
              :to="'/board/' + board._id"
              >X</router-link
            >
          </div>
          <div v-if="isCoverMenuOpen" class="cover-menu">
            <h1>Cover</h1>
          </div>
          <div class="card-header">
            <div class="flex">
              <div class="actionImg flex">img</div>
              <div>
                <h1>{{ card.title }}</h1>
                in list <span class="group-title">{{ group.title }}</span>
              </div>
            </div>
          </div>
          <div class="card-labels flex column">
            <h3>Labels</h3>
            <div class="labels-preview flex">
              <div
                class="label-btn"
                v-for="label in labelsToShow"
                :key="label.id"
                @click="openLabelsMenu($event)"
              >
                <span :style="labelColor(label.color)">{{ label.title }}</span>
              </div>
              <button @click="isLabelMenuOpen = !isLabelMenuOpen">+</button>
              <div
                :style="{ left: LabelsMenuX }"
                v-if="isLabelMenuOpen"
                class="labels-menu"
              >
                <header>
                  <h3>Labels</h3>
                  <button
                    class="close-label-menu"
                    @click="isLabelMenuOpen = false"
                  >
                    X
                  </button>
                </header>
                <hr />
                <input type="text" placeholder="Search labels..." />
                <main>
                  <h3>Labels</h3>
                  <div
                    class="board-label flex space-between align-center"
                    @click="setLabel(label, labelSelected(label.id))"
                    v-for="label in board.labels"
                    :key="label.id"
                    :style="labelColor(label.color)"
                  >
                    {{ label.title }}
                    <span v-if="labelSelected(label.id)">V</span>
                    <span>E</span>
                  </div>
                  <button class="create-label">Create a new label</button>
                  <hr />
                  <button disabled class="disabled-btn color-blind-btn">
                    Enable color blind friendly mode
                  </button>
                </main>
              </div>
            </div>
          </div>
        </div>
        <div>
          <card-actions />
        </div>
      </div>

      <!-- <button @click="onChecklist">+Checklist</button>

      <article v-for="(checklist, idx) in card.checklists" :key="idx">
        <action-checklist :checklist="checklist" />
      </article> -->
    </section>
  </div>
</template>

<script>
import actionChecklist from '../cmps/card/action.checklist.vue'
import cardActions from '../cmps/card/card.actions.vue'

export default {
  name: 'cardDetails',
  components: { actionChecklist, cardActions },
  data() {
    return {
      board: null,
      group: null,
      card: null,
      isLabelMenuOpen: false,
      isCoverMenuOpen: false,
      labelMenuX: null,
      coverShow: true,
    }
  },
  methods: {
    labelColor(color) {
      return { backgroundColor: color }
    },
    labelSelected(labelId) {
      if (this.card.labelIds.includes(labelId)) return true
      else return false
    },
    setLabel(newLabel, active) {
      const cardIdx = this.group.cards.findIndex(
        (card) => card.id === this.card.id,
      )
      const groupIdx = this.board.groups.findIndex(
        (group) => group.id === this.group.id,
      )
      if (!active) {
        this.card.labelIds.push(newLabel.id)
      } else {
        const labelIdx = this.card.labelIds.findIndex(
          (id) => newLabel.id === id,
        )
        this.card.labelIds.splice(labelIdx, 1)
      }
      this.board.groups[groupIdx].cards[cardIdx] = this.card
      this.$store.dispatch({
        type: 'saveBoard',
        board: JSON.parse(JSON.stringify(this.board)),
      })
    },
    openLabelsMenu(ev) {
      this.isLabelMenuOpen = true
      this.labelMenuX = ev.pageX - ev.offsetX
      console.log(ev.pageX - ev.offsetX)
    },
  },
  computed: {
    labelsToShow() {
      let labelsToShow = []
      this.board.labels.filter((boardLabel) => {
        this.card.labelIds.forEach((id) => {
          if (id === boardLabel.id) labelsToShow.push(boardLabel)
        })
      })
      return labelsToShow
    },
    LabelsMenuX() {
      return this.labelMenuX
    },
    cardCoverStyle() {
      if (this.card.style.bgImg)
        return { backgroupImage: this.card.style.bgImg }
      else return { backgroundColor: this.card.style.bgColor }
    },
    cardCoverClass() {
      if (this.card.style.bgImg) return 'card-cover-img'
      else return 'card-cover-color'
    },
  },
  created() {
    const { cardId, groupId, boardId } = this.$route.params
    const currBoard = this.$store.getters.boards.find(
      (board) => board._id === boardId,
    )
    this.board = JSON.parse(JSON.stringify(currBoard))
    const currGroup = currBoard.groups.find((group) => group.id === groupId)
    this.group = JSON.parse(JSON.stringify(currGroup))
    const currCard = currGroup.cards.find((card) => card.id === cardId)
    this.card = JSON.parse(JSON.stringify(currCard))
  },
}
</script>
