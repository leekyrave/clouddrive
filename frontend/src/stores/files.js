import { getUserFiles } from "@/api/files";
import { defineStore } from "pinia";
import { reactive, ref } from "vue";

export const filesStore = defineStore('files', () => {
    const files = ref([{
        name: 'tests',
        size: 500000,
        created_at: new Date(),
        updated_at: new Date()
    }]);

    const fetchFiles = async () => {
        files.value = await getUserFiles();
    }

    const setFiles = async (files) => {
        
    }

    const deleteFile = async (fileID) => {

    }

    return {files, fetchFiles, setFiles, deleteFile};
})

export default filesStore;