import React, { useState } from 'react';
import { ITodo } from 'interface/todoType';

interface TodoItemProps {
  todo: ITodo;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoItem = ({ todo, setTodos }: TodoItemProps) => {
  const [isOnEdit, setIsOnEdit] = useState<boolean>(false);
  const [editTodoText, setEditTodoText] = useState<string>(todo.todo);

  return (
    <li>
      <div>
        <label>
          <input type="checkbox" id={todo.id.toString()} checked={todo.isCompleted} />
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
