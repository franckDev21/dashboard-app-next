import axios from 'axios'

export default async function UserInfo(){
  const httpClient = axios.create({
    timeout: 10000, // Timeout de 10 secondes
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*'
    },
  });

  const rest = await httpClient.get('https://www.googleapis.com/oauth2/v2/userinfo');
  console.log(rest.data);

  return (
    <div>User
      <br />
      {rest.data}
    </div>
  )
}