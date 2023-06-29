import { IPostAuth, signIn } from 'apis/auth';
import axios from 'axios';

function SignIn() {
  async function signInHandler(authData: IPostAuth) {
    try {
      // TODO : email, password input값 넣기
      const data = await signIn(authData);
      const { access_token } = data;

      //로컬스토리지 저장
      localStorage.setItem('token', access_token);

      // TODO : 투두 페이지로 이동
    } catch (error) {
      if (axios.isAxiosError(error)) {
        const { status } = error.response ?? {};
        if (status === 404 || status === 401) alert('해당 사용자가 존재하지 않습니다.');
      }
    }
  }

  return <button onClick={() => signInHandler}>Signin</button>;
}

export default SignIn;
