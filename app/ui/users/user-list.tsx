import { PrismaClient } from '@prisma/client';

// Créez une instance de PrismaClient
const prisma = new PrismaClient();

export default async function UserList(){
  
  const users = await prisma.user.findMany()

  return (
    <div className='px-4 py-3 rounded-md bg-slate-100 border space-y-2'>
      {users.map((user,i) => (
        <div key={i} className='bg-white p-2'>
          {user.name} <br />
          {user.email}
        </div>
      ))}
    </div>
  );
};