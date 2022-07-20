<template>
  <section class="group">
    <div class="g-header">
      {{ group.title }}
      <div class="g-menu">---</div>
    </div>

    <div v-for="(cards, idx) in group.cards" :key="idx" class="card-list">
      <card-list :cards="group.cards" />
    </div>

    <div class="g-footer">
      <button>add card</button>
    </div>
  </section>
</template>

<script>
import cardList from '@/cmps/card/card.list.vue'
export default {
  name: 'groupPreview',
  props: ['group'],
  components: { cardList },
  data() {
    return {}
  },
  methods: {},
  computed: {},
  created() {
    let credentials = { ...this.$store.getters.cardLoc }
    credentials.groupId = this.group.id
    this.$store.dispatch({ type: 'setCardLoc', credentials })


    console.log(this.group);
  },
}
</script>
