<template>
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-32 w-auto" src="/simpleq-high-resolution-logo.png" alt="simpleQ Logo" />
            <h2 class="-mt-5 text-center text-xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
        </div>
        <div class="mt-5 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit="login">
                <Alert v-if="errorMsg" class="flex items-center justify-between">
                    {{errorMsg}}
                    <span
                        @click="errorButtonHandler('')"
                        class="cursor-pointer"
                    >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="{1.5}"
                                 stroke="currentColor" class="w-6 h-6 hover:text-slate-500">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                    </span>
                </Alert>
                <div>
                    <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
                    <div class="mt-2">
                        <input id="email"
                               name="email"
                               type="email"
                               autocomplete="email"
                               required=""
                               v-model="user.email"
                               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <div class="flex items-center justify-between">
                        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
                        <div class="text-sm">
                            <a href="#" class="font-semibold text-[#1B4242] hover:text-[#5C8374]">Forgot password?</a>
                        </div>
                    </div>
                    <div class="mt-2">
                        <input id="password"
                               name="password"
                               type="password"
                               autocomplete="current-password"
                               required=""
                               v-model="user.password"
                               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
                <div>
                    <div class="mt-2">
                        <input id="remember"
                               name="remember"
                               type="checkbox"
                               autocomplete="remember"
                               v-model="user.remember"
                               class="h-4 w-4 rounded text-indigo-600 focus:ring-indigo-600 border-gray-300 mr-2"
                        />
                        <label for="remember">
                            Remember Me
                        </label>
                    </div>
                </div>
                <div >
                    <button :disabled="loading"
                            type="submit"
                            class="flex w-full justify-center items-center rounded-md bg-[#5C8374] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-[#9EC8B9] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <svg v-if="loading"
                             class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="none"
                             viewBox="0 0 24 24"
                        >
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sign in
                    </button>
                </div>
            </form>

            <p class="mt-10 text-center text-sm text-gray-500">
                Not a member?
                {{ ' ' }}
                <router-link :to="{name: 'Register'}" class="font-semibold leading-6 text-[#1B4242] hover:text-[#5C8374]">
                    Register for free
                </router-link>
            </p>
        </div>
</template>

<script setup>
import store from "../store/index.js"
import {useRouter} from "vue-router"
import {ref} from "vue";
import Alert from "../components/Alert.vue";


let errorMsg = ref('')
let loading = ref(false)
const user = {
    email : '',
    password: '',
    remember: false
}

const router = useRouter()

const errorButtonHandler = (err) => {
    errorMsg.value = err
}

async function login(ev){
    loading.value = true
    ev.preventDefault()
    try {
        await store.dispatch('login', user)
        await router.push({
            name: 'Dashboard'
        })
    }catch (err){
        if(err.response.status === 422){
            errorButtonHandler('Invalid email or password')
            // errorMsg = 'Invalid email or password'
        }
    }finally {
        loading.value = false
    }
}

</script>

<style scoped>

</style>
