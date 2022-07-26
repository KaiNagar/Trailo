<template>
  <section>
    <!-- CREATE LABEL MODAL -->
    <app-modal @closeModal="closeMenu" v-if="menu.createLabel">
      <template #title>
        <span @click="openMenu('labels')" class="back icon"> </span> Create label</template
      >
      <template #part-1>
        <header>Name</header>
        <input v-model="newLabel.title" type="text" class="input" />
      </template>

      <template #part-2>
        <header>Select a color</header>
        <div class="colors-grid">
          <div
            @click="setLabelColor(idx)"
            v-for="(color, idx) in colors"
            :key="idx"
            class="color"
            :style="{ backgroundColor: color }"
          >
            <span class="check-icon" v-if="idx === colorIdx"></span>
          </div>
        </div>
      </template>

      <template #part-3>
        <button @click="createLabel" class="create-btn">Create</button>
      </template>
    </app-modal>

    <!-- EDIT MODAL -->
    <app-modal v-if="menu.editLabel" @closeModal="closeMenu">
      <template #title>
        <span @click="openMenu('labels')" class="back icon"> </span> Change label</template
      >
      <template #part-1>
        <header>Name</header>
        <input type="text" class="input" v-model="labelToEdit.title" />
      </template>
      <template #part-2>
        <header>Select a color</header>
        <div class="colors-grid">
          <div
            @click="setLabelColor(idx)"
            v-for="(color, idx) in colors"
            :key="idx"
            class="color"
            :style="{ backgroundColor: color }"
          >
            <span class="check-icon" v-if="idx === colorIdx"></span>
          </div>
        </div>
      </template>

      <template #part-3>
        <div class="btns">
          <button @click="editLabel" class="create-btn btn-narrow">Save</button>
          <button @click="openMenu('deleteLabel')" class="create-btn delete">Delete</button>
        </div>
      </template>
    </app-modal>

    <!-- DELETE MODAL -->
    <app-modal v-if="menu.deleteLabel" @closeModal="closeMenu">
      <template #title>
        <span @click="openMenu('labels')" class="back icon"> </span> Delete label?</template
      >
      <template #part-1>
        <div class="warning">
          There is no undo. This will remove this label from all cards and destroy its history.
        </div>
        <button @click="removeLabel" class="delete wide btn">Delete</button>
      </template>
    </app-modal>

    <!-- LABEL MODAL -->
    <app-modal @closeModal="closeMenu" v-if="menu.labels">
      <template #title>Labels</template>
      <template #part-1>
        <input v-focus class="input" type="text" placeholder="Search labels..."
      /></template>

      <template #part-2>
        <div class="part">
          <header>Labels</header>
          <div class="labels">
            <div
              v-for="label in board.labels"
              :key="label.id"
              class="label"
              @click="setLabel(label, labelSelected(label.id))"
              :style="{ 'background-color': label.color }"
            >
              <div class="title">{{ label.title }}</div>
              <!--  -->
              <div
                @click.stop="openMenu('editLabel')"
                @click="setLabelToEdit(label.id)"
                class="icon edit"
              ></div>

              <span class="check-icon" v-if="labelSelected(label.id)"></span>

              <div class="pad">
                <div class="top"></div>
                <div class="bottom"></div>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #part-3>
        <button class="btn create" @click="openMenu('createLabel')" v-if="!isCreateLabel">
          Create a new label
        </button>

        <!-- <div v-if="isCreateLabel">
          <input class="input" v-model="newLabel.title" type="text" />
          <button class="create btn" @click="createLabel">Create</button>
        </div> -->
      </template>
    </app-modal>
  </section>

  <!-- <section v-if="menu.labelso">
    <div class="labels-menu">
      <header>
        <h3>Labels</h3>
        <button class="close-label-menu" @click="$emit('closeLabelsMenu')">
          X
        </button>
      </header>
      <hr />
      <input type="text" placeholder="Search labels..." />
      <main>
        <h3>Labels</h3>
        <div
          class="board-label flex space-between align-center"
          @click="setLabel(label, labelSelected(label.id))"
          v-for="label in labels"
          :key="label.id"
          :style="labelColor(label.color)"
        >
          {{ label.title }}
          <span v-if="labelSelected(label.id)">V</span>
          <span>E</span>
        </div>
        <button class="create-label">Create a new label</button>
        <hr />
        <button disabled class="disabled-btn color-blind-btn">
          Enable color blind friendly mode
        </button>
      </main>
    </div>
  </section> -->
</template>

<script>
import { boardService } from '../services/board.service'
import appModal from './app.modal.vue'
export default {
  props: {
    card: Object,
  },
  components: {
    appModal,
  },
  data() {
    return {
      colorIdx: 0,
      labelToEdit: {},
      isCreateLabel: false,
      newLabel: boardService.getEmptyLabel(),
      colors: [
        '#61bd4f',
        '#f2d600',
        '#ff9f1a',
        '#eb5a46',
        '#c377e0',
        '#0079bf',
        '#00c2e0',
        '#51e898',
        '#ff78cb',
        '#344563',
        // '#b3bac5',
      ],
    }
  },
  methods: {
    createLabel() {
      this.newLabel.color = this.colors[this.colorIdx]
      this.$emit('createLabel', this.newLabel)
      this.setLabel(this.newLabel, false)
      this.newLabel = boardService.getEmptyLabel()
      this.openMenu('labels')
    },
    editLabel() {
      this.labelToEdit.color = this.colors[this.colorIdx]
      this.$store.commit({ type: 'editLabel', editedLabel: this.labelToEdit })
      this.$store.dispatch({ type: 'saveBoard', board: this.board })
      this.openMenu('labels')
    },
    removeLabel() {
      const labelId = this.labelToEdit.id
      this.$store.commit({ type: 'removeLabel', labelId })
      this.$store.dispatch({ type: 'saveBoard', board: this.board })
      this.openMenu('labels')
    },
    setLabelToEdit(labelId) {
      this.board.labels.forEach((label) => {
        if (label.id === labelId) {
          this.labelToEdit = JSON.parse(JSON.stringify(label))
        }
      })
    },
    setLabelColor(idx) {
      this.colorIdx = idx
    },
    labelColor(color) {
      return { backgroundColor: color }
    },
    labelSelected(labelId) {
      if (this.card.labelIds.includes(labelId)) return true
      else return false
    },
    setLabel(newLabel, active) {
      if (!active) {
        this.card.labelIds.push(newLabel.id)
      } else {
        const labelIdx = this.card.labelIds.findIndex((id) => newLabel.id === id)
        this.card.labelIds.splice(labelIdx, 1)
      }
      this.$emit('setLabel', this.card)
    },

    openMenu(menuAction) {
      this.colorIdx = 0
      this.$store.commit({ type: 'openMenu', menuAction })
    },
    closeMenu() {
      this.$store.commit({ type: 'closeMenu' })
    },
    _makeId(length = 8) {
      var text = ''
      var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
      for (var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      return text
    },
  },
  computed: {
    menu() {
      return this.$store.getters.menu
    },
    board() {
      return this.$store.getters.currBoard
    },
    sideMenuOpen() {
      return this.$store.getters.sideMenuStatus
    },
  },
  created() {},
  selectedColor() {
    return
  },
  unmounted() {},
}
</script>

<style>
</style>
