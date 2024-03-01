'use server'

import { api } from '@/app/lib/config';
import { GoogleUserData, UserProfil } from '@/app/lib/definitions';
import httpClient from './http';
import { cookies } from 'next/headers'

export async function getUser(email: string): Promise<UserProfil | undefined> {
  try {
    const user = await httpClient.post<UserProfil>(api.user.getUserWithEmail,{email})
    return user.data
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function login(email: string, password: string): Promise<UserProfil | undefined> {
  try {
    const user = await httpClient.post<UserProfil>(api.auth.login,{email, password})
    cookies().set({
      name: 'access_token',
      value: user.data.access_token,
      httpOnly: true,
      path: '/',
    });
    
    return user.data
  } catch (error) {
    console.error('Failed to login user:', error);
    throw new Error('Failed to login user.');
  }
}

export async function getTokenWithGoogle(code: string): Promise<string> {
  const response  = await httpClient.post('https://oauth2.googleapis.com/token',{
    'code': code,
    'client_id': process.env.AUTH_GOOGLE_ID,
    'client_secret': process.env.AUTH_GOOGLE_SECRET,
    'grant_type': 'authorization_code',
    'redirect_uri': process.env.AUTH_GOOGLE_REDIRECT_URI,
    'scope':'https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile'
  });

  return response.data.access_token as string;
}

export async function getGoogleUserInfo(code: string): Promise<GoogleUserData> {
  const access_token = await getTokenWithGoogle(code)
  const response  = await httpClient.get<GoogleUserData>('https://www.googleapis.com/oauth2/v2/userinfo',{
    headers: {
      'Authorization' : `Bearer ${access_token}`
    }
  });

  return response.data;
}

export const googleAuthUrl = async () => process.env.AUTH_GOOGLE_URL as string;

export async function loginWithGoogle(code: string) {
  try {
    const googleUserInfo = await getGoogleUserInfo(code);
    const user = await httpClient.post<UserProfil>(api.auth.loginWithGoogle,googleUserInfo);
 
    cookies().set({
      name: 'access_token',
      value: user.data.access_token,
      httpOnly: true,
      path: '/',
    });

    return user.data
  } catch (error) {
    console.error('Failed to login user:', error);
    throw new Error('Failed to login user.');
  }
}

