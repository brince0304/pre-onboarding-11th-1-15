import React, { useState, useEffect, useRef } from 'react';
import Button from 'components/common/Button';
import Input from 'components/common/Input';
import useInput from 'hooks/useInput';
import { signIn, signUp } from 'apis/auth';
import { useNavigate } from 'react-router';

interface IUser {
  email: string;
  password: string;
}

const AuthForm = (props: { mode: 'signIn' | 'signUp' }) => {
  const [isEmailError, setIsEmailError] = useState<boolean>(false);
  const [emailErrorText, setEmailErrorText] = useState<string>('');
  const [isPasswordError, setIsPasswordError] = useState<boolean>(false);
  const [passwordErrorText, setPasswordErrorText] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const emailRef = useRef<HTMLInputElement>(null);
  const emailRegex = /@/;
  const {
    onChange: emailOnChange,
    value: email,
    isValidated: emailIsValidated,
    setIsValidated: setEmailIsValidated,
    setFocus: setEmailFocus,
  } = useInput<string>({
    ref: emailRef,
    regex: emailRegex,
  });
  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordRegex = /.{8,}/;
  const {
    onChange: passwordOnChange,
    value: password,
    isValidated: passwordIsValided,
    setIsValidated: setPasswordIsValidated,
  } = useInput<string>({
    ref: passwordRef,
    regex: passwordRegex,
  });
  const emailPasswordErrorText = '이메일 또는 비밀번호가 일치하지 않습니다.';
  const emailRegexNotMatchErrorText = '이메일 형식이 올바르지 않습니다.';
  const emailAlreadyExistErrorText = '이미 존재하는 이메일입니다.';
  const passwordRegexNotMatchErrorText = '비밀번호는 8자 이상이어야 합니다.';
  const emailInputError = (!emailIsValidated && email.length > 0) || isEmailError;
  const passwordInputError = (!passwordIsValided && password.length > 0) || isPasswordError;

  const [user, SetUser] = useState<IUser>({ email: '', password: '' });
  const buttonLabel = props.mode === 'signUp' ? '회원가입' : '로그인';
  const buttonTestId = props.mode === 'signUp' ? 'signup-button' : 'signin-button';

  const navigate = useNavigate();

  useEffect(() => {
    SetUser({
      email: email,
      password: password,
    });
    setIsEmailError(false);
    setIsPasswordError(false);
  }, [email, password]);

  useEffect(() => {
    if (!isEmailError || !isPasswordError) {
      setEmailErrorText(emailRegexNotMatchErrorText);
      setPasswordErrorText(passwordRegexNotMatchErrorText);
    }
  }, [isEmailError, isPasswordError]);

  const authHandler = (mode: string, user: IUser) => {
    setIsLoading(true);
    // 로그인
    if (mode === 'signIn') {
      signIn(user)
        .then((res) => {
          if (res.access_token) {
            localStorage.setItem('token', res.access_token);
            navigate('/todo');
            setIsLoading(false);
            alert('로그인 되었습니다.');
          }
        })
        .catch((e) => {
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
            setIsLoading(false);
          }
        })
        .catch((e) => {
          if (e.response.status === 400) {
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
    setEmailIsValidated(true);
    setPasswordIsValidated(true);
    setEmailErrorText(emailPasswordErrorText);
    setPasswordErrorText(emailPasswordErrorText);
    setEmailFocus();
  };

  const setExistUserError = () => {
    setIsEmailError(true);
    setIsPasswordError(true);
    setEmailIsValidated(true);
    setPasswordIsValidated(true);
    setEmailErrorText(emailAlreadyExistErrorText);
    setPasswordErrorText('');
    setEmailFocus();
  };

  return (
    <form onSubmit={onSubmit}>
      <Input
        value={email}
        onChange={emailOnChange}
        data-testid="email-input"
        name="email"
        error={emailInputError}
        errorText={emailErrorText}
        ref={emailRef}
      />
      <Input
        value={password}
        onChange={passwordOnChange}
        data-testid="password-input"
        name="password"
        error={passwordInputError}
        errorText={passwordErrorText}
        type="password"
        ref={passwordRef}
      />
      <Button
        type="submit"
        size="large"
        name={buttonLabel}
        data-testid={buttonTestId}
        disabled={isLoading || !emailIsValidated || !passwordIsValided || isEmailError || isPasswordError}
      />
    </form>
  );
};

export default AuthForm;
