# [Team 15] 1주차 - Best Practice
## 배포 링크 https://pre-onboarding-11th-1-15team.netlify.app/
## Team15 팀원 소개 🙌 

**프로젝트 흐름이 구현에 있어서 어느 한명 빠지지 않고 참여하여 전체적인 실력 향상을 목표로 진행 되었습니다.**

|이름|역할|
|:---|:---|
|[백석현(팀장)](https://github.com/brince0304)|Todo, Auth 컴포넌트 구현 및 리팩토링 참여 / common Input 컴포넌트 구현 / useInput 훅 구현 / 리드미 작성|
|[장은정(팀원)](https://github.com/eunjeong90)|헤더 컴포넌트, 라우팅 구현 / AuthForm , TodoForm 구현 / 리드미 작성 & 수정 / 팀 프로젝트 진행상황 정리 및 수정|
|[김선미(팀원)](https://github.com/seon-mikim)|참여안함|
|[김정구(팀원)](https://github.com/JulyK9)|Todo 페이지, TodoItem 컴포넌트 구현 및 리팩토링 |
|[천진아(팀원)](https://github.com/totter15)|API 함수, 인터셉터 구현 / 전체적인 page 구성,스타일링 및 코드 리팩토링 / 파일트리 건의 및 정의|
|[윤선용(팀원)](https://github.com/eastsunyong)|AuthInput, AuthForm 컴포넌트 구현 및 리팩토링 / 프로젝트 배포|


## 설치 및 실행
깃 레파지토리 클론 

    git clone https://github.com/brince0304/pre-onboarding-11th-1-15.git

설치 경로로 이동

    cd pre-onboarding-11th-1-15
설치

    npm install

실행 

    npm start
    
## 의존성
<img src="https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=React&logoColor=black" /> <img src="https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=TypeScript&logoColor=white"/> <img src="https://img.shields.io/badge/StyledComponents-DB7093?style=for-the-badge&logo=StyledComponents&logoColor=white" /> 

<img src="https://img.shields.io/badge/Eslint-4B32C3?style=for-the-badge&logo=Eslint&logoColor=white" /> <img src="https://img.shields.io/badge/Prettier-F7B93E?style=for-the-badge&logo=Prettier&logoColor=white" /> <img src="https://img.shields.io/badge/Husky-00C65E?style=for-the-badge&logo=Husky&logoColor=white" /> 

**NodeJS ```>16.0.0```**

## 프로젝트 주제 
- ### 1주차 과제
  기존에 프리온보딩 사전과제를 팀 안에서 회의를 통해 가장 효율적이라고 판단되는 것을 Best Practice 로 정하고 리팩토링해 제출하는 과제입니다.
- ### Best Practice?
  > Best Practice란 모범사례라는 말로서, **특정 문제를 효과적으로 해결하기 위한 가장 성공적인 해결책 또는 방법론을 의미**합니다.
      
  저희 팀은 해당 방법론을 **각자의 구현 방법을 설명하고 토론한 후, 팀 안에서 가장 효율적이라고 판단되는 것을 합의하여 그것을 팀의 Best Practice로 삼는 것**이라 정의하고 이를 최우선 수행 과제로 삼았습니다.



## 고민되었던 부분

저희 15팀은 회의를 통해 사전 과제에서 겪었던 문제들 중 공통적인 부분을 뽑아서 크게 3가지로 정했습니다.

1. 컴포넌트 설계 패턴
    - 컴포넌트를 **어떠한 기준**으로 분리해야 할지가 가장 고민이 되었고 , 팀원들이 결정한 방식은 **컴포넌트의 기능을 우선으로 분리**를 하도록 했습니다.
2. 인증 방식 / 인터셉터 사용 유무
    - 기존에 과제 명세에는 redux, react query 등의 라이브러리 사용이 금지되어있었기 때문에 인증 방식에 대한 고민이 있었고, **공통 함수를 분리해야 할지 혹은 해당 컴포넌트 내에서 에러 핸들링을 할지에 대한 고민이 있었습니다.**
3. 파일 트리
    - 직관적인 파일트리 구조에 대한 고민이 있었고, **depth 를 얼마나 깊게 해야할지에 대한 고민**이 존재했습니다.

## 각각의 고민에 대한 Best Practice 선정

- **컴포넌트 설계 패턴** ▷ **김선미 팀원**
    - 외부 라이브러리를 사용하지 않고 자잘한 컴포넌트부터 제작해서 큰 컴포넌트를 구현하신게 인상깊었고 , 적절하게 기능과 용도별로 잘 분리해 각각 상황에 맞게 유지보수가 가능한 코드를 작성하신 것 같습니다.  ```백석현```
    - 선미님 컴포넌트 폴더의 단위가 작은 부분까지 잘 세분화되어 있다고 생각됨 / 작은 단위까지 잘 세분화되어 있어 재사용성을 높일 수 있다고 생각됨(ex. 버튼 컴포넌트) ```김정구```
    - 스타일 별로 컴포넌트를 세분화하여 재 사용성이 높아짐 / 스타일 수정시 각 컴포넌트 style을 수정하면 되므로 유지보수 용이 ```장은정```
- **인증 방식 / 인터셉터 사용 유무** ▷ **백석현 팀원**
    - 인증 방식의 경우에는 인터셉터를 사용 시 context API 의 state 를 인터셉터 내부에서 불러올 수 없었기 때문에 localStorage 에서 확인하여 구현하는 방식을 채택하였습니다.
    - 인터셉터 사용 유무에 대한 의견
        - 인터셉터를 이용할 경우 api에서 요청 혹은 응답에 대해서 처리(status)가 가능하며, try, catch 문을 줄일 수 있다 ```김선미```
        - aixos 인터셉터를 구현하기 위한 api와 기능별 함수가 별도의 파일로 모듈화되어 잘 정리가 되어 있다고 생각함. 이를 통해서 중복 코드를 줄여 재사용성을 높이고, 유지보수하기 쉽도록 잘 정리되어 있다고 생각함. ```김정구```
        - 서버에 토큰 인증을 할 때마다 헤더에 토큰을 넣어주는데, 이 과정에서 아직 갱신되지 못한 채로 재요청이 들어가 401 에러가 발생. 이를 axios가 인터셉터하는 과정을 한 파일에서 처리, 관리하고 있으므로 유지보수성이 향상되며 에러 핸들링이 편해짐. ```장은정```
- **파일 트리** ▷ 전체적인 틀 **김선미 팀원** / API 정리 ⇒ **백석현 팀원**
  - 직관적이면서 기본적인 파악이 필요한 내용이 폴더상으로 적절한 뎁스에 있다고 생각되고 다만 기본 컴포넌트 명칭에 대해서는 의견이 공유되면 좋을 것 같습니다. ```김정구```
  - 다른 사람이 처음보는 코드이지만 어느 폴더에 어느 파일이 있을지 알기 쉬웠습니다. ```윤선용```

## 프로젝트 진행 방식
먼저 뼈대가 될만한 _큰 주제를 정리한 후, 그 안에서 작은 것부터 실행하여 하나의 웹 어플리케이션을 완성하는 것을 목표로 진행_ 되었습니다.

선정된 Best Practice 를 토대로 6월 27일 화요일 강의에서 진행된 ESLint, Prettier, Husky를 우선 적용시키고 코딩 컨벤션, 커밋 컨벤션을 토론하여 정리하는 시간을 가졌습니다. 이후 팀 Repository를 생성해,

1. 파일트리
2. Axios Intercepter
3. 컴포넌트 구현 

순서로 진행 되었습니다.

# 진행 절차

## ES Lint, Prettier, Husky
### .eslintrc
```
{
  "extends": ["react-app", "eslint:recommended", "prettier"],
  "env": {
    "es6": true
  },
  "rules": {
    "no-var": "error", // var 금지
    "no-multiple-empty-lines": "error", // 여러 줄 공백 금지
    "no-console": ["error", { "allow": ["warn", "error", "info"] }], // console.log() 금지
    "eqeqeq": "error", // 일치 연산자 사용 필수
    "dot-notation": "error", // 가능하다면 dot notation 사용
    "no-unused-vars": "error" // 사용하지 않는 변수 금지
  },
  "settings": {
    "import/resolver": {
      "node": {
        "paths": ["src"] //절대경로 설정
      }
    }
  }
}
```
### .prettierrc
```
{
  "trailingComma": "all",
  "tabWidth": 2,
  "semi": true,
  "singleQuote": true,
  "printWidth": 120
}
```

- 1-3 프로젝트를 하기 전 알아야 할 팀으로 일하는 법과 개발자의 기본기를 바탕으로 간단한 규칙을 설정하였는데, 프로젝트 마감 기한을 고려하여 최소한으로 제어하는 방향이 맞다는 의견들을 종합 하였습니다.
- husky 를 사용해 공통적으로 커밋 전에 모든 작업을 실행하여 푸쉬를 하도록 진행했습니다.

## Coding / Commit Convention
<img width="736" alt="스크린샷 2023-06-30 오전 12 34 12" src="https://github.com/eunjeong90/trello/assets/89186225/f0fa31c4-cf89-46fd-94a9-b0469a9bf6db">

- 코딩 컨벤션은 레퍼런스를 찾아보며 어떤 규칙을 따르는지 학습하는 것에 중점을 두고 합의 가능한 선에서 규칙을 적용했습니다.
- 직관적인 코드 작성을 목표로 기본적인 함수, 인터페이스와 타입 규칙을 두었습니다

<img width="726" alt="스크린샷 2023-06-30 오전 12 35 01" src="https://github.com/eunjeong90/trello/assets/89186225/52ae6ca1-b1fb-489a-9b65-8522e7e4dcdf">

- Commit Convention 은 AngularJS Commit Convention 을 참고하여 커밋 메시지를 작성하도록 했습니다.

### Reference

[[공부] 코딩 컨벤션 (react)](https://2mojurmoyang.tistory.com/178)

[[Git] 커밋 메시지 규약 정리 (the AngularJS commit conventions)](https://velog.io/@outstandingboy/Git-커밋-메시지-규약-정리-the-AngularJS-commit-conventions)

## 파일 트리
<img width="726" alt="스크린샷" src="https://github.com/eunjeong90/trello/assets/89186225/738a4796-3706-4c42-9bd4-e7bf12b41a8e">

- 파일 트리는 기본적으로 너무 깊은 depth를 지양하여 직관적임을 목표로 역할별로 나누어 폴더를 생성하여 관리 했고, 각 컴포넌트는 따로 폴더를 생성하지 않고 {Component}.tsx 를 기본 규칙으로 설정해 구현하였습니다.



## 인터셉터
<img width="726" alt="스크린샷" src="https://github.com/eunjeong90/trello/assets/89186225/f48cb15b-8ee0-4ed8-9639-faf99a4eb997">

- 인터셉터는 인터셉터를 사용하는 이유인 **공통 로직 분리**에 맞춰서 구현했고, 기본적인 request 시에 토큰 검증, response 의 401 에러시에 토큰 삭제 부분을 포함하여 작성하였습니다.



## 컴포넌트 분리

- 컴포넌트는 재사용성을 높이기 위하여 기본적으로 common 컴포넌트를 구현하고 common → auth form, todo form → auth page , todo page 의 절차대로 컴포넌트 개발이 진행되었습니다.

### Input & Button (Common)
- common 컴포넌트는 기본적으로 html의 각 태그가 갖고있는 성질을 사용할 수 있도록 HTMLProps를 상속받아 타입을 지정해주었습니다.
- Input 컴포넌트는 기본적인 helper text, error text 를 받아와 상황별로 다양한 텍스트를 input 박스 하단에 출력 할 수 있도록 구현했습니다.

### AuthForm
`hooks/useInput.ts`
```
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
    options.ref?.current?.focus();
  };

  const setBlur = () => {
    options.ref?.current?.blur();
  };

  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = e.target.value as unknown as T;
    if (newValue !== value) {
      setValue(newValue);
      validateValue(newValue);
    }
  };
  return { onChange, value, setValue, isValidated, setIsValidated, setFocus, setBlur };
};
```
`components/auths/AuthForm.tsx`
```
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

...

  <Input
    value={email}
    onChange={emailOnChange}
    data-testid="email-input"
    name="email"
    error={isEmailError}
    errorText={emailErrorText}
  />
```
- AuthForm 은 기본적으로 Input, Button 컴포넌트로 구성하였고, 회원가입 / 로그인 컴포넌트의 검증 (이메일 주소에 '@' 포함, 비밀번호 8자리 이상) 이 동일하게 진행되어야 했기 때문에 **같은 코드를 각 컴포넌트별로 반복하여 작성할 필요 없이 하나의 컴포넌트로 각 상황별로 사용할 수 있게끔 구현했습니다.**
- 공통적으로 사용 될 수 있는 로직들을 분리해 useInput 훅을 생성해 사용하여 **Todo 부터 Auth 까지 검증 로직과 이벤트 구현에 필요한 로직을 외부로 분리하여 코드의 길이를 줄여 좀 더 직관적인 컴포넌트**가 될 수 있도록 하였습니다.
  - useInput 훅은 기본적으로 정규표현식, 초기화값, ref Object 를 받아올 수 있도록 구현하였고, 각각의 상황별로 사용할 수 있도록 제네릭 타입을 이용해 유연하게 사용할 수 있도록 구현했습니다.
  - 객체 타입을 반환하도록 구현해 상황별로 필요없는 변수나 함수까지 무조건 선언해 사용하는 경우를 지양하도록 구현하였습니다.



### TodoList & TodoInput
`components/common/Input.tsx`
```
const Input = forwardRef((props: IInputProps, ref: ForwardedRef<HTMLInputElement>) => {
  const { helperText, error, errorText } = props;

  return (
    <S.InputWrap>
      <S.Input {...props} ref={ref} data-testid={props.dataTestId} />
      <S.HelperText error={error} color={error ? 'red' : 'grey'}>
        {error ? errorText : helperText}
      </S.HelperText>
    </S.InputWrap>
  );
});
```
`components/todos/TodoInput.tsx`
```
  <S.TodoInputForm onSubmit={onSubmit}>
    <Input {...InputProps} ref={inputRef} />
    <Button size={'medium'} name={'추가'} data-testid="new-todo-add-button" type="submit" disabled={!isValidated} />
  </S.TodoInputForm>
```
- TodoInput, TodoItem 속 수정용 input 또한 common 컴포넌트를 구성하여 구현하였고, useInput hook 을 사용해 검증과 onChange 핸들링을 하도록 했습니다.

