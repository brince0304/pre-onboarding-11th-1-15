import React, { useState } from 'react';
import { ITodo } from 'interface/todoType';
import axios from 'axios';

interface TodoItemProps {
  todo: ITodo;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const BASE_URL = 'https://www.pre-onboarding-selection-task.shop';

const TodoItem = ({ todo, setTodos }: TodoItemProps) => {
  const [isOnEdit, setIsOnEdit] = useState<boolean>(false);
  const [editTodoText, setEditTodoText] = useState<string>(todo.todo);

  const handleComplete = async (todoItem: ITodo) => {
    const updatedTodoItem = {
      ...todoItem,
      isCompleted: !todoItem.isCompleted,
    };

    const access_Token = localStorage.getItem('accessToken');

    try {
      const response = await axios.put(`${BASE_URL}/todos/${todoItem.id}`, updatedTodoItem, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_Token}`,
        },
      });

      if (response.status === 200) {
        setTodos((todos) => todos?.map((todo) => (todo.id === todoItem.id ? response.data : todo)));
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || '업데이트에 에러가 발생했습니다.');
    }
  };

  const handleDelete = async (todoItem: ITodo) => {
    const access_Token = localStorage.getItem('accessToken');

    try {
      const response = await axios(`${BASE_URL}/todos/${todoItem.id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_Token}`,
        },
      });

      if (response.status === 200) {
        setTodos((todos) => todos?.filter((todo) => todo.id !== todoItem.id));
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || '정상적으로 삭제되지 않았습니다.');
    }
  };

  const handleUpdate = async (e: React.FormEvent<HTMLButtonElement>, todoItem: ITodo) => {
    e.preventDefault();

    if (editTodoText === todoItem.todo) {
      setIsOnEdit((prev) => !prev);
      return;
    }

    const editedTodoItem = {
      ...todoItem,
      todo: editTodoText,
    };

    const access_token = localStorage.getItem('accessToken');

    try {
      const response = await axios.put(`${BASE_URL}/todos/${todoItem.id}`, editedTodoItem, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${access_token}`,
        },
      });

      if (response.status === 200) {
        setTodos((todos) => todos.map((todo) => (todo.id === todoItem.id ? response.data : todo)));
      }
    } catch (error: any) {
      throw new Error(error.response.data.message || '정상적으로 업데이트되지 않았습니다.');
    }
  };

  const handleCancel = () => {
    setIsOnEdit((prev) => !prev);
    setEditTodoText(todo.todo);
  };

  return (
    <li>
      <div>
        <label>
          <input
            type="checkbox"
            id={todo.id.toString()}
            checked={todo.isCompleted}
            onChange={() => handleComplete(todo)}
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
        </label>
        {!isOnEdit && (
          <>
            <button data-testid="modify-button" onClick={() => setIsOnEdit((prev) => !prev)}>
              수정
            </button>
            <button data-testid="delete-button" onClick={() => handleDelete(todo)}>
              삭제
            </button>
          </>
        )}
        {isOnEdit && (
          <>
            <button data-testid="submit-button" onClick={(e) => handleUpdate(e, todo)}>
              제출
            </button>
            <button data-testid="cancel-button" onClick={handleCancel}>
              취소
            </button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
