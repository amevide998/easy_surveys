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
                class="py-2 px-3 border-green-100 border rounded mr-4 hover:bg-green-100"
            >
                + Add
            </button>

<!--            delete question-->
            <button
                type="button"
                @click="deleteQuestion()"
                class="py-2 px-3 border-red-300 border rounded hover:bg-red-100"
            >
                Delete
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
                class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                class="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"

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
            class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
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
                class="flex items-center text-xs py-1 px-2 rounded-md text-white bg-gray-600 hover:bg-gray-700"
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
                class="w-full rounded-sm py-1 px-2 text-xs border border-gray-300 focus:border-indigo-500"
            />

<!--            Delete Options -->
            <button
                type="button"
                @click="removeOptions(option)"
                class="h-6 w-20 rounded ml-4 flex items-center justify-center border border-red-600 hover:bg-red-300 transition-colors"
            >
                Remove
            </button>

        </div>
    </div>
    <hr class="my-4"/>
</template>

<style scoped>

</style>
