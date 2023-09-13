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
import * as Api from '@/api/short'
const clumb = reactive({
    searchlist: [
        {label: '短链接码', value: 'shot_code'},
        {label: '链接地址', value: 'full_url'}
    ],
    clubme: [
        { name: '短链接码', value: 'shot_code'},
        { name: '链接地址', value: 'full_url'}
    ],
    getData(data: any) {
        return new Promise((resolve, reject) => {
            Api.shortList(data).then((res:any) => {
                resolve(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
})

// 添加链接
const show = ref(false)
const onAdd = (val:boolean) => {
    show.value = val
}
</script>