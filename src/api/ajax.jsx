import axios from 'axios'
import { message } from 'antd'


const ajax = (url,data,method="GET") => {
    
    return new Promise((resolve,reject)=>{
        //inner promise
        let promise
        if(method==="GET"){
            promise = axios.get(url,{params: data})              
        }else{
            promise = axios.post(url,data)      
        }
        promise.then(response => {resolve(response.data)
        
        })
        .catch(reason => message.error("Request Error."))      
    })

    
}



export default ajax