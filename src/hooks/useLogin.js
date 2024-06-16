import { useAuthContext } from "../hooks/useAuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { baseUrl } from "../constants/constants";
import { jwtDecode } from "jwt-decode";

export const useLogin = () => {
  const { dispatch } = useAuthContext();

  const login = async (email, password, path) => {
    console.log(email, password);
    try {
      // console.log(baseUrl + "/signin");
      const response = await fetch(baseUrl + `/${path}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      console.log("data from use login", data);
      console.log("response", response.status);
      if (response.status === 200) {
        await AsyncStorage.setItem("access-token", data.accessToken);
        await AsyncStorage.setItem("refresh-token", data.refreshToken);

        // console.log("AT: " + (await AsyncStorage.getItem("access-token")));
        // console.log("RT: " + (await AsyncStorage.getItem("refresh-token")));

        dispatch({ type: "LOGIN", payload: jwtDecode(data.accessToken) });
        return { status: "success", data };
      } else if (data.error === "User not verified") {
        return { status: "notVerified" };
      } else if (data.error === "Medical Id not verified") {
        return { status: "notVerified" };
      } else {
        return { status: "failed" };
      }
    } catch (error) {
      console.error("Error logging in:", error);
      return { status: "error", error };
    }
  };

  return { login };
};
