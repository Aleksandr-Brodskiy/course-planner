import {USER_LOGGED_IN, USER_LOGGED_OUT} from "../types";
import api from "../api"


export const userLoggedIn = (user) => ({
    type: USER_LOGGED_IN,
    user,
});
export const userLoggedOut = () => ({
    type: USER_LOGGED_OUT,
});


export const login = (credentials) => (dispatch) =>
    api.user.api_keys(credentials).then(
        api_keys => api.user.login(api_keys).then(
            user => {
                localStorage.user = JSON.stringify(user);
                dispatch(userLoggedIn(user))
            }
        )
    );

export const register = (data) => (dispatch) => (
    api.user.register(data).then(
        user => {
            localStorage.user = JSON.stringify(user.data);
            dispatch(userLoggedIn(user.data));
        }
    ));


export const logout = () => (dispatch) => {
    localStorage.removeItem('user');
    dispatch(userLoggedOut());
};

