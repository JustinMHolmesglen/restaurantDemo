import api from './api';

// REGISTER POST
async function register(formData){
    const response = await api.post(
        "auth/register",
        formData
    );
    console.log(response?.data)
    return response;
}


// LOGIN POST
async function login(formData){
    const response = await api.post(
        "auth/login",
        formData
    );
    console.log(response?.data)
    return response;
}

const authService = {
    register,
    login
}

export default authService;