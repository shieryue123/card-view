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
        <el-form-item label="用户名" prop="username">
          <el-input v-model="formLabelAlign.username" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="formLabelAlign.password" type="password" show-password/>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit(ruleFormRef)">登陆</el-button>
          <el-button type="primary" @click="registerTo()">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Register :show="show" @showloading="showloading" @register="register"></Register>
  </div>
</template>

<script lang='ts' setup>
import Register from './components/register.vue'
import { reactive, ref, onBeforeMount } from 'vue'
import { useRouter } from 'vue-router'
import * as userApi from '@/api/api'
const labelPosition = ref('right')
import type { FormInstance, FormRules } from 'element-plus'
import userUserInfo from '@/store/user'
// import { useStore } from 'pinia'

interface ruleForm {
  username: [string, number]
  password: [string, number]
}
const ruleFormRef = ref<FormInstance>()
const store = userUserInfo()
const router = useRouter()
const formLabelAlign = reactive({
  username: '',
  password: ''
})

const rules = reactive<FormRules<ruleForm>>({
  username: [
  { required: true, message: '请输入用户名', trigger: 'blur' },
  ],
  password: [
  { required: true, message: '请输入密码', trigger: 'blur' },
  ]
})
const onSubmit = async(formEl: FormInstance | undefined) => {
  if(!formEl) return
  await formEl.validate((valid, firlds) => {
    if(valid) {
      userApi.login(formLabelAlign).then(res => {
        store.setUserInfo(res.data)
        router.push('/')
      })
    } else {
      console.log(firlds, 3);
    }
  })
}
onBeforeMount(()=> {
  console.log(formLabelAlign);
  
})

const show = ref(false)
const registerTo = () => {
  show.value = true
  console.log(show)
}
const showloading = (value:boolean) => {
  show.value = value
}
const register = (username: string, password: string) => {
  formLabelAlign.username = username
  formLabelAlign.password = password
}
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
    padding: 100px 0 0 90px;
    box-sizing: border-box;
    display: flex;
  }
}
</style>