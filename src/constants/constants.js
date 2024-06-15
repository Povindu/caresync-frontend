const base =
  Platform.OS === "android" ? "http://192.168.1.6" : "http://localhost";

const port = 5000;

export const baseUrl = `${base}:${port}/api`;
