import { useAuthContext } from "../hooks/useAuthContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = async () => {
    // remove user from storage
    await AsyncStorage.removeItem("access-token");
    await AsyncStorage.removeItem("refresh-token");

    console.log(
      "AT @ Logout : " + (await AsyncStorage.getItem("access-token"))
    );

    // dispatch logout action
    dispatch({ type: "LOGOUT" });
  };

  return { logout };
};
