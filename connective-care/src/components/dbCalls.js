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
            alert("successful login")
            Cookies.set('status', true);
            Cookies.set('name', username);
            Cookies.set('type', "user");
        }
    })
}

export const updateUser = async(data) =>{
    try {
        const response = await axios.post(`${baseURL}/routes/updateUser`, data);
        return response.data;
    } catch (error) {
        alert(error.response.data);
        console.log(error.response);
        throw error;
    }

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
export const createDriver = async (data) => {
    try {
        const response = await axios.post(`${baseURL}/routes/createDriver`, data);
        return response.data;
    } catch (error) {
        console.log(error.response);
        throw error;
    }
};

export const getAllDrivers = async (data) => {
    try {
        const response = await axios.get(`${baseURL}/routes/getAllDrivers`,{params:{username:data}});
        return response.data;
    } catch (error) {
        console.log(error.response);
        
    }
};

export const getDrivers = async () => {
    try {
        const response = await axios.get(`${baseURL}/routes/getDrivers`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getDriverById = async (driverId) => {
    try {
        const response = await axios.get(`${baseURL}/routes/getDriver/${driverId}`);
        return response.data;
    } catch (error) {
        console.log(error.response);
        throw error;
    }
};


// For Driver Aide
export const createDriverAide = async (data) => {
    try {
        const response = await axios.post(`${baseURL}/routes/createDriverAide`, data);
        return response.data;
    } catch (error) {
        console.log(error.response);
        throw error;
    }
};


export const getAllDriversAides = async (data) => {
    try {
        const response = await axios.get(`${baseURL}/routes/getAllDriverAides`,{params:{username:data}});
        return response.data;
    } catch (error) {
        console.log(error.response);
        throw error;
    }
};

export const getDriverAides = async () => {
    try {
        const response = await axios.get(`${baseURL}/routes/getDriverAides`);
        return response.data;
    } catch (error) {
        throw error;
    }
};

export const getDriverAideById = async (driverId) => {
    try {
        const response = await axios.get(`${baseURL}/routes/getDriverAide/${driverId}`);
        return response.data;
    } catch (error) {
        console.log(error.response);
        throw error;
    }
};

