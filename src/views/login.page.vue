<template>
  <section>
    <form>
      <h1>this is login form</h1>
      <input type="text" placeholder="put something inside me plaese" />
    </form>
    <members-menu :members="members" />
  </section>
</template>

<script>
import membersMenu from '../cmps/members.menu.vue'
export default {
  name: 'Login',
  components: { membersMenu },
  data() {
    return {}
  },
  methods: {},
  computed: {
    members() {
      return [
        {
          _id: 'u101',
          fullname: 'kagol mokakor',
          email: 'kagol@gmail.com',
          imgUrl: '',
          color: this.getRandomColor,
        },
        {
          _id: 'u102',
          fullname: 'manoka menika',
          email: 'manoka@gmail.com',
          imgUrl: '',
          color: this.getRandomColor,
        },
        {
          _id: 'u103',
          fullname: 'menashe moko',
          email: 'menashe@gmail.com',
          imgUrl: '',
          color: this.getRandomColor,
        },
      ]
    },
    getRandomColor() {
      var letters = '0123456789ABCDEF'
      var color = '#'
      for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)]

        return color
      }
    },
  },
  created() {},
}
</script>
