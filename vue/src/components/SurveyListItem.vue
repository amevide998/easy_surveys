<script setup>

const {survey} = defineProps({
    survey: Object
})

const emit = defineEmits(['delete'])

</script>

<template>
    <div class="flex flex-col py-6 px-4 shadow-md bg-white hover:bg-gray-50 h-[470px]"
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
                @click="emit('delete', survey)"
                class="h-8 w-8 flex items-center justify-center rounded-full border border-transparent text-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
                Delete
            </button>
        </div>
    </div>
</template>

<style scoped>

</style>
