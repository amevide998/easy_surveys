<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <PageComponent>
        <template v-slot:header>
            <div class="flex items-center justify-between">
                <h1 class="text-3xl font-bold text-[#1B4242]">
                    {{route.params.id ? model.title: 'Create a Survey'}}
                </h1>
                <button v-if="route.params.id"
                        type="button"
                        class="bg-red-500 hover:bg-red-700 px-2 py-2 text-gray-50 font-bold rounded-full"
                        @click="deleteSurvey">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-10 h-10">
                        <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                    </svg>

                </button>
            </div>
        </template>
        <div v-if="surveyLoading" class="flex justify-center items-center">
            Loading ...
        </div>
        <form v-else @submit.prevent="saveSurvey" class="animate-fade-in-down">
            <div class="shadow sm:rounded-md sm:overflow-hidden">
                <!--Survey field-->
                <div class="px-4 py-5 bg-white space-y-6 sm:p-6">
<!--                    Image-->
                    <div>
                        <label class="block font-medium text-gray-700">
                            Image
                        </label>
                        <div class="mt-1 flex items-center">
                            <svg v-if="!model.image_url"
                                 xmlns="http://www.w3.org/2000/svg"
                                 fill="none" viewBox="0 0 24 24"
                                 stroke-width="1.5"
                                 stroke="currentColor"
                                 class="w-10 h-10 text-[#1B4242]"
                            >
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                            </svg>
                            <img v-else
                                :src="model.image"
                                :alt="model.image_url"
                                class="w-64 h-48 object-cover border p-1 border-[#9EC8B9]"
                            >
                            <button
                                type="button"
                                class="ml-4 px-4 py-2 relative overflow-hidden border border-[#9EC8B9] text-[#9EC8B9] rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:border-[#1B4242] hover:text-[#1B4242] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
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
                            class="mt-1 focus:ring-[#1B4242] focus:border-[#9EC8B9] block w-full shadow-sm sm:text-sm border-[#9EC8B9] rounded-md"
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
                                class="shadow-sm focus:ring-[#1B4242] focus:border-[#9EC8B9] block w-full border border-[#9EC8B9] rounded-md"
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
                            name="expired_date"
                            id="expired_date"
                            v-model="model.expired_date"
                            class="mt-1 focus:ring-[#1B4242] focus:border-[#1B4242] block w-full shadow-sm sm:text-sm border-[#9EC8B9] rounded-md text-[#1B4242]"
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
                                class="focus:ring-transparent h-4 w-4 text-[#092635] border-gray-300 rounded"
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
                            <button
                                class="cursor-pointer border border-[#9EC8B9] py-2 px-3 rounded-md hover:bg-[#9EC8B9]"
                                type="button"
                                @click="addQuestion()"
                            >
                                <div class="flex items-center text-[#092635]">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                        <path fill-rule="evenodd" d="M12 3.75a.75.75 0 01.75.75v6.75h6.75a.75.75 0 010 1.5h-6.75v6.75a.75.75 0 01-1.5 0v-6.75H4.5a.75.75 0 010-1.5h6.75V4.5a.75.75 0 01.75-.75z" clip-rule="evenodd" />
                                    </svg>
                                    <span>
                                        Questions
                                    </span>
                                </div>
                            </button>
                        </h3>
                        <div v-if="!model.questions" class="text-center text-gray-600">
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
                            class="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-[#1B4242] hover:bg-[#092635] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-transparent"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </div>
        </form>
    </PageComponent>
</template>

<script setup>
import PageComponent from "../components/PageComponent.vue";
import {computed, ref, watch} from "vue";
import store from "../store/index.js";
import {useRoute, useRouter} from "vue-router";
import QuestionEditor from "../components/editor/QuestionEditor.vue";
import {v4} from "uuid";

const route = useRoute()
const router = useRouter()

const surveyLoading = computed(() => store.state.currentSurvey.loading)
// create empty survey
let model = ref({
    title: "",
    status: false,
    description: null,
    image: 'null',
    expired_date: null,
    questions: []
})


// watch current survey
watch(
    () => store.state.currentSurvey.data,
    (newVal, oldVal) => {
        model.value = {
            ...JSON.parse(JSON.stringify(newVal)),
            status: newVal.status !== 'draft',
            expired_date: newVal.expired_date ? newVal.expired_date.split(' ')[0] : null
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
    await store.dispatch('saveSurvey', model.value)
    store.commit('notify', {
        type: 'success',
        message: 'survey was saved successfully'
    })
    await router.push({
        name: 'Surveys',
    })

}

async function deleteSurvey(){
    if(confirm('are you sure want delete this survey ?')){
        await store.dispatch('deleteSurvey', model.value.id)
        store.commit('notify', {
            type: 'success',
            message: 'survey was deleted successfully'
        })
        await router.push({
            name: 'Surveys'
        })
    }
}

</script>

<style scoped>

</style>
