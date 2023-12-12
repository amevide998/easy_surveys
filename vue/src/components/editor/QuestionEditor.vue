<script setup>
import {computed, ref} from "vue";
import store from "../../store/index.js";
import {v4} from "uuid";

const props = defineProps({
    question: Object,
    index: Number
})

const emit = defineEmits(['change', 'addQuestion', 'deleteQuestion'])

// recreate the whole question data to avoid unintentional reference change
const model = ref(JSON.parse(JSON.stringify(props.question)))
const questionTypes = computed(()=> store.state.questionTypes)
function upperCaseFirst(str){
    return str.charAt(0).toUpperCase() + str.slice(1)
}

function shouldHaveOptions(){
    return ['select', 'radio', 'checkbox'].includes(model.value.type)
}

function getOptions() {
     return model.value.data.options
}

function setOptions(options){
    model.value.data.options = options
}

function addOptions(){
    if(!getOptions()){
        setOptions([
            {uuid: v4(), text:""}
        ])
    }else {
        setOptions(
            [...getOptions(),
                {uuid: v4(), text:""}
            ]
        )
    }
    dataChange()
}

function removeOptions(op){
    setOptions(getOptions().filter(opt => opt !== op))
}

// emit the data change
function dataChange(){
    const data = JSON.parse(JSON.stringify(model.value))
    if(!shouldHaveOptions()){
        delete data.data.options
    }

    emit('change', data)
}

function addQuestion(){
    emit('addQuestion', props.index + 1)
}

function deleteQuestion(){
    emit('deleteQuestion', props.question)
}

</script>

<template>
    <div class="flex items-center justify-between">
        <h3 class="text-lg font-bold">
            {{index + 1}}. {{model.question}}
        </h3>
        <div class="flex items-center">
<!--            add new question -->
            <button
                type="button"
                @click="addQuestion()"
                class="border-[#092635] rounded-full mr-4 hover:bg-[#092635]"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-[#092635] hover:text-white">
                    <path fill-rule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25zM12.75 9a.75.75 0 00-1.5 0v2.25H9a.75.75 0 000 1.5h2.25V15a.75.75 0 001.5 0v-2.25H15a.75.75 0 000-1.5h-2.25V9z" clip-rule="evenodd" />
                </svg>
            </button>

<!--            delete question-->
            <button
                type="button"
                @click="deleteQuestion()"
                class="border-red-300 rounded-full hover:bg-red-500"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-8 h-8 text-red-500 hover:text-white">
                    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                </svg>
            </button>
        </div>
    </div>

    <div  class="grid gap-3 grid-cols-12">
<!--        Questions-->
        <div class="mt-3 col-span-9">
            <label
                :for="'question_text_' + model.data"
                class="block text-sm font-medium text-gray-700"
            >
                Question Text
            </label>
            <input
                type="text"
                :name="'question_text_'+ model.data"
                v-model="model.question"
                @change="dataChange"
                :id="'question_text_' + model.data"
                class="mt-1 focus:ring-[#5C8374] focus:border-[#5C8374] block w-full shadow-sm sm:text-sm border-[#5C8374] rounded-md"
            >

        </div>

<!--        Questions Type-->
        <div class="mt-3 col-span-3">
            <label for="question_type" class="block text-sm font-medium text-gray-700"
            >
                Select Question Type
            </label>
            <select
                id="question_type"
                name="question_type"
                v-model="model.type"
                @change="typeChange"
                class="mt-1 block w-full py-2 px-3 border border--[#5C8374] bg-white rounded-md shadow-sm focus:outline-none focus:ring-[#5C8374] focus:border-[#5C8374] sm:text-sm"
            >
                <option
                    v-for="type in questionTypes" :key="type" :value="type"
                >
                    {{upperCaseFirst(type)}}
                </option>

            </select>

        </div>
    </div>

<!--    Question Description-->
    <div class="mt-3 col-span-9">
        <label
            :for="'question_decription_' + model.id"
            class="block text-sm font-medium text-gray-700"
        >
            Description
        </label>
        <textarea
            :name="'question_description_' + model.id"
            v-model="model.description"
            @change="dataChange"
            :id="'question_description' + model.id"
            class="mt-1 focus:ring-[#5C8374] focus:border-[#5C8374] block w-full shadow-sm sm:text-sm border-[#5C8374] rounded-md"
        >
        </textarea>
    </div>

<!--    Data-->
    <div v-if="shouldHaveOptions()" class="mt-2">
        <h4 class="text-sm font-semibold mb-1 flex justify-between items-center">
            Options
<!--            Add New Options-->
            <button
                type="button"
                @click="addOptions()"
                class="flex items-center text-xs py-1 px-2 rounded-md text-white bg-[#5C8374] hover:bg-[#5C8374]"
            >
               + Add Option
            </button>
        </h4>

        <div
            v-if="!model.data.options"
            class="text-xs text-gray-600 text-center py-3"
        >
            You dont have any options defined
        </div>

<!--        Options List -->
        <div
            v-for="(option, index) in model.data.options"
            :key="option.uuid"
            class="flex items-center mb-1"
        >
            <span class="w-6 text-sm"
            >
                {{index + 1 }}.
            </span>
            <input
                type="text"
                v-model="option.text"
                @change="dataChange"
                class="w-full rounded-sm py-1 px-2 text-xs border border-[#5C8374] focus:border-[#5C8374] focus:ring-transparent"
            />

<!--            Delete Options -->
            <button
                type="button"
                @click="removeOptions(option)"
                class="h-6 rounded-full ml-4 flex items-center justify-center transition-colors"
            >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 text-red-500 hover:text-red-700">
                    <path fill-rule="evenodd" d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z" clip-rule="evenodd" />
                </svg>
            </button>

        </div>
    </div>
    <hr class="my-4"/>
</template>

<style scoped>

</style>
