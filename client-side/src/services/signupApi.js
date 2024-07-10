import axios from 'axios'

export default async function signupApi(data){
    try {
        console.log("mmmm")
        const response = await axios.post('http://localhost:3000/api/user/signup',data)
        console.log(response,"response of signup")
    } catch (error) {
        console.error("Signup api call failed:",error);
    }
}