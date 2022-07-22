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
        <button>
          <img
            src="https://cdn-icons.flaticon.com/png/512/1620/premium/1620693.png?token=exp=1658389553~hmac=694d47628fcd409b3a8ec15b757e1419"
            alt="Member icon"
          />Members
        </button>
      </div>
      <div @click="$emit('openLabelsMenu')" class="action-btn-container">
        <button><span>icon</span> Labels</button>
      </div>
      <div @click="$emit('openChecklistMenu')" class="action-btn-container">
        <button>
          <img
            src="https://cdn-icons.flaticon.com/png/512/2440/premium/2440972.png?token=exp=1658390307~hmac=3f013390315ecbdaec4f9d1514b8ec42"
            alt="Checklist icon"
          />
          Checklist
        </button>
      </div>
      <div class="action-btn-container">
        <button>
          <img
            src="https://cdn-icons.flaticon.com/png/512/3114/premium/3114812.png?token=exp=1658390452~hmac=22a95cd407481e545903c33da7835ced"
            alt="Date icon"
          />
          Dates
        </button>
      </div>
      <div class="action-btn-container">
        <button>
          <img
            src="https://cdn-icons.flaticon.com/png/512/2997/premium/2997909.png?token=exp=1658390555~hmac=9c40e471840c10a015aece690be7f947"
            alt="Attachments icon"
          />Attachment
        </button>
      </div>
      <div v-if="!isCoverOn" class="action-btn-container">
        <button>
          <img
            src="https://cdn-icons.flaticon.com/png/512/2997/premium/2997909.png?token=exp=1658390555~hmac=9c40e471840c10a015aece690be7f947"
            alt="Cover icon"
          />Cover
        </button>
      </div>
  
      <menu-attachments />

      <div class="action-btn-container">
        <button disabled><span>icon</span> Custom Fields</button>
      </div>
    </div>
  </section>
</template>

<script>
import appModal from '../app.modal.vue'
import menuAttachments from './action.attachments.vue'
export default {
  name: 'cardActions',
  components: {
    appModal,
    menuAttachments
  },
   props: {
    isCoverOn: Boolean,
  },
  data() {
    return {

    }
  },
  methods: {
    openMenu(menuAction) {
      for (let action in this.menu) {
        this.menu[action] = false
        if (action === menuAction) {
          this.menu[action] = true
        }
      }
    },
    closeMenu() {
      for (let action in this.menu) {
        this.menu[action] = false
      }
    }
  },
  computed: {
    menu() {
      let menu = {
        attachments: false
      }
      return menu
    }
  },
  created() { },
}
</script>
