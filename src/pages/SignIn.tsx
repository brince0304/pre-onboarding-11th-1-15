import AuthForm from 'components/auths/AuthForm';
import * as S from '../components/common/Auth.style';
import { useEffect } from 'react';
import { useNavigate } from 'react-router';

function SignIn() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('token')) {
      navigate('/todo');
    }
  }, [navigate]);

  return (
    <S.Wrapper>
      <S.Title>로그인</S.Title>
      <AuthForm mode="signIn" />
    </S.Wrapper>
  );
}

export default SignIn;
