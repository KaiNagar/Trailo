import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { focusDirective, clickOutside } from './directives'
// import VCalendar from 'v-calendar';

import Datepicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'
import VueSweetalert2 from 'vue-sweetalert2';
// import 'sweetalert2/dist/sweetalert2.min.css';
import 'sweetalert2/dist/sweetalert2.min.css';
import './styles/main.scss'


const app = createApp(App)

app.directive('focus', focusDirective)
app.directive('click-outside', clickOutside)

// Use the components
app.component('Datepicker', Datepicker)
// app.use(VCalendar, {})
app.use(VueSweetalert2)
app.use(router)
app.use(store)


app.mount('#app')

