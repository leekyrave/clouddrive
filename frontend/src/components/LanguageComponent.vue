<template>
    <SelectButton :pt = "{
        pcToggleButton: {
            label: 'uppercase'
        }
    }" :default-value="language" :allow-empty="false" @change="changeLanguage" :options = "options"/>
</template>

<script setup>
import Cookies from 'js-cookie';
import { SelectButton } from 'primevue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { locale, availableLocales } = useI18n();

const language = ref(Cookies.get('locale') || 'pl');
const options = ref([...availableLocales]);

const changeLanguage = (event) => {
    event.value = event.value ? event.value : language.value;
    locale.value = event.value.toLowerCase();
    
    Cookies.set('locale', locale.value);
}
</script>

<style lang = "scss">

</style>