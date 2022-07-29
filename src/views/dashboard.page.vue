<template>
  <section class="dashboard-page">
    <div class="dashboard-screen" @click="closeDashboard"></div>
    <div class="dashboard-info">
      <div class="cards-general-info">
        <div class="dashboard-tab cards-count flex">
          <div class="flex column">
            <div class="header">
              <h1>Cards</h1>
              <span class="list-board"></span>
            </div>
            <div class="counter">{{ cardsCount }}</div>
          </div>
          <div class="chart">
            <DoughnutChart :height="220" :chartData="cardsData" />
          </div>
        </div>
        <div class="dashboard-tab cards-duedate flex space-between">
          <div class="flex column">
            <div class="header">
              <span class="clock-icon"></span>
              <h1>Due soon</h1>
            </div>
            <div class="counter">{{ dueSoonCards }}</div>
          </div>
          <div class="chart">
            <circle-progress
              class="circle"
              fill-color="#55b2f6"
              empty-color="#fff"
              :percent="dueSoonPrec"
              :transition="300"
            />
            <span class="count-prec">{{ dueSoonPrec }}%</span>
          </div>
        </div>
        <div class="dashboard-tab cards-overdue flex space-between">
          <div class="flex column">
            <div class="header">
              <span class="sign-mark"></span>
              <h1>Overdue</h1>
            </div>
            <div class="counter">{{ overDueCards }}</div>
          </div>
          <div v-if="board" class="chart">
            <circle-progress
              class="circle"
              fill-color="#55b2f6"
              empty-color="#fff"
              :percent="overDuePrec"
              :transition="300"
            />
            <span class="count-prec">{{ overDuePrec }}%</span>
          </div>
        </div>
      </div>
      <div id="dashboard-bars">
        <div class="cards-per-label">
          <BarChart :height="220" :chartData="cardsData" />
        </div>
        <div class="cards-per-member">
          <BarChart :height="220" :chartData="cardsData" />
        </div>
        <div class="cards-per-group">
          <BarChart :height="220" cssClasses="groups-bar" :chartData="cardsPerGroup" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { DoughnutChart, BarChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

import 'vue3-circle-progress/dist/circle-progress.css'
import CircleProgress from 'vue3-circle-progress'

Chart.register(...registerables)
export default {
  name: 'Dashboard',
  components: { DoughnutChart, CircleProgress, BarChart },
  data() {
    return {
      allCards: [],
    }
  },
  methods: {
    closeDashboard() {
      this.$router.push(`/board/${this.board._id}`)
    },
    // cardsLabelsSetup() {
    //   const labels = this.board.labels.map(label=>{
    //     return label.title
    //   })
    //   let labelsInfo = {}
    //   this.allCards.forEach((card) => {
    //     card.labelIds.forEach((id) => {
    //       if (!labelsInfo[id]) labelsInfo[id] = 0
    //       labelsInfo[id]++
    //     })
    //   })
    //   console.log(labelsInfo)
    // },
  },

  computed: {
    cardsData() {
      return {
        labels: ['Completed', 'Due soon', 'Over due'],
        datasets: [
          {
            data: [this.completedCards, this.dueSoonCards, this.overDueCards],
            backgroundColor: ['#61BD4F', '#f2d600', '#eb5a46'],
          },
        ],
      }
    },
    cardsPerGroup() {
      let labels = []
      let data = []
      this.board.groups.forEach((group) => {
        labels.push(group.title)
        data.push(group.cards.length)
      })
      return {
        labels,
        datasets: [
          {
            data,
            backgroundColor: ['#55b2f6'],
          },
        ],
      }
    },
    // cardsLabelData() {

    // return {
    //   labels,
    //   datasets: [
    //     {
    //       data: [],
    //       backgroundColor: ['#55b2f6'],
    //     },
    //   ],
    // }
    // },
    board() {
      return this.$store.getters.currBoard
    },
    cardsCount() {
      return this.allCards.length
    },
    dueSoonCards() {
      const now = new Date()
      const cardsWithDates = this.allCards.filter((card) => card.dueDate)
      const dueSoon = cardsWithDates.filter((card) => {
        return (
          card.dueDate.timestamp - now > 0 &&
          card.dueDate.timestamp - now < 86000000 &&
          !card.dueDate.isDone
        )
      })
      return dueSoon.length
    },
    dueSoonPrec() {
      const all = this.cardsCount
      const dueSoon = this.dueSoonCards
      return dueSoon / all === Infinity ? 0 : ((dueSoon / all) * 100).toFixed(1)
    },
    overDueCards() {
      const now = new Date()
      const cardsWithDates = this.allCards.filter((card) => card.dueDate)
      const overDue = cardsWithDates.filter((card) => {
        return card.dueDate.timestamp - now < 0 && card.dueDate.isDone === false
      })
      return overDue.length
    },
    overDuePrec() {
      const all = this.cardsCount
      const overDue = this.overDueCards
      return overDue / all === Infinity ? 0 : ((overDue / all) * 100).toFixed(1)
    },
    completedCards() {
      const cardsWithDates = this.allCards.filter((card) => card.dueDate)
      const done = cardsWithDates.filter((card) => card.dueDate.isDone)
      return done.length
    },
  },
  created() {
    this.board.groups.forEach((group) => {
      this.allCards.push(...group.cards)
    })
  },
}
</script>
