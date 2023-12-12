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
                <img
                    :src="data.latestSurvey.image_url"
                    class="w-[240px] mx-auto"
                    alt=""
                />
                <h3 class="font-bold text-xl mb-3">{{ data.latestSurvey.title }}</h3>
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
                        class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                        Edit Survey
                    </router-link>

                    <button
                        class="flex py-2 px-4 border border-transparent text-sm rounded-md text-white bg-lime-600 hover:bg-lime-700 focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                    >
                        View Answers
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
