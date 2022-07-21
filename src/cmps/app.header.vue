<template>
  <section class="main-header ">

    <button class="header-menu">---</button>
    <router-link to="/">
      <div class="logo">
        <!-- <div class="loader">[]</div> -->
        <!-- Trailo -->
        <img src="../../src/styles/cenzored-header-gif.gif" alt="">
        <span>ai</span>
      </div>
    </router-link>

    <div class="actions">
      
      <div class="action">
        <button @click="openModal('recent')" class="btn">Recent <span class="arrow"></span></button>
        <app-modal v-if="isModal.recent">
          <template #title>Recent</template>
        </app-modal>
      </div>

      <div class="action">
        <button @click="openModal('starred')" class="btn">Starred <span class="arrow"></span></button>
        <app-modal v-if="isModal.starred">
          <template #title>Starred</template>
        </app-modal>
      </div>

      <div class="action">
        <button @click="openModal('templates')" class="btn">Templates <span class="arrow"></span></button>
        <app-modal v-if="isModal.templates">
          <template #title>Templates</template>
        </app-modal>
      </div>

      <button class="create-btn"></button>
    </div>



    <!-- <div class="search">
      <span></span>
    </div> -->
    <input class="search-board-input" type="text" placeholder="Search" />
    <div class="right-header flex">
      <button>🔔</button>
      <router-link to="/about"><button>About</button></router-link>

      <div class="profile">
        <button>KN</button>
      </div>
    </div>


  </section>
</template>
<script>
import appModal from '../cmps/app.modal.vue'
export default {
  name: 'appHeader',
  components: {
    appModal,

  },
  data() {
    return {
      isModal: {
        recent: false, starred: false, templates: false
      },
    }
  },
  methods: {
    openModal(modalAction) {
      for (let action in this.isModal) {
        this.isModal[action] = false
        if (action === modalAction) {
          this.isModal[action] = true
        }
      }
    },
  },
  computed: {
    boards() {
      this.$store.getters.boards
    },
  },
  created() { },
}
</script>
