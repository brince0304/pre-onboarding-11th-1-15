import { ForwardedRef, forwardRef, HTMLProps } from 'react';
import * as S from './Input.style';

export interface IInputProps extends Omit<HTMLProps<HTMLInputElement>, 'ref'> {
  helperText?: string;
  error?: boolean;
  errorText?: string;
  dataTestId?: string;
  width?: string;
  height?: string;
}

//TODO: 부모 컴포넌트에서 ref 받아오도록 구현해야함
const Input = forwardRef((props: IInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { helperText, error, errorText, dataTestId, width, height, ...inputProps } = props;

  return (
    <S.InputWrap>
      <S.Input {...inputProps} ref={ref} data-testid={props.dataTestId} width={width} height={height} />
      <S.HelperText error={error} color={error ? 'red' : 'grey'}>
        {error ? errorText : helperText}
      </S.HelperText>
    </S.InputWrap>
  );
});
export default Input;
