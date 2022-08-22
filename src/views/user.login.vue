<template></template>
 <script>
export default {
  name: 'user-login',
  components: {},
  data() {
    return {
      credentials: {
        username: '',
        password: null,
      },
    }
  },
  created() {},
  methods: {
    async loginModal(ev) {
      try {
        this.$swal
          .fire({
            title: 'Login Form',
            html: `<input type="text" id="login" class="sw1l2-input" placeholder="Username">
                            <input type="password" id="password" class="swal2-input" placeholder="Password">`,
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
            this.$emit('login', this.credentials)
          })
      } catch {
      } finally {
      }
    },
  },
  computed: {},
  unmounted() {},
}
</script>
 <style>
</style>