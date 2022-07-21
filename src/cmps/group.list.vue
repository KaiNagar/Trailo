<template>
  <section class="group-list">
    <article class="list" v-for="group in groups" :key="group.id">
      <group-preview :group="group" @saveGroup="saveGroup" />
    </article>
    <div>
      <input
        type="text"
        @click="showAddGroupInput = !showAddGroupInput"
        class="new-group group"
        placeholder="+ Add new list"
      />
      <form @submit.prevent="addNewGroup">
        <input
          class="new-group group"
          type="text"
          @keyup.enter="showAddGroupInput = false"
          @blur="showAddGroupInput = false"
          v-model="newGroup.title"
          ref="groupTitle"
          placeholder="Enter list title"
        />
        <button>Add list</button>
      </form>
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
      showAddGroupInput: false,
      newGroup: boardService.getEmptyGroup(),
    }
  },
  methods: {
    addNewGroup() {
      this.newGroup.title = this.$refs.groupTitle.value
      this.groups.push(this.newGroup)
      this.$emit('saveGroups', this.groups)
      this.$refs.groupTitle.value = ''
    },
    saveGroup(group) {
      // this.$emit('saveGroups', group)
    },
  },
  computed: {},
  created() {
    console.log('this.groups', this.groups)
  },
}
</script>
