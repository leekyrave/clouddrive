import './assets/styles.scss';
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import router from './router';

import App from './App.vue';
import PrimeVue from 'primevue/config';
import Aura from '@primeuix/themes/aura';

import i18n from './translations';


const app = createApp(App)

app.use(PrimeVue, {
  theme: {
    preset: Aura
  }
})

app.use(i18n);
app.use(createPinia())
app.use(router)

app.mount('#app')
