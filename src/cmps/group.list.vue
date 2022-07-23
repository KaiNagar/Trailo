<template>
  <section class="group-list">
    <article v-for="(group, idx) in groups" :key="group.id">
      <group-preview
        :group="group"
        :idx="idx"
        @updateGroupTitle="updateGroup"
        @updateGroup="updateGroup"
      />
    </article>
    <div>
      <div v-if="!showForm" class="new-group group" @click="showForm = true">
        <span><img src="../styles/svgs/fa/solid/plus.svg" alt="plus-icon" /></span
        ><span class="g-list-title"> Add another list</span>
      </div>

      <div v-if="showForm" class="group new-group-form">
        <form @submit.prevent="addGroup">
          <input type="text" v-model="newGroup.title" ref="input" placeholder="Enter list title" />
          <button>Add list</button>
        </form>
      </div>
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
      showForm: false,
      newGroup: boardService.getEmptyGroup(),
    }
  },
  methods: {
    updateGroup(group) {
      this.$emit('updateGroup', group)
    },
    addGroup() {
      if (this.newGroup.title === '') return
      this.$emit('addGroup', this.newGroup)
      this.showForm = false
      this.newGroup = boardService.getEmptyGroup()
    },
  },
  computed: {},
  created() {},
}
</script>
