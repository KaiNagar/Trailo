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
      <div v-if="!editing" @click="openEditDesc" class="desc-body-container">
        <div class="desc-body">Add a more detailed description...</div>
      </div>
      <div v-else class="edit-desc">
        <textarea
          autofocus
          v-model="description"
          placeholder="Add a more detailed description..."
        ></textarea>
        <div class="text-area-actions flex space-between">
          <div>
            <button class="save-desc-btn" @click="saveDesc">Save</button>
            <button class="cancel-desc-btn" @click="closeEditDesc">
              Cancel
            </button>
          </div>
          <button class="formatting-desc-btn">Formatting help</button>
        </div>
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
    saveDesc() {
      this.editing = false
    },
    openEditDesc() {
      this.editing = true
    },
    closeEditDesc() {
      this.editing = false
    },
  },
  computed: {},
  created() {},
}
</script>
