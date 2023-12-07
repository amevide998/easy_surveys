<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <PageComponent >
        <template v-slot:header>
            <div class="flex justify-between items-center">
                <h1 class="text-3xl font-bold tracking-tight text-gray-900">Surveys </h1>
                <router-link
                    :to="{name: 'SurveyCreate'}"
                    class="py-2 px-3 bg-lime-300 rounded-md hover:bg-lime-700"
                >
                    + Add New Surveys
                </router-link>
            </div>
            <div class="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-3">
                <div v-for="survey in surveys"
                    :key="survey.id"
                    class="flex flex-col py-6 px-4 shadow-md bg-white hover:bg-gray-50 h-[470px]"
                >
                    <img :src="survey.image" alt="" class="w-full h-48 object-cover">
                    <h4 class="mt-4 text-lg font-bold">
                        {{survey.title}}
                    </h4>
                    <div v-html="survey.description" class="overflow-hidden flex-1">
                    </div>
                    <div class="flex justify-between mt-4 items-center">
                        <router-link
                            :to="{name: 'SurveyView', params: {id: survey.id}}"
                            class="flex py-2 px-4 border border-transparent rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Edit
                        </router-link>
                        <button
                            v-if="survey.id"
                            type="button"
                            @click="deleteSurvey(survey)"
                            class="h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </template>
    </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import store from "../store/index.js";
import {computed} from "vue";

const surveys = computed(()=> store.state.surveys.data)

store.dispatch('getSurveys')

async function deleteSurvey(survey){
    if(confirm(`are you sure to delete ${survey} ? `)){
        // delete surveys
    }
}

</script>


