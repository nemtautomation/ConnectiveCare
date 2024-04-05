import axios from "axios"
import Cookies from 'js-cookie';

const baseURL = 'http://localhost:5000'

// For users
export const userSignup = async (data) =>{
    try{
        const response = await axios.post(`${baseURL}/routes/createUser`,data)
        return response.data
    }
    catch(error){
        alert(error.response.data)
        console.log(error.response)
        throw error
    }
}

export const userLogin = async(data) =>{
    const { username, password } = data;
    await axios.post(`${baseURL}/routes/userLogin`,{username,password}).then((res)=>{
        if(res.data.error){
            console.log(res.data.error)
        }
        else{
            // ideally this part will have some functionality once logged in so we know who is logged in, but for now its used to test if the userlogin works
            alert("successful login")
            Cookies.set('status', true);
            Cookies.set('name', username);
            Cookies.set('type', "user");
        }
    })
}

// For Providers
export const providerSignup = async (data) =>{
    try{
        const response = await axios.post(`${baseURL}/routes/createProvider`,data)
        return response.data
    }
    catch(error){
        alert(error.response.data)
        console.log(error.response)
        throw error
    }
}

export const providerLogin = async(data) =>{
    const { username, password } = data;
    await axios.post(`${baseURL}/routes/providerLogin`,{username,password}).then((res)=>{
        if(res.data.error){
            console.log(res.data.error)
        }
        else{
            alert("successful login");
            Cookies.set('status', true);
            Cookies.set('name', username);
            Cookies.set('type', "provider");
        }
    })
}

// For Driver