import axios from 'axios'

export default {
    user: {
        api_keys: (credentials) => axios.post("http://127.0.0.1:8000/api/auth/token/obtain", credentials).then(function (response) {
                if (response.status === 200) {
                    return response.data;
                }
            }
        ),
        login: (api_keys) => axios.get("http://127.0.0.1:8000/login", {headers: {Authorization: "Bearer " + api_keys.access}}).then(function (login_response) {
                if (login_response.status === 200) {
                    return {user: login_response.data, api_keys: api_keys}
                }
            }
        ),
        register: (data) => axios.post("http://127.0.0.1:8000/register", data).then(function (response) {
                if (response.status === 200) {
                    return {data: response.data}
                }
            }
        )
    }
}