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
                <SurveyListItem
                    v-for="survey in surveys"
                    :key="survey.id"
                    :survey="survey"
                    @delete="deleteSurvey(survey)"
                />
            </div>
        </template>
    </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import store from "../store/index.js";
import {computed} from "vue";
import SurveyListItem from "../components/SurveyListItem.vue";

const surveys = computed(()=> store.state.surveys.data)

store.dispatch('getSurveys')

async function deleteSurvey(survey){
    if(confirm(`are you sure to delete ${survey} ? `)){
        await store.dispatch('deleteSurvey', survey.id)
        await store.dispatch('getSurveys')
    }
}

</script>


