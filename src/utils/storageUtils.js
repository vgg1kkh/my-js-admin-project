//Save the user info into local hard disk
import store from 'store'

const USER_KEY = 'user_key'

export default {

    set:user => store.set(USER_KEY,user),
    get:() => store.get(USER_KEY) || {},
    remove:() => store.remove(USER_KEY)

}