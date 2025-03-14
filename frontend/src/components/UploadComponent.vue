
<template>
    <div class="card">
        <!-- <Toast /> -->
        <FileUpload pt:root:class = "card" name="upload" @upload="console.log('upload')" custom-upload :multiple="true" :file-limit="10" :maxFileSize="1 * 1024 * 1024 * 1024" @select="onSelectedFiles">
            <template #header="{ chooseCallback, clearCallback }">
                <div class="header">
                    <div class="header-buttons">
                        <Button @click="chooseCallback()" icon="pi pi-file-plus" rounded outlined severity="secondary"></Button>
                        <Button @click="uploadEvent()" icon="pi pi-cloud-upload" rounded outlined severity="success" :disabled="!filesList || filesList.length === 0"></Button>
                        <Button @click="clearEvent(clearCallback)" icon="pi pi-times" rounded outlined severity="danger" :disabled="!filesList || filesList.length === 0"></Button>
                    </div>
                    
                    <ProgressBar :value="totalSizePercent" :showValue="false" class="progress-bar">
                        <span class="progress-bar-text">{{ totalSize }}B / 1Mb</span>
                    </ProgressBar>
                </div>
            </template>

            <template pt:content:class = "content" #content>
                <div class="content">
                    <div v-if="filesList.length > 0">
                        <h5>{{ $t('pendingMessage') }}</h5>
                        <div class="items">
                            <div v-for="(file, index) of filesList" :key="file.name + file.type + file.size" class="item">
                                {{ console.log(file) }}
                                <div class = "item-wrapper-image">
                                    <img v-if = "file.type.includes('image/')" role="presentation" :alt="file.name" :src="file.objectURL" class="item-image" />
                                    <div v-else>
                                        <i class = "pi pi-file file-ico"/>
                                    </div>
                                </div>
                                <span class="inter-400 label-wrap">{{ file.name }}</span>
                                <div>{{ formatSize(file.size) }}</div>
                                {{ file.uploaded }}
                                <Badge :value="uploadStatuses[index] ? $t('completedMessage') : $t('pendingMessage')" :severity="uploadStatuses[index] ? 'success' : 'warn'" />
                                <Button icon="pi pi-times" @click = "removeFileEvent(index)" outlined rounded severity="danger" />
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            
            <template #empty>
                <div class="empty">
                    <i class="pi pi-cloud-upload cloud-upload" />
                    <p class="drag-n-drop-text">{{ $t('uploadMessage') }}</p>
                </div>
            </template>
        </FileUpload>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { usePrimeVue } from 'primevue/config';
import { useToast } from "primevue/usetoast";
import { uploadFile } from '@/api/files';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const toast = useToast();
const $primevue = usePrimeVue();

const totalSize = ref(0);
const totalSizePercent = ref(0);
const filesList = ref([]);
const uploadStatuses = ref([]);

const onSelectedFiles = (event) => {
    filesList.value = event.files;
    filesList.value.forEach((file, index) => {
        uploadStatuses.value[index] = false;
        totalSize.value += parseInt(formatSize(file.size));
    });
};

const removeFileEvent = (index) => {
    filesList.value.splice(index, 1);
    totalSizePercent.value = 0;
}

const clearEvent = (callback) => {
    totalSizePercent.value = 0;
    callback();
}

const uploadEvent = async () => {
    totalSizePercent.value = 0;
    for (let i = 0; i < filesList.value.length; i++) {
        await uploadFile(filesList.value[i], (progressPercentage) => totalSizePercent.value += progressPercentage / filesList.value.length);
        uploadStatuses.value[i] = true
        toast.add({ severity: "success", summary: t('successUploadTitle'), detail: t('successUpload', [filesList.value[i].name]), life: 3000 });
        removeFileEvent(i);
    }
};

const formatSize = (bytes) => {
    const k = 1024;
    const dm = 2;
    const sizes = $primevue.config.locale.fileSizeTypes;

    if (bytes === 0) {
        return `0 ${sizes[0]}`;
    }

    const i = Math.floor(Math.log(bytes) / Math.log(k));
    const formattedSize = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

    return `${formattedSize} ${sizes[i]}`;
};
</script>

<style lang="scss" scoped>
.card {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: 100%;
}

.header {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    align-items: center;
    gap: 4px;
    width: 43.75rem;
}

.header-buttons {
    display: flex;
    gap: 2px;
}

@media (min-width: 768px) {
    .progress-bar {
        width: 100%s;  /* Для экрана от 768px и выше */
        margin-left: auto;  /* Отсутствие отступа с левой стороны, выравнивание по правому краю */
    }
}

/* Общие стили */
.progress-bar {
    height: 10px;  /* Установка высоты в 1px */
    width: 100%;  /* Ширина 100% */
}

.progress-bar-text {
    white-space: nowrap;
}

.content {
    display: flex;
    flex-direction: column;
    gap: 8px;
    padding-top: 4px;
    width: 43.75rem;
}

.items {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    overflow-y: auto;
    max-height: 400px;
    justify-content: center;
}

.item {
    padding: 4px;
    display: flex; /* flex */
    flex-direction: column; /* flex-col */
    border-radius: var(12px); 
    border: 0.2px solid rgba(0, 0, 0, 0.247);
    border-radius: 12px;
    align-items: center; /* items-center */
    justify-content: space-between;
    gap: 1rem;
    width: 160px;

}

.label-wrap {
    white-space: nowrap;        /* Запрещаем перенос строки */
    overflow: hidden;           /* Обрезаем всё, что выходит за границы */
    text-overflow: ellipsis;  
    max-width: 60px;
}

.empty {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 350px
}

.cloud-upload {
    border-radius: 100%;
    border: 1px solid gray;
    padding: 40px;
    font-size: 50px;
    color: gray;
}

.drag-n-drop-text {
    margin-top: 6px;
    margin-bottom: 0;
}

.file-ico {
    font-size: 2rem;
}

.item-wrapper-image {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 3rem;
}

.item-image {
    width: 100%;
    height: 3rem;
    object-fit: contain;
}
</style>