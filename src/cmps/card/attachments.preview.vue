<template>
  <section class="attachments-preview">
    

    <div class="attch-preview-body flex">
      <div
        :style="{
          backgroundImage: 'url(' + file.url + ')',
        }"
        class="img"
      ></div>
      <div>
        <div class="attach-title">
          {{ file.title }}.jpg <span class="arrow">↗</span>
        </div>

        <div>
          <div class="actions">
            <span>{{createdAtFormat}}</span>
            <span class="action">Comment</span> -
            <span class="action">Delete</span> -
            <span class="action">Edit</span>
          </div>
          <span
            >IMG<span class="action" @click="makeOrRemove(file)">
              {{ toggleCover }}</span
            ></span
          >
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import moment from 'moment'

export default {
  name: 'ProjectApp',
  props: {
    file: Object,
    card: Object,
  },
  components: {},
  data() {
    return {}
  },
  created() {
    this.file.createdAt = (Date.now()-1000*60*4)
  },
  methods: {
    makeCover(file) {
      this.$emit('makeFileCover', file)
    },
    makeOrRemove(file) {
      if (this.card.style.bgImg === this.file.url) {
        this.card.style = { bgImg: null,bgColor:null,isFull:false}
      }else this.card.style.bgImg = file.url
      this.$emit('makeOrRemove', this.card)
    },
  },
  computed: {
    toggleCover() {
      return this.card.style.bgImg === this.file.url
        ? 'Remove cover'
        : 'Make cover'
    },
    createdAtFormat(){
      const byMinutes = Math.floor(this.file.createdAt/ 1000 / 60) % 60 
      // console.log(moment(this.file.createdAt).fromNow());
      return moment(this.file.createdAt).fromNow()
    }
  },
  unmounted() {},
}
</script>
<style></style>
