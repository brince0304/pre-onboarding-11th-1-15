import { ChangeEvent, useEffect, useRef } from 'react';
import * as S from './Input.style';

export interface IInputProps {
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  helperText?: string;
  error?: boolean;
  errorText?: string;
  placeholder?: string;
  disabled?: boolean;
  type?: string;
  fullWidth?: boolean;
  autoFocus?: boolean;
  dataTestId: string;
  defaultValue?: string;
}

const Input = (props: IInputProps) => {
  const {
    value,
    defaultValue,
    onChange,
    helperText,
    error,
    errorText,
    placeholder,
    disabled,
    type,
    fullWidth,
    autoFocus,
    dataTestId,
  } = props;

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    //오류시에 자동으로 포커스되도록 구현했습니다.
    if (error) {
      ref.current?.focus();
    }
  }, [error]);

  return (
    <S.InputWrap>
      <S.Input
        ref={ref}
        data-testid={dataTestId}
        value={value}
        defaultValue={defaultValue}
        onChange={onChange}
        disabled={disabled}
        type={type}
        placeholder={placeholder}
        autoFocus={autoFocus}
        fullWidth={fullWidth}
      />
      <S.HelperText error={error} color={error ? 'red' : 'grey'}>
        {error ? errorText : helperText}
      </S.HelperText>
    </S.InputWrap>
  );
};

export default Input;
