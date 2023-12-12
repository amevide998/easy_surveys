<template>
        <div class="sm:mx-auto sm:w-full sm:max-w-sm">
            <img class="mx-auto h-10 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="Your Company" />
            <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register for free</h2>
            <Alert v-if="Object.keys(errors).length"
                   class="flex-col items-stretch text-sm"
            >
                <div class="flex justify-between">
                    <div>
                        <div
                            v-for="(field, i) in Object.keys(errors)"
                            :key="i"
                        >
                            <div
                                v-for="(error, i) of errors[field] || []"
                                :key="i"
                            >
                                * {{error}}
                            </div>
                        </div>
                    </div>
                    <span
                        v-if="Object.keys(errors).length"
                        @click="errors = ''"
                        class="flex justify-center items-center font-bold cursor-pointer hover:text-red-500 hover:bg-white w-6 h-6 rounded-full"
                    > X
                    </span>

                </div>
            </Alert>

        </div>
        <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <form class="space-y-6" @submit="register">
                <div>
                    <label for="name" class="block text-sm font-medium leading-6 text-gray-900">Fullname</label>
                    <div class="mt-2">
                        <input id="name"
                               name="name"
                               type="text"
                               autocomplete="email" required=""
                               v-model="user.name"
                               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>
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
                    </div>
                    <div class="mt-2 relative">
                        <input id="password"
                               name="password"
                               type="password"
                               autocomplete="current-password"
                               v-model="user.password"
                               required="" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                        <div class="absolute right-3 top-1">
<!--                            eye-->
                        </div>
                    </div>
                </div>
                <div>
                    <div class="flex items-center justify-between">
                        <label for="password_confirmation" class="block text-sm font-medium leading-6 text-gray-900">
                            Password Confirmation
                        </label>
                    </div>
                    <div class="mt-2">
                        <input id="password_confirmation"
                               name="password_confirmation"
                               type="password"
                               autocomplete="current-password"
                               required=""
                               v-model="user.password_confirmation"
                               class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                </div>

                <div>
                    <button :disabled="loading"
                            type="submit"
                            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        <svg v-if="loading"
                             class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                             xmlns="http://www.w3.org/2000/svg"
                             fill="none"
                             viewBox="0 0 24 24"
                        >
                            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Register
                    </button>
                </div>
            </form>
            <p class="mt-10 text-center text-sm text-gray-500">
                Already have an account?
                {{ ' ' }}
                <router-link :to="{name: 'Login'}" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
                    Login
                </router-link>
            </p>
        </div>
</template>

<script setup>
import store from "../store/index.js"
import {useRoute, useRouter} from "vue-router"
import {ref} from "vue";
import Alert from "../components/Alert.vue";

const router = useRouter()

const user = {
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
}

let errors = ref({})
let loading = ref(false)

async function register(ev){
    try {
        loading.value = true
        ev.preventDefault()
        await store.dispatch('register', user)
        await router.push({
            name: 'Dashboard'
        })
        loading.value = false
    }catch (err){
        if(err.response.status === 422){
            loading.value = false
            errors.value = err.response.data.errors
        }
    }

}
</script>

<style scoped>

</style>
