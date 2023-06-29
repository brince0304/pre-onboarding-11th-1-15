import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { ITodo } from 'interface/todoType';
import { getTodos } from 'apis/todo';
import TodoInput from 'components/todos/TodoInput';

const Todo = () => {
  const [todos, setTodos] = useState<ITodo[]>([]);

  const navigate = useNavigate();

  const getRes: () => Promise<void> = async () => {
    const data = await getTodos();
    setTodos(data);
  };

  useEffect(() => {
    const access_token = localStorage.getItem('access_token');

    if (!access_token) {
      navigate('/signin');
      return;
    }

    getRes();
  }, [navigate]);

  return (
    <>
      <TodoInput />
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
