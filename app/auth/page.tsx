'use client'
 
import { useSearchParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { useState } from 'react'
import axios from 'axios'

export default function Page(){
  const searchParams = useSearchParams()
  const [user,setUser] = useState<any>()
 
  const code = searchParams.get('code')
  const scope = searchParams.get('scope')


  const getAllUrl = async () => {
   const r = await fetch('https://accounts.google.com/.well-known/openid-configuration')
   const data = await r.json()
   console.log(data);
   
   setUser(data)
  }

  async function getToken() {
    const r  = await axios.post('https://oauth2.googleapis.com/token',{
      'code': code,
      'client_id': '36455912142-08ch1174hc6514i16dop2nmk42fmcq3e.apps.googleusercontent.com',
      'client_secret': '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',
      'grant_type': 'authorization_code',
      'redirect_uri': 'http://localhost:3000/auth',
    })

    console.log(r.data);
    
    return r.data
  }

  async function getUserInfo() {
    const dataToken = await getToken()
    const access_token = dataToken.access_token as string
    const r  = await axios.get('https://www.googleapis.com/oauth2/v2/userinfo',{
      headers: {
        'Authorization' : `Bearer ${access_token}`
      }
    })
    console.log(r.data);
    setUser(r.data)
  }

  // https://github.com/login/oauth/authorize
  // let url = `https://accounts.google.com/o/oauth2/v2/auth?scope=email&access_type=offline&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&client_id=1008535233778-ikje8p2ute4egghe8gbbhpt7u4ukqkva.apps.googleusercontent.com`
  let url = `https://accounts.google.com/o/oauth2/v2/auth?scope=email&access_type=offline&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fauth&client_id=36455912142-08ch1174hc6514i16dop2nmk42fmcq3e.apps.googleusercontent.com`

  return (
    <div>
      <h1>Hello !</h1>
      <a href={url}>Login</a> <br />
      <a href='/test'>Test</a> <br />
      <p>code: {code}</p>
      <p>scope: {scope}</p>

      <br /><br />
      <Button onClick={getAllUrl}>Get all</Button>
      <Button onClick={getToken}>Get Token</Button>
      <Button onClick={getUserInfo}>Get User info</Button>
      {JSON.stringify(user)}
      {/* <UserInfo /> */}
    </div>
  );
}