<template>
  <div v-if="card" class="card-details-container">
    <section class="card-details flex column">
      <div v-if="coverShow" :style="cardCoverStyle" :class="cardCoverClass" class="card-cover">
        <div class="close-details-container flex">
          <router-link class="close-details-btn flex" :to="'/board/' + board._id">X</router-link>
        </div>
        <div class="cover-menu-container">
          <button class="cover-menu-btn" @click="isCoverMenuOpen = !isCoverMenuOpen">
            <span>IMG</span> Cover
          </button>
        </div>
      </div>

      <div>
        <div class="flex column">
          <div v-if="isCoverMenuOpen" class="cover-menu">
            <h1>Cover</h1>
          </div>

          <div class="card-header flex">
            <div class="actionImg flex">img</div>
            <span class="icon-sm icon-member"></span>
            <div class="in-list-txt">
              <h1>{{ card.title }}</h1>
              in list <span class="group-title">{{ group.title }}</span>
            </div>
          </div>
          <div class="flex space-between">
            <div class="details-column flex column">
              <h3 class="labels-header">Labels</h3>
              <div class="labels-preview flex">
                <div class="label-btn" v-for="label in labelsToShow" :key="label.id" @click="openLabelsMenu($event)">
                  <span :style="labelColor(label.color)">{{
                      label.title
                  }}</span>
                </div>

                <button class="add-label-btn" @click="openLabelsMenu($event)">
                  +
                </button>

                <!-- <labels-menu @setLabel="setLabel($event)" v-if="isLabelMenuOpen"/> -->
                <div ref="labelsMenu" v-if="isLabelMenuOpen" class="labels-menu">
                  <header>
                    <h3>Labels</h3>
                    <button class="close-label-menu" @click="isLabelMenuOpen = false">
                      X
                    </button>
                  </header>
                  <hr />
                  <input type="text" placeholder="Search labels..." />
                  <main class="main-labels-content">
                    <h3>Labels</h3>
                    <div class="board-label flex space-between align-center"
                      @click="setLabel(label, labelSelected(label.id))" v-for="label in board.labels" :key="label.id"
                      :style="labelColor(label.color)">
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

                <!-- <button @click="onChecklist">+Checklist</button> -->
                <form @submit.prevent="addChecklist" v-if="isChecklistMenuOpen" class="checklist-menu flex column">
                  <header>
                    <h3>Add checklist</h3>
                    <button @click.stop="isChecklistMenuOpen = false">X</button>
                  </header>
                  <hr />
                  <main class="flex column">
                    <h3>Title</h3>
                    <input v-model="newChecklist.title" type="text" />
                    <select disabled name="" id="" placeholder="copy items from">
                      <option value="">Comming Soon</option>
                    </select>
                    <button>Add</button>
                  </main>
                </form>
              </div>

              <action-description />

              <div class="checklist-container">
                <article v-for="(checklist, idx) in card.checklists" :key="checklist.id">
                  <action-checklist @saveChecklist="saveChecklist" @removeChecklist="removeChecklist"
                    :checklist="checklist" :idx="idx" />
                </article>
              </div>

            </div>

            <div>
              <card-actions @openChecklistMenu="isChecklistMenuOpen = true" @openLabelsMenu="isLabelMenuOpen = true" />
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import actionChecklist from '../cmps/card/action.checklist.vue'
import actionDescription from '../cmps/card/action.description.vue'
import cardActions from '../cmps/card/card.actions.vue'
import labelsMenu from '../cmps/labels.menu.vue'
import { boardService } from '../services/board.service'

export default {
  name: 'cardDetails',
  components: { actionChecklist, cardActions, labelsMenu, actionDescription },
  data() {
    return {
      // board: null,
      // group: null,
      // card: null,
      isLabelMenuOpen: false,
      isCoverMenuOpen: false,
      isChecklistMenuOpen: false,
      labelMenuX: null,
      coverShow: true,
      newChecklist: boardService.getEmptyChecklist(),
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
      const pos = this.getCurrPos
      if (!active) {
        this.card.labelIds.push(newLabel.id)
      } else {
        const labelIdx = this.card.labelIds.findIndex(
          (id) => newLabel.id === id,
        )
        this.card.labelIds.splice(labelIdx, 1)
      }
      this.board.groups[pos.groupIdx].cards[pos.cardIdx] = this.card
      this.$store.dispatch({
        type: 'saveBoard',
        board: JSON.parse(JSON.stringify(this.board)),
      })
    },
    openLabelsMenu(ev) {
      this.isLabelMenuOpen = true
      this.labelMenuX = ev.pageX - ev.offsetX
      console.log(this.labelMenuX)
    },

    addChecklist() {
      const pos = this.getCurrPos
      if(!this.card.checklists) this.card.checklists = []
      this.card.checklists.push(this.newChecklist)
      this.isChecklistMenuOpen = false
      this.board.groups[pos.groupIdx].cards[pos.cardIdx] = this.card
      this.$store.dispatch({
        type: 'saveBoard',
        board: JSON.parse(JSON.stringify(this.board)),
      })
    },
    saveChecklist({ info }) {
      const pos = this.getCurrPos
      this.card.checklists.splice(info.idx, 1, info.checklist)
      this.board.groups[pos.groupIdx].cards[pos.cardIdx] = this.card
      this.$store.dispatch({
        type: 'saveBoard',
        board: JSON.parse(JSON.stringify(this.board)),
      })
    },
    removeChecklist(idx) {
      const pos = this.getCurrPos
      this.card.checklists.splice(idx, 1)
      this.board.groups[pos.groupIdx].cards[pos.cardIdx] = this.card
      this.$store.dispatch({
        type: 'saveBoard',
        board: JSON.parse(JSON.stringify(this.board)),
      })
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
    setLabelMenu() {
      return {
        left: this.labelMenuX,
      }
    },
    cardCoverStyle() {
      if (this.card.style.bgImg)
        return { backgroundImage: 'url(' + this.card.style.bgImg + ')' }
      else return { backgroundColor: this.card.style.bgColor }
    },
    cardCoverClass() {
      if (this.card.style.bgImg) return 'card-cover-img'
      else return 'card-cover-color'
    },
    getCurrPos() {
      const cardIdx = this.group.cards.findIndex(
        (card) => card.id === this.card.id,
      )
      const groupIdx = this.board.groups.findIndex(
        (group) => group.id === this.group.id,
      )
      return {
        cardIdx,
        groupIdx,
      }
    },
    board() {
      return JSON.parse(JSON.stringify(this.$store.getters.currBoard))
    },
    group() {
      const { groupId } = this.$route.params
      return JSON.parse(JSON.stringify(this.board.groups.find(group => group.id === groupId)))
    },
    card() {
      const { cardId } = this.$route.params
      return JSON.parse(JSON.stringify(this.group.cards.find(card => card.id === cardId)))
    }
  },
  created() {
    const { cardId, groupId, boardId } = this.$route.params
    // this.card = this.card
  },
}
</script>
