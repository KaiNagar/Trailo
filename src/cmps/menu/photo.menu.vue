<template>
  <section class="photos-menu">
    <div>
      <div class="colors-header">
        <span @click="$emit('backToStyle')" class="back-icon"></span>
        <h3>
          Photos by
          <a
            target="blank"
            href="https://unsplash.com/?utm_source=trello&utm_medium=referral&utm_campaign=api-credit"
            >Unsplash</a
          >
        </h3>
        <span @click="$emit('closeMoreMenu')" class="close-icon"></span>
      </div>
      <hr />
      <div class="input-photos">
        <span class="search-icon"></span>
        <input class="search-photos" type="text" placeholder="Photos" />
      </div>
    </div>
    <div>
      <div class="all-photos">
        <div
          class="photo"
          :style="photoStyle(photo)"
          v-for="photo in photos"
          :key="photo.id"
          @click="setBgImg(photo)"
        ></div>
      </div>
    </div>
    <div class="unsplash-txt">
      By using images from Unsplash you agree to their
      <a href="#">license</a> and <a href="#">Terms of service</a>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      photos: [
        {
          id: 'p101',
          url: 'https://images.unsplash.com/photo-1658784566751-95382f065d71?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwcm9maWxlLXBhZ2V8M3x8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=60',
        },
        {
          id: 'p102',
          url: 'https://images.unsplash.com/photo-1658932789656-185cf2634c37?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          id: 'p103',
          url: 'https://images.unsplash.com/photo-1650923500748-eee80ee6e7d1?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1121&q=80',
        },
        {
          id: 'p104',
          url: 'https://images.unsplash.com/photo-1658948653664-5274d318c3fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
        },
        {
          id: 'p105',
          url: 'https://images.unsplash.com/photo-1658654265951-667577fe3f62?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          id: 'p106',
          url: 'https://images.unsplash.com/photo-1658563309427-6e703a70203c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1171&q=80',
        },
        {
          id: 'p107',
          url: 'https://images.unsplash.com/photo-1487611459768-bd414656ea10?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          id: 'p110',
          url: 'https://images.unsplash.com/photo-1657896090619-ab849b26d6bc?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
        },
        {
          id: 'p111',
          url: 'https://images.unsplash.com/photo-1652614347707-df3983ab3ed7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1076&q=80',
        },
        {
          id: 'p112',
          url: 'https://images.unsplash.com/photo-1658241817660-b0c1ad84313d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
        },
        {
          id: 'p113',
          url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          id: 'p114',
          url: 'https://images.unsplash.com/photo-1658577804703-724d51e958ce?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
        },
        {
          id: 'p115',
          url: 'https://images.unsplash.com/photo-1658836180981-75bf42c73830?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80',
        },
        {
          id: 'p116',
          url: 'https://images.unsplash.com/photo-1657586640569-4a3d4577328c?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
        },
        {
          id: 'p117',
          url: 'https://images.unsplash.com/photo-1654375415172-c3dc85b946f0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
        },
        {
          id: 'p118',
          url: 'https://images.unsplash.com/photo-1653525749885-46a75af1eb5d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1064&q=80',
        },
        {
          id: 'p119',
          url: 'https://images.unsplash.com/photo-1659118263595-df544eabe770?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          id: 'p120',
          url: 'https://images.unsplash.com/photo-1508013861974-9f6347163ebe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1176&q=80',
        },
        {
          id: 'p121',
          url: 'https://images.unsplash.com/photo-1629349855726-dc8700ccb796?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          id: 'p122',
          url: 'https://images.unsplash.com/photo-1647893767164-8a231e5a5ce9?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          id: 'p123',
          url: 'https://images.unsplash.com/photo-1499290731724-12e120cfaef3?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
        {
          id: 'p124',
          url: 'https://images.unsplash.com/photo-1550439062-609e1531270e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80',
        },
      ],
    }
  },
  methods: {
    photoStyle(photo) {
      return { backgroundImage: 'url(' + photo.url + ')' }
    },
    setBgImg(photo) {
      this.$emit('setBgImg', photo)
    },
  },
}
</script>
