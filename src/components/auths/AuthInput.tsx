import React, { useState, useEffect } from 'react';

export default function AuthInput() {
  interface User {
    email: string;
    password: string;
  }

  //input 값 보관
  const [userInput, setUserInput] = useState<User>({
    email: '',
    password: '',
  });

  //유효성 검사
  const [isEmailValied, setIsEmailValied] = useState({
    msg: '',
    validation: false,
  });
  const [isPasswordValied, setIsPasswordvalied] = useState({
    msg: '',
    validation: false,
  });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  useEffect(() => {
    const emailRegex = /@/;
    const checkPassword = userInput.password;
    if (!emailRegex.test(userInput.email)) {
      setIsEmailValied({
        msg: '@가 포함되어야 합니다.',
        validation: false,
      });
    } else {
      setIsEmailValied({
        msg: '',
        validation: true,
      });
    }
    if (checkPassword?.length < 8) {
      setIsPasswordvalied({
        msg: '8자 이상 입력해주세요',
        validation: false,
      });
    } else {
      setIsPasswordvalied({
        msg: '',
        validation: true,
      });
    }
  }, [userInput]);

  return (
    <div>
      <input value={userInput.email} onChange={onChangeHandler} data-testid="email-input" name="email" />
      <input value={userInput.password} onChange={onChangeHandler} data-testid="password-input" name="password" />
      {userInput.email && !userInput.email.includes('@') && <p>{isEmailValied.msg}</p>}
      {userInput.password && userInput.password.length < 8 && <p>{isPasswordValied.msg}</p>}
    </div>
  );
}
