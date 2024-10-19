import { FETCH_LOGIN_USER } from "../action/userAction";

const INITIAL_STATE = {
  data: {
    access_token: "",
    refresh_token: "",
    email: "",
    username: "",
    role: "",
    image: "",
  },
  isAuthenticator: false,
};
const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_LOGIN_USER:
      return {
        ...state,
        data: {
          access_token: action?.payload?.DT?.access_token,
          refresh_token: action?.payload?.DT?.refresh_token,
          email: action?.payload?.DT?.email,
          username: action?.payload?.DT?.username,
          role: action?.payload?.DT?.role,
          image: action?.payload?.DT?.image,
        },
        isAuthenticator: true,
      };

    default:
      return state;
  }
};

export default userReducer;
