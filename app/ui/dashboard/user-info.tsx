import { auth } from "@/auth";

export default async function UserInfo(){
  const session = await auth();
  return <div className='px-4'>{session?.user?.email}</div>
}