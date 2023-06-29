import { FormEvent, useState } from 'react';
import useInput from 'hooks/useInput';
import Input, { IInputProps } from '../common/Input';
import * as S from './TodoInput.style';

const TodoInput = () => {
  const regex = /^.{1,}$/;
  const [onChange, value, isValid, setValue, setIsValid] = useInput({ regex });
  const [isLoading] = useState<boolean>(false);
  const [isError, setError] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('한글자 이상 입력해주세요.');

  const InputProps = {
    value,
    onChange,
    errorText,
    error: isError,
    placeholder: '할일을 적어보세요!',
    dataTestId: 'new-todo-input',
    width: '100%',
    height: '50px',
    disabled: isLoading,
    type: 'text',
  } as IInputProps;

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // createTodo
    if (isValid) {
      window.alert(`새로운 할일: ${value}`);
      // POST 201
      setValue('');
      setIsValid(false);
      // POST error handler
      if (isError) {
        setErrorText('에러가 발생하였습니다.');
      }
      // Valid 안되었지만 혹시나 submit 될 때 error handler
    } else {
      setError(true);
      setErrorText('한글자 이상 입력해주세요.');
    }
  };

  return (
    <S.TodoInputForm onSubmit={onSubmit}>
      <Input {...InputProps} />
      <button data-testid="new-todo-add-button" type="submit" disabled={!isValid}>
        추가
      </button>
    </S.TodoInputForm>
  );
};

export default TodoInput;
