import { BASE_API_URL } from "./constants";

// PAGE ROUTE 
export const routes = {
  home: '/',
  dashboard: '/dashboard'
};

export const api = {
  auth: {
    login: `${BASE_API_URL}/login`,
    register: `${BASE_API_URL}/register`,
    loginWithGoogle: `${BASE_API_URL}/google-login`,
  },
  user: {
    // getUserWithEmail: (email: string) => `${BASE_API_URL}/${email}/get-user-with-email`
    getUserWithEmail: `${BASE_API_URL}/get-user-with-email`,
  }
}
