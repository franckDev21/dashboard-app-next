import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';
import { authConfig } from './auth.config';
import { z } from 'zod';
import { login } from '@/services/auth';
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from '@/app/lib/prisma';

const githubId = process.env.AUTH_GITHUB_ID
const githubSecret = process.env.AUTH_GITHUB_SECRET

 
export const { auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  providers: [
    GithubProvider({
      clientId: githubId,
      clientSecret: githubSecret,
      name: 'github'
    }),
    Credentials({
      async authorize(credentials) {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);
 
          if (parsedCredentials.success) {
            const { email, password } = parsedCredentials.data;
            const user = await login(email,password);
            
            if (!user) return null;   
            return user;
          }
   
          console.log('Oupa ! Invalid credentials');
          return null;
      },
    }),
  ],
});