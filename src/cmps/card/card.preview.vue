<template>
  <section @click="setCurrGroup" class="card-preview">
    <div
      v-if="card.style.bgColor || card.style.bgImg"
      class="card-preview-cover"
    >
      <div :class="showCardCoverClass" :style="showCardCover"></div>
      <button class="edit-icon-btn"><span class="edit-icon"></span></button>
    </div>
    <div class="card-preview-details">
      <div v-if="isCardLabels" class="card-preview-labels">
        <div
          class="show-labels-container"
          v-if="this.$store.getters.isLabelsOpen"
        >
          <span
            @mouseenter="isLabelHover = true"
            @mouseleave="isLabelHover = false"
            class="label-preview-show"
            @click.stop="toggleLabels"
            v-for="label in cardLabels"
            :style="{
              backgroundColor: isLabelHover
                ? LightenDarkenColor(label.color)
                : label.color,
            }"
            :key="label.id"
            >{{ label.title }}</span
          >
        </div>
        <div v-else class="hide-labels-container flex">
          <span
            @mouseenter="isLabelHover = true"
            @mouseleave="isLabelHover = false"
            class="label-preview-show label-preview-hide"
            @click.stop="toggleLabels"
            v-for="label in cardLabels"
            :style="{
              backgroundColor: isLabelHover
                ? LightenDarkenColor(label.color)
                : label.color,
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

      <div v-if="haveActions" class="flex align-center">
        <div
          @mouseenter="hoverDue = true"
          @mouseleave="hoverDue = false"
          v-if="isHavingDueDate"
          class="duedate-preview"
          :style="dueDateStyle"
        >
          <span v-if="!hoverDue" class="clock-icon"></span>
          <span
            v-if="hoverDue"
            @click.stop="toggleDueDate"
            class="unchecked-icon"
            ><span v-if="isDueDateDone" class="check-icon"></span
          ></span>
          <span class="duedate-txt">{{ dueDateTxt }}</span>
        </div>

        <div class="card-attachment-count flex" v-if="isHavingAttachments">
          <span class="attach-icon"></span>
          <span class="count">{{ attachmentCount }}</span>
        </div>
        <div
          :class="isTodosDone"
          v-if="isHavingTodos"
          class="card-checklist-count flex align-center"
        >
          <span class="checklist-icon"></span>
          <span class="count" :class="isTodosDone">{{ checklistCount }}</span>
        </div>
      </div>
    </div>

    <!-- MEMBERS LIST -->
    <!-- <div class="members-list card-preview">
      <avatar-list :card="card"></avatar-list>
    </div> -->
  </section>
</template>
<script>
import membersList from '../members.list.vue'
import avatarList from './avatar.list.vue'
export default {
  name: 'cardPreview',
  props: {
    card: Object,
    idx: Number,
  },
  components: {
    membersList,
    avatarList,
  },
  data() {
    return {
      board: null,
      group: null,
      showCardMenu: false,
      isLabelsOpen: this.$store.getters.isLabelsOpen,
      isLabelHover: false,
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
    LightenDarkenColor(col, amt = -30) {
      col = col.split('#')[1]
      col = parseInt(col, 16)
      return (
        '#' +
        (
          ((col & 0x0000ff) + amt) |
          ((((col >> 8) & 0x00ff) + amt) << 8) |
          (((col >> 16) + amt) << 16)
        ).toString(16)
      )
    },
    removeCard(cardId) {
      console.log(cardId)
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
    dueDateStyle(){
      
      const now = new Date()
      const dueDate = this.card.dueDate
      if (dueDate.isDone) return { backgroundColor: '#61BD4F', color: '#fff' }
      else if (dueDate.timestamp < now)
        return { backgroundColor: '#EB5A46', color: '#fff' }
      else if (dueDate.timestamp - now < 86000000)
        return { backgroundColor: '#F2D600', color: '#000' }
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
      if (this.card.style.bgImg)
        return { backgroundImage: 'url(' + this.card.style.bgImg + ')' }
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
      const labelsToShow = labels.filter((label) =>
        this.card.labelIds.includes(label.id),
      )
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
  },
  created() {
    // console.log(this.card);
    this.board = this.$store.getters.currBoard
    this.group = this.$store.getters.currGroup
    this.isLabelsOpen = this.board.labelsOpen
  },
}
</script>

<style></style>
