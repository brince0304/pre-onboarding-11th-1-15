import React, { useState } from 'react';
import { ITodo } from 'interface/todoType';
import { updateTodo, deleteTodo } from 'apis/todo';
import Button from 'components/common/Button';
import * as S from './TodoItem.style';

interface TodoItemProps {
  todo: ITodo;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoItem = ({ todo, setTodos }: TodoItemProps) => {
  const [isOnEdit, setIsOnEdit] = useState<boolean>(false);
  const [editTodoText, setEditTodoText] = useState<string>(todo.todo);

  const handleDelete = async (todoItem: ITodo) => {
    const res = await deleteTodo(todoItem.id);

    if (res) {
      setTodos((todos) => todos?.filter((todo) => todo.id !== todoItem.id));
    }
  };

  const handleUpdate = async (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLButtonElement>,
    todoItem: ITodo,
  ) => {
    e.preventDefault();

    if (editTodoText === todoItem.todo) {
      setIsOnEdit((prev) => !prev);
      return;
    }

    const editedTodoItem = {
      id: todoItem.id.toString(),
      todo: editTodoText,
      isCompleted: todoItem.isCompleted,
    };

    const resUpdatedTodo = await updateTodo(editedTodoItem);
    setTodos((todos) => todos.map((todo) => (todo.id === todoItem.id ? resUpdatedTodo : todo)));
  };

  const handleCancel = () => {
    setIsOnEdit((prev) => !prev);
    setEditTodoText(todo.todo);
  };

  return (
    <S.Item>
      <S.Wrapper>
        <S.Label>
          <input
            type="checkbox"
            id={todo.id.toString()}
            checked={todo.isCompleted}
            onChange={(e) => handleUpdate(e, todo)}
          />
          {!isOnEdit ? (
            <span>{todo.todo}</span>
          ) : (
            <input
              data-testid="modify-input"
              type="text"
              value={editTodoText}
              onChange={(e) => setEditTodoText(e.target.value)}
            />
          )}
        </S.Label>
        {!isOnEdit && (
          <>
            <Button size="medium" data-testid="modify-button" onClick={() => setIsOnEdit((prev) => !prev)}>
              수정
            </Button>
            <Button size="medium" data-testid="delete-button" onClick={() => handleDelete(todo)}>
              삭제
            </Button>
          </>
        )}
        {isOnEdit && (
          <>
            <Button size="medium" data-testid="submit-button" onClick={(e) => handleUpdate(e, todo)}>
              제출
            </Button>
            <Button size="medium" data-testid="cancel-button" onClick={handleCancel}>
              취소
            </Button>
          </>
        )}
      </S.Wrapper>
    </S.Item>
  );
};

export default TodoItem;
