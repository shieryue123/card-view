<template>
  <el-dialog v-model="dialogVisible" title="添加短网址" width="500">
    <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" :size="formSize"
      status-icon>
      <el-form-item label="链接地址：" prop="full_url">
        <el-input v-model="ruleForm.full_url" placeholder="请输入链接地址"/>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="submitForm(ruleFormRef)">
          确认
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import * as Api from '@/api/short.ts'

interface RuleForm {
  full_url: string
}

const formSize = ref('default')
const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
  full_url: '',
})

const rules = reactive<FormRules<RuleForm>>({
  full_url: [
    { required: true, message: '请输入链接地址', trigger: 'blur' },
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      Api.addShort(ruleForm).then(res => {
        emit('onAdd', false, true)
      })
    } else {
      console.log('error submit!', fields)
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}


// 注册弹窗控制
const emit = defineEmits(['onAdd'])
const props = defineProps({
  value: Boolean
})
const dialogVisible = computed({
  get() {
    return props.value
  },
  set(newValue) {
    emit('onAdd', newValue)
  }
})
</script>