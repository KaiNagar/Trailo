<template>
  <section
    :style="{
      backgroundColor: headerBgColor,
      color: headerColor,
      transition: 'all 0.3s',
    }"
    class="main-header"
    v-if="loggedUser"
  >
    <div class="logo-container">
      <!-- <button class="header-menu icon"></button> -->
      <router-link @click="resetCurrBoard" to="/board">
        <div class="logo">
          <img src="../assets/logo/header-all-logo.png" alt="" />
          <span class="logo-text">ai</span>
          <span :style="headerStyle"></span>
        </div>
      </router-link>
    </div>

    <div class="actions main-menu">
      <div class="action">
        <button @click="openModal('recent')" :class="setClassBtn">
          Boards <img class="arrow" src="../styles/svgs/arrow.svg" alt="" />
        </button>
        <app-modal
          v-if="isModal.recent"
          :newItems="boards"
          @openBoard="openBoard"
          @closeModal="closeModal"
        >
          <template #title>Boards</template>
          <template #content-1 class="content-1">
            <!-- <div class="heade-img-btn"></div> -->
          </template>
        </app-modal>
      </div>

      <div class="action">
        <button @click="openModal('starred')" :class="setClassBtn">
          Starred <img class="arrow" src="../styles/svgs/arrow.svg" alt="" />
        </button>
        <app-modal
          v-if="isModal.starred"
          :newItems="starred"
          @openBoard="openBoard"
          @closeModal="closeModal"
        >
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
        <button
          :class="createClass"
          @click="openMenu('headerCreate')"
          class="create-board-btn"
        ></button>
        <add-board @blur="closeModal" v-if="menu.headerCreate"></add-board>
      </div>
    </div>

    <div class="search">
      <img src="../styles/svgs/search.svg" />
      <input :style="inputStyle" class="search-board-input" type="text" placeholder="Search" />
    </div>

    <div class="right-header flex">
      <button
        :style="{
          backgroundColor: headerBgColor,
          color: headerColor,
          transition: 'all 0.3s',
        }"
        class="notifications"
      >
        <img src="../styles/svgs/notification.svg" alt="" />
      </button>
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
import { FastAverageColor } from 'fast-average-color'

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
      headerBgColor: '',
      headerColor: '',
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
      this.$store.commit({ type: 'setCurrBoard', currBoard: null })
    },
    openMenu(menuAction) {
      this.$store.commit({ type: 'openMenu', menuAction })
    },
    LightenDarkenColor(col, amt = -20) {
      col = col.split('#')[1]
      col = parseInt(col, 16)
      return (
        '#' +
        (
          ((col & 0x0000ff) + amt) |
          ((((col >> 8) & 0x00ff) + amt) << 8) |
          (((col >> 16) + amt) << 16)
        ).toString(16)
      )
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
      if (!this.board) {
        // this.headerColor = '#fff'
        return (this.headerBgColor = '#026aa7')
      }
      if (!this.board.style.bgImg)
        return (this.headerBgColor = this.LightenDarkenColor(this.board.style.bgColor))
      if (!this.board.style || !this.board.style.bgImg) return
      const imgUrl = this.board.style.bgImg
      const fac = new FastAverageColor()
      fac
        .getColorAsync(imgUrl)
        .then((color) => {
          // if (color.isDark) this.headerColor = '#fff'
          // else this.headerColor = '#000'
          return (this.headerBgColor = color.hexa)
        })
        .catch((e) => {
          // this.headerColor = '#fff'
          return (this.headerBgColor = '#026aa7')
        })
    },
    // headerStyle() {
    //   if (this.board) {
    //     return { backgroundColor: '#5e6263' }
    //   } else return ''
    // },
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
    console.log(this.board)
  },
}
</script>
