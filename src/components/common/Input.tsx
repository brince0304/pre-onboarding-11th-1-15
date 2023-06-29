import { HTMLProps, useEffect, useRef } from 'react';
import * as S from './Input.style';

export interface IInputProps extends HTMLProps<HTMLInputElement> {
  helperText?: string;
  error?: boolean;
  errorText?: string;
  fullWidth?: boolean;
  dataTestId?: string;
  width?: string;
  height?: string;
}

const Input = (props: IInputProps) => {
  const { helperText, error, errorText } = props;

  const ref = useRef<HTMLInputElement>(null);

  useEffect(() => {
    //오류시에 자동으로 포커스되도록 구현했습니다.
    if (error) {
      ref.current?.focus();
    }
  }, [error]);

  return (
    <S.InputWrap>
      <S.Input {...props} ref={ref}
               data-testid={props.dataTestId}
      />
      <S.HelperText error={error} color={error ? 'red' : 'grey'}>
        {error ? errorText : helperText}
      </S.HelperText>
    </S.InputWrap>
  );
};
export default Input;
