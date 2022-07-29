<template>
  <section :style="headerStyle" class="main-header" v-if="loggedUser">
    <div class="logo-container">
      <button class="header-menu icon"></button>
      <router-link @click="resetCurrBoard" to="/board">
        <div class="logo">
          <svg aria-label="Trailo" role="img" viewBox="0 0 312 64" xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink" class="LogoTrello__Logo-sc-11mphmv-0 dmCGMv">
            <linearGradient id="trello-logo-gradient-defaultMJFtCCgVhXrVl7v9HA7EH" x1="50.048061%" x2="50.048061%"
              y1="100%" y2="0%">
              <stop offset="0" stop-color="#fff"></stop>
              <stop offset="1" stop-color="#fff"></stop>
            </linearGradient>
            <g fill="none" fill-rule="evenodd">
              <path
                d="m55.59.07h-47.59c-4.09405078 0-7.41448241 3.31595294-7.42006073 7.41v47.52c-.00791682 1.9730991.77030774 3.8681213 2.16269326 5.2661365 1.39238553 1.3980151 3.28425224 2.1838635 5.25736747 2.1838635h47.59c1.9713817-.0026407 3.8606757-.7896772 5.250897-2.1874031s2.1670753-3.2912295 2.1591638-5.2625969v-47.52c-.0055694-4.09014608-3.3199147-7.40449138-7.4100608-7.41zm-28.09 44.93c-.0026377.6594819-.2678382 1.2907542-.7369724 1.7542587-.4691341.4635046-1.1035619.721065-1.7630276.7158222h-10.4c-1.3602365-.005588-2.46-1.1098333-2.46-2.4700809v-30.95c0-1.3602476 1.0997635-2.4644929 2.46-2.47h10.4c1.3618668.0054804 2.4645196 1.1081332 2.47 2.47zm24-14.21c0 .6603158-.2642968 1.2931595-.7340204 1.7572465-.4697237.464087-1.1057125.7207735-1.7659796.7129359h-10.4c-1.3618668-.0056628-2.4645196-1.1083156-2.47-2.4701824v-16.74c.0054804-1.3618668 1.1081332-2.4645196 2.47-2.47h10.4c1.3602365.0055071 2.4600111 1.1097524 2.46 2.47z"
                fill="url(#trello-logo-gradient-defaultMJFtCCgVhXrVl7v9HA7EH)"></path>
              <g fill="#fff" fill-rule="nonzero" transform="translate(87)">
                <path d="m42.92 4.64v12.06h-14.29v45.75h-13.78v-45.75h-14.29v-12.06z"></path>
                <path
                  d="m60.46 62.45h-12.74v-45h12.74v8.62c2.42-6.07 6.29-9.68 13.18-9.24v13.33c-9-.7-13.18 1.5-13.18 8.71z">
                </path>
                <path
                  d="m170 62.8c-8.35 0-13.61-4-13.61-13.46v-49.27h12.83v47.51c0 2.73 1.81 3.7 4.05 3.7.631315.0130885 1.262786-.0169816 1.89-.09v11.09c-1.687411.4126716-3.42418.5876949-5.16.52z">
                </path>
                <path
                  d="m181.31 39.93c0-13.9 8-23.41 21.78-23.41s21.61 9.48 21.61 23.41-7.92 23.58-21.61 23.58-21.78-9.77-21.78-23.58zm12.49 0c0 6.77 2.84 12.14 9.29 12.14s9.13-5.37 9.13-12.14-2.75-12-9.13-12-9.29 5.22-9.29 12z">
                </path>
              </g>
            </g>
          </svg>
          <span :style="headerStyle">ai</span>
          <!-- <img src="../../src/styles/cenzored-header-gif.gif" alt="" /> -->
          <!-- <span :style="headerStyle">Trailo</span> -->
        </div>
      </router-link>
    </div>


    <div class="actions main-menu">
      <div class="action">
        <button @click="openModal('recent')" :class="setClassBtn">
          Boards <img class="arrow" src="../styles/svgs/arrow.svg" alt="" />
        </button>
        <app-modal v-if="isModal.recent" :newItems="boards" @openBoard="openBoard" @closeModal="closeModal">
          <template #title>Boards</template>
          <template #content-1> </template>
        </app-modal>
      </div>

      <div class="action">
        <button @click="openModal('starred')" :class="setClassBtn">
          Starred <img class="arrow" src="../styles/svgs/arrow.svg" alt="" />
        </button>
        <app-modal v-if="isModal.starred" :newItems="starred" @openBoard="openBoard" @closeModal="closeModal">
          <template #title>Starred</template>
          <template #content-1>
            <!-- <div class="img"></div>
            <div class="titles">
              <div class="b-title">sprint</div>
              <div class="w-title">sprint 4</div>
            </div>
            <div class="star"></div> -->
          </template>
        </app-modal>
      </div>


      <div class="add">
        <button :class="createClass" @click="openMenu('headerCreate')" class="create-board-btn">
          Create
        </button>
        <add-board v-if="menu.headerCreate"></add-board>
      </div>
    </div>

    <div class="search">
      <img src="../styles/svgs/search.svg" />
      <input :style="inputStyle" class="search-board-input" type="text" placeholder="Search" />
    </div>

    <div class="right-header flex">
      <button class="notifications"><img src="../styles/svgs/notification.svg" alt="" /></button>
      <div class="profile" @click="openMenu('account')">
        <button>{{ loggedUser.username.slice(0, 1).toUpperCase() }}</button>
      </div>
      <!-- ACCOUNT MENU -->
    </div>
      <menu-account v-if="menu.account"></menu-account>
  </section>
</template>
<script>
import addBoard from './board/add.board.vue'
import appModal from '../cmps/app.modal.vue'
import menuAccount from './menu/menu.account.vue'

export default {
  name: 'appHeader',
  props: {
    boards: Array,
  },
  components: {
    appModal,
    addBoard,
    menuAccount,
  },
  data() {
    return {
      isModal: {
        recent: false,
        starred: false,
        templates: false,
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
      console.log(boardId)
      this.$router.push(`/board/${boardId}`)
    },
    openMenu(menuAction) {
      this.closeModal()
      this.$store.commit({ type: 'openMenu', menuAction })
    },
    closeMenu() {
      this.$store.commit({ type: 'closeMenu' })
    },
    resetCurrBoard() {
      this.$store.commit({ type: 'setCurrBoard', board: null })
    },
    openMenu(menuAction) {
      this.$store.commit({ type: 'openMenu', menuAction })
    },
  },
  computed: {
    starred() {
      return this.boards.filter((board) => board.isStarred)
    },
    menu() {
      return this.$store.getters.menu
    },
    headerStyle() {
      if (this.board) {
        return { backgroundColor: '#5e6263' }
      } else return ''
    },
    inputStyle() {
      if (this.board) {
        return { backgroundColor: 'rgba(255, 255, 255, 0.2)' }
      } else return ''
    },
    createClass() {
      if (this.board) {
        return 'in-board'
      } else return 'out-board'
    },
    setClassBtn() {
      if (this.board) {
        return 'dark-header'
      } else return 'btn'
    },
    board() {
      return this.$store.getters.currBoard
    },
    loggedUser() {
      return this.$store.getters.loggedUser
    },

  },
  created() {
  },
}
</script>
