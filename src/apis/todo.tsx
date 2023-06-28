import client from './client';

interface UpdateTodoData {
  id: string;
  todo: string;
  isCompleted: boolean;
}

export interface TodoData {
  id: number;
  todo: string;
  isCompleted: boolean;
  userId: number;
}

export async function createTodo(todo: string) {
  const { data } = await client.post('todos', { todo });
  return data as TodoData;
}

export async function getTodos() {
  const { data } = await client.get('todos');
  return data as TodoData[];
}

export async function updateTodo({ id, todo, isCompleted }: UpdateTodoData) {
  const { data } = await client.put(`todos/${id}`, { todo, isCompleted });
  return data as TodoData;
}

export async function deleteTodo(id: number) {
  const data = await client.delete(`todos/${id}`);
  return data.status === 204;
}
