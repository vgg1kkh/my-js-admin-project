import { BASE } from '../utils/constants'
import ajax from './ajax'

export const reqLogin = (username, password) =>
    ajax(BASE + '/login', { username, password }, "POST")


export const reqAddUser = (user) =>
    ajax(BASE + '/manage/user/add', user, "POST")
