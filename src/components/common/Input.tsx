import {forwardRef, HTMLProps, useEffect, useRef} from "react";
import * as S from "./Input.style";

export interface IInputProps extends Omit<HTMLProps<HTMLInputElement>, "ref"> {
    helperText?: string;
    error?: boolean;
    errorText?: string;
    fullWidth?: boolean;
    dataTestId?: string;
    width?: string;
    height?: string;
}

//TODO: 부모 컴포넌트에서 ref 받아오도록 구현해야함
const Input = forwardRef<HTMLInputElement>((props: IInputProps) => {
    const {helperText, error, errorText} = props;
    const ref = useRef<HTMLInputElement>(null);
    useEffect(() => {
        if (error) {
            ref?.current?.focus();
        }
    }, [error]);

    return (
        <S.InputWrap>
            <S.Input {...props} ref={ref} data-testid={props.dataTestId}/>
            <S.HelperText error={error} color={error ? "red" : "grey"}>
                {error ? errorText : helperText}
            </S.HelperText>
        </S.InputWrap>
    );
});
export default Input;
