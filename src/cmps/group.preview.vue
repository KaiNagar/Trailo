<template>
  <section class="group">
    <div class="g-header">
      <h3>{{ group.title }}</h3>
      <div class="g-menu fa"> <img src="../styles/svgs/fa/solid/ellipsis.svg" alt=""></div>
    </div>
    <div>
      <card-list :cards="group.cards" :saveGroup="addCard" />
    </div>

    <div class="g-footer">
      <button @click="addCard">add card</button>
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
      isEditTitle: false,
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
  },
  computed: {},
  created() {
    this.$store.commit({ type: 'setCurrGroup', groupId: this.group.id })
  },
}
</script>
