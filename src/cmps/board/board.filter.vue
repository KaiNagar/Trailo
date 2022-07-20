<template>
  <section class="board-filter">
    <button @click="filterOpen = !filterOpen" class="filter-btn">Filter</button>
    <div class="filter-menu" v-if="filterOpen">
      <div class="filter-menu-header flex">
        <span class="filter-title">Filter</span>
        <span class="close-menu">X</span>
      </div>

      <div class="filter-actions">
        <div class="filter-keywords">
          <label for="keyword">Keyword</label>
          <input
            @input="setFilterBy"
            v-model="filterBy.keyword"
            type="text"
            id="keyword"
            placeholder="Enter a keyword..."
          />
          <h6>Search cards,members,labels,and more.</h6>
        </div>
        <div>
          <h5 for="members">Members</h5>
          <div class="members-checkbox flex column">
            <div class="no-members flex">
              <input
                @input="setFilterBy"
                v-model="filterBy.member.noMember"
                id="no-members"
                type="checkbox"
              />
              <label for="no-members"><span>img</span> No members</label>
            </div>
            <div class="cards-assigned flex">
              <input
                @input="setFilterBy"
                v-model="filterBy.member.toMe"
                id="cards-assigned"
                type="checkbox"
              />
              <label for="cards-assigned"
                ><span>img</span> Cards assign to me</label
              >
            </div>
            <!-- <div class="select-member">
              <input id="select-member" type="checkbox" />
              <input type="select">
              <label for="select-member"><span>img</span> Select Member</label>
              <select id="select-member" placeholder="Select member">
                <option v-for="member in members" :key="member.id" value="member.username" >{{member.username}}</option>
              </select>
            </div> -->
            <div class="due-date">
              <h5>Due date</h5>
              <div class="no-dates flex">
                <input
                  @input="setFilterBy"
                  v-model="filterBy.dueDate.noDate"
                  id="no-dates"
                  type="checkbox"
                />
                <label for="no-dates"><span>img</span> No dates</label>
              </div>
              <div class="overdue flex">
                <input
                  @input="setFilterBy"
                  v-model="filterBy.dueDate.overdue"
                  id="overdue"
                  type="checkbox"
                />
                <label for="overdue"><span>img</span> Overdue</label>
              </div>
              <div class="due-next-day flex">
                <input
                  @input="setFilterBy"
                  v-model="filterBy.dueDate.nextDay"
                  id="due-next-day"
                  type="checkbox"
                />
                <label for="due-next-day"
                  ><span>img</span> Due in the next day</label
                >
              </div>
              <div v-if="moreOptions" class="more-date-options">
                <div class="due-next-week flex">
                  <input
                    @input="setFilterBy"
                    v-model="filterBy.dueDate.nextWeek"
                    id="due-next-week"
                    type="checkbox"
                  />
                  <label for="due-next-week"
                    ><span>img</span> Due in the next week</label
                  >
                </div>
                <div class="due-next-month flex">
                  <input
                    @input="setFilterBy"
                    v-model="filterBy.dueDate.month"
                    id="due-next-month"
                    type="checkbox"
                  />
                  <label for="due-next-month">
                    <span>img</span> Due in the next month</label
                  >
                </div>
                <div class="completed flex">
                  <input
                    @input="setFilterBy"
                    v-model="filterBy.dueDate.completed"
                    id="completed"
                    type="checkbox"
                  />
                  <label for="completed"> Marked as complete</label>
                </div>
                <div class="not-completed flex">
                  <input
                    @input="setFilterBy"
                    v-model="filterBy.dueDate.notCompleted"
                    id="not-completed"
                    type="checkbox"
                  />
                  <label for="not-completed"> Not marked as complete</label>
                </div>
              </div>
              <button @click="moreOptions = !moreOptions">
                Show {{ moreOptions ? 'less' : 'more' }} options
              </button>
            </div>
            <div class="labels">
              <h5>Labels</h5>
              <h3>coming soon</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'borderFilter',
  components: {},
  data() {
    return {
      filterOpen: false,
      moreOptions: false,
      filterBy: {
        keyword: '',
        member: {
          noMember: false,
          toMe: false,
        },
        dueDate: {
          noDate: false,
          overdue: false,
          nextDay: false,
          nextWeek: false,
          nextMonth: false,
          completed: false,
          notCompleted: false,
        },
      },
    }
  },
  methods: {
    setFilterBy(){
      console.log(this.filterBy);
    }
  },
  computed: {},
  created() {},
}
</script>
