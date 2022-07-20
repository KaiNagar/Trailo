<template>
  <section>
    <div v-for="(cards, idx) in group.cards" :key="idx">
      {{ group.title }}
      <card-list :cards="group.cards" />
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
    let credentials = {...this.$store.getters.cardLoc}
    credentials.groupId = this.group.id
    this.$store.dispatch({type:'setCardLoc',credentials})
  },
}
</script>
