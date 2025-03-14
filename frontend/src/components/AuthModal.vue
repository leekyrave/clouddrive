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
            

            <Button class = "input">
                <i class = "pi pi-check"></i>
                {{ $t(props.register ? 'registerMessage' : 'loginMessage') }}
            </Button>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['register']);
import { InputGroup, InputText } from 'primevue';
import { ref } from 'vue';

const login = ref("");
const password = ref("");

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