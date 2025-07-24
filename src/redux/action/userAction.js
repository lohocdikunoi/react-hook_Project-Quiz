export const FETCH_LOGIN_USER = "FETCH_LOGIN_USER";
export const USER_LOGOUT_SUCCESS = "USER_LOGOUT_SUCCESS";

const doLogin = (data) => {
  return {
    type: FETCH_LOGIN_USER,
    payload: data,
  };
};

const doLogout = () => {
  return {
    type: USER_LOGOUT_SUCCESS,
  };
};

export { doLogin, doLogout };
