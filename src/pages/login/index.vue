<template>
  <div class="container">
    <div class="login_box">
      <el-form
        ref="ruleFormRef"
        :label-position="labelPosition"
        label-width="100px"
        :model="formLabelAlign"
        style="max-width: 460px"
        :rules="rules"
      >
        <el-form-item label="用户名" prop="phone">
          <el-input v-model="formLabelAlign.phone" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formLabelAlign.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(ruleFormRef)">登陆</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script lang='ts' setup>
import { reactive, ref, onBeforeMount } from 'vue'
import * as userApi from '@/api/api'
const labelPosition = ref('right')
import type { FormInstance, FormRules } from 'element-plus'

interface ruleForm {
  phone: number
  password: [string, number]
}
const ruleFormRef = ref<FormInstance>()
const formLabelAlign = reactive({
  phone: '',
  password: ''
})

const rules = reactive<FormRules<ruleForm>>({
  phone: [
  { required: true, message: '请输入手机号', trigger: 'blur' },
  { min: 11, max: 11, message: '请输入正确的手机号', trigger: 'blur' },
  ],
  password: [
  { required: true, message: '请输入密码', trigger: 'blur' },
  ]
})
const onSubmit = async(formEl: FormInstance | undefined) => {
  console.log(formEl)
  if(!formEl) return
  await formEl.validate((valid, firlds) => {
    if(valid) {
      userApi.login(formLabelAlign).then(res => {
        console.log(res)
      })
    } else {
      console.log(firlds);
      
    }
  })
}
onBeforeMount(()=> {
  console.log(formLabelAlign);
})
</script>

<style scoped lang='scss'>
.container {
  width: 100vw;
  height: 100vh;
  background: url("../../assets/images/login_bj.png") center center;
  display: flex;
  justify-content: center;
  align-items: center;
  .login_box {
    width: 500px;
    height: 300px;
    background-color: rgba(#fff, 0.5);
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>