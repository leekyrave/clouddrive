
<template>
    <div class="modal">
        <Menu :model="items" class="w-full md:w-60">
            <template #start>
                <p class = "inter-300 uppercase align-center">Clouddrive</p>
            </template>

            <template #submenulabel="{ item }">
                <span class="inter-500">{{ $t(item.label) }}</span>
            </template>

            <template #item="{ item, props }">
                <RouterLink :to = "item.path" class = "color-item no-decoration">
                <a v-ripple class="flex items-center" v-bind="props.action">
                    <span :class="item.icon" />
                    <span>{{ $t(item.label) }}</span>
                </a>
                </RouterLink>
            </template>
            
            <template #end>
                <button v-ripple class = "profile">
                    <Avatar size="10px" image = "/images/avatar.png" shape = "circle"/>
                    <p>{{ authStore.user.name }}</p>
                </button>
            </template>
        </Menu>
    </div>
</template>

<script setup>
import { ref } from "vue";
import useAuthStore from '../stores/auth';
const authStore = useAuthStore();

const items = ref([
    {
        separator: true
    },
    {
        label: 'leftMenu.filesCategoryMessage',
        items: [
            {
                label: 'leftMenu.fileAddMessage',
                icon: 'pi pi-plus',
                shortcut: '⌘+N',
                path: '/upload'
            },

            {
                label: 'leftMenu.filesListMessage',
                icon: "pi pi-list",
                path: "/list"
            },

            {
                label: 'leftMenu.fileSearchMessage',
                icon: 'pi pi-search',
            }
        ]
    },
    {
        label: 'leftMenu.profileCategoryMessage',
        items: [
            {
                label: 'leftMenu.logoutMessage',
                icon: 'pi pi-sign-out',
            }
        ]
    },
    {
        separator: true
    }
]);
</script>


<style lang="scss" scoped>
.modal {
    display: flex;
}

.profile {
    justify-self: center;
    padding: 0 0 0 0.8rem;
    margin-bottom: 0.3rem;
    display: flex;
    width: 95%;
    gap: 0.5rem;
    align-items: center;
    border: 0;
    background-color: transparent;
    color: var(--p-menu-item-color);

    transition: background var(--p-menu-transition-duration), color var(--p-menu-transition-duration);
    border-radius: var(--p-menu-item-border-radius);
    
    &:hover {
        color: var(--p-menu-item-focus-color);
        background: var(--p-menu-item-focus-background);
    }
}

.color-item {
    color: var(--p-menu-item-color);

    &:hover {
        color: var(--p-menu-item-focus-color);
    }
}
</style>