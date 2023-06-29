import React, { useState } from 'react';
import { ITodo } from 'interface/todoType';
import { updateTodo, deleteTodo } from 'apis/todo';
import { IInputProps } from '../common/Input';
import TodoInput from './TodoInput';
import useInput from 'hooks/useInput';

interface TodoItemProps {
  todo: ITodo;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoItem = ({ todo, setTodos }: TodoItemProps) => {
  const [isOnEdit, setIsOnEdit] = useState<boolean>(false);
  const [editTodoText, setEditTodoText] = useState<string>(todo.todo);

  const regex = /^.{1,}$/;
  const [onChange, value, isValidated, setValue, setIsValidated] = useInput({
    regex,
    initialValue: editTodoText,
  });
  const [isLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('한글자 이상 입력해주세요');

  const InputProps = {
    value: editTodoText || value,
    onChange,
    errorText,
    error: isError,
    type: 'text',
    dataTestId: 'modify-input',
    placeholder: '할일을 적어보세요!',
    width: '100%',
    height: '50px',
    disabled: isLoading,
  } as IInputProps;

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

    if (isValidated) {
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

      setValue('');
      setIsValidated(false);
    } else {
      setIsError(true);
      setErrorText('한 글자 이상 입력해주세요');
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
            onChange={(e) => handleUpdate(e, todo)}
          />
          {!isOnEdit ? <span>{todo.todo}</span> : <TodoInput {...InputProps} />}
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
            <button data-testid="submit-button" onClick={(e) => handleUpdate(e, todo)} disabled={!isValidated}>
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
