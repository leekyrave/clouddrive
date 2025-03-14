import axios from "axios"

const signUp = async (login, password) => {
    try {
        const response = await axios.post('http://localhost:3000/api/users/register', {
            username: login, password
        });

        return response;
    } catch(e) {
        console.log(e);
    }
}

const signIn = async (login, password) => {
    try {
        const response = await axios.post('http://localhost:3000/api/users/login', {
            username: login, password
        });

        return response;
    } catch(e) {
        console.log(e);
    }
}


export {
    signUp,
    signIn
}