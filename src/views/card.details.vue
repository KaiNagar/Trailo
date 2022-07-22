<template>
  <div v-if="card" class="card-details-container">
    <section class="card-details flex column">
      <div class="close-details-container flex">
        <router-link class="close-details-btn flex" :to="'/board/' + board._id"
          >X</router-link
        >
      </div>
      <div v-if="isCoverMenuOpen" class="cover-menu">
        <div class="menu-header">
          <h1>Cover</h1>
          <button @click="isCoverMenuOpen = false">X</button>
        </div>
        <div class="cover-size">
          <button
            :class="coverSize(false)"
            :style="setCoverSizeStyle"
            @click="setFullCover(false)"
          >
            half
          </button>
          <button
            :class="coverSize(true)"
            :style="setCoverSizeStyle"
            @click="setFullCover(true)"
          >
            full
          </button>
        </div>
        <button class="remove-cover-btn" @click="removeCover">
          Remove cover
        </button>
        <div v-if="card.style.isFull && card.style.bgImg" class="cover-color">
          <button @click="setCoverMode(false)">white</button>
          <button @click="setCoverMode(true)">black</button>
        </div>
        <div class="colors">
          <button
            @click="setCoverColor(color)"
            :style="{ backgroundColor: color }"
            class="cover-btn-pick-color"
            v-for="color in colors"
            :key="color"
          ></button>
        </div>
        <div v-if="card.attachments" class="cover-attachments">
          <button
            :style="{ backgroundImage: 'url(' + attachment.url + ')' }"
            @click="setCoverImg(attachment.url)"
            v-for="attachment in card.attachments"
            :key="attachment.id"
            class="set-attachment-cover"
          ></button>
        </div>
        <button
          @click="setCoverImg(url)"
          :style="{ backgroundImage: 'url(' + url + ')' }"
          class="cover-btn-pick-img"
          v-for="url in coverImgsUrls"
          :key="url"
        ></button>
      </div>
      <div
        v-if="isCoverOn"
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

      <div>
        <div class="flex column">
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
                <div
                  class="label-btn"
                  v-for="label in labelsToShow"
                  :key="label.id"
                  @click="openLabelsMenu($event)"
                >
                  <span :style="labelColor(label.color)">{{
                    label.title
                  }}</span>
                </div>

                <button class="add-label-btn" @click="openLabelsMenu($event)">
                  +
                </button>

                <!-- <labels-menu @setLabel="setLabel($event)" v-if="isLabelMenuOpen"/> -->
                <div
                  ref="labelsMenu"
                  v-if="isLabelMenuOpen"
                  class="labels-menu"
                >
                  <header class="menu-header flex">
                    <span>Labels</span>
                    <button
                      class="close-label-menu"
                      @click="isLabelMenuOpen = false"
                    >
                      X
                    </button>
                  </header>

                  <main class="main-labels-content">
                    <input
                      class="search-labels"
                      type="text"
                      placeholder="Search labels..."
                    />
                    <h3>Labels</h3>
                    <div
                      class="label-picker flex space-between align-center"
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

                <!-- <button @click="onChecklist">+Checklist</button> -->
                <checklist-menu
                  :getCurrPos="getCurrPos"
                  :newChecklist="newChecklist"
                  @addChecklist="addChecklist"
                  @closeChecklistMenu="isChecklistMenuOpen = false"
                  v-if="isChecklistMenuOpen"
                />
              </div>

              <action-description />

              <div class="checklist-container">
                <article
                  v-for="(checklist, idx) in card.checklists"
                  :key="checklist.id"
                >
                  <action-checklist
                    @saveChecklist="saveChecklist"
                    @removeChecklist="removeChecklist"
                    :checklist="checklist"
                    :idx="idx"
                  />
                </article>
              </div>
            </div>

            <div>
              <card-actions
                :isCoverOn="isCoverOn"
                @openChecklistMenu="isChecklistMenuOpen = true"
                @openLabelsMenu="isLabelMenuOpen = true"
                @openCoverMenu="isCoverMenuOpen = true"
              />
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
import checklistMenu from '../cmps/checklist.menu.vue'
import { boardService } from '../services/board.service'

export default {
  name: 'cardDetails',
  components: {
    actionChecklist,
    cardActions,
    labelsMenu,
    actionDescription,
    checklistMenu,
  },
  data() {
    return {
      isLabelMenuOpen: false,
      isCoverMenuOpen: false,
      isChecklistMenuOpen: false,
      labelMenuX: null,
      coverShow: null,
      newChecklist: null,
      isCoverOn: null,
      colors: [
        '#7BC86C',
        '#F5DD29',
        '#FFAF3F',
        '#EF7564',
        '#CD8DE5',
        '#5BA4CF',
        '#29CCE5',
        '#6DECA9',
        '#FF8ED4',
        '#172B4D',
      ],
      coverImgsUrls: [
        'https://images.unsplash.com/photo-1603955389958-8ab4c2025b71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1477884213360-7e9d7dcc1e48?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1568043210943-0e8aac4b9734?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        'https://images.unsplash.com/photo-1455218873509-8097305ee378?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjN8fG5hdHVyZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=500&q=60',
        'https://images.unsplash.com/photo-1490730141103-6cac27aaab94?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
      ],
    }
  },
  methods: {
    // openMenu(action) {

    //   for (let action in this.menu) {
    //     this.menu[action] = false
    //     if (action === modalAction) {
    //       console.log(action);
    //       // this.isModal[action] = true
    //     }
    //   }
    // },
    labelColor(color) {
      return { backgroundColor: color }
    },
    labelSelected(labelId) {
      if (this.card.labelIds.includes(labelId)) return true
      else return false
    },
    sendToSave(newCard) {
      const pos = this.getCurrPos
      this.board.groups[pos.groupIdx].cards[pos.cardIdx] = newCard
      this.$store.dispatch({
        type: 'saveBoard',
        board: JSON.parse(JSON.stringify(this.board)),
      })
    },
    setLabel(newLabel, active) {
      if (!active) {
        this.card.labelIds.push(newLabel.id)
      } else {
        const labelIdx = this.card.labelIds.findIndex(
          (id) => newLabel.id === id,
        )
        this.card.labelIds.splice(labelIdx, 1)
      }
      this.sendToSave(this.card)
    },
    openLabelsMenu(ev) {
      this.isLabelMenuOpen = true
      this.labelMenuX = ev.pageX - ev.offsetX
      console.log(this.labelMenuX)
    },

    addChecklist(newChecklist) {
      if (!this.card.checklists) this.card.checklists = []
      this.card.checklists.push(newChecklist)
      this.isChecklistMenuOpen = false
      console.log(this.card);
      this.sendToSave(this.card)
    },
    saveChecklist({ info }) {
      this.card.checklists.splice(info.idx, 1, info.checklist)
      this.sendToSave(this.card)
    },
    removeChecklist(idx) {
      this.card.checklists.splice(idx, 1)
      this.sendToSave(this.card)
    },
    setCoverColor(color) {
      this.card.style.bgImg = null
      this.card.style.bgColor = color
      this.isCoverOn = true
      this.sendToSave(this.card)
    },
    setFullCover(isFull) {
      this.card.style.isFull = isFull
      this.sendToSave(this.card)
    },
    setCoverMode(isDarkMode) {
      this.card.style.isDarkMode = isDarkMode
      this.sendToSave(this.card)
    },
    setCoverImg(url) {
      this.card.style.bgColor = null
      this.card.style.bgImg = url
      this.isCoverOn = true
      this.sendToSave(this.card)
    },
    removeCover() {
      this.card.style = { isFull: false, bgColor: null, bgImg: null }
      this.sendToSave(this.card)
    },
    
    coverSize(isFull) {
      return isFull ? 'cover-full' : 'cover-half'
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
    labelsToPick() {
      return this.board.labels
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
    setCoverSizeStyle() {
      if (this.card.style.bgColor) {
        return { backgroundColor: this.card.style.bgColor }
      } else if (this.card.style.bgImg) {
        return { backgroundImage: 'url(' + this.card.style.bgImg + ')' }
      }
    },
    board() {
      return JSON.parse(JSON.stringify(this.$store.getters.currBoard))
    },
    group() {
      const { groupId } = this.$route.params
      return JSON.parse(
        JSON.stringify(this.board.groups.find((group) => group.id === groupId)),
      )
    },
    card() {
      const { cardId } = this.$route.params
      return JSON.parse(
        JSON.stringify(this.group.cards.find((card) => card.id === cardId)),
      )
    },
    isCoverActive() {
      if (this.card.style.bgColor || this.card.style.bgImg) return true
      return false
    },
  },
  created() {
    this.newChecklist = boardService.getEmptyChecklist()
    this.isCoverOn = this.isCoverActive
  },
}
</script>
