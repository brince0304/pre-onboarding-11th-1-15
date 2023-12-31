import React, { useState, useRef } from 'react';
import { ITodo } from 'interface/todoType';
import { updateTodo, deleteTodo } from 'apis/todo';
import Button from 'components/common/Button';
import * as S from './TodoItem.style';
import useInput from 'hooks/useInput';
import Input, { IInputProps } from '../common/Input';

interface TodoItemProps {
  todo: ITodo;
  getTodoList: () => Promise<void>;
}

const TodoItem = ({ todo, getTodoList }: TodoItemProps) => {
  const [isOnEdit, setIsOnEdit] = useState<boolean>(false);
  const regex = /^.{1,}$/;
  const updateInputRef = useRef<HTMLInputElement>(null);
  const {
    onChange: updateInputOnChange,
    value: updateInput,
    setValue: setUpdateInput,
    isValidated: isUpdateInputValidated,
  } = useInput({
    regex,
    ref: updateInputRef,
    initialValue: todo.todo,
  });
  const { value: todoCompleted, setValue: setTodoCompleted } = useInput({
    initialValue: todo.isCompleted,
  });

  const InputProps = {
    defaultValue: updateInput,
    onChange: updateInputOnChange,
    type: 'text',
    dataTestId: 'modify-input',
    ref: updateInputRef,
    error: !isUpdateInputValidated && updateInput !== todo.todo,
    errorText: '1글자 이상 입력해주세요.',
  } as IInputProps;

  const handleDelete = async (e: React.MouseEvent<HTMLButtonElement>, todoItem: ITodo) => {
    e.preventDefault();
    try {
      const resStatus = await deleteTodo(todoItem.id);
      if (resStatus) {
        getTodoList();
      }
    } catch (error: any) {
      alert(error.response?.data.message || '정상적으로 삭제되지 않았습니다.');
    }
  };

  const handleUpdateTodo = async (updateInput: string, updateComplete: boolean) => {
    await updateTodo({
      id: String(todo.id),
      todo: updateInput,
      isCompleted: updateComplete,
    });
    try {
      getTodoList();
    } catch (error: any) {
      alert(error.response?.data.message || '정상적으로 업데이트되지 않았습니다.');
    }
  };

  const handleCompleteTodo = () => {
    const updateCompleted = !todoCompleted;
    setTodoCompleted(updateCompleted);
    handleUpdateTodo(todo.todo, updateCompleted);
  };

  const handleUpdateTodoText = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setIsOnEdit((prev) => !prev);
    handleUpdateTodo(updateInput, todoCompleted);
  };

  const handleCancel = () => {
    setIsOnEdit((prev) => !prev);
    setUpdateInput(todo.todo);
  };

  return (
    <S.Item>
      <S.Wrapper>
        <S.Label>
          <Input type="checkbox" id={todo.id.toString()} checked={todoCompleted} onChange={handleCompleteTodo} />
          {!isOnEdit ? <span>{todo.todo}</span> : <Input {...InputProps} />}
        </S.Label>
        {!isOnEdit && (
          <S.ButtonBox>
            <Button
              size="medium"
              data-testid="modify-button"
              name="수정"
              onClick={() => setIsOnEdit((prev) => !prev)}
            />
            <Button size="medium" data-testid="delete-button" name="삭제" onClick={(e) => handleDelete(e, todo)} />
          </S.ButtonBox>
        )}
        {isOnEdit && (
          <S.ButtonBox>
            <Button
              size="medium"
              data-testid="submit-button"
              onClick={handleUpdateTodoText}
              name="제출"
              disabled={!isUpdateInputValidated}
            />
            <Button size="medium" data-testid="cancel-button" onClick={handleCancel} name="취소" />
          </S.ButtonBox>
        )}
      </S.Wrapper>
    </S.Item>
  );
};

export default TodoItem;
