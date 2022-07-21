<template>
  <section class="main-header ">
    <div class="logo-container">
      <button class="header-menu">---</button>
      <router-link to="/">
        <div class="logo">
          <img src="../../src/styles/cenzored-header-gif.gif" alt="">
          <span>ai</span>
        </div>
      </router-link>
    </div>

    <div class="actions">

      <div class="action">
        <button @click="openModal('recent')" class="btn">Recent <img class="arrow" src="../styles/svgs/arrow.svg"
            alt=""> </button>
        <app-modal v-if="isModal.recent" :newItems="boards" @openBoard="openBoard" @closeModal="closeModal">
          <template #title>Recent</template>
          <template #content-1>
            <div class="img"></div>
            <div class="titles">
              <div class="b-title">sprint</div>
              <div class="w-title">sprint 4</div>
            </div>
            <div class="star"></div>
          </template>
        </app-modal>
      </div>

      <div class="action">
        <button @click="openModal('starred')" class="btn">Starred <img class="arrow" src="../styles/svgs/arrow.svg"
            alt=""> </button>
        <app-modal v-if="isModal.starred" :newItems="boards" @openBoard="openBoard" @closeModal="closeModal">
          <template #title>Starred</template>
          <template #content-1>
            <div class="img"></div>
            <div class="titles">
              <div class="b-title">sprint</div>
              <div class="w-title">sprint 4</div>
            </div>
            <div class="star"></div>
          </template>
        </app-modal>
      </div>


      <div class="action">
        <button @click="openModal('templates')" class="btn">Templates <img class="arrow" src="../styles/svgs/arrow.svg"
            alt=""> </button>
        <app-modal v-if="isModal.templates" :newItems="boards" @openBoard="openBoard" @closeModal="closeModal">
          <template #title>Templates</template>
          <template #content-1>
            <div class="img"></div>
            <div class="titles">
              <div class="b-title">sprint</div>
              <div class="w-title">sprint 4</div>
            </div>
            <div class="star"></div>
          </template>
        </app-modal>
      </div>


      <button class="create-btn"></button>
    </div>


    <div class="search">
      <img src="../styles/svgs/search.svg">
      <input class="search-board-input" type="text" placeholder="Search" />
    </div>


    <div class="right-header flex">
      <router-link to="/about"><button>i</button></router-link>
      <button class="notifications">🔔</button>
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
  props: {
    boards: Array
  },
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
    closeModal() {
      for (let action in this.isModal) {
        this.isModal[action] = false
      }
    },
    openBoard(boardId) {
      console.log(boardId);
      this.$router.push(`/board/${boardId}`)
    }
  },
  computed: {
    // boards() {
    //   return this.$store.getters.boards

    // },

    starredBoards() {
      const starred = this.boards.filter((board) => {
        board.isStarred
      })
      return starred
    }

  },
  created() {


  },
}
</script>
