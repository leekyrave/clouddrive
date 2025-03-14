import { createI18n } from "vue-i18n";
import translations from './translations.json';
import Cookies from "js-cookie";

const i18n = createI18n({
    locale: Cookies.get('locale') || 'pl',
    messages: translations,
})

export default i18n;