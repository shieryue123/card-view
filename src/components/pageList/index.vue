<template>
  <div class="page">
    <div class="page_header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item :label="item.label" v-for="(item, index) in props.clumb?.searchlist" :key="index">
          <el-input v-model="formInline[item.value]" :placeholder="`请输入${item.label}`" clearable />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>
      <slot name="page_btn"></slot>
    </div>
    <div class="page_list">
      <el-table :data="tableData">
        <el-table-column :prop="item.value" :label="item.name" v-for="(item, index) in props.clumb?.clubme"
          :key="index" />
      </el-table>
    </div>
    <div class="page_footer">
      <el-config-provider :locale="locale">
        <el-pagination v-model:current-page="current" v-model:page-size="size" :page-sizes="[100, 200, 300, 400]"
          layout="total, sizes, prev, pager, next, jumper" :total="0" @size-change="handleSizeChange"
          @current-change="handleCurrentChange" />
      </el-config-provider>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref, onMounted } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const props = defineProps({
  clumb: Object
})
// 请求列表数据
let tableData:any = reactive([])
const Search = () => {
  props.clumb?.getData(formInline).then((res: any) => {
    tableData.length = 0
    res.data.forEach((item: any, index: any) => {
      tableData[index] = item
    })
    // tableData = [...res.data]
    console.log(tableData)
  })
}
onMounted(() => {
  Search()
})
console.log(props)

const locale = ref(zhCn)
const formInline: any = reactive({})
const current = ref(1)
const size = ref(100)



const onSubmit = () => {
  Search()
}
const handleSizeChange = () => {

}
const handleCurrentChange = () => {

}
</script>

<style lang="scss">
.page {
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;

  .page_list {
    flex: 1;
  }

  .page_footer {
    display: flex;
    justify-content: right;
  }
}</style>