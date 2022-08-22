<template>
  <section @click="setCurrGroup" class="card-preview">
    <div v-if="card.style.bgColor || card.style.bgImg" class="card-preview-cover">
      <div :class="showCardCoverClass" :style="showCardCover"></div>
      <button class="edit-icon-btn"><span class="edit-icon"></span></button>
    </div>
    <div class="card-preview-details">
      <div v-if="isCardLabels" class="card-preview-labels">
        <div class="show-labels-container" v-if="this.$store.getters.isLabelsOpen">
          <span
            class="label-preview-show"
            @click.stop="toggleLabels"
            v-for="label in cardLabels"
            :style="{
              backgroundColor: label.color,
            }"
            :key="label.id"
            >{{ label.title }}</span
          >
        </div>

        <div v-else class="hide-labels-container flex">
          <span
            class="label-preview-hide"
            @click.stop="toggleLabels"
            v-for="label in cardLabels"
            :style="{
              backgroundColor: label.color,
            }"
            :key="label.id"
          ></span>
        </div>
      </div>
      <div class="card-title">
        <span>{{ card.title }}</span>
        <button class="edit-icon-btn" @click.stop="showCardMenu = true">
          <span class="edit-icon"></span>
        </button>
      </div>
      <div v-if="showCardMenu">
        <button @click.stop="removeCard(card.id)">Archive</button>
      </div>

      <div v-if="haveActions" class="actions-container flex align-center space-between">
        <div class="flex space-between">
          <!-- DATES -->
          <div
            @mouseenter="hoverDue = true"
            @mouseleave="hoverDue = false"
            v-if="isHavingDueDate"
            class="duedate-preview"
            :style="dueDateStyle"
          >
            <span :style="dueDateStyle" v-if="!hoverDue" class="clock-icon"></span>
            <span
              v-if="hoverDue && !isDueDateDone"
              @click.stop="toggleDueDate"
              class="unchecked-icon"
              :style="dueDateStyle"
            ></span>
            <span
              v-if="isDueDateDone && hoverDue"
              @click.stop="toggleDueDate"
              class="checklist-icon"
              :style="dueDateStyle"
            ></span>
            <span class="duedate-txt">{{ dueDateTxt }}</span>
          </div>
          <!-- DESCRIPTION -->
          <div v-if="isHavingDesc" class="description-preview">
            <span class="description-icon"></span>
          </div>
          <!-- ATTACHMENTS -->
          <div class="card-attachment-count flex" v-if="isHavingAttachments">
            <span class="attach-icon"></span>
            <span class="count">{{ attachmentCount }}</span>
          </div>
          <!-- TODOS/CHECKLISTS -->
          <div
            :class="isTodosDone"
            v-if="isHavingTodos"
            class="card-checklist-count flex align-center"
          >
            <span class="checklist-icon"></span>
            <span class="count" :class="isTodosDone">{{ checklistCount }}</span>
          </div>
        </div>
        <!-- MEMBERS LIST -->
        <avatar-list class="avatar-list-card-preview" :members="card.members"></avatar-list>
      </div>
    </div>
  </section>
</template>
<script>
import membersList from '../members.list.vue'
import avatarList from './avatar.list.vue'
import cardAvatarList from './card.avatar.list.vue'
import cardMembers from '../user/card-members.vue'
export default {
  name: 'cardPreview',
  props: {
    card: Object,
    idx: Number,
  },
  components: {
    membersList,
    avatarList,
    cardAvatarList,
  },
  data() {
    return {
      board: null,
      group: null,
      showCardMenu: false,
      isLabelsOpen: this.$store.getters.isLabelsOpen,
      hoverDue: false,
    }
  },
  methods: {
    toggleLabels() {
      const newBoard = { ...this.$store.getters.currBoard }
      this.isLabelsOpen = !this.isLabelsOpen

      this.$store.commit({
        type: 'setIsLabelsOpen',
        isLabelsOpen: this.isLabelsOpen,
      })
      newBoard.labelsOpen = this.$store.getters.isLabelsOpen
      this.$store.dispatch({ type: 'saveBoard', board: newBoard })
    },
    removeCard(cardId) {
      this.$emit('removeCard', cardId)
    },
    toggleDueDate() {
      const card = JSON.parse(JSON.stringify(this.card))
      card.dueDate.isDone = !card.dueDate.isDone
      const info = {
        card,
        cardIdx: this.idx,
      }
      this.$emit('saveCard', info)
    },
  },
  computed: {
    isHavingDesc() {
      if (this.card.description) return true
      return false
    },
    dueDateStyle() {
      const now = new Date()
      const dueDate = this.card.dueDate
      if (!this.hoverDue) {
        if (dueDate.isDone) return { backgroundColor: '#61BD4F', color: '#fff' }
        else if (dueDate.timestamp - now < -86000000)
          return { backgroundColor: '#ec9488', color: '#fff' }
        else if (dueDate.timestamp < now) return { backgroundColor: '#eb5a46', color: '#fff' }
        else if (dueDate.timestamp - now < 86000000)
          return { backgroundColor: '#f2d600', color: '#fff' }
      } else {
        if (dueDate.isDone) return { backgroundColor: '#519839', color: '#fff' }
        else if (dueDate.timestamp - now < -86000000)
          return { backgroundColor: '#eb5a46', color: '#fff' }
        else if (dueDate.timestamp - now < 0) return { backgroundColor: '#b04632', color: '#fff' }
        else if (dueDate.timestamp - now < 86000000)
          return { backgroundColor: '#d9b51c', color: '#fff' }
      }
    },
    isDueDateDone() {
      return this.card.dueDate.isDone
    },
    isHavingDueDate() {
      if (this.card.dueDate) return true
      return false
    },
    dueDateTxt() {
      const dueDate = this.card.dueDate
      return `${dueDate.date} ${dueDate.month}`
    },
    showCardCover() {
      if (this.card.style.bgImg) return { backgroundImage: 'url(' + this.card.style.bgImg + ')' }
      return { backgroundColor: this.card.style.bgColor }
    },
    showCardCoverClass() {
      if (this.card.style.bgImg) return 'card-img'
      return 'card-color'
    },
    checklistCount() {
      const allTodos = this.card.checklists.reduce((acc, checklist) => {
        return acc + checklist.todos.length
      }, 0)
      if (allTodos === 0) return
      let dones = 0
      this.card.checklists.filter((checklist) => {
        dones += checklist.todos.filter((todo) => todo.isDone === true).length
      })
      return `${dones}/${allTodos}`
    },
    isTodosDone() {
      const allTodos = this.card.checklists.reduce((acc, checklist) => {
        return acc + checklist.todos.length
      }, 0)
      let dones = 0
      this.card.checklists.filter((checklist) => {
        dones += checklist.todos.filter((todo) => todo.isDone === true).length
      })
      if (allTodos === dones && allTodos !== 0) {
        return 'all-todos-done'
      }
    },
    isHavingTodos() {
      return this.card.checklists?.some((checklist) => checklist.todos.length)
    },
    isHavingAttachments() {
      return this.card.attachments?.length
    },
    toggleLabelsPreview() {
      return this.isLabelsOpen
    },
    cardLabels() {
      const labels = this.$store.getters.currBoard.labels
      const labelsToShow = labels.filter((label) => this.card.labelIds.includes(label.id))
      return labelsToShow
    },
    labelsStatus() {
      return this.isLabelsOpen ? true : false
    },
    attachmentCount() {
      return this.card?.attachments?.length
    },
    haveActions() {
      const card = this.card
      if (card.checklists || this.isHavingAttachments) return true
      return false
    },
    isCardLabels() {
      if (this.card.labelIds.length) return true
      return false
    },
    cardMembers() {
      return this.card.members
    },
  },
  created() {
    this.board = this.$store.getters.currBoard
    this.group = this.$store.getters.currGroup
    this.isLabelsOpen = this.board.labelsOpen
  },
}
</script>
