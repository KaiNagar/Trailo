<template>
  <section class="card-actions flex column">

    <div class="suggested-tab">
      <h3>Suggested <span>S</span></h3>
      <div class="action-btn-container">
        <!-- <button><img src="https://cdn-icons.flaticon.com/png/512/1620/premium/1620693.png?token=exp=1658389553~hmac=694d47628fcd409b3a8ec15b757e1419" alt="Member icon">Join</button> -->
        <button>Join</button>
      </div>
    </div>
    <div class="add-card-tab">
      <h3>Add to card</h3>
      <div class="action-btn-container">
        <!-- <button>
          <img
            src="https://cdn-icons.flaticon.com/png/512/1620/premium/1620693.png?token=exp=1658389553~hmac=694d47628fcd409b3a8ec15b757e1419"
            alt="Member icon" />Members
        </button> -->

        <button> Members</button>


      </div>
      <!-- <div @click="$emit('openLabelsMenu')" class="action-btn-container">
        <button><img
            src="../../assets/icons/icons-label.png"
            alt="Labels icon" /> Labels</button>
      </div> -->

      <div @click="$emit('openChecklistMenu')" class="action-btn-container">
        <button>
          <img src="../../assets/icons/icons-tick-box.png" alt="Checklist icon" />
          Checklist
        </button>

        <!-- <button>Checklist</button> -->
      </div>
      <div class="action-btn-container">
        <button>
          <img src="../../assets/icons/icons-clock.png" alt="Date icon" />
          Dates
        </button>
        <button>Dates</button>
      </div>
      <div class="action-btn-container">
        <!-- <button>
          <img
            src="https://cdn-icons.flaticon.com/png/512/2997/premium/2997909.png?token=exp=1658390555~hmac=9c40e471840c10a015aece690be7f947"
            alt="Attachments icon" />Attachment
        </button> -->
      </div>
      <div @click="$emit('openCoverMenu')" v-if="!isCoverOn" class="action-btn-container">

        <button>Cover</button>
      </div>

        
      <menu-labels :card="card"></menu-labels>
      
      <menu-attachments @attachFile="attachFile" />
      <menu-cover :card="card" />

      <div class="action-btn-container">
        <button disabled><span>icon</span> Custom Fields</button>
      </div>
    </div>
  </section>
</template>

<script>
import appModal from '../app.modal.vue'
import menuAttachments from './action.attachments.vue'
import menuCover from '../menu.cover.vue'
import menuLabels from '../labels.menu.vue'
export default {
  name: 'cardActions',
  components: {
    appModal,
    menuAttachments,
    menuCover,
    menuLabels
  },
  props: {
    isCoverOn: Boolean,
    card: Object
  },
  data() {
    return {

    }
  },
  methods: {
    attachFile(file) {
      this.$emit('attachFile', file)
    }
  },
  computed: {


  },
  created() { },
}
</script>
