<script setup>

const {survey} = defineProps({
    survey: Object
})

const emit = defineEmits(['delete'])

</script>

<template>
    <div class="flex flex-col py-6 px-4 shadow-md bg-white h-[470px]"
    >
        <img :src="survey.image" alt="" class="h-48 rounded-md border-[#1B4242] object-cover">
        <h4 class="mt-4 text-lg font-bold capitalize">
            {{survey.title}}
        </h4>
        <div v-html="survey.description" class="overflow-hidden flex-1 capitalize">
        </div>
        <div class="flex justify-between items-center">
            <router-link
                :to="{name: 'SurveyView', params: {id: survey.id}}"
                class="flex py-2 px-4 border border-transparent rounded-md text-white bg-[#1B4242] hover:bg-[#092635] focus:ring-2 focus:ring-offset-2 focus:ring-[#092635]"
            >
                <div class="flex items-center justify-center gap-1">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                        <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                    </svg>
                    <span>
                        Edit
                    </span>
                </div>
            </router-link>
            <div class="flex items-center gap-3">
                <a
                    :href="`/view/survey/${survey.slug}`"
                    target="_blank"
                    class="h-10 w-10 flex items-center justify-center rounded-full border border-transparent text-[#1B4242] focus:ring-2 focus:ring-offset-2 focus:ring-[#1B4242] hover:bg-[#092635] hover:text-[#9EC8B9]"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M13.19 8.688a4.5 4.5 0 011.242 7.244l-4.5 4.5a4.5 4.5 0 01-6.364-6.364l1.757-1.757m13.35-.622l1.757-1.757a4.5 4.5 0 00-6.364-6.364l-4.5 4.5a4.5 4.5 0 001.242 7.244" />
                    </svg>
                </a>
                <button
                    v-if="survey.id"
                    type="button"
                    @click="emit('delete', survey)"
                    class="h-10 w-10 flex items-center justify-center rounded-full border border-transparent text-red-500 focus:ring-2 focus:ring-offset-2 focus:ring-red-500 hover:bg-red-500 hover:text-white"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                    </svg>
                </button>
            </div>
        </div>
    </div>
</template>

<style scoped>

</style>
