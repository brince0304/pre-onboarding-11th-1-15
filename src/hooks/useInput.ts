import React, { RefObject, useState } from 'react';

interface IUseInputReturn<T> {
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  value: T;
  setValue: React.Dispatch<React.SetStateAction<T>>;
  isValidated: boolean;
  setIsValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setFocus: () => void;
  setBlur: () => void;
}

const useInput = <T>(options: {
  regex: RegExp;
  ref: RefObject<HTMLInputElement>;
  initialValue?: T;
}): IUseInputReturn<T> => {
  const { regex } = options || {};
  const [value, setValue] = useState<T>((options.initialValue as T) ?? ('' as unknown as T));
  const [isValidated, setIsValidated] = useState<boolean>(false);

  const validateValue = (value: T) => {
    if (typeof value === 'string') {
      const isValid = regex.test(value);
      setIsValidated(isValid);
    } else {
      setIsValidated(false);
    }
  };

  const setFocus = () => {
    if (options.ref) {
      options.ref.current?.focus();
    }  };

  const setBlur = () => {
    if (options.ref) {
      options.ref.current?.blur();
    }
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value as unknown as T;
    if (newValue !== value) {
      setValue(newValue);
      validateValue(newValue);
    }
  };
  // 기본적으로 훅 사용할때 <type> 형식으로 타입 지정 해주시거나 (객체도 가능) 초기화값 지정해주시면 타입 자동으로 들어갈겁니다.
  /*  폼 제출시 유효성 검사 초기화, 값 초기화를 위해 setter 까지 반환하도록 했습니다.
            전체적으로 빈 값이 들어가는 경우는 없기때문에 정규표현식으로 관리하도록 구현했습니다.*/
  /*  const { data: data1, isLoading: isLoading1 } = useCustomHook(params1);
      const { data: data2, isLoading: isLoading2 } = useCustomHook(params2);*/
  /*  여러번 선언해야할 경우 위와 같이 사용하면 됩니다. (여러번 사용하지 않더라도 변수명 헷갈리지 않게 하기 위해 이렇게 사용하시는걸 추천드립니다.) */
  return { onChange, value, setValue, isValidated, setIsValidated, setFocus, setBlur };
};

export default useInput;
