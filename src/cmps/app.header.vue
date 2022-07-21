<template>
  <section class="main-header flex space-between">
    <div class="left-header flex">
      <button>Menu</button>
      <div>
        <img
          style="width: 20px"
          src="https://play-lh.googleusercontent.com/ahJtMe0vfOlAu1XJVQ6rcaGrQBgtrEZQefHy7SXB7jpijKhu1Kkox90XDuH8RmcBOXNn"
          alt=""
        />
      </div>
      <div>
        <button>Workspace 🔽</button>
        <button>Recent 🔽</button>
        <button>Starred 🔽</button>
        <button>Templates 🔽</button>
        <button class="create-btn">Create</button>
      </div>
    </div>

    <nav>
      <router-link to="/">Home</router-link>
      <router-link style="margin: 1rem" to="/about">About</router-link>
      <router-link style="margin: 1rem" to="/">Boards</router-link>
      <router-link to="/login">login</router-link>
    </nav>
    <div class="right-header flex">
      <input class="search-board-input" type="text" placeholder="Search" />
      <button>🔔</button>
      <button>About</button>
      <button>KN</button>
    </div>
  </section>
</template>
<script>
export default {
  name: 'appHeader',
  components: {},
  data() {
    return {}
  },
  methods: {},
  computed: {
    boards() {
      this.$store.getters.boards
    },
  },
  created() {},
}
</script>
