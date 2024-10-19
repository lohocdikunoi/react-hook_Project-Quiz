export const FETCH_LOGIN_USER = "FETCH_LOGIN_USER";

const doLogin = (data) => {
  return {
    type: FETCH_LOGIN_USER,
    payload: data,
  };
};

export { doLogin };
