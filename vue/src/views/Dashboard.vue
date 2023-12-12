<template>
    <PageComponent title="Dashboard">
        <div v-if="loading" class="flex justify-center items-center h-screen">
            Loading ...
        </div>
        <div v-else-if="!data" class="flex justify-center items-center h-screen">
            Empty
        </div>
        <div v-else
             class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 text-gray-700"
        >
            <div
                class="animate-fade-in-down bg-white shadow-md p-3 text-center flex flex-col order-1 lg:order-2"
                style="animation-delay: 0.1s"
            >
                <h3 class="text-2xl font-semibold">Total Surveys</h3>
                <div
                    class="text-8xl font-semibold flex-1 flex items-center justify-center"
                >
                    {{ data.totalSurveys }}
                </div>
            </div>
            <div
                class="animate-fade-in-down bg-white shadow-md p-3 text-center flex flex-col order-2 lg:order-4"
                style="animation-delay: 0.2s"
            >
                <h3 class="text-2xl font-semibold">Total Answer</h3>
                <div
                    class="text-8xl font-semibold flex-1 flex items-center justify-center"
                >
                    {{ data.totalAnswer }}
                </div>
            </div>
            <div
                class="animate-fade-in-down row-span-2 order-3 lg:order-1 bg-white shadow-md p-4"
                v-if="data.latestSurvey"
            >
                <h3 class="text-2xl font-semibold">Latest Survey</h3>
                <img v-if="data.latestSurvey.image_url"
                     :src="data.latestSurvey.image_url"
                     class="w-[240px] mx-auto my-[1rem] rounded-md"
                     alt=""
                />
                <h3 class="font-bold text-xl mb-3 capitalize">{{ data.latestSurvey.title }}</h3>
                <div class="flex justify-between text-sm mb-1">
                    <div >
                        Create Date :
                    </div>
                    <div>
                        {{data.latestSurvey.created_at}}
                    </div>
                </div>
                <div class="flex justify-between text-sm mb-1">
                    <div>
                        Questions:
                    </div>
                    <div>
                        {{data.latestSurvey.questions}}
                    </div>
                </div>
                <div class="flex justify-between text-sm mb-1">
                    <div>
                        Status:
                    </div>
                    <div>
                        {{data.latestSurvey.status ? 'Active' : 'Draft'}}
                    </div>
                </div>
                <div class="flex justify-between text-sm mb-1">
                    <div>
                        Expire Date:
                    </div>
                    <div>
                        {{data.latestSurvey.expired_date}}
                    </div>
                </div>
                <div class="flex justify-between text-sm mb-3">
                    <div>
                        Answers:
                    </div>
                    <div>
                        {{data.latestSurvey.answers}}
                    </div>
                </div>
                <div class="flex justify-between ">
                    <router-link
                        :to="{name: 'SurveyView', params: {id: data.latestSurvey.id}}"
                        class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-[#1B4242] hover:bg-[#092635] focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4242]"
                    >
                        <div class="flex items-center justify-center gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                            </svg>
                            <span>
                                Edit
                            </span>
                        </div>
                    </router-link>

                    <button
                        class="flex py-2 px-4 border border-transparent text-sm rounded-md text-[#092635] bg-[#9EC8B9] hover:bg-[#5C8374] focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4242]"
                    >
                        <div class="flex items-center justify-center  gap-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M12 15a3 3 0 100-6 3 3 0 000 6z" />
                                <path fill-rule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 010-1.113zM17.25 12a5.25 5.25 0 11-10.5 0 5.25 5.25 0 0110.5 0z" clip-rule="evenodd" />
                            </svg>
                            <span>
                                Answers
                            </span>
                        </div>
                    </button>
                </div>
            </div>
            <div
                class="animate-fade-in-down row-span-2 order-3 lg:order-1 bg-white shadow-md p-4"
                v-else
            >
                <h3 class="text-2xl font-semibold">Latest Survey</h3>
                <p class="text-sm text-gray-500"
                >There is no surveys yet</p>
            </div>

                <div
                class="animate-fade-in-down bg-white shadow-md p-3 row-span-2 order-4 lg:order-3"
                style="animation-delay: 0.3s"
            >
                <div class="flex justify-between items-center mb-3 px-2">
                    <h3 class="text-2xl font-semibold">Latest Answers</h3>
                    <a href="javascript:void(0)"
                       class="text-sm text-blue-500 hover:decoration-blue-400 hover:underline"
                    >View All</a>
                </div>
                <a href="#"
                   v-for="answer of data.latestAnswer"
                   :key="answer.id"
                   class="block p-2 hover:bg-gray-100/90"
                >
                    <div class="font-semibold">{{answer.survey.title}}</div>
                    <small>
                        Answer Given at : {{answer.end_date}}
                    </small>
                </a>
            </div>

        </div>
    </PageComponent>
</template>

<script setup>
import PageComponent from '../components/PageComponent.vue'

import {useStore}  from "vuex"
import {computed} from "vue"

const store = useStore()

const data = computed(() => store.state.dashboard.data)
const loading = computed(() => store.state.dashboard.loading)

store.dispatch('getDashboardData')

</script>

<style scoped>

</style>
