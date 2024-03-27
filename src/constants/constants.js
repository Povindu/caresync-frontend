const base =
  Platform.OS === "android" ? "http://10.10.0.25" : "http://localhost";
const port = 4001;
export const baseUrl = `${base}:${port}/api`;
