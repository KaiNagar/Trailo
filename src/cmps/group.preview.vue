<template>
  <section class="group">
    <div class="g-header">
      {{ group.title }}
      <div class="g-menu">---</div>
    </div>

    <div class="card-list">
      <card-list :cards="group.cards" :saveGroup="saveGroup" />
    </div>

    <div class="g-footer">
      <button @click="addCard">add card</button>
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
  methods: {
    async addCard() {
      const card = this.$store.getters.empetyCard
      this.group.cards.push(card)
    },
    saveGroup(card) {
      console.log(card);
      this.$emit('saveGroup', this.group)
    }
  },
  computed: {},
  created() {
    this.$store.commit({ type: 'setGroupId', groupId: this.group.id })
  },
}
</script>
