import React, { useState } from 'react';
import { ITodo } from 'interface/todoType';

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

    const response = await fetch(`${BASE_URL}/todos/${todoItem.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${access_Token}`,
      },
      body: JSON.stringify(updatedTodoItem),
    });

    const data = await response.json();

    if (response.ok) {
      setTodos((todos) => todos?.map((todo) => (todo.id === todoItem.id ? data : todo)));
    }

    if (!response.ok) {
      throw new Error(data.message || '업데이트에 문제가 발생했습니다.');
    }
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
            <button data-testid="delete-button">삭제</button>
          </>
        )}
        {isOnEdit && (
          <>
            <button data-testid="submit-button">제출</button>
            <button data-testid="cancel-button">취소</button>
          </>
        )}
      </div>
    </li>
  );
};

export default TodoItem;
