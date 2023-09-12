<template>
    <el-dialog v-model="dialogVisible" title="注册" width="50%">
        <el-form ref="ruleFormRef" :model="ruleForm" :rules="rules" label-width="120px" class="demo-ruleForm" status-icon>
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username" placeholder="请输入用户名" />
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password" type="password" placeholder="请输入密码" />
            </el-form-item>
            <el-form-item label="确认密码" prop="wordPassword">
                <el-input v-model="ruleForm.wordPassword" type="password" placeholder="请再次确认密码" />
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model="ruleForm.phone" placeholder="请输入手机号" />
            </el-form-item>
        </el-form>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="dialogVisible = false">取消</el-button>
                <el-button type="primary" @click="handleClose(ruleFormRef)">
                    注册
                </el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import * as userApi from '@/api/api'
// 注册信息确认
interface RuleForm {
    username: string
    password: string
    wordPassword: string
    phone: string
}

const ruleFormRef = ref<FormInstance>()
const ruleForm = reactive<RuleForm>({
    username: '',
    password: '',
    wordPassword: '',
    phone: '',
})
// 校验规则：两次密码确认一样
const validatePass2 = (_rule: any, value: any, callback: any) => {
    if (value === '') {
        callback(new Error('请再次输入密码'))
        // password 是表单上绑定的字段
    } else if (value !== ruleForm.password) {
        callback(new Error('两次输入密码不一致!'))
    } else {
        callback()
    }
}
const rules = reactive<FormRules<RuleForm>>({
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' }
    ],
    wordPassword: [
        { required: true, validator: validatePass2, trigger: 'blur' }
    ],
    phone: [
        { required: true, message: '请输入用户名', trigger: 'blur' }
    ],
})

// 注册弹窗控制
const emit = defineEmits(['showloading', 'register'])
const props = defineProps({
    show: Boolean
})
const dialogVisible = computed({
    get() {
        return props.show
    },
    set(newValue) {
        emit('showloading', newValue)
    }
})
const handleClose = async (formEl: FormInstance | undefined) => {
    if (!formEl) return
    await formEl.validate((valid, fields) => {
        if (valid) {
            userApi.register(ruleForm).then(_res => {
                dialogVisible.value = false
                emit('register', ruleForm.username, ruleForm.password)
                ruleFormRef.value.resetFields()
            })
        } else {
            console.log('error submit!', fields)
        }
    })
}
</script>
<style scoped>
.dialog-footer button:first-child {
    margin-right: 10px;
}
</style>
