<template>
  <section class="home-page-view">
    <header>
      <div class="logo-home-page">
        <img src="../assets/logo/Trello-logo-cut.jpg" alt="" />
        <span class="logo-title">Traillo</span>
      </div>
      <div @click="loginModal" class="login-btn">
        <span>Log in</span>
        <!-- <div class="g-signin2" data-onsuccess="onSignIn"></div>
                <a href="#" onclick="signOut();">Sign out</a> -->
      </div>
    </header>

    <user-login @login="login"></user-login>
    <div class="hero-container">
      <div class="left-content">
        <h1>Traillo helps teams move work forward.</h1>
        <p>
          Collaborate, manage projects, and reach new productivity peaks. From high rises to the
          home office, the way your team works is unique—accomplish it all with Trailo.
        </p>
        <!-- <router-link to="/board">
          <div class="signup-btn" @click="signupModal"><span>Start demo</span></div>
        </router-link> -->
        <div class="signup-btn" @click="signupModal"><span>Start demo</span></div>
      </div>

      <div class="right-content">
        <div class="hero"></div>
      </div>
    </div>
    <div class="hero-container-center">
      <div class="center-content">
        <h1>It’s more than work. It’s a way of working together.</h1>
        <p>
          Start with a Trailo board, lists, and cards. Customize and expand with more features as
          your teamwork grows. Manage projects, organize tasks, and build team spirit—all in one
          place.
        </p>
      </div>
      <div class="hero-img-container">
        <div class="hero-img"><img src="../assets/home-page-imgs/Capture2.png" alt="" /></div>
        <span>ai</span>
      </div>
    </div>
  </section>
</template>
 <script>
import userLogin from './user.login.vue'
export default {
  name: 'ProjectApp',
  components: {
    userLogin,
  },
  data() {
    return {
      loggedUser: null,
      credentials: {},
    }
  },
  created() {
    this.signout()
  },
  methods: {
    async loginModal(ev) {
      try {
        this.$swal
          .fire({
            title: 'Login Form',
            html: `<input type="text" id="login" value="admin"  class="swal2-input" placeholder="admin">
                            <input type="password" id="password"  value="123" class="swal2-input" placeholder="123">`,
            confirmButtonText: 'Sign in',
            focusConfirm: false,
            preConfirm: () => {
              const username = this.$swal.getPopup().querySelector('#login').value
              const password = this.$swal.getPopup().querySelector('#password').value
              if (!username || !password) {
                this.$swal.showValidationMessage(`Please enter login and password`)
              }
              return { username, password }
            },
          })
          .then((result) => {
            this.credentials.username = result.value.username
            this.credentials.password = result.value.password
            this.login(this.credentials)
          })
      } catch {
      } finally {
      }
    },
    async signupModal(ev) {
      try {
        this.$swal
          .fire({
            title: 'Signup Form',
            html: ` 
                            <input type="text" id="login" class="swal2-input"  placeholder="Enter username">
                            <input type="text" id="email" class="swal2-input" placeholder="Enter email">
                            <input type="password" id="password" class="swal2-input" placeholder="Enter password">`,
            confirmButtonText: 'Sign in',
            focusConfirm: false,
            preConfirm: () => {
              const username = this.$swal.getPopup().querySelector('#login').value
              const email = this.$swal.getPopup().querySelector('#email').value
              const password = this.$swal.getPopup().querySelector('#password').value
              if (!username || !password) {
                this.$swal.showValidationMessage(`Please enter login and password`)
              }
              return { username, password, email }
            },
          })
          .then((result) => {
            this.credentials.username = result.value.username
            this.credentials.password = result.value.password
            this.credentials.email = result.value.email
            this.signup(this.credentials)
          })
      } catch {
      } finally {
      }
    },
    async login(credentials) {
      try {
        this.loggedUser = await this.$store.dispatch({ type: 'setLoggedUser', credentials })
      } catch (err) {
        console.error(err)
        throw err
      } finally {
        if (this.user) {
          this.closeMenu()
          this.$swal
            .fire(`Welcome back ${this.user.username}!`, 'we missed you', 'success')
            .then(() => {
              this.$router.push(`/board/`)
            })
        } else {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Username or password were incorect',
            footer: '<a href="">Why do I have this issue?</a>',
          })
          return console.log(this.user)
        }
      }
    },
    async signup(credentials) {
      try {
        this.loggedUser = await this.$store.dispatch({ type: 'signup', credentials })
      } catch (err) {
        console.error(err)
        throw err
      } finally {
        if (this.user) {
          this.closeMenu()
          const msg = 'Welcome'
          this.$swal
            .fire(`Welcome ${this.user.username}!`, 'Start walking the trail...', 'success')
            .then(() => {
              this.$router.push(`/board/`)
            })
        } else {
          this.$swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Username or password were incorect',
            footer: '<a href="">Why do I have this issue?</a>',
          })
          return console.log(this.user)
        }
      }
    },
    signout() {
      this.$store.dispatch({ type: 'logout' })
    },
    closeMenu() {
      this.$store.commit({ type: 'closeMenu' })
    },
  },
  computed: {
    user() {
      return this.$store.getters.loggedUser
    },
  },
  unmounted() {},
}
</script>
 <style>
</style>