import { cookies } from "next/headers"

export default function Page() {
  console.log(cookies().get('access_token'));
  
  return (
    <div>Hello !</div>
  )
}