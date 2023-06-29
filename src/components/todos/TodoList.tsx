import React from 'react';
import { ITodo } from 'apis/todo';
import TodoItem from './TodoItem';

interface TodoItemProps {
  todos: ITodo[];
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}
const TodoList = ({ todos, setTodos }: TodoItemProps) => {
  return (
    <ul>
      {todos.map((data: ITodo) => (
        <TodoItem key={data.id} todo={data} setTodos={setTodos} />
      ))}
    </ul>
  );
};

export default TodoList;
