import { computed, reactive, ref } from "vue";
import { defineStore } from "pinia";
import { signIn, signUp } from "@/api/auth";
import { jwtDecode } from "jwt-decode";

export const authStore = defineStore('auth', () => {
    const token = ref(localStorage.getItem('jwt_token') || null);


    const isAuthenticated = ref(token.value ? true : false);

    const user = computed(() => {
        return token.value ? jwtDecode(token.value) : [];
    })

    const Signup = async (login, password) => {
        try {
            const response = await signUp(login, password);
            const data = response?.data;
            if (!data?.token)
                return false;

            SetToken(data['token']);
            SetUser(jwtDecode(data['token']));
        } catch (e) {
            return false;
        }
        return true;
    }

    const Signin = async (login, password) => {
        try {
            const response = await signIn(login, password);
            const data = response?.data;
            if (!data?.token) return false;
            
            SetToken(data['token']);
            SetUser(jwtDecode(data['token']));

        } catch (e) {
            console.log(e);
            return false;
        }

        return true;
    }

    const SetUser = (user) => {
        user.value = user;
    }

    const SetToken = (_token) => {
        token.value = _token;
        localStorage.setItem('jwt_token', _token);
        isAuthenticated.value = true;
    }

    const RemoveToken = () => {
        token.value = null;
        isAuthenticated.value = false;
        localStorage.removeItem('jwt_token');
    }

    const logout = () => {
        RemoveToken();
    }
    
    return { token, user, isAuthenticated, Signin, Signup, logout}
});

export default authStore;