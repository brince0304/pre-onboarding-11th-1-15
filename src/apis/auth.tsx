import client from './client';

export interface IPostAuth {
  email: string;
  password: string;
}

interface IAuth {
  access_token: string;
}

export async function signUp({ email, password }: IPostAuth): Promise<boolean> {
  const data = await client.post('auth/signup', { email, password });
  return data.status === 201;
}

export async function signIn({ email, password }: IPostAuth): Promise<IAuth> {
  const { data } = await client.post('auth/signin', { email, password });
  return data;
}
