<template>
  <section v-if="currCard" class="card-description">
    <div>
      <span class="description-icon"></span>
    </div>
    <div class="desc-textarea">
      <h2>Description</h2>
      <button
        v-if="isHavingDesc && !editing"
        @click="openEditDesc"
        class="edit-desc-btn"
      >
        Edit
      </button>

      <div
        :style="descBodyStyle"
        v-if="!editing"
        @click="openEditDesc"
        class="desc-body-container"
      >
        <div class="desc-body">
          {{ descValue }}
        </div>
      </div>
      <div v-else class="edit-desc">
        <textarea
          autofocus
          v-model="currCard.description"
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
  props:{
    card:Object,
  },
  data() {
    return {
      editing: false,
      currCard:{},
    }
  },
  methods: {
    saveDesc() {
      this.$emit('saveCard' ,this.currCard)
      this.editing = false
    },
    openEditDesc() {
      this.editing = true
    },
    closeEditDesc() {
      this.editing = false
    },
  },
  computed: {
    isHavingDesc(){
      if(this.currCard.description ) return true
      return false
    },
    descValue() {
      return this.currCard.description 
        ? this.currCard.description
        : 'Add a more detailed description...'
    },
    descBodyStyle() {
      return this.currCard.description 
        ? {
            backgroundColor: 'transparent',
            padding: 0,
          }
        : ''
    },
  },
  created() {
    // this.currCard = JSON.parse(JSON.stringify(this.card))
    this.currCard ={...this.card}
    console.log(this.currCard);
  },
}
</script>
