<template>
  <section class="dashboard-page">
    <div class="dashboard-screen" @click="closeDashboard"></div>
    <div class="dashboard-info">
      <h1 class="close-icon" @click="closeDashboard"></h1>
      <div class="cards-general-info">
        <div class="dashboard-tab cards-count flex space-between">
          <div class="flex">
            <div class="header">
              <span class="list-board"></span>
              <h1>Cards</h1>
            </div>
            <div class="counter">{{ cardsCount }}</div>
          </div>
        </div>

        <div class="dashboard-tab cards-completed flex space-between">
          <div class="flex column">
            <div class="header">
              <span class="checklist-icon"></span>
              <h1>Completed</h1>
            </div>
            <div class="counter">{{ completedCards }}</div>
          </div>
          <div class="chart">
            <circle-progress
              class="circle"
              fill-color="#55b2f6"
              empty-color="#fff"
              :percent="completedCardPrec"
              :transition="300"
            />
            <span class="count-prec">{{ completedCardPrec }}%</span>
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
        <div class="bar">
          <h1>Cards per member</h1>
          <BarChart :height="420" :width="460" :chartData="cardsPerMember" />
        </div>
        <div class="bar">
          <h1>Cards per label</h1>
          <BarChart :height="420" :width="460" :chartData="cardsLabelData" />
        </div>
        <div class="bar">
          <h1>Cards per group</h1>
          <BarChart :height="420" :width="460" :options="options" :chartData="cardsPerGroup" />
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { DoughnutChart, BarChart, PolarAreaChart } from 'vue-chart-3'
import { Chart, registerables } from 'chart.js'

import 'vue3-circle-progress/dist/circle-progress.css'
import CircleProgress from 'vue3-circle-progress'

Chart.register(...registerables)
export default {
  name: 'Dashboard',
  components: { DoughnutChart, CircleProgress, BarChart, PolarAreaChart },
  data() {
    return {
      allCards: [],
      options: {
        title: {
          display: false,
        },
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      },
    }
  },
  methods: {
    closeDashboard() {
      this.$router.push(`/board/${this.board._id}`)
    },
  },
  computed: {
    // todosLeft() {
    //   let allTodos = []
    //   this.allCards.forEach((card) =>
    //     card.checklists.forEach((checklist) =>
    //       allTodos.push(...checklist.todos),
    //     ),
    //   )
    //   const done = allTodos.filter((t) => t.isDone)
    //   const undone = allTodos.filter((t) => t.isDone === false)
    //   return {
    //     labels: ['Todos checked', 'Todos unchecked'],
    //     datasets: [
    //       {
    //         label: 'Todos Left',
    //         data: [done.length, undone.length],
    //         backgroundColor: ['#61BD4F', '#eb5a46'],
    //       },
    //     ],
    //   }
    // },
    cardsCreatedPerMember() {
      const labels = this.board.members.map((m) => m.username)
      let membersCount = {}
      this.board.members.forEach((m) => {
        if (!membersCount[m._id]) membersCount[m._id] = 0
      })
      this.allCards.forEach((card) => {
        membersCount[card.createdBy._id]++
      })
      let data = []
      for (var key in membersCount) {
        data.push(membersCount[key])
      }
      return {
        labels,
        datasets: [
          {
            label: 'Cards created per member',
            data,
            backgroundColor: ['#55b2f6'],
          },
        ],
      }
    },
    cardsPerMember() {
      const labels = this.board.members.map((m) => m.username)
      let membersCount = {}
      this.board.members.forEach((m) => {
        if (!membersCount[m._id]) membersCount[m._id] = 0
      })
      this.allCards.forEach((card) => {
        card.members.forEach((m) => {
          membersCount[m._id]++
        })
      })
      let data = []
      for (var key in membersCount) {
        data.push(membersCount[key])
      }
      return {
        labels,
        datasets: [
          {
            label: 'Cards per member',
            data,
            backgroundColor: ['#55b2f6'],
          },
        ],
      }
    },
    // cardsCountData() {
    //   return {
    //     labels: ['Cards'],
    //     datasets: [
    //       {
    //         label: 'Cards',
    //         data: [this.cardsCount],
    //         backgroundColor: ['#fff'],
    //       },
    //     ],
    //   }
    // },
    // cardsData() {
    //   return {
    //     labels: ['Completed', 'Due soon', 'Over due'],
    //     datasets: [
    //       {
    //         label: 'Cards per due date',
    //         data: [this.completedCards, this.dueSoonCards, this.overDueCards],
    //         backgroundColor: ['#61BD4F', '#f2d600', '#eb5a46'],
    //       },
    //     ],
    //   }
    // },
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
            label: 'Cards per list',
            data,
            backgroundColor: ['#55b2f6'],
          },
        ],
      }
    },
    cardsLabelData() {
      const labels = this.board.labels.map((label) => {
        return label.title ? label.title : 'No title'
      })
      const colors = this.board.labels.map((label) => label.color)
      let labelsCount = {}
      this.board.labels.forEach((label) => {
        if (!labelsCount[label.id]) labelsCount[label.id] = 0
      })
      this.allCards.forEach((card) => {
        card.labelIds.forEach((id) => {
          labelsCount[id]++
        })
      })
      let data = []
      for (var key in labelsCount) {
        data.push(labelsCount[key])
      }
      return {
        labels,
        datasets: [
          {
            label: 'Cards per label',
            data,
            backgroundColor: colors,
          },
        ],
      }
    },

    board() {
      return this.$store.getters.currBoard
    },
    cardsCount() {
      return this.allCards.length
    },
    dueSoonCards() {
      const now = new Date()
      const cardsWithDates = this.allCards.filter((card) => card.dueDate)
      if (!cardsWithDates) return 0
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
      if (!cardsWithDates) return 0
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
      if (!cardsWithDates) return 0

      const done = cardsWithDates.filter((card) => card.dueDate.isDone)
      return done.length
    },
    completedCardPrec(){
      const all = this.cardsCount
      const completed = this.completedCards
      return completed / all === Infinity ? 0 : ((completed / all) * 100).toFixed(1)
    },
  },
  created() {
    this.board.groups.forEach((group) => {
      this.allCards.push(...group.cards)
    })
    Chart.defaults.borderColor = 'transparent'
    Chart.defaults.color = '#fff'
    Chart.defaults.plugins.legend.display = false
  },
}
</script>
