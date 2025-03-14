
<template>
    <div class="card">
        <!-- <Toast /> -->
        <FileUpload pt:root:class = "card" name="demo[]" url="/api/upload" @upload="onTemplatedUpload($event)" :multiple="true" accept="image/*" :maxFileSize="1000000" @select="onSelectedFiles">
            <template #header="{ chooseCallback, uploadCallback, clearCallback, files }">
                <div class="header">
                    <div class="header-buttons">
                        <Button @click="chooseCallback()" icon="pi pi-images" rounded outlined severity="secondary"></Button>
                        <Button @click="uploadEvent(uploadCallback)" icon="pi pi-cloud-upload" rounded outlined severity="success" :disabled="!files || files.length === 0"></Button>
                        <Button @click="clearCallback()" icon="pi pi-times" rounded outlined severity="danger" :disabled="!files || files.length === 0"></Button>
                    </div>
                    <ProgressBar :value="totalSizePercent" :showValue="false" class="progress-bar">
                        <span class="progress-bar-text">{{ totalSize }}B / 1Mb</span>
                    </ProgressBar>
                </div>
            </template>

            <template pt:content:class = "content" #content="{ files, uploadedFiles, removeUploadedFileCallback, removeFileCallback }">
                <div class="content">
                    <div v-if="files.length > 0">
                        <h5>{{ $t('pendingMessage') }}</h5>
                        <div class="items">
                            <div v-for="(file, index) of files" :key="file.name + file.type + file.size" class="item">
                                <div>
                                    <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                </div>
                                <span class="inter-400 label-wrap">{{ file.name }}</span>
                                <div>{{ formatSize(file.size) }}</div>
                                <Badge :value="$t('pendingMessage')" severity="warn" />
                                <Button icon="pi pi-times" @click="onRemoveTemplatingFile(file, removeFileCallback, index)" outlined rounded severity="danger" />
                            </div>
                        </div>
                    </div>

                    <div v-if="uploadedFiles.length > 0">
                        <h5>{{ $t('completedMessage') }}</h5>
                        <div class="flex flex-wrap gap-4">
                            <div v-for="(file, index) of uploadedFiles" :key="file.name + file.type + file.size" class="item">
                                <div>
                                    <img role="presentation" :alt="file.name" :src="file.objectURL" width="100" height="50" />
                                </div>
                                <span class="inter-400 label-wrap">{{ file.name }}</span>
                                <div>{{ formatSize(file.size) }}</div>
                                <Badge :value="$t('completedMessage')" class="mt-4" severity="success" />
                                <Button icon="pi pi-times" @click="removeUploadedFileCallback(index)" outlined rounded severity="danger" />
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

const $primevue = usePrimeVue();

const totalSize = ref(0);
const totalSizePercent = ref(0);
const files = ref([]);

const onRemoveTemplatingFile = (file, removeFileCallback, index) => {
    removeFileCallback(index);
    totalSize.value -= parseInt(formatSize(file.size));
    totalSizePercent.value = totalSize.value / 10;
};

const onClearTemplatingUpload = (clear) => {
    clear();
    totalSize.value = 0;
    totalSizePercent.value = 0;
};

const onSelectedFiles = (event) => {
    files.value = event.files;
    files.value.forEach((file) => {
        totalSize.value += parseInt(formatSize(file.size));
    });
};

const uploadEvent = (callback) => {
    totalSizePercent.value = totalSize.value / 10;
    callback();
};

const onTemplatedUpload = () => {
    // toast.add({ severity: "info", summary: "Success", detail: "File Uploaded", life: 3000 });
};

const formatSize = (bytes) => {
    const k = 1024;
    const dm = 3;
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
    gap: 4px;
    overflow-y: auto;
    max-height: 400px;
    justify-content: center;
}

.item {
    padding: 4px;
    display: flex; /* flex */
    flex-direction: column; /* flex-col */
    border-radius: var(12px); 
    border: 0.2px solid gray;
    align-items: center; /* items-center */
    gap: 1rem; 

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
</style>