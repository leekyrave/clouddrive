import { reactive, ref } from "vue";
import { defineStore } from "pinia";

export const authStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('jwt_token')) || null;
    const user = reactive({
        name: "test"
    });
    const isAuthenticated = ref(false);

    const Signup = async (login, password) => {
        
    }

    const Signin = async (login, password) => {

    }

    const setToken = (token) => {

    }

    const removeToken = () => {

    }

    const logout = () => {
        
    }
    
    return { token, user, isAuthenticated, Signin, Signup, logout}
});

export default authStore;