import React from 'react';
import { ITodo } from 'apis/todo';
import TodoItem from './TodoItem';

interface TodoItemProps {
  todos: ITodo[];
  getTodoList: () => Promise<void>;
}
const TodoList = ({ todos, getTodoList }: TodoItemProps) => {
  return (
    <ul>
      {todos.map((data: ITodo) => (
        <TodoItem key={data.id} todo={data} getTodoList={getTodoList} />
      ))}
    </ul>
  );
};

export default TodoList;
