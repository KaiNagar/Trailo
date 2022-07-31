<template>
  <section class="board-header full flex space-between">
    <nav>
      <!-- <button class="board-btn">
        <span class="bars"><img src="../../assets/icons/icons-bar-chart.png" alt="" /></span>
        <span class="txt">Board</span>
        <span class="img"><img src="../../assets/icons/icons-down.png" alt="" /></span>
      </button> -->

      <h1 v-if="!editBoardTitle" class="board-header-title" @click="openEditTitle">
        {{ currBoard.title }}
      </h1>
      <input
        ref="editBoardRef"
        @blur="saveBoardTitle"
        v-else
        type="text"
        v-model="currBoard.title"
        class="edit-board-title"
      />

      <button @click="toggleStarBoard" class="board-header-star">
        <span :style="isStarred" class="star-icon"></span>
      </button>
      <!-- <span class="divider"></span>
      <button class="board-header-privet">
        <span class="privet-icon"></span> Private
      </button>
      <span class="divider"></span> -->

      <!-- MEMBERS -->

      <div class="board-members-container flex align-center">
        <avatar-list class="avatar-list-board-header" @users="users"></avatar-list>
        <button class="share-btn-board-header flex align-center" @click="isShareBoard = true">
          <img src="https://cdn-icons-png.flaticon.com/512/748/748137.png" class="share-icon" />
          <span class="txt">Share</span>
        </button>
        <share-board v-if="isShareBoard" @close="isShareBoard = false"></share-board>
      </div>
    </nav>

    <div class="board-header-right-btns">
      <!-- <button class="filter-btn">
        <span class="img"><img src="../../assets/icons/icons-bars.png" alt="" /></span>
        <span class="txt">Filter</span>
      </button>
      <board-filter v-if="filterMenu" /> -->

      <div>
        <button v-if="!isMoreMenu" @click="showMenu" class="show-menu-btn flex align-center">
          <span class="menu-icon"></span>
          <span class="txt">Show menu</span>
        </button>
        <show-more
          @openStyleMenu="openStyleMenu"
          @openDashboard="openDashboard"
          @closeMoreMenu="hideMenu"
          :style="setMenuMore"
        />
        <style-menu
          @backToMenu="backToMenuFromStyle"
          @openColorsMenu="openColorsMenu"
          @openImgsMenu="openImgsMenu"
          @closeMoreMenu="hideMenu"
          :style="setMenuStyle"
        />
        <color-menu
          @backToStyle="backToStyleFromColors"
          @setBgColor="setBgColor"
          :style="setMenuColors"
          @closeMoreMenu="hideMenu"
        />
        <photo-menu
          @closeMoreMenu="hideMenu"
          @backToStyle="backToStyleFromImgs"
          @setBgImg="setBgImg"
          :style="setMenuPhotos"
        />
      </div>
    </div>
  </section>
</template>

<script>
import boardFilter from '@/cmps/board/board.filter.vue'
import showMore from '../menu/show.more.vue'
import styleMenu from '../menu/style.menu.vue'
import colorMenu from '../menu/color.menu.vue'
import photoMenu from '../menu/photo.menu.vue'
import { FastAverageColor } from 'fast-average-color'
import membersList from '../members.list.vue'
import avatarList from '../card/avatar.list.vue'
import menuMembers from '../menu/menu.members.vue'
import shareBoard from '../user/share.board.vue'

export default {
  name: 'boardHeader',
  components: {
    boardFilter,
    shareBoard,
    menuMembers,
    avatarList,
    showMore,
    styleMenu,
    photoMenu,
    colorMenu,
    membersList,
  },
  data() {
    return {
      filterMenu: false,
      editBoardTitle: false,
      currBoard: {},
      isMoreMenu: false,
      isStyleMenu: false,
      isPhotosMenu: true,
      isColorsMenu: false,
      headerColor: '',
      isShareBoard: false,
    }
  },
  methods: {
    setBgImg(img) {
      const board = JSON.parse(JSON.stringify(this.stateBoard))
      board.style.bgColor = null
      board.style.bgImg = img.url
      this.$store.dispatch({ type: 'saveBoard', board })
    },
    setBgColor(color) {
      const board = JSON.parse(JSON.stringify(this.stateBoard))
      board.style.bgImg = null
      board.style.bgColor = color.color
      this.$store.dispatch({ type: 'saveBoard', board })
    },
    backToStyleFromImgs() {
      this.isStyleMenu = true
      this.isPhotosMenu = false
    },
    openDashboard() {
      this.hideMenu()
      this.$router.push(`/board/${this.stateBoard._id}/dashboard`)
    },
    openImgsMenu() {
      this.isStyleMenu = false
      this.isPhotosMenu = true
    },
    openColorsMenu() {
      this.isStyleMenu = false
      this.isColorsMenu = true
    },
    backToStyleFromColors() {
      this.isStyleMenu = true
      this.isColorsMenu = false
    },
    backToMenuFromStyle() {
      this.isStyleMenu = false
      this.isMoreMenu = true
    },
    openStyleMenu() {
      this.isStyleMenu = true
      this.isMoreMenu = false
    },
    showMenu() {
      this.isMoreMenu = true
    },
    hideMenu() {
      this.isMoreMenu = false
      this.isStyleMenu = false
      this.isPhotosMenu = false
      this.isColorsMenu = false
    },
    openEditTitle() {
      this.editBoardTitle = true
      setTimeout(() => {
        this.$refs.editBoardRef.focus()
      }, 0)
    },
    saveBoardTitle() {
      this.editBoardTitle = false
      this.$store.dispatch({ type: 'saveBoard', board: this.currBoard })
    },
    toggleStarBoard() {
      this.currBoard.isStarred = !this.currBoard.isStarred
      const updatedBoard = { ...this.currBoard }
      updatedBoard.isStarred = !updatedBoard.isStarred
      this.$store.dispatch({ type: 'saveBoard', board: updatedBoard })
    },
    openMenu(menuAction) {
      this.$store.commit({ type: 'openMenu', menuAction })
    },
  },
  computed: {
    setMenuPhotos() {
      if (this.isPhotosMenu) return { right: 0 }
      else return { right: -100 + '%' }
    },
    setMenuColors() {
      if (this.isColorsMenu) return { right: 0 }
      else return { right: -100 + '%' }
    },
    setMenuStyle() {
      if (this.isStyleMenu) return { right: 0 }
      else return { right: -100 + '%' }
    },
    setMenuMore() {
      if (this.isMoreMenu) {
        return { right: 0 }
      } else return { right: -100 + '%' }
    },
    isStarred() {
      if (this.currBoard.isStarred) {
        return { color: '#f2d600' }
      }
    },
    stateBoard() {
      return this.$store.getters.currBoard
    },
    headerStyle() {
      if (!this.stateBoard.style || !this.stateBoard.style.bgImg)
        return (this.headerColor = '#ffffff82')
      const imgUrl = this.stateBoard.style.bgImg
      const fac = new FastAverageColor()
      fac
        .getColorAsync(imgUrl)
        .then((color) => {
          if (color.isDark) this.headerColor = '#ffffff82'
          else this.headerColor = ''
          return
        })
        .catch((e) => {
          return '#ffffff82'
        })
    },
    menu() {
      return this.$store.getters.menu
    },
  },
  created() {
    this.headerStyle
    this.currBoard = JSON.parse(JSON.stringify(this.stateBoard))
    this.hideMenu()
  },
}
</script>

<style></style>
