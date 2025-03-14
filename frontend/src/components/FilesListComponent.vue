<template>
    <div class = "tablecontainer">
    <DataTable :pt="{root: 'tablecontainer'}" stripedRows resizable-columns :value = "filesStore.files">
        <Column field="name" :header="$t('list.nameMessage')">
            <template #body = "{data, index}">
                {{ data.name }}
            </template>
        </Column>

        <Column :header="$t('list.sizeMessage')" style = "width: 20%">
            <template #body = "{data}">
                {{ formatSize(data.size) }}
            </template>
        </Column>

        <Column :header="$t('list.uploadedMessage')" style = "width: 20%">
            <template #body = "{data}">
                {{ formatDate(data.created_at) }}
            </template>
        </Column>
        <Column :header="$t('list.editedMessage')" style = "width: 20%">
            <template #body = "{data}">
                {{ formatDate(data.updated_at) }}
            </template>
        </Column>
        <Column style = "width: 14%;">
            <template #body = "{data, index}">
                <Button type = "button" icon = "pi pi-download" size="small" text></Button>
                <Button type = "button" icon = "pi pi-file-edit" size="small" text></Button>
                <Button @click = "deleteFile()" type = "button" icon = "pi pi-trash" size="small" text></Button>
            </template>
        </Column>
    </DataTable>

    <ConfirmDialog/>
    </div>
</template>

<script setup>
import { useConfirm } from 'primevue/useconfirm';
import { useI18n } from 'vue-i18n';
const confirm = useConfirm();
const { t } = useI18n();
import useFilesStore from '../stores/files';
const filesStore = useFilesStore();
import { formatDate, formatSize } from '@/utils';
import { onBeforeMount } from 'vue';

const deleteFile = () => {
    confirm.require({
        message: t("submitModal.warningMessage"),
        header: t("submitModal.titleMessage"),
        icon: 'pi pi-exclamation-circle',
        rejectProps: {
            label: t('submitModal.cancelMessage'),
            severity: 'danger',
            outlined: true
        },

        acceptProps: {
            label: t('submitModal.saveMessage')
        },

        accept: () => {

        },

        reject: () => {

        }
    })
}

onBeforeMount(() => {
    filesStore.fetchFiles();
})
</script>

<style lang="scss">
.tablecontainer {
    width: 100%
}
</style>