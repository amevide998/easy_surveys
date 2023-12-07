<script setup>
import {computed, ref} from "vue";
import {useStore} from "vuex";

const store = useStore();

const notification = computed(() => store.state.notification);



</script>

<template>

</template>

<style scoped>

</style>
