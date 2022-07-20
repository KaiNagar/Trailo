<template>
  <section class="group-list">
    <div v-for="group in groups" :key="group.id">
      <group-preview :group="group" @saveGroup="saveGroup" />
    </div>
  </section>
</template>

<script>
import groupPreview from './group.preview.vue'
export default {
  name: 'groupList',
  props: ['groups'],
  components: { groupPreview },
  data() {
    return {}
  },
  methods: {
    saveGroup(updatedGroup) {
      this.$emit('saveGroup', updatedGroup)
    }
  },
  computed: {},
  created() { },
}
</script>
