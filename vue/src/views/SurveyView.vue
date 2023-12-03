<script setup>
import PageComponent from "../components/PageComponent.vue";
import {ref, watch} from "vue";
import store from "../store/index.js";
import {useRoute, useRouter} from "vue-router";
import QuestionEditor from "../components/editor/QuestionEditor.vue";
import {v4} from "uuid";


const route = useRoute()
const router = useRouter()

// create empty survey
let model = ref({
    title: "",
    status: false,
    description: null,
    image: null,
    expire_date: null,
    questions: []
})

// watch curren survey
watch(
    () => store.state.currentSurvey.data,
    (newVal, oldVal) => {
        model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
            status: newVal.status !== 'draft'
        }
    }
)

if(route.params.id){
    store.dispatch('getSurvey', route.params.id)
}

function onChooseImageFile(ev){
    const file = ev.target.files[0]
    const reader = new FileReader()

    // callback on load
    reader.onload = () => {
        model.value.image = reader.result
        model.value.image_url = reader.result
    }

    reader.readAsDataURL(file)
}

function addQuestion(index){
    const newQuestion = {
        id: v4(),
        type: 'text',
        question: '',
        description: null,
        data: {}
    }

    model.value.questions.splice(index, 0, newQuestion)
}

function deleteQuestion(question){
    model.value.questions = model.value.questions.filter(q => q.id !== question.id)
}

function questionChange(question){
    model.value.questions = model.value.questions.map(q=> {
        if(q.id === question.id){
            return JSON.parse(JSON.stringify(question))
        }
        return q
    })
}

async function saveSurvey(){
    const {data} = await store.dispatch('saveSurvey', model.value)
    await router.push({
        name: 'SurveyView',
        params: {
            id: data.data.id
        }
    })
}
</script>

<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-gray-900">
                    {{model.id ? model.title: 'create a Survey'}}
                </h1>
            </div>
        </template>
        <form @submit.prevent="saveSurvey">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <!--Survey field-->
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
<!--                    Image-->
                    <div>
                        <label class="block font-medium text-gray-700">
                            Image
                        </label>
                        <div class="mt-1 flex items-center">
                            <img
                                v-if="model.image_url"
                                :src="model.image_url"
                                :alt="model.image"
                                class="w-64 h-48 object-cover"
                            >
                            <span
                                v-else
                                class="flex items-center justify-center h-12 w-12 rounded-full overflow-hidden bg-gray-100"
                            >
                                img-hero
                            </span>
                            <button
                                type="button"
                                class="ml-4 px-4 py-2 relative overflow-hidden border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                            >
                                <input
                                    class="absolute top-0 right-0 left-0 bottom-0 opacity-0 cursor-pointer"
                                    type="file"
                                    @change="onChooseImageFile"
                                >
                                Change
                            </button>
                        </div>
                    </div>

<!--                    Title-->

                    <div>
                        <label for="title" class="block font-medium text-gray-700">
                            Title
                        </label>
                        <input
                            type="text"
                            name="title"
                            id="title"
                            v-model="model.title"
                            autocomplete="survey_title"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        >
                    </div>

<!--                    Description-->
                    <div>
                        <label
                            for="about"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Description
                        </label>
                        <div class="mt-1">
                            <textarea
                                id="description"
                                name="description"
                                rows="3"
                                v-model="model.description"
                                autocomplete="survey_description"
                                class="shadow-sm focus:ring-indigo-500 focus:border-indigo-500 block w-full border border-gray-300 rounded-md"
                                placeholder="Describe your survey"
                            >

                            </textarea>
                        </div>
                    </div>

<!--                    Expire Date-->
                    <div>
                        <label
                            for="expire_date"
                            class="block text-sm font-medium text-gray-700"
                        >
                            Expired Date
                        </label>
                        <input
                            type="date"
                            name="expire_date"
                            id="expire_date"
                            v-model="model.expire_date"
                            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        >
                    </div>

<!--                    Status-->
                    <div class="flex items-start">
                        <div class="flex items-center h-5">
                            <input
                                id="status"
                                name="status"
                                type="checkbox"
                                v-model="model.status"
                                class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                            >
                        </div>
                        <div class="ml-3 text-sm">
                            <label
                                for="status"
                                class="font-medium text-gray-700"
                            >
                                Active
                            </label>
                        </div>
                    </div>

<!--                    Survey Fields-->
                    <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
                        <h3 class="text-xl font-semibold flex items-center justify-between">
                            <button>
                                Questions
                            </button>
                            <div class="cursor-pointer border border-gray-300 py-2 px-3 rounded-md hover:bg-gray-300">
                                + Add Question
                            </div>
                        </h3>
                        <div v-if="!model.questions.length" class="text-center text-gray-600">
                            You Dont Have any questions yet
                        </div>
                        <div v-for="(question, index) in model.questions" :key="question.id">
                            <QuestionEditor
                                :question="question"
                                :index="index"
                                @change="questionChange"
                                @addQuestion="addQuestion"
                                @deleteQuestion="deleteQuestion"
                            />
                        </div>
                    </div>
                    <div class="px-4 py-3 bg-gray-50 text-right sm:px-6">
                        <button
                            type="submit"
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </PageComponent>
</template>

<style scoped>

</style>
