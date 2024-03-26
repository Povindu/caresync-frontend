import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AuthContextProvider } from "./src/context/AuthContext";
import Routing from "./Routing";


export default function App() {
  
  return (
    <SafeAreaProvider>
      <AuthContextProvider>
          <Routing />
      </AuthContextProvider>
    </SafeAreaProvider>
  );
}
