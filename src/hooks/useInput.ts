import React, { useState } from 'react';

export default function useInput(options: {
  regex: RegExp;
  initialValue?: string;
}): [
  React.ChangeEventHandler<HTMLInputElement>,
  string,
  boolean,
  React.Dispatch<React.SetStateAction<string>>,
  React.Dispatch<React.SetStateAction<boolean>>,
] {
  const { regex } = options || {};
  const [value, setValue] = useState<string>(options.initialValue || '');
  const [isValidated, setIsValidated] = useState<boolean>(false);

  const validateValue = (value: string) => {
    const isValid = regex.test(value);
    setIsValidated(isValid);
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setValue(value);
    validateValue(value);
  };

  /*  폼 제출시 유효성 검사 초기화, 값 초기화를 위해 setter 까지 반환하도록 했습니다.
      전체적으로 빈 값이 들어가는 경우는 없기때문에 정규표현식으로 관리하도록 구현했습니다.*/
  return [onChange, value, isValidated, setValue, setIsValidated];
}
