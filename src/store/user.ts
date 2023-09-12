import { defineStore } from 'pinia'

interface UserInfo { 
    userName: String,
    password: String,
    phone: String,
    id: Number,
}
interface State {
    info: UserInfo[],
    token: string,
    routeList: any
}
const userUserInfo = defineStore('info', {
    state: (): State => ({
        info: [],
        token: '',
        routeList: []
    }),
    // getters: {
    //     getUserInfo() {
    //         return
    //     }
    // },
    actions: {
        setUserInfo(val: State) {
            localStorage.setItem('token', val.token)
            localStorage.setItem('info', JSON.stringify(val.info[0]))
            this.info = val.info
            this.token = val.token
        },
        setRoute(val:any) {
            this.routeList.push(val)
        }
    }
})

export default userUserInfo