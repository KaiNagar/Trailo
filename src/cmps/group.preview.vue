<template>
  <section class="group">
    <div class="g-header">
      <span>{{ group.title }}</span>
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
        <div v-else>
          <textarea
            name="textarea"
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
      newCard: {},
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
    },
  },
  computed: {
    onCloseTextarea() {
      return (this.isEditable = false)
    },
  },
  created() {
    this.$store.commit({ type: 'setCurrGroup', groupId: this.group.id })
    this.newCard = this.$store.getters.emptyCard
  },
}
</script>
