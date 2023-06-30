import { FormEvent, useEffect, useRef, useState } from 'react';
import useInput from 'hooks/useInput';
import Input, { IInputProps } from '../common/Input';
import * as S from './TodoInput.style';
import Button from '../common/Button';
import { createTodo } from '../../apis/todo';

const TodoInput = (props: { getTodoList: () => {} }) => {
  const regex = /^.{1,}$/;
  const inputRef = useRef<HTMLInputElement>(null);
  const { onChange, value, setValue, isValidated, setIsValidated, setFocus } = useInput<string>({
    regex: regex,
    ref: inputRef,
    initialValue: '',
  });

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
    if (isValidated) {
      createTodo(value)
        .then((res) => {
          setValue('');
          setIsValidated(false);
          props.getTodoList();
        })
        .catch((e) => {
          setError(true);
          setErrorText('에러가 발생하였습니다.');
          setIsValidated(false);
          setFocus();
        });
    } else {
      setError(true);
      setErrorText('한글자 이상 입력해주세요.');
    }
  };

  useEffect(() => {
    if (value.length > 0) {
      setError(false);
    }
  }, [value]);

  return (
    <S.TodoInputForm onSubmit={onSubmit}>
      <Input {...InputProps} ref={inputRef} />
      <Button size={'medium'} name={'추가'} data-testid="new-todo-add-button" type="submit" disabled={!isValidated} />
    </S.TodoInputForm>
  );
};

export default TodoInput;
