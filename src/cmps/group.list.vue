<template>
  <section class="group-list">
    <div  v-for="group in groups" :key="group.id">
      <group-preview :group="group" />
    </div>
  </section>
</template>

<script>
import groupPreview from './group.preview.vue'
export default {
  name: 'groupList',
  props: ['groups'],
  components: {groupPreview},
  data() {
    return {}
  },
  methods: {},
  computed: {},
  created() {},
}
</script>
