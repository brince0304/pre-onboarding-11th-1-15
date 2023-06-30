import { styled } from 'styled-components';

//각 스타일링 별로 필요시 추가
interface IInputWrapperProps {
  height?: string;
  width?: string;
  justifyContent?: string;
  alignItems?: string;
}

interface IHelperTextProps {
  error?: boolean;
  fontSize?: string;
  color?: string;
  fontWeight?: string;
  margin?: string;
}

interface IInputProps {
  width?: string;
  height?: string;
  fontSize?: string;
  color?: string;
  fontWeight?: string;
}

export const InputWrap = styled.div<IInputWrapperProps>`
  display: flex;
  flex-direction: column;
  justify-content: ${(props: IInputWrapperProps) => (props.justifyContent ? props.justifyContent : 'center')};
  align-items: ${(props: IInputWrapperProps) => (props.alignItems ? props.alignItems : 'center')};
  width: ${(props: IInputWrapperProps) => (props.width ? props.width : 'auto')};
  height: ${(props: IInputWrapperProps) => (props.height ? props.height : 'auto')};
`;

//Input 컴포넌트 아래에 출력될 헬퍼 텍스트 스타일링
export const HelperText = styled.p<IHelperTextProps>`
  font-size: ${(props: IHelperTextProps) => (props.fontSize ? props.fontSize : '12px')};
  color: ${(props: IHelperTextProps) => (props.color ? props.color : props.error ? '#f44336' : '#121212')};
  font-weight: ${(props: IHelperTextProps) => (props.fontWeight ? props.fontWeight : 'normal')};
  margin: ${(props: IHelperTextProps) => (props.margin ? props.margin : '0')};
`;

export const Input = styled.input<IInputProps>`
  width: ${(props: IInputProps) => (props.width ? props.width : 'auto')};
  height: ${(props: IInputProps) => (props.height ? props.height : 'auto')};
  font-size: ${(props: IInputProps) => (props.fontSize ? props.fontSize : '14px')};
  color: ${(props: IInputProps) => (props.color ? props.color : '#121212')};
  font-weight: ${(props: IInputProps) => (props.fontWeight ? props.fontWeight : 'normal')};
`;
