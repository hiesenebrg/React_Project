import { LOCALSTORAGE_TOKEN_KEY } from "../utils";

const customfetch = async (url , {body ,...customConfig})=>{
    const token = window.localStorage.getItem(LOCALSTORAGE_TOKEN_KEY);
   
    const headers = {
        'content-type': 'application/json',
    Accept : 'application/json'
    }

    if(token){
       headers.Authorization = `Bearer ${token}`; 
    }

    const config = {
        ...customConfig,
        headers:{
            ...headers ,
            ...customConfig.headers,
        },
    };
    if(body){
        config.body = JSON.strigyfy(body);
    }
     
   try {
    const response = await fetch(url , config);
    const data = response.data;
    if(response.success){
        return{
            data:data.data,
            success:true
        };
    }

    throw new Error(data.message);
   } catch (error) {
    console.log('error');
    return {
        message:error.message,
        success:false,
    }
   } 
};

const getPosts = (page , limit)=>{
    
    return customfetch();
}
