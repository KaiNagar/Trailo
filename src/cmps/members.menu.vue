<template>
  <app-modal>
    <template #title>Members</template>
    <template #part-1>
      <input class="members-input" type="text" placeholder="Search members" />
    </template>
    <template #part-2>
      <h1 class="header">Board members</h1>
      <div class="member-tab flex align-center space-between" v-for="member in members" :key="member.id">
        <div class="flex align-center ">
          <div class="member-img" v-if="member.imgUrl" :style="memberImg(member)"></div>
          <div :style="{ backgroundColor: member.color }" class="member-cred flex align-center" v-else>
            {{ memberCred(member) }}
          </div>
          <span class="formatted-name">{{ formatedName(member.fullname)
          }}<span class="short-name">({{ member.fullname }})</span>
          </span>
        </div>
        <span v-if="member?.isSelected" class="check-icon"></span>
      </div>
    </template>
    <template #part-3><button class="more-members btn">
        Show other Workspace members
      </button></template>
  </app-modal>
</template>

<script>
import appModal from './app.modal.vue'
export default {
  props: {
    members: Array,
  },
  components: { appModal },
  data() {
    return {}
  },
  methods: {
    formatedName(name) {
      let formatedName = name.split(' ')
      const firstName =
        formatedName[0].charAt(0).toUpperCase() + formatedName[0].slice(1)
      const lastName =
        formatedName[1].charAt(0).toUpperCase() + formatedName[1].slice(1)
      return firstName + ' ' + lastName
    },
    memberImg(member) {
      if (member.imgUrl)
        return { backgroundImage: 'url(' + member.imgUrl + ')' }
    },
    memberCred(member) {
      const firstL = member.fullname.split(' ')[0].charAt(0).toUpperCase()
      const lastL = member.fullname.split(' ')[1].charAt(0).toUpperCase()
      return firstL + lastL
    },
  },
  computed: {},
  created() {

  },
}
</script>

<style>
</style>
