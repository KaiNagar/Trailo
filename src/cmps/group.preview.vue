<template>
  <section v-if="group" class="group">
    <div @click="onTitleEditable" class="g-header">
      <div class="edit-group-title">
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
        <span class="menu-icon"></span>
      </div>
    </div>
    <div>
      <card-list :cards="group.cards" :updateGroup="updateGroup" />
    </div>

    <div class="g-footer flex space-between">
      <div class="g-footer-add-area">
        <div @click="onOpenTextarea" v-if="!isEditable" class="g-footer-title-icon">
          <span class="add-icon"></span><span class="g-footer-title">Add a card</span>
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
    </div>
  </section>
</template>

<script>
import cardList from '@/cmps/card/card.list.vue'
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
      newCard: {},
      groupToEdit: {},
    }
  },
  methods: {
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
  computed: {},
  created() {
    this.$store.commit({ type: 'setCurrGroup', groupId: this.group.id })
    this.newCard = this.$store.getters.emptyCard
    this.groupToEdit = this.$store.getters.emptyCard
  },
}
</script>
