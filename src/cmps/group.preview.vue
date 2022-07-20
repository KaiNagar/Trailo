<template>
  <section class="group">
    <div class="g-header">
      {{ group.title }}
      <div class="g-menu">---</div>
    </div>

    <div class="card-list">
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
    return {}
  },
  methods: {
    addCard() {
      const card = boardService.getEmptyCard()
      const group = JSON.parse(JSON.stringify(this.group))
      group.cards.push(card)
      this.$emit('saveGroup', group)
    },
  },
  computed: {},
  created() {},
}
</script>
