import React, { HTMLProps } from 'react';
import AuthInput from './AuthInput';
import Button from 'components/common/Button';

interface IAuthForm extends HTMLProps<HTMLFormElement> {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
}

const AuthForm = ({onSubmit, ...props} : IAuthForm) => {
  return (
    <form onSubmit={onSubmit} {...props}>
      <AuthInput />
      <Button type="submit" size="large" name="회원가입" />
    </form>
  );
};

export default AuthForm;