<template>
  <div v-if="card" @click.self="backToBoard" class="card-details-container">
    <section class="card-details flex column">
      <div class="close-details-container flex">
        <router-link class="close-details-btn flex" :to="'/board/' + board._id"
          ><span @click="closeMenu" class="close-icon"></span>
        </router-link>
      </div>

      <div
        v-if="isCoverActive"
        ref="imgEl"
        :style="cardCoverStyle"
        :class="cardCoverClass"
        class="card-cover"
      >
        <div :style="{ backgroundColor: coverColorComputed }" class="cover-screen"></div>
        <div class="cover-menu-container">
          <div class="cover-menu-btn flex align-center" @click="openMenu('cover')">
            <span class="cover-icon"></span
            ><span v-if="isCover" class="cover-btn-title">Cover</span>
            <menu-cover
              v-if="previewMenuOpen"
              @attachFile="attachFile"
              @setCoverColor="sendToSave"
              @setFullCover="sendToSave"
              @setCoverMode="sendToSave"
              @setCoverImg="sendToSave"
              @removeCover="sendToSave"
              :card="card"
            ></menu-cover>
          </div>
        </div>
      </div>
      <div>
        <div class="flex column">
          <div class="card-header flex">
            <div class="actionImg flex"><span class="tablet-icon"></span></div>
            <div class="in-list-txt">
              <h1 @click="openInputTitle" v-if="!cardTitleEdit">
                {{ card.title }}
              </h1>
              <input
                v-if="cardTitleEdit"
                ref="inputTitle"
                @blur="cardTitleEdit = false"
                class="card-title-edit"
                v-model="card.title"
                @change="sendToSave(card)"
                type="text"
              />
              in list
              <span class="group-title" @click="isMoveModalOpen = true">{{ group.title }}</span>
            </div>
          </div>

          <div class="card-details-content flex space-between">
            <div class="details-column flex column">
              <div class="sub-header-details flex">
                <!-- MEMBERS LIST PREVIEW -->

                <div v-if="cardMembersCheck" class="members-list">
                  <header>Members</header>
                  <!-- <members-list
                    :card="card"
                    @sendtosave="sendToSave"
                    @closemenu="closeMenu"
                  /> -->
                  <!-- <avatar-list :members="cardMembers"></avatar-list> -->

                  <div class="avatars">
                    <div
                      class="avatar"
                      v-for="member in cardMembers"
                      :key="member._id"
                      :style="{ backgroundImage: `url(${member.avatar.imgUrl})` }"
                    >
                      <span></span>
                    </div>
                  </div>
                </div>

                <div v-if="isLabels" class="labels-preview-container">
                  <h3 class="labels-header">Labels</h3>
                  <div class="labels-preview flex">
                    <div
                      class="label-btn"
                      v-for="label in labelsToShow"
                      :style="labelColor(label.color)"
                      :key="label.id"
                      @click="openLabelsMenu($event)"
                    >
                      <!-- LABELS MENU -->
                      <span class="labels-title">{{ label.title }}</span>
                    </div>

                    <button class="add-icon" @click="openMenu('previewLabels')"></button>
                    <div class="preview">
                      <labels-menu
                        v-if="previewMenuOpen"
                        :labels="board.labels"
                        :card="card"
                        @setLabel="sendToSave"
                        @closeLabelsMenu="isLabelMenuOpen = false"
                      />
                    </div>
                  </div>
                </div>

                <!-- DUE DATE -->
                <div v-if="isDueDate" class="card-due-date flex column">
                  <h3 class="duedate-header">Due date</h3>
                  <div class="flex">
                    <input
                      :checked="card.dueDate.isDone"
                      class="due-date-check"
                      type="checkbox"
                      @change="toggleDueDate(card.dueDate)"
                    />
                    <span class="check-mark"></span>
                    <button class="due-date-container">
                      <span class="due-date-txt">{{ dueDateTxt }}</span>
                      <span :style="dateLabelStyle" class="due-date-label">{{ dateLabel }}</span>
                      <span class="due-date-arrow"><img src="/src/styles/svgs/arrow.svg" /></span>
                    </button>
                  </div>
                </div>
              </div>

              <checklist-menu
                :getCurrPos="getCurrPos"
                :newChecklist="newChecklist"
                @addChecklist="addChecklist"
                @closeChecklistMenu="isChecklistMenuOpen = false"
                v-if="isChecklistMenuOpen"
              />

              <action-description :card="card" @saveCard="sendToSave" />

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
                    @setEditMenu="setEditMenu"
                    @updateAttachment="updateAttachment"
                    @removeAttachment="removeAttachment"
                  />
                </div>
                <button @click="isMenu = false" class="add-attach-btn">
                  Add an attachment
                  <menu-attachments class="from-details" />
                </button>
              </div>

              <div class="checklist-container">
                <Container
                  orientation="vertical"
                  behaviour="move"
                  class=""
                  drag-class=""
                  drop-class=""
                  group-name="checklist-1"
                  lock-axis="y"
                  :drop-placeholder="dropPlaceholderOptions"
                  @drop="onDrop(card.checklists, $event)"
                >
                  <Draggable v-for="(checklist, idx) in card.checklists" :key="checklist.id">
                    <action-checklist
                      @saveChecklist="saveChecklist"
                      @removeChecklist="removeChecklist"
                      @checklistQ="moveChecklistQ"
                      @sendtosave="sendToSave"
                      @dragLeave="dragLeave"
                      :checklist="checklist"
                      :idx="idx"
                      :card="card"
                    />
                  </Draggable>
                </Container>
              </div>
            </div>

            <div>
              <card-actions
                :isCoverOn="isCoverOn"
                @openChecklistMenu="isChecklistMenuOpen = true"
                @openLabelsMenu="isLabelMenuOpen = true"
                @openCoverMenu="isCoverMenuOpen = true"
                :card="card"
                @attachFile="attachFile"
                @setCoverColor="sendToSave"
                @setFullCover="sendToSave"
                @setCoverMode="sendToSave"
                @setCoverImg="sendToSave"
                @removeCover="sendToSave"
                @setLabel="sendToSave"
                @createLabel="createLabel"
                @sendToSave="sendToSave"
                @setDate="setDate"
                @removeDate="removeDate"
                @removeCard="removeCard"
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
import attachmentsPreview from '../cmps/card/attachments.preview.vue'
import menuAttachments from '../cmps/card/menu.attachments.vue'
import moveCardModal from '../cmps/move.card.modal.vue'
import { Container, Draggable } from 'vue3-smooth-dnd'
import menuCover from '../cmps/menu.cover.vue'
import menuMembers from '../cmps/menu/menu.members.vue'
import membersList from '../cmps/members.list.vue'
import { FastAverageColor } from 'fast-average-color'
import avatarList from '../cmps/card/avatar.list.vue'
export default {
  name: 'cardDetails',
  components: {
    actionChecklist,
    cardActions,
    labelsMenu,
    actionDescription,
    checklistMenu,
    attachmentsPreview,
    menuAttachments,
    moveCardModal,
    Container,
    Draggable,
    menuCover,
    menuMembers,
    membersList,
    avatarList,
  },
  data() {
    return {
      cardMembersCheck: [],
      isLabelMenuOpen: false,
      isCoverMenuOpen: false,
      isChecklistMenuOpen: false,
      coverShow: null,
      newChecklist: null,
      isCoverOn: null,
      isAttached: false,
      isMoveModalOpen: false,
      cardTitleEdit: false,
      checklistQ: [],
      dropPlaceholderOptions: {
        className: 'checklist-drag-preview',
        animationDuration: '150',
        showOnTop: true,
      },
      leavingCIdx: null,
      coverColor: '',
    }
  },
  methods: {
    backToBoard() {
      this.$router.push(`/board/${this.board._id}`)
    },
    removeCard(card) {
      this.$router.push(`/board/${this.board._id}`)
      const cardIdx = this.group.cards.findIndex((c) => c.id === card.id)
      const groupIdx = this.board.groups.findIndex((g) => g.id === this.group.id)
      this.board.groups[groupIdx].cards.splice(cardIdx, 1)
      this.$store.dispatch({ type: 'saveBoard', board: this.board })
    },
    closeMenu() {
      this.$store.commit({ type: 'closeMenu' })
    },
    saveDesc(desc) {
      this.card.description = desc
      this.sendToSave(this.card)
    },
    toggleDueDate() {
      this.card.dueDate.isDone = !this.card.dueDate.isDone
      this.sendToSave(this.card)
    },
    setDate(dueDate) {
      if (!dueDate) return
      this.card.dueDate = dueDate
      this.sendToSave(this.card)
    },
    removeDate() {
      this.card.dueDate = null
      this.sendToSave(this.card)
    },
    backToBoard() {
      this.$router.push(`/board/${this.board._id}`)
    },
    onDrop(cardChecklists, dropResult) {
      const newChecklists = this.applyDrag(cardChecklists, dropResult)
      const newCard = { ...this.card, checklists: [...newChecklists] }
      this.sendToSave(newCard)
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
    moveChecklistQ(newChecklist) {
      const card = this.card
      this.checklistQ.push(newChecklist)
      if (this.checklistQ.length === 2) {
        this.checklistQ.forEach((checklist) => {
          const checklistIdx = card.checklists.findIndex((c) => c.id === checklist.id)
          card.checklists.splice(checklistIdx, 1, checklist)
        })
        this.sendToSave(card)
        this.leavingCIdx = null
        this.checklistQ = []
        return
      }
      if (!this.leavingCIdx) {
        this.checklistQ.forEach((checklist) => {
          const checklistIdx = card.checklists.findIndex((c) => c.id === checklist.id)
          card.checklists.splice(checklistIdx, 1, checklist)
        })
        this.sendToSave(card)
        this.leavingCIdx = null
        this.checklistQ = []
        return
      }
    },
    dragLeave(cIdx) {
      this.leavingCIdx = cIdx
    },
    labelColor(color) {
      return { backgroundColor: color }
    },
    createLabel(newLabel) {
      this.board.labels.push(newLabel)
      this.$store.dispatch({
        type: 'saveBoard',
        board: { ...this.board },
      })
    },
    openInputTitle() {
      this.cardTitleEdit = true
      setTimeout(() => {
        this.$refs.inputTitle.focus()
      }, 0)
    },

    sendToSave(newCard) {
      this.coverColor = this.coverRelativeColor
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
      this.card.style.bgImg = file.url
      this.sendToSave(this.card)
    },
    setEditMenu() {
      this.card.attachments.forEach((attachment) => {
        attachment.isEdit = false
      })
    },
    updateAttachment(updatedAttachment) {
      const idx = this.card.attachments.findIndex((attachment) => {
        return attachment.id === updatedAttachment.id
      })
      this.card.attachments.splice(idx, 1, updatedAttachment)
      this.sendToSave(this.card)
    },
    removeAttachment(attachmentId) {
      const idx = this.card.attachments.findIndex((attachment) => {
        return attachment.id === attachmentId
      })
      this.card.attachments.splice(idx, 1)
      this.sendToSave(this.card)
    },
    openMenu(menuAction) {
      this.$store.commit({ type: 'openMenu', menuAction })
      if (menuAction !== 'cover') {
        this.$store.commit({ type: 'openMenu', menuAction: 'labels' })
      }
      this.$store.commit({ type: 'setPreviewMenuStatus', status: true })
    },
    closeMenu() {
      this.$store.commit({ type: 'closeMenu' })
    },
  },
  computed: {
    isLabels() {
      if (this.card.labelIds.length) return true
      return false
    },
    isDueDate() {
      if (this.card.dueDate) return true
      return false
    },
    isMembers() {
      if (this.card.members.length) return true
      return false
    },
    dateLabelStyle() {
      const now = new Date()
      const dueDate = this.card.dueDate
      if (dueDate.isDone) return { backgroundColor: '#61BD4F', color: '#fff' }
      else if (dueDate.timestamp - now < -86000000)
        return { backgroundColor: '#ec9488', color: '#fff' }
      else if (dueDate.timestamp < now) return { backgroundColor: '#EB5A46', color: '#fff' }
      else if (dueDate.timestamp - now < 86000000)
        return { backgroundColor: '#F2D600', color: '#000' }
    },
    dateLabel() {
      const now = new Date()
      const dueDate = this.card.dueDate
      if (dueDate.isDone) return 'complete'
      else if (dueDate.timestamp < now) return 'overdue'
      else if (dueDate.timestamp - now < 86000000) return 'due soon'
    },
    dueDateTxt() {
      const now = new Date()
      const dueDate = this.card.dueDate
      if (dueDate.timestamp - now < -86000000) {
        return dueDate.txt
      } else if (dueDate.timestamp - now < 0) {
        return `yesterday at ${dueDate.hours}:${dueDate.minutes}`
      } else if (dueDate.timestamp - now < 86000000) {
        return `today at ${dueDate.hours}:${dueDate.minutes}`
      } else if (dueDate.timestamp - now < 86000000 * 2) {
        return `tomorrow at ${dueDate.hours}:${dueDate.minutes}`
      } else return dueDate.txt
    },
    previewMenuOpen() {
      return this.$store.getters.previewMenuStatus
    },
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
      if (this.card.style.bgImg) return { backgroundImage: 'url(' + this.card.style.bgImg + ')' }
      else return { backgroundColor: this.card.style.bgColor }
    },
    cardCoverClass() {
      if (this.card.style.bgImg) return 'card-cover-img'
      else return 'card-cover-color'
    },

    getCurrPos() {
      const boardIdx = this.boards.findIndex((board) => board._id === this.board._id)
      const cardIdx = this.group.cards.findIndex((card) => card.id === this.card.id)
      const groupIdx = this.board.groups.findIndex((group) => group.id === this.group.id)
      return {
        cardIdx,
        groupIdx,
        boardIdx,
      }
    },
    boards() {
      return JSON.parse(JSON.stringify(this.$store.getters.boards))
    },
    board() {
      return JSON.parse(JSON.stringify(this.$store.getters.currBoard))
    },
    group() {
      const { groupId } = this.$route.params
      return JSON.parse(JSON.stringify(this.board.groups.find((group) => group.id === groupId)))
    },
    card() {
      const { cardId } = this.$route.params
      return JSON.parse(JSON.stringify(this.group.cards.find((card) => card.id === cardId)))
    },
    cardMembers() {
      const { cardId } = this.$route.params
      return this.group.cards.find((card) => card.id === cardId).members
    },
    isCoverActive() {
      if (this.card.style.bgColor || this.card.style.bgImg) return true
      return false
    },
    menu() {
      return this.$store.getters.menu
    },
    isCover() {
      return this.$store.getters.isCover
    },
    coverRelativeColor() {
      if (!this.card.style.bgImg) {
        return
      }
      if (!this.card.style || !this.card.style.bgImg) return
      const imgUrl = this.card.style.bgImg
      const fac = new FastAverageColor()
      fac
        .getColorAsync(imgUrl)
        .then((color) => {
          return (this.coverColor = color.hexa)
        })
        .catch((e) => {
          return
        })
    },
    coverColorComputed() {
      return this.coverColor
    },
    cardMembersCheckL() {
      return this.cardMembersCheck
    },
  },
  created() {
    this.coverColor = this.coverRelativeColor
    this.newChecklist = boardService.getEmptyChecklist()
    this.isCoverOn = this.isCoverActive
    this.$store.commit({ type: 'setIsCover', status: this.isCoverOn })
    this.$store.commit({
      type: 'setEditMenu',
      attachments: this.card.attachments,
    })
    this.card.members = []
  },
  mounted() {
    const { cardId } = this.$route.params
    const card = this.group.cards.find((card) => card.id === cardId)
    this.$store.commit({ type: 'setCurrCard', card })
    this.$store.commit({ type: 'setCardMembersIds', card })
    this.cardMembersCheck = card.members
  },
}
</script>
