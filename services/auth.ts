'use server'

import { api } from '@/app/lib/config';
import { UserProfil } from '@/app/lib/definitions';
import httpClient from './http';

export async function getUser(email: string): Promise<UserProfil | undefined> {
  try {
    const user = await httpClient.post<UserProfil>(api.user.getUserWithEmail,{email:email})
    return user.data
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}

export async function login(email: string, password: string): Promise<UserProfil | undefined> {
  try {
    const user = await httpClient.post<UserProfil>(api.auth.login,{email: email, password: password})
    return user.data
  } catch (error) {
    console.error('Failed to fetch user:', error);
    throw new Error('Failed to fetch user.');
  }
}