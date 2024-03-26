import { createContext, useReducer, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const AuthContext = createContext();

export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { user: action.payload };
    case "LOGOUT":
      return { user: null };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {

  const [token, setToken] = useState(null);

  const [state, dispatch] = useReducer(authReducer, {
    user: null,
  });

  useEffect( () => {

    const fetchUser = async () => {
      const token = await AsyncStorage.getItem("access-token");
      // console.log("Token:", token);
      setToken(token);
      return token;
    }
    fetchUser();
  }, []);


  useEffect(() => {
    if (token) {
      const JWT = jwtDecode(token);
      dispatch({ type: "LOGIN", payload: JWT });
    }
    console.log("AuthContext state:", state);
  }, [token]);

  

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
