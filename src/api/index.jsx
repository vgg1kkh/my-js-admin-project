import { BASE } from '../utils/constants'
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

export const reqLogin = (username, password) =>
    ajax(BASE + '/login', { username, password }, "POST")


export const reqAddOrUpdateUser = (user) =>
    ajax(BASE + '/manage/user/'+(user._id? 'update':'add'), user, "POST")

//Get the Weather
export const reqWeather = () => {
    return new Promise((resolve, reject) => {
        const url = `https://restapi.amap.com/v3/weather/weatherInfo?key=5480c1924016b7dc94eaddbb15941a73&city=110000`
        jsonp(url, {}, (err, data) => {
            // console.log(err,data.lives[0].temperature)
            if (!err) {
                const re = data.lives[0].temperature
                resolve(re)
            } else {
                message.error("Weather report is not available")
            }
        })
    })
}

//Get the category 
export const reqCategory = parentId => ajax(BASE + '/manage/category/list', { parentId })

//Update the category
export const reqUpdateCategory = (categoryId, categoryName) =>
    ajax(BASE + '/manage/category/update', { categoryId, categoryName }, "POST")

//Add new category
export const reqAddCategory = (parentId, categoryName) =>
    ajax(BASE + '/manage/category/add', { parentId, categoryName }, "POST")

//Get the product list
export const reqProductList = (pageNum, pageSize) =>
    ajax(BASE + '/manage/product/list', { pageNum, pageSize })

//Search product by category or desc
export const reqSearchProduct = ({ pageNum, pageSize, searchName, searchType }) => {
    console.log("searchItem = ", searchName);
    console.log("searchType =",searchType);
    return ajax(BASE + '/manage/product/search', { pageNum, pageSize, [searchType]: searchName })
}
    

//Get category name by parentId
export const reqCategoryName = categoryId => ajax(BASE + "/manage/category/info", { categoryId })

//Update product availability
export const reqUpdateAvailability = ({ productId, status }) =>
    ajax(BASE + "/manage/product/updateStatus", { productId, status }, "POST")

//Remove the photo
export const reqDeleteImg = name => ajax(BASE + "/manage/img/delete", { name }, "POST")

//Add new product
export const reqAddProduct = (product) =>
    ajax(BASE + "/manage/product/"+ (product._id? "update":"add"), product, "POST")

//Update product
export const reqUpdateProduct = product =>
    ajax(BASE + "/manage/product/update", product, "POST")

//Get role list
export const reqRoles = () => ajax(BASE + "/manage/role/list")

//Add new role
export const reqAddRole = roleName => ajax(BASE + "/manage/role/add", {roleName},"POST")

//Update Role
export const reqUpdateRole = role => ajax(BASE+"/manage/role/update",role,"POST")

//Get UserList
export const reqUsers = () => ajax(BASE + "/manage/user/list")

//Del User
export const reqDelUser = userId => ajax(BASE + "/manage/user/delete",{userId},"POST")