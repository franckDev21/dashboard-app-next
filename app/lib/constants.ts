
if(!process.env.BASE_API_URL){
  throw Error("BASE_API_URL is required");
}

export const BASE_API_URL = process.env.BASE_API_URL

export const AFTER_LOGIN_REDIRECT_URI = '/test'
