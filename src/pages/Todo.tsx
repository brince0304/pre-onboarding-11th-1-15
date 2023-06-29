import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ITodo } from 'interface/todoType';
import { getTodos } from 'apis/todo';
// import TodoInput from 'components/todos/TodoInput';

const Todo = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const navigate = useNavigate();

  const getTodoList: () => Promise<void> = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      navigate('/signin');
      return;
    }

    getTodoList();
  }, [navigate]);

  // todo 페이지 진입 상태에서 토큰이 소실될 경우 브라우저 객체에서 인식하여 바로 리다이렉트 처리
  useEffect(() => {
    const checkStorageToken = (e: StorageEvent) => {
      if (e.key === 'accessToken') {
        if (!e.newValue) {
          navigate('/signin');
          return;
        }
        return;
      }
      return;
    };

    window.addEventListener('storage', checkStorageToken);

    return () => {
      window.removeEventListener('storage', checkStorageToken);
    };
  }, [navigate]);

  return (
    <>
      {/* <TodoInput getTodoList={getTodoList} /> */}
      <ul>
        {todos?.map((todo) => (
          // <TodoList key={todo.id} />
          <></>
        ))}
      </ul>
    </>
  );
};

export default Todo;
