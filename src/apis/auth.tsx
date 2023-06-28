import client from './client';

interface AuthData {
  email: string;
  password: string;
}

export async function signUp({ email, password }: AuthData) {
  const data = await client.post('auth/signup', { email, password });
  return data.status === 201;
}

export async function signIn({ email, password }: AuthData) {
  const { data } = await client.post('auth/signin', { email, password });
  return data;
}
