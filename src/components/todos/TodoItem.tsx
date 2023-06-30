import React, { useState, useRef } from 'react';
import { ITodo } from 'interface/todoType';
import { updateTodo, deleteTodo } from 'apis/todo';
import Button from 'components/common/Button';
import * as S from './TodoItem.style';
import useInput from 'hooks/useInput';
import Input, { IInputProps } from '../common/Input';

interface TodoItemProps {
  todo: ITodo;
  setTodos: React.Dispatch<React.SetStateAction<ITodo[]>>;
}

const TodoItem = ({ todo, setTodos }: TodoItemProps) => {
  const [isOnEdit, setIsOnEdit] = useState<boolean>(false);
  const [editTodoText, setEditTodoText] = useState<string>(todo.todo);

  const regex = /^.{1,}$/;
  const inputRef = useRef<HTMLInputElement>(null);
  const { onChange, value, setValue, isValidated, setIsValidated, setFocus } = useInput({
    regex,
    ref: inputRef,
    initialValue: editTodoText,
  });

  const InputProps = {
    value,
    onChange,
    type: 'text',
    dataTestId: 'modify-input',
    ref: inputRef,
  } as IInputProps;

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, todoItem: ITodo) => {
    e.preventDefault();
    try {
      const resStatus = await deleteTodo(todoItem.id);

      if (resStatus) {
        setTodos((todos) => todos?.filter((todo) => todo.id !== todoItem.id));
      }
    } catch (error: any) {
      throw new Error(error.response?.data.message || '정상적으로 삭제되지 않았습니다.');
    }
  };

  const handleUpdate = async (
    e: React.FormEvent<HTMLInputElement> | React.FormEvent<HTMLButtonElement>,
    todoItem: ITodo,
  ) => {
    e.preventDefault();

    setFocus();
    // input text value가 비었는지 먼저 확인
    if (isValidated) {
      // 비어있지 않은 경우라도 기존과 같은 텍스트라면 붋필요한 api 요청않도록 취소하고 얼리 리턴으로 종료
      if (editTodoText === todoItem.todo) {
        setIsOnEdit((prev) => !prev);
        return;
      }

      const editedTodoItem = {
        id: todoItem.id.toString(),
        todo: editTodoText,
        isCompleted: todoItem.isCompleted,
      };

      try {
        const resUpdatedTodo = await updateTodo(editedTodoItem);
        setTodos((todos) => todos.map((todo) => (todo.id === todoItem.id ? resUpdatedTodo : todo)));
        setValue('');
      } catch (error: any) {
        setIsValidated(false);
        setFocus();
        throw new Error(error.response?.data.message || '업데이트에 에러가 발생했습니다.');
      }
    } else {
      return;
    }
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
          {!isOnEdit ? <span>{todo.todo}</span> : <Input {...InputProps} />}
        </S.Label>
        {!isOnEdit && (
          <>
            <Button size="medium" data-testid="modify-button" onClick={() => setIsOnEdit((prev) => !prev)}>
              수정
            </Button>
            <Button size="medium" data-testid="delete-button" onClick={(e) => handleDelete(e,todo)}>
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
