<template>
  <section v-if="group" class="group-container">
    <div v-if="group" class="group">
      <div class="g-header">
        <div @click="onTitleEditable" class="edit-group-title">
          <span v-if="!isTitleEditable">{{ group.title }}</span>
          <Transition>
            <textarea
              v-if="isTitleEditable"
              @keydown.enter.prevent="updateGroupTitle"
              v-model="group.title"
              v-focus
              @blur="isTitleEditable = false"
              ref="contentTextArea"
              id="contentTextArea"
            ></textarea>
          </Transition>
        </div>

        <div class="g-menu fa">
          <button class="g-menu-btn" @click="isOpenMenu = !isOpenMenu">
            <span class="menu-icon"></span>
          </button>
        </div>
      </div>

      <div class="g-modal modal" v-if="isOpenMenu">
        <div class="g-modal-header m-header">
          <div class="close icon" @click="isOpenMenu = false"></div>
          <header>List actions</header>
        </div>

        <div @click="removeGroup(group.id)" class="g-modal-list">
          <div>
            <div class="g-modal-content content">Archive list</div>
          </div>
        </div>
      </div>

      <div class="card-list-container flex column">
        <card-list
          :currGroup="group"
          :cards="group.cards"
          @groupsQ="$emit('onCardMove', $event)"
          @removeCard="$emit('removeCard', $event)"
          @dragLeave="$emit('dragLeave', $event)"
          :updateGroup="updateGroup"
        />
      </div>

      <div class="g-footer flex space-between">
        <div class="g-footer-add-area">
          <div @click="onOpenTextarea" v-if="!isEditable" class="g-footer-title-icon">
            <span class="add-icon"></span><span class="g-footer-title">Add a card</span>
          </div>
          <div v-if="!isEditable" class="g-template-icon">
            <span class="template-icon"></span>
          </div>
        </div>
        <Transition name="slide-fade">
          <div class="g-footer-textarea-container" v-if="isEditable">
            <textarea
              @blur="updateGroup"
              v-focus
              class="g-footer-textarea"
              id="textarea"
              ref="textarea"
              cols="30"
              rows="30"
              placeholder="Enter a title for this card..."
              @keydown.enter.prevent="updateGroup"
            ></textarea>
            <div class="add-card inner">
              <button @click.stop="updateGroup">Add card</button
              ><span class="close-icon-span">
                <span @click="onCloseTextarea" class="close-icon"></span>
              </span>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  </section>
</template>

<script>
import cardList from '@/cmps/card/card.list.vue'
import appModal from '../cmps/app.modal.vue'
export default {
  name: 'groupPreview',
  props: {
    group: Object,
  },
  components: { cardList, appModal },
  data() {
    return {
      isEditable: false,
      isTitleEditable: false,
      isOpenMenu: false,
      newCard: {},
      groupToEdit: {},
      groupId: null,
    }
  },
  methods: {
    updateGroup() {
      this.newCard.title = this.$refs.textarea.value
      // this.newCard.members.push(this.loggedUser)
      if (this.newCard.title === '') {
        this.isEditable = false
        return
      }
      const updateGroup = {
        ...this.group,
        cards: [...this.group.cards, { ...this.newCard }],
      }
      this.$emit('updateGroup', updateGroup)
      this.$refs.textarea.value = ''
      this.newCard = this.$store.getters.emptyCard
      setTimeout(() => {
        this.$refs.textarea.focus()
      })
    },
    updateGroupTitle() {
      this.isTitleEditable = false
      if (this.group.title === '') return
      this.group.title = this.$refs.contentTextArea.value
      this.$emit('updateGroupTitle', this.group)
    },
    removeGroup(groupId) {
      this.$emit('removeGroup', groupId)
    },
    onOpenTextarea() {
      this.isEditable = true
      setTimeout(() => {
        this.$refs.textarea.focus()
      })
    },
    onCloseTextarea() {
      this.isEditable = false
    },
    onTitleEditable() {
      this.isTitleEditable = true
    },
  },
  computed: {
    menu() {
      return this.$store.getters.menu
    },
    loggedUser(){
      return this.$store.getters.loggedUser
    }
  },
  created() {
    this.newCard = this.$store.getters.emptyCard
    this.groupToEdit = this.$store.getters.emptyCard
  },
}
</script>
<style>
.slide-fade-enter-active {
  transition: all 0.1s ease-out;
}

.slide-fade-leave-active {
  transition: none;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-10px);
  opacity: 0;
}
</style>


