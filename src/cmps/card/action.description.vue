<template>
  <section class="card-description">
    <div>
      <img
        src="https://cdn-icons-png.flaticon.com/512/54/54586.png"
        alt="Description icon"
      />
    </div>
    <div class="desc-textarea">
      <h2>Description</h2>
      <div v-if="!editing" @click="editing = true" class="desc-body-container">
        <div class="desc-body">Add a more detailed description...</div>
      </div>
      <div v-else class="edit-desc">
        <textarea
          v-model="description"
          placeholder="Add a more detailed description..."
        ></textarea>
        <button @click="editDesc">Save</button>
        <button @click="editing = false">Cancel</button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'description',
  components: {},
  data() {
    return {
      editing: false,
      description: '',
    }
  },
  methods: {
    editDesc() {
      this.editing = false
    },
  },
  computed: {},
  created() {},
}
</script>
