import axios from 'axios'

export default {
    user: {
        api_keys: (credentials) => axios.post("https://cse120-course-planner.herokuapp.com/api/auth/token/obtain", credentials).then(function (response) {
                if (response.status === 200) {
                    return response.data;
                }
            }
        ),
        login: (api_keys) => axios.get("https://cse120-course-planner.herokuapp.com/login", {headers: {Authorization: "Bearer " + api_keys.access}}).then(function (login_response) {
                if (login_response.status === 200) {
                    return {user: login_response.data, api_keys: api_keys}
                }
            }
        )
    }
}