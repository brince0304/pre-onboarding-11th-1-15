import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ITodo } from 'interface/todoType';
import { getTodos } from 'apis/todo';
import TodoList from 'components/todos/TodoList';
import TodoInput from 'components/todos/TodoInput';

const Todo = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const navigate = useNavigate();

  const getTodoList: () => Promise<void> = async () => {
    const token = localStorage.getItem('token');

    if (!token) {
      navigate('/signin');
      return;
    }

    try {
      const newTodos = await getTodos();
      setTodos((prevTodos) => newTodos);
    } catch (error: any) {
      alert(error.response?.data.message || '할일 목록을 정상적으로 가져오지 못했습니다.');
    }
  };

  // todo 페이지 진입 상태에서 토큰이 소실될 경우 브라우저 객체에서 인식하여 바로 리다이렉트 처리
  useEffect(() => {
    const checkStorageToken = (e: StorageEvent) => {
      if (e.key === 'token') {
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

  useEffect(() => {
    getTodoList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TodoInput getTodoList={getTodoList} />
      <TodoList todos={todos} getTodoList={getTodoList} />
    </>
  );
};

export default Todo;
