
const base = Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://localhost';
const port = 4000;
export const baseUrl = `${base}:${port}/api`