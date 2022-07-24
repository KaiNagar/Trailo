<template>
  <div v-if="card" class="card-details-container">
    <section class="card-details flex column">
      <div class="close-details-container flex">
        <router-link class="close-details-btn flex" :to="'/board/' + board._id"
          ><span class="close-icon"></span
        ></router-link>
      </div>

      <cover-menu
        :card="card"
        @closeCoverMenu="isCoverMenuOpen = false"
        @setCoverColor="sendToSave"
        @setFullCover="sendToSave"
        @setCoverMode="sendToSave"
        @setCoverImg="sendToSave"
        @removeCover="sendToSave"
        v-if="isCoverMenuOpen"
      />

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
            <span class="cover-icon"></span>Cover
          </button>
        </div>
      </div>

      <div>
        <div class="flex column">
          <div class="card-header flex">
            <div class="actionImg flex"><span class="tablet-icon"></span></div>
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

                <button
                  class="add-icon"
                  @click="openLabelsMenu($event)"
                ></button>

                <labels-menu
                  :labels="board.labels"
                  :card="card"
                  @setLabel="sendToSave"
                  @closeLabelsMenu="isLabelMenuOpen = false"
                  v-if="isLabelMenuOpen"
                />

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

              <div v-if="card.attachments" class="card-attachments-container">
                <header class="attch-preview-header">
                  <span class="title">Attachments</span>
                  <span class="attach-icon"></span>
                </header>

                <div
                  class="card-attachment-preview"
                  v-for="file in card.attachments"
                  :key="file.id"
                >
                  <attachments-preview
                    @makeOrRemove="sendToSave"
                    :file="file"
                    :card="card"
                  />
                </div>
                <button class="add-attach-btn">Add an attachment</button>
              </div>

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
                @attachFile="attachFile"
                :card="card"

                @setCoverColor="sendToSave"
                @setFullCover="sendToSave"
                @setCoverMode="sendToSave"
                @setCoverImg="sendToSave"
                @removeCover="sendToSave"
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
import coverMenu from '../cmps/cover.menu.vue'
import { boardService } from '../services/board.service'
import attachmentsPreview from '../cmps/card/attachments.preview.vue'
import menuAttachments from '../cmps/card/action.attachments.vue'
export default {
  name: 'cardDetails',
  components: {
    actionChecklist,
    cardActions,
    labelsMenu,
    actionDescription,
    checklistMenu,
    attachmentsPreview,
    coverMenu,
    menuAttachments,
  },
  data() {
    return {
      isLabelMenuOpen: false,
      isCoverMenuOpen: false,
      isChecklistMenuOpen: false,
      coverShow: null,
      newChecklist: null,
      isCoverOn: null,
    }
  },
  methods: {
    labelColor(color) {
      return { backgroundColor: color }
    },

    sendToSave(newCard) {
      const pos = this.getCurrPos
      this.board.groups[pos.groupIdx].cards[pos.cardIdx] = newCard
      this.$store.dispatch({
        type: 'saveBoard',
        board: { ...this.board },
      })
    },

    openLabelsMenu(ev) {
      this.isLabelMenuOpen = true
    },
    makeFileCover(file) {
      this.card.style.bgColor = null
      this.card.style.bgImg = file.url
      this.sendToSave(this.card)
    },

    addChecklist(newChecklist) {
      if (!this.card.checklists) this.card.checklists = []
      this.card.checklists.push(newChecklist)
      this.isChecklistMenuOpen = false
      this.newChecklist = boardService.getEmptyChecklist()
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
    attachFile(file) {
      if (!this.card.attachments) this.card.attachments = []
      this.card.attachments.push(file)
      console.log(this.card.attachments)
      this.sendToSave(this.card)
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
    // this.card.attachments = [
    //   {
    //     id: 'a101',
    //     title: 'blabla',
    //     url: 'https://images.unsplash.com/photo-1603955389958-8ab4c2025b71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
    //   },
    // ]
  },
}
</script>
