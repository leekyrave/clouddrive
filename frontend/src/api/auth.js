import axios from "axios"

const Signup = async (login, password) => {
    try {
        const response = await axios.post('https://localhost:8000/register', {
            login, password
        });

        const token = response.data.token;
        return token;
    } catch(e) {
        console.log(e);
    }
}

const Signin = async (login, password) => {
    try {
        const response = await axios.post('https://localhost:8000/login', {
            login, password
        });

        const token = response.data.token;
        return token;
    } catch(e) {
        console.log(e);
    }
}


export {
    Signup,
    Signin
}