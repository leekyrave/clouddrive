import { defineStore } from "pinia";
import { reactive } from "vue";

export const filesStore = defineStore('files', () => {
    const files = reactive([{
        name: 'tests',
        size: 500000,
        created_at: new Date(),
        updated_at: new Date()
    }]);

    const fetchFiles = async () => {

    }

    const setFiles = async (files) => {
        
    }

    const deleteFile = async (fileID) => {

    }

    return {files, fetchFiles, setFiles, deleteFile};
})

export default filesStore;