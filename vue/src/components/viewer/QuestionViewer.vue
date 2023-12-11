<script setup>
import {ref} from "vue"
const {question, index, modelValue}  = defineProps({
    question: Object,
    index: Number,
    modelValue: [String, Array]
})

const emits = defineEmits(['update:modelValue'])

let model
if(question.type === 'checkbox'){
    model = ref({

    })
}

function onCheckBoxChange(){
    console.log('cek box : ', model.value)
    const selectedOptions = []
    for(let option in model.value){
        if(model.value[option]){
            selectedOptions.push(option)
        }
    }
    emits('update:modelValue', selectedOptions)
}

</script>

<template>
    <fieldset class="mb-4">
        <div>
            <legend class="text-base font-medium text-gray-900">
                {{index + 1}}. {{question.question}}
            </legend>
            <p class="text-gray-500 text-sm">
                {{question.description}}
            </p>
        </div>
        <div class="mt-3">
            <div v-if="question.type === 'select'">
                <select class="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                        :value="modelValue"
                        @change="emits('update:modelValue', $event.target.value)"
                >
                    <option disabled value="">Please select one</option>
                    <option v-for="option in question.data.options" :key="option.uuid" :value="option.text">
                        {{option.text}}
                    </option>
                </select>
            </div>
            <div v-else-if="question.type === 'radio'">
                <div v-for="(option, ind) of question.data.options"
                     :key="option.uuid"
                     class="flex items-center"
                >
                    <input
                        :id="option.uuid"
                        :name="'question-' + question.id"
                        :value="option.text"
                        @change="emits('update:modelValue', $event.target.value)"

                        type="radio"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                    />
                    <label
                        :for="option.uuid"
                        class="ml-3 block text-sm font-medium text-gray-700"
                    >
                        {{option.text}}
                    </label>
                </div>

            </div>
            <div v-else-if="question.type === 'checkbox'">
                <div
                    v-for="(option, index) of question.data.options"
                    :key="option.uuid"
                    class="flex items-center"
                >
                    <input
                        :id="option.uuid"
                        type="checkbox"
                        class="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300 rounded"
                        v-model="model[option.text]"
                        @change="onCheckBoxChange"
                    />
                    <label
                        :for="option.uuid"
                        class="ml-3 block text-sm font-medium text-gray-700"
                    >
                        {{option.text}}
                    </label>
                </div>

            </div>
            <div v-else-if="question.type === 'text'">
                <input
                    type="text"
                    :value="modelValue"
                    @input="emits('update:modelValue', $event.target.value)"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                />
            </div>
            <div v-else-if="question.type === 'textarea'">
                <textarea
                    :value="modelValue"
                    @input="emits('update:modelValue', $event.target.value)"
                    class="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                ></textarea>
            </div>
        </div>
    </fieldset>
    <hr class="mb-4">
</template>

<style scoped>

</style>
