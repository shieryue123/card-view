<template>
    <pageList :clumb="clumb" ref="page_list">
        <template v-slot:page_btn>
            <el-button type="primary" @click="onAdd">添加链接</el-button>
        </template>
        <template #table_column>
            <el-table-column>
                <template #default="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">Edit</el-button>
                    <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
            </el-table-column>
        </template>
    </pageList>
    <addShort ref="addshort" :value="show" @onAdd="onAdd" />
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import addShort from './components/addShort.vue'
import * as Api from '@/api/short'
import { ElMessageBox } from 'element-plus'
// import { nextTick } from 'process';
const clumb = reactive({
    searchlist: [
        { label: '短链接码', value: 'shot_code' },
        { label: '链接地址', value: 'full_url' }
    ],
    clubme: [
        { name: '短链接码', value: 'shot_code' },
        { name: '链接地址', value: 'full_url' },
        { name: '短链接地址', value: 'base_url' },
        { name: '点击次数', value: 'total_click' }
    ],
    getData(data: any) {
        return new Promise((resolve, reject) => {
            Api.shortList(data).then((res: any) => {
                resolve(res)
            }).catch((err: any) => {
                reject(err)
            })
        })
    }
})

const page_list = ref()
// 添加链接
const show = ref(false)
const onAdd = (val: boolean, relocd: boolean) => {
    show.value = val
    if (relocd) {
        page_list.value.Search()
    }
}
const handleDelete = (_i: any, item: any) => {
    console.log(item)
    ElMessageBox.confirm('是否删除当前链接').then(() => {
        Api.deleteUrl({ url_id: item.url_id }).then(() => {
            page_list.value.Search()
        })
    })
}
const handleEdit = (_i: any, _g: any) => {

}
</script>