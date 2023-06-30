import React from 'react';
import { ITodo } from 'apis/todo';
import TodoItem from './TodoItem';
import * as S from './TodoItem.style';
interface TodoItemProps {
  todos: ITodo[];
  getTodoList: () => Promise<void>;
}
const TodoList = ({ todos, getTodoList }: TodoItemProps) => {
  return (
    <S.List>
      {todos.map((data: ITodo) => (
        <TodoItem key={data.id} todo={data} getTodoList={getTodoList} />
      ))}
    </S.List>
  );
};

export default TodoList;
