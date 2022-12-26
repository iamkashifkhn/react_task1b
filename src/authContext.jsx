import React, { useReducer } from "react";
import MkdSDK from "./utils/MkdSDK";

export const AuthContext = React.createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  token: null,
  role: null,
};

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
        console.log("hello",action.payload, state)      
      //TODO
      localStorage.setItem('token',action.payload.token)
      localStorage.setItem('role', action.payload.role)
      return {
        isAuthenticated: true,
        user: action.payload.user_id,
        token: action.payload.token,
        role: action.payload.role
      };
    case "LOGOUT":
      localStorage.clear();
      return {
        ...state,
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};

let sdk = new MkdSDK();

export const tokenExpireError = (dispatch, errorMessage) => {
  const role = localStorage.getItem("role");
  if (errorMessage === "TOKEN_EXPIRED") {
    dispatch({
      type: "Logout",
    });
    window.location.href = "/" + role + "/login";
  }
};

const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const role = localStorage.getItem("role");
  React.useEffect(()  => { 
    //TODO
    async function fetchData(){
      const getData = await sdk.check(role)
      console.log("state is", state)
      if(getData.error === true){
        console.log("in if condition")
        tokenExpireError(dispatch, getData.message)
      }
    }
    const interval = setInterval(() => {
      console.log("in set interval")
      fetchData()
    }, 1800000);
    return () => clearInterval(interval);
  }, [state]);

  return (
    <AuthContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
