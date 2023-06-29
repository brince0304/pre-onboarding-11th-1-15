import React, { useState, useEffect } from 'react';
import Button from 'components/common/Button';
import Input from 'components/common/Input';
import useInput from 'hooks/useInput';
import { signIn, signUp } from 'apis/auth';

interface IUser {
  email: string;
  password: string;
}

const AuthInput = (props: { mode: 'signIn' | 'signUp' }) => {
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [emailErrorText, setEmailErrorText] = useState<string>('');
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const emailRef = React.useRef<HTMLInputElement>(null);
  const emailRegex = /@/;
  const {
    onChange: emailOnChange,
    value: email,
    isValidated: emailIsValidated,
    setIsValidated: setEmailIsValidated,
    setFocus: setEmailFocus,
  } = useInput({
    ref: emailRef,
    regex: emailRegex,
  });
  const passwordRef = React.useRef<HTMLInputElement>(null);
  const passwordRegex = /.{8,}/;
  const {
    onChange: passwordOnChange,
    value: password,
    isValidated: passwordIsValided,
    setIsValidated: setPasswordIsValidated,
  } = useInput({
    ref: passwordRef,
    regex: passwordRegex,
  });

  const [user, SetUser] = useState<IUser>({ email: '', password: '' });

  const buttonLabel = props.mode === 'signUp' ? '회원가입' : '로그인';
  const buttonTestId = props.mode === 'signUp' ? 'signup-button' : 'signin-button';

  useEffect(() => {
    SetUser({
      email: email,
      password: password,
    });
    setIsEmailError(false);
    setIsPasswordError(false);
  }, [email, password]);

  const authHandler = (mode: string, user: IUser) => {
    setIsLoading(true);
    // 로그인
    if (mode === 'signIn') {
      signIn(user)
        .then((res) => {
          if (res.access_token) {
            localStorage.setItem('token', res.access_token);
            //TODO 로 navigate
            setIsLoading(false);
            alert('로그인 되었습니다.');
          }
        })
        .catch((e) => {
          console.log(e);
          if (e.response.status === 404) {
            setUnAuthorizedError();
          } else if (e.response.status === 401) {
            setUnAuthorizedError();
          }
          setIsLoading(false);
        });
    } else {
      signUp(user)
        .then((res) => {
          if (res) {
            // sign-in 으로 navigate
          }
        })
        .catch((e) => {
          console.log(e);
          if (e.response.status === 409) {
            setExistUserError();
          }
          setIsLoading(false);
        });
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailIsValidated && passwordIsValided) {
      authHandler(props.mode, user);
    }
  };

  const setUnAuthorizedError = () => {
    setIsEmailError(true);
    setIsPasswordError(true);
    setEmailErrorText('존재하지 않는 이메일이거나 비밀번호가 옳지 않습니다.');
    setEmailFocus();
    setEmailIsValidated(true);
    setPasswordIsValidated(true);
  };

  const setExistUserError = () => {
    setIsEmailError(true);
    setIsPasswordError(true);
    setEmailErrorText('이미 존재하는 이메일입니다.');
    setEmailFocus();
    setEmailIsValidated(true);
    setPasswordIsValidated(true);
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        value={email}
        onChange={emailOnChange}
        data-testid="email-input"
        name="email"
        error={isEmailError}
        errorText={emailErrorText}
      />
      <Input
        value={password}
        onChange={passwordOnChange}
        data-testid="password-input"
        name="password"
        error={isPasswordError}
        type="password"
      />
      <Button
        type="submit"
        size="large"
        name={buttonLabel}
        data-testid={buttonTestId}
        disabled={isLoading || !emailIsValidated || !passwordIsValided}
      />
    </form>
  );
};

export default AuthInput;
