<template>
  <div class="page">
    <div class="page_header">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="200">
          <el-input v-model="formInline.user" placeholder="Approved by" clearable />
        </el-form-item>
        <el-form-item label="100">
          <el-select v-model="formInline.region" placeholder="Activity zone" clearable>
            <el-option label="Zone one" value="shanghai" />
            <el-option label="Zone two" value="beijing" />
          </el-select>
        </el-form-item>
        <el-form-item label="100">
          <el-date-picker v-model="formInline.date" type="date" placeholder="Pick a date" clearable />
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
        <el-table-column prop="date" label="Date" />
        <el-table-column prop="name" label="Name" />
        <el-table-column prop="address" label="Address" />
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
import { reactive, ref } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const locale = ref(zhCn)
const formInline = reactive({
  user: '',
  region: '',
  date: '',
})
const current = ref(1)
const size = ref(100)

const onSubmit = () => {
  console.log('submit!')
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
  .page_footer{
    display: flex;
    justify-content: right;
  }
}
</style>