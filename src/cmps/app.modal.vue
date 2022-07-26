<template>
    <section>
        <section class="modal">
            <div class="m-header">
              <div class="close icon" @click.stop="$emit('closeModal')"></div>
                <slot name="title">Title</slot>
            </div>

            <section class="content" v-for="(item, idx) in items" :key="idx" @click="$emit('openBoard', item._id)">
                <slot name="content-1"></slot>
            </section>
                <slot name="part-1"></slot>
                <slot name="part-2"></slot>
                <slot name="part-3"></slot>
                <slot name="part-4"></slot>
                <slot name="part-5"></slot>
                <slot name="part-6"></slot>
        </section>


    </section>

</template>
<script>
export default {
  name: 'appModal',
  props: {
    newItems: Array,
  },
  components: {},
  data() {
    return {
      items: null,
    }
  },
  created() {
    this.items = this.newItems
  },
  methods: {},
  computed: {},
  unmounted() {},
}
</script>
<style></style>
