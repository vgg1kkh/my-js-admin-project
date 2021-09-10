import { BASE } from '../utils/constants'
import ajax from './ajax'
import jsonp from 'jsonp'
import { message } from 'antd'

export const reqLogin = (username, password) =>
    ajax(BASE + '/login', { username, password }, "POST")


export const reqAddUser = (user) =>
    ajax(BASE + '/manage/user/add', user, "POST")

//Get the Weather
export const reqWeather = () => {
    return new Promise((resolve,reject)=>{
        const url= `https://restapi.amap.com/v3/weather/weatherInfo?key=5480c1924016b7dc94eaddbb15941a73&city=110000`
        jsonp(url,{},(err,data)=>{
            // console.log(err,data.lives[0].temperature)
            if(!err){
                const re= data.lives[0].temperature
                resolve(re)
            }else {
                message.error("Weather report is not available")
            }
        })
    })  
}

//Get the category 
export const reqCategory = parentId => ajax(BASE+'/manage/category/list', {parentId})

//Update the category
export const reqUpdateCategory = (categoryId,categoryName) => 
ajax(BASE+'/manage/category/update',{categoryId,categoryName} ,"POST")
