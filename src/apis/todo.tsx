import client from './client';

interface IUpdateTodo {
  id: string;
  todo: string;
  isCompleted: boolean;
}

export interface ITodo {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export async function createTodo(todo: string): Promise<ITodo> {
  const { data } = await client.post('todos', { todo });
  return data;
}

export async function getTodos(): Promise<ITodo[]> {
  const { data } = await client.get('todos');
  return data;
}

export async function updateTodo({ id, todo, isCompleted }: IUpdateTodo): Promise<ITodo> {
  const { data } = await client.put(`todos/${id}`, { todo, isCompleted });
  return data;
}

export async function deleteTodo(id: number): Promise<boolean> {
  const data = await client.delete(`todos/${id}`);
  return data.status === 204;
}
