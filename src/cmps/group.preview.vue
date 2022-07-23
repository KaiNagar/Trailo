<template>
  <section v-if="group" class="group">
    <div class="g-header">
      <!-- <div @click="onTitleEditable" class="edit-group-title"> -->
      <span>{{ group.title }}</span>
      <!-- <textarea
          v-else
          @blur="updateGroupTitle"
          @keydown.enter.prevent="updateGroupTitle"
          ref="contentTextArea"
          id="contentTextArea"
          cols="30"
          rows="10"
        ></textarea>
      </div> -->
      <div class="g-menu fa">
        <img src="../assets/icons/icons-more.png" alt="" />
      </div>
    </div>
    <div>
      <card-list :cards="group.cards" :updateGroup="updateGroup" />
    </div>

    <div class="g-footer flex space-between">
      <div class="g-footer-add-area">
        <span @click="onOpenTextarea" v-if="!isEditable" class="g-footer-title">
          <span><img src="../styles/svgs/fa/solid/plus.svg" alt="plus-icon" /></span>
          Add a card</span
        >
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
            ><span @click="onCloseTextarea"
              ><img src="../styles/svgs/fa/solid/x.svg" alt="X"
            /></span>
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
    idx: Number,
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
