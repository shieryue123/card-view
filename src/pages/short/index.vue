<template>
    <pageList :clumb="clumb">
        <template v-slot:page_btn>
            <el-button type="primary" @click="onAdd">添加链接</el-button>
        </template>
    </pageList>
    <addShort ref="addshort" :value="show" @onAdd="onAdd"/>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import addShort from './components/addShort.vue'
const clumb = reactive({
    searchlist: [
        {label: ''}
    ]
})

// 添加链接
const show = ref(false)
const onAdd = (val:boolean) => {
    show.value = val
}
</script>