import axiosInstance from '../utils/axios';

export default async function signupApi(data){
    try {
        const response = await axiosInstance.post('http://localhost:3000/api/user/signup',data)
        console.log(response,"response of signup")
    } catch (error) {
        console.error("Signup api call failed:",error);
    }
}