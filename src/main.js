import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { focusDirective, clickOutside } from './directives'
import VCalendar from 'v-calendar';


import './styles/main.scss'


const app = createApp(App)
app.directive('focus', focusDirective)
app.directive('click-outside', clickOutside)

app.use(VCalendar, {})
app.use(router)
app.use(store)


app.mount('#app')

