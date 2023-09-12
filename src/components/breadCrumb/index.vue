<template>
  <el-breadcrumb :separator-icon="ArrowRight">
    <el-breadcrumb-item :to="{ path: item.fullPath }" v-for="(item, index) in routeList" :key="index" @click="splice(index)">{{ item.meta?.title }}</el-breadcrumb-item>
    <!-- <el-breadcrumb-item>
      promotion detail
      <el-icon>
        <CloseBold />
      </el-icon>
    </el-breadcrumb-item> -->
  </el-breadcrumb>
</template>

<script setup lang="ts">
import { ArrowRight } from '@element-plus/icons-vue'
import { reactive, watch } from 'vue'
import { useRoute } from 'vue-router'
let routeList:any = reactive([])
const route = reactive(useRoute())
// routeList.push(route)
watch(route, async _newValue => {
  const breadCrumb = JSON.parse(localStorage.getItem('breadList'))
  breadCrumb.forEach((item:any) => {
    const show = routeList.filter((unitem:any) => unitem.fullPath === item.fullPath)
    console.log(show)
    if (!show.length) {
      routeList.push(item)
    } else {
      return null
    }
  })
}, {immediate: true})

const splice = function(i: number) {
  console.log(i)
  routeList.splice(i+1, routeList.length - 1)
}
</script>