<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <PageComponent >
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">Surveys </h1>
                <router-link
                    :to="{name: 'SurveyCreate'}"
                    class="py-2 px-3 rounded-md"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-12 h-12 text-[#5C8374] hover:text-[#1B4242]">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </router-link>
            </div>
            <div v-if="surveys.loading" class="flex justify-center">Loading ...</div>
            <div v-else-if="surveys.data.length === 0" class="flex justify-center">No Surveys Found</div>
            <div v-else>
                <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                    <SurveyListItem
                        v-for="(survey, index) in surveys.data"
                        class='opacity-0 animate-fade-in-down'
                        :style="{animationDelay: `${index * 0.1}s`}"
                        :key="survey.id"
                        :survey="survey"
                        @delete="deleteSurvey(survey)"
                    />
                </div>

                <div class="flex justify-center mt-5">
                    <nav class="relative z-0 inline-flex justify-center rounded-md shadow-md px-2 -space-x-px"
                         aria-label="Pagination">
                        <a
                            v-for="(link, i) in surveys.links"
                            :key="i"
                            :disabled="!link.url"
                            v-html="link.label"
                            href="#"
                            @click="getForPage($event,link)"
                            aria-current="page"
                            class="relative inline-flex items-center px-4 py-2 text-sm font-medium whitespace-nowrap"
                            :class="[
                                link.active
                                ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50',
                            ]"
                        >
                        </a>
                    </nav>

                </div>
            </div>
        </template>
    </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import store from "../store/index.js";
import {computed} from "vue";
import SurveyListItem from "../components/SurveyListItem.vue";

const surveys = computed(()=> store.state.surveys)

store.dispatch('getSurveys')

async function deleteSurvey(survey){
    if(confirm(`are you sure to delete this survey ? `)){
        await store.dispatch('deleteSurvey', survey.id)
        await store.dispatch('getSurveys')
    }
}

async function getForPage(ev, link){
    ev.preventDefault()
    if(link.url === null || link.active){
        return
    }
    await store.dispatch('getSurveys', {url: link.url})
}

</script>


