<template>
  <section v-if="group" class="group">
    <div class="g-header">
      <div @click="onTitleEditable" class="edit-group-title">
        <span v-if="!isTitleEditable">{{ group.title }}</span>
        <textarea
          v-if="isTitleEditable"
          @keydown.enter.prevent="updateGroupTitle"
          @blur="isTitleEditable = false"
          v-model="group.title"
          ref="contentTextArea"
          id="contentTextArea"
        ></textarea>
      </div>
      <div class="g-menu fa">
        <button class="g-menu-btn" @click="onOpenMenu = true">
          <!-- <button class="g-menu-btn" @click="openMenu('groupMenu')"> -->
          <span class="menu-icon"></span>
        </button>
        <button v-if="onOpenMenu" @click="removeGroup(group.id)">Archive list</button>
      </div>
    </div>
    <div>
      <div>
        <!-- <app-modal v-if="menu.create" @closeModal="closeMenu">
          <template #title>List actions</template>
          <template #part-1><header>Add card...</header></template>
          <template #part-2><header>Copy list...</header></template>
          <template #part-3><header>Move list...</header></template>
          <template #part-4><header>Archive this list</header></template>
        </app-modal> -->
      </div>
      <div class="card-list-container flex">
        <card-list
          :currGroup="group"
          :cards="group.cards"
          @groupsQ="$emit('onCardMove', $event)"
          @removeCard="$emit('removeCard', $event)"
          :updateGroup="updateGroup"
        />
      </div>
    </div>

    <div class="g-footer flex space-between">
      <div class="g-footer-add-area">
        <div @click="onOpenTextarea" v-if="!isEditable" class="g-footer-title-icon">
          <span class="add-icon"></span><span class="g-footer-title">Add a card</span>
        </div>
        <div v-if="!isEditable" class="g-template-icon">
          <span class="template-icon"></span>
        </div>
        <!-- <div v-if="isEditable">
          <textarea
            v-if="isTitleEditable"
            @keydown.enter.prevent="updateGroupTitle"
            @blur="isTitleEditable = false"
            v-model="group.title"
            ref="contentTextArea"
            id="contentTextArea"
          ></textarea>
        </div> -->
        <!-- <div class="g-menu fa">
          <span class="menu-icon"></span>
        </div>
      </div> -->
        <!-- <div class="card-list-container flex">
        <card-list
          :currGroup="group"
          :cards="group.cards"
          @groupsQ="$emit('onCardMove', $event)"
          :updateGroup="updateGroup"
        />
      </div>

      <div class="g-footer flex space-between">
        <div class="g-footer-add-area">
          <div
            @click="onOpenTextarea"
            v-if="!isEditable"
            class="g-footer-title-icon"
          >
            <span class="add-icon"></span
            ><span class="g-footer-title">Add a card</span>
          </div>
          <div v-if="!isEditable" class="g-template-icon">
            <span class="template-icon"></span>
          </div>
          <div v-if="isEditable">
            <textarea
              class="g-footer-textarea"
              id="textarea"
              ref="textarea"
              cols="30"
              rows="30"
              placeholder="Enter a title for this card..."
              @keydown.enter.prevent="updateGroup"
            ></textarea>
            <div class="add-card">
              <button @click="updateGroup">Add card</button
              ><span class="close-icon-span">
                <span @click="onCloseTextarea" class="close-icon"></span>
              </span>
            </div>
          </div>
        </div>
      </div> -->
      </div>
    </div>
  </section>
</template>

<script>
import cardList from '@/cmps/card/card.list.vue'
// import appModal from '../cmps/app.modal.vue'
export default {
  name: 'groupPreview',
  props: {
    group: Object,
  },
  components: { cardList },
  data() {
    return {
      isEditable: false,
      isTitleEditable: false,
      onOpenMenu: false,
      newCard: {},
      groupToEdit: {},
    }
  },
  methods: {
    removeGroup(groupId) {
      this.$emit('removeGroup', groupId)
    },
    updateGroup() {
      this.newCard.title = this.$refs.textarea.value
      if (this.newCard.title === '') return
      const updateGroup = {
        ...this.group,
        cards: [...this.group.cards, { ...this.newCard }],
      }
      this.$emit('updateGroup', updateGroup)
      this.$refs.textarea.value = ''
      this.newCard = this.$store.getters.emptyCard
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
      setTimeout(() => {
        this.$refs.contentTextArea.focus()
      })
    },
    updateGroupTitle() {
      this.isTitleEditable = false
      if (this.group.title === '') return
      this.group.title = this.$refs.contentTextArea.value
      this.$emit('updateGroupTitle', this.group)
    },
  },

  // openMenu(menuAction) {
  //   this.$store.commit({ type: 'openMenu', menuAction })
  // },
  closeMenu() {
    this.$store.commit({ type: 'closeMenu' })
  },
  computed: {
    menu() {
      return this.$store.getters.menu
    },
  },
  created() {
    this.newCard = this.$store.getters.emptyCard
    this.groupToEdit = this.$store.getters.emptyCard
  },
}
</script>
