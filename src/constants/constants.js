
const base = Platform.OS === 'android' ? 'http://10.0.2.2' : 'http://localhost';
export const baseUrl = `${base}:4000/api`