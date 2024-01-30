import axios from 'axios';
import { toast } from 'react-toastify';

// Create an axios instance for our api
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL
});

// Axios response interceptor (toast errors)
api.interceptors.response.use(null, (error) => {
    // Setting Expected Error Range: If it is a error from 400 - 500
    const expectedError =
      error.response &&
      error.response.status >= 400 &&
      error.response.status &&
      error.response.status < 500;
    console.log(expectedError);
  
  
    if (!expectedError) {
      // NOTE: We could also implement a logging system for errors here
      console.log(`Interceptors - ${error}`);
      toast.error('Unexpected Error');
    } else {
      // STANDARDISED: By creating uniform error responses, like our backend, we can standardise our errors on the front end
      console.log(`${error?.response.data}`);
      toast.warn(`${error.response.data}`);
    }
  
  
    // Function Return: As we a intercepting an ERROR we want to make sure we return a rejected promise
    return Promise.reject(error); 
  });

// Setting default configs (header token)
export function setHeaderToken(){
    const token = localStorage.getItem("userToken");
    if (token){
        api.defaults.headers.common["Authorization"] = "Bearer " + token
    } else {
        delete api.defaults.headers.common["Authorization"];
    }
}
setHeaderToken();


export default api