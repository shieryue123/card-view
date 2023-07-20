import { defineStore } from 'pinia'

interface UserInfo { 
    userName: String,
    password: String,
    phone: String,
    id: Number,
}
interface State {
    info: UserInfo[],
    token: string
}
const userUserInfo = defineStore('info', {
    state: (): State => ({
        info: [],
        token: '',
    }),
    // getters: {
    //     getUserInfo() {
    //         return
    //     }
    // },
    actions: {
        setUserInfo(val: State) {
            localStorage.setItem('token', val.token)
            localStorage.setItem('info', JSON.stringify(val.info))
            this.info = val.info
            this.token = val.token
        }
    }
})

export default userUserInfo