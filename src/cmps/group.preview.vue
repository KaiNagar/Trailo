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
      <div class="g-footer-textarea">
        <span v-if="!isEditable" class="g-footer-title" @click="onOpenTextarea">
          <span><img src="../styles/svgs/fa/solid/plus.svg" alt="plus-icon" /></span>
          Add a card</span
        >
        <div v-else>
          <textarea
            name="textarea"
            id="textarea"
            cols="30"
            rows="10"
            placeholder="Enter a title for this card..."
          ></textarea>
          <button @click="addCard">add card</button><span><button>X</button></span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import cardList from '@/cmps/card/card.list.vue'
import { boardService } from '../services/board.service'
export default {
  name: 'groupPreview',
  props: {
    group: Object,
  },
  components: { cardList },
  data() {
    return {
      isEditable: false,
    }
  },
  methods: {
    addCard() {
      const card = this.$store.getters.emptyCard
      // const card = boardService.getEmptyCard()
      // const group = JSON.parse(JSON.stringify(this.group))
      // group.cards.push(card)
      card.groupId = this.group.id
      this.$emit('addCard', card)
    },

    onEditTitle() {
      this.isEditTitle = true
      // this.$refs.titleInput.focus()
    },
    onOpenTextarea() {
      return (this.isEditable = true)
    },
  },
  computed: {},
  created() {
    this.$store.commit({ type: 'setCurrGroup', groupId: this.group.id })
  },
}
</script>
