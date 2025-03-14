<template>
    <DataTable pt:tablecontainer:class = "tablecontainer" :value = "files">
        <Column field="name" :header="$t('list.nameMessage')"></Column>
        <Column field="created_at" :header="$t('list.uploadedMessage')"></Column>
        <Column field="updated_at" :header="$t('list.editedMessage')"></Column>
        <Column>
            <template #body = "{data, index}">
                <Button type = "button" icon = "pi pi-file-edit" size="small" text></Button>
                <Button type = "button" icon = "pi pi-trash" size="small" text></Button>

            </template>
        </Column>
    </DataTable>
</template>

<script setup>
import { reactive } from 'vue';

const files = reactive([{
    name: 3,
    created_at: 'test',
    updated_at: '5'
}])
</script>

<style lang="scss">
.tablecontainer {
    width: 100%
}
</style>