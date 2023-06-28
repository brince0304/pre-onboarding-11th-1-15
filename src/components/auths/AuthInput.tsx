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
    const { name, value } = e.target
    setUserInput({ ...userInput, [name]: value })
  }
  return (
    <div>
      <input
        value={userInput.email}
        onChange={onChangeHandler}
        data-testid="email-input"
        name="email"
      />
      <input
        value={userInput.password}
        onChange={onChangeHandler}
        data-testid="password-input"
        name="password"
      />
    </div>
  );
}
