import { signUp } from 'apis/auth';
import axios from 'axios';

function SignUp() {
  async function signUpHandler() {
    try {
      // TODO : email, password input값 넣기
      const data = await signUp({ email: 'email', password: 'password' });
      if (data) {
        alert('회원가입 완료!');
        //TODO : 로그인 페이지로 이동
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { status } = error.response ?? {};
        if (status === 400) alert('동일한 이메일이 이미 존재합니다.');
      }
    }
  }
  return <button onClick={signUpHandler}>signUp</button>;
}

export default SignUp;
