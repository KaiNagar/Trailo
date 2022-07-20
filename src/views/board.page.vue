<template>
  <section>
    <div>
      <board-header />
      <board-filter />
    </div>
    <group-list />
  </section>
</template>
<script>
import boardFilter from '@/cmps/board/board.filter.vue'
import boardHeader from '@/cmps/board/board.header.vue'
import groupList from '@/cmps/group.list.vue'

export default {
  name: 'boardApp',
  components: { boardFilter, boardHeader, groupList },
  data() {
    return {}
  },
  methods: {},
  computed: {},
  created() {},
}
</script>
