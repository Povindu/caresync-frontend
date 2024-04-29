import * as React from "react";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { PaperProvider } from "react-native-paper";
import { AuthContextProvider } from "./src/context/AuthContext";
import Routing from "./Routing";

export default function App() {
  return (
    <SafeAreaProvider>
      <PaperProvider>
        <AuthContextProvider>
          <Routing />
        </AuthContextProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
