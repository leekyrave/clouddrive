<template>
    <div class = "modal-presset modal absolute-center">
        <LeftMenu class = "menu-position"/>
        
        <RouterView class = "right-position"/>
    </div>
</template>

<script setup>
import LeftMenu from '@/components/LeftMenu.vue';
import { RouterView } from 'vue-router';

</script>

<style lang = "scss" scoped>
.modal {
    flex-direction: row;
    width: 84vw;
    height: 84vh;
}

.menu-position {
    align-self: flex-start;
    width: 12.5rem;
}

.right-position {
    display: flex;
    width: 100%;
    height: 100%;
}
</style>