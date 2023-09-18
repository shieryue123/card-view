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
      <el-table :data="tableData" height="520px" :border="true">
        <el-table-column :prop="item.value" :label="item.name" v-for="(item, index) in props.clumb?.clubme"
          :key="index" />

        <slot name="table_column"></slot>
        <!-- <el-table-column>
          <template #default="scope">
          </template>
        </el-table-column> -->
      </el-table>
    </div>
    <div class="page_footer">
      <el-config-provider :locale="locale">
        <el-pagination v-model:current-page="formInline.page" v-model:page-size="formInline.size"
          :page-sizes="[20, 50, 100, 200]" layout="total, sizes, prev, pager, next, jumper" :total="total"
          @size-change="handleSizeChange" @current-change="handleCurrentChange" />
      </el-config-provider>
    </div>
  </div>
</template>
<script lang="ts" setup>
/**
 * clumb:{ //表格配置
 *  searchlist: [ //搜索框配置
      { 
        label: string, //搜索框label配置
        value: string //表单属性配置 
      }
    ],
    clubme: [
        { 
          name: '短链接码', //表格头部名称
          value: 'shot_code' //表格属性
        },
    ],
    getData(data: any) {
        return new Promise((resolve, reject) => {
          表格数据请求
            // Api.shortList(data).then((res: any) => {
            //     resolve(res)
            // }).catch((err: any) => {
            //     reject(err)
            // })
        })
    }
 * }
 * page_btn：搜索框以及表格中间插槽
 * table_column： 表格内部操作插槽
 */
import { reactive, ref, onMounted } from 'vue'
import zhCn from 'element-plus/dist/locale/zh-cn.mjs'

const props = defineProps({
  clumb: Object
})

// 请求列表数据
let tableData: any = reactive([])
const total = ref('')
const Search = () => {
  props.clumb?.getData(formInline).then((res: any) => {
    tableData.length = 0
    total.value = res.data.total
    res.data.list.forEach((item: any, index: any) => {
      tableData[index] = item
    })
  })
}
onMounted(() => {
  Search()
})

const locale = ref(zhCn)
const formInline: any = reactive({
  page: 1,
  size: 10
})

const onSubmit = () => {
  Search()
}
const handleSizeChange = () => {
  Search()
}
const handleCurrentChange = () => {
  Search()
}
defineExpose({
  Search
})
</script>

<style lang="scss">
.page {
  height: calc(100vh - 100px);
  display: flex;
  flex-direction: column;

  .page_list {
    flex: 1;
    padding: 20px 0;
  }

  .page_footer {
    display: flex;
    justify-content: right;
  }
}
</style>