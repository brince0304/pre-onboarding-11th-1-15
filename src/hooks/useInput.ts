import React, { RefObject, useState } from 'react';

interface IUseInputReturn {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: any;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isValidated: boolean;
  setIsValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setFocus: () => void;
  setBlur: () => void;
}

const useInput = (options: {
  regex: RegExp;
  ref: RefObject<HTMLInputElement>;
  initialValue?: string;
}): IUseInputReturn => {
  const { regex } = options || {};
  const [value, setValue] = useState<string>(options.initialValue || '');
  const [isValidated, setIsValidated] = useState<boolean>(false);

  const validateValue = (value: string) => {
    const isValid = regex.test(value);
    setIsValidated(isValid);
  };

  const setFocus = () => {
    if (options.ref) {
      options.ref.current?.focus();
    }
  };

  const setBlur = () => {
    if (options.ref) {
      options.ref.current?.blur();
    }
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const value = e.target.value;
    setValue(value);
    validateValue(value);
  };

  /*  폼 제출시 유효성 검사 초기화, 값 초기화를 위해 setter 까지 반환하도록 했습니다.
            전체적으로 빈 값이 들어가는 경우는 없기때문에 정규표현식으로 관리하도록 구현했습니다.*/
  /*  const { data: data1, isLoading: isLoading1 } = useCustomHook(params1);
      const { data: data2, isLoading: isLoading2 } = useCustomHook(params2);*/
  /*  여러번 선언해야할 경우 위와 같이 사용하면 됩니다.*/
  return { onChange, value, setValue, isValidated, setIsValidated, setFocus, setBlur };
};

export default useInput;
