import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getTasks, createTask, deleteTask } from '../features/tasks/taskApi';
import { useState } from 'react';

const TaskCard = () => {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState('');

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ['tasks'],
    queryFn: getTasks,
  });

  const addTask = useMutation({
    mutationFn: createTask,
    onSuccess: () => {
      setTitle('');
      queryClient.invalidateQueries(['tasks']);
    },
  });

  const removeTask = useMutation({
    mutationFn: deleteTask,
    onSuccess: () => queryClient.invalidateQueries(['tasks']),
  });

  if (isLoading) return <p>Loading...</p>;

  return (
    <div>
      <h2>My TaskCard</h2>

      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Task title"
      />

      <button onClick={() => addTask.mutate({ title })}>
        Add
      </button>

      <ul>
        {tasks.map((task) => (
          <li key={task._id}>
            {task.title}
            <button onClick={() => removeTask.mutate(task._id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskCard;