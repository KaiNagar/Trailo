<template>
  <section class="group">
    <div class="g-header">
      <span>{{ group.title }}</span>
      <div class="g-menu fa"><img src="../styles/svgs/fa/solid/ellipsis.svg" alt="" /></div>
    </div>
    <div>
      <card-list :cards="group.cards" :saveGroup="addCard" />
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
            ref="input"
            v-model="newCard.title"
            cols="30"
            rows="30"
            placeholder="Enter a title for this card..."
            @keydown.enter="addCard"
          ></textarea>
          <div class="add-card">
            <button @click="addCard">Add card</button
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
    addCard() {
      // this.newCard.groupId = this.group.id
      this.$emit('addCard', this.newCard)
    },
    onOpenTextarea() {
      return (this.isEditable = true)
    },
  },
  computed: {
    onCloseTextarea() {
      return (this.isEditable = false)
    },
  },
  created() {
    this.$store.commit({ type: 'setCurrGroup', groupId: this.group.id })
    const newCard = this.$store.getters.emptyCard
    this.newCard = newCard
  },
}
</script>
