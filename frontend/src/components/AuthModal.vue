<template>
    <div class = "modal-presset modal">
        <h1 class = "no-select inter-200 uppercase welcome-message">{{ $t('welcomeMessage') }}</h1>

        <div class = "inputs-wrapper">
            <InputGroup class = "input">
                <InputGroupAddon>
                    <i class="pi pi-user"></i>
                </InputGroupAddon>

                <InputText v-model = "login" :placeholder = "$t('usernameHint')"/>
            </InputGroup>

            <div>
                <InputGroup class = "input">
                    <InputGroupAddon>
                        <i class="pi pi-key"></i>
                    </InputGroupAddon>

                    <InputText v-model = "password" :placeholder = "$t('passwordHint')"/>
                </InputGroup>
                <RouterLink class = "no-decoration" :to = "{name: props.register ? 'signin' : 'signup'}">
                    <p class = "no-select hint-login">{{ $t(props.register ? 'alreadyHasAccountMessage' : 'noAccountMessage') }}</p>
                </RouterLink>
                
            </div>
            

            <Button @click = "props.register ? Register() : Login()" class = "input">
                <i class = "pi pi-check"></i>
                {{ $t(props.register ? 'registerMessage' : 'loginMessage') }}
            </Button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['register']);
import { InputGroup, InputText, useToast } from 'primevue';
import { onBeforeMount, ref } from 'vue';
import useAuthStore from '../stores/auth';
import { useRouter } from 'vue-router';
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();

const login = ref("");
const password = ref("");

const Register = async () => {
    const result = await authStore.Signup(login.value, password.value);
    if (!result) {
        toast.add({ severity: "error", summary: t('errorTitleMessage'), detail: t('registerErrorMessage'), life: 3000 });
        return;
    }

    toast.add({ severity: "success", summary: t('successTitleMessage'), detail: t('registerSuccessMessage'), life: 3000 });

    router.push({ name: 'home' })
}

const Login = async () => {
    const result = await authStore.Signin(login.value, password.value);

    if (!result) {
        toast.add({ severity: "error", summary: t('errorTitleMessage'), detail: t('loginErrorMessage'), life: 3000 });
        return;
    }

    toast.add({ severity: "success", summary: t('successTitleMessage'), detail: t('loginSuccessMessage'), life: 3000 });
    router.push({ name: 'home' })
}


onBeforeMount(() => {
    console.log(authStore.isAuthenticated)
    if (authStore.isAuthenticated)
        router.push({ name: 'home' })
})
</script>

<style lang="scss" scoped>
.welcome-message {
    font-size: 25px;
    text-align: center;
}

.hint-login {
    font-size: 15px;
    color: #44a2ff;
    cursor: pointer;
    
    transition: all 0.3s ease-in-out;
    text-align: center;
    &:hover {
        color: rgb(4, 109, 213)
    }
}

.modal {
    width: 500px;
    height: 500px;
    padding: 3.125rem;
}

.input {
    width: 21.875rem;
}

.inputs-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-height: 100%;
    gap: 1.25rem;
    flex-grow: 0.6;
}

</style>