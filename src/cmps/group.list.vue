<template>
  <section class="group-list">
    <div v-for="group in groups" :key="group.id">
      <group-preview :group="group" @saveGroup="saveGroup" />
    </div>
    <div class="group-list">
      <div @click="$emit('addGroup',newGroup)" class="new-group group"><span>+</span> Add another list</div>
    </div>
  </section>
</template>

<script>
import groupPreview from './group.preview.vue'
import { boardService } from '../services/board.service'
export default {
  name: 'groupList',
  props: {
    groups: Array,
  },
  components: { groupPreview },
  data() {
    return {
      newGroup: boardService.getEmptyGroup()
    }
  },
  methods: {
    addGroup() {
      const newGroup = boardService.getEmptyGroup()

    },
    saveGroup(group) {
      this.$emit('saveGroup', group)
    },
  },
  computed: {},
  created() { },
}
</script>
