import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const token = localStorage.getItem('token');

  const fetchData = async () => {
    try {
      const projectRes = await axios.get(`http://localhost:5000/api/projects/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProject(projectRes.data);

      const tasksRes = await axios.get(`http://localhost:5000/api/tasks/project/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setTasks(tasksRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [id]);

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleCreateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:5000/api/tasks',
        { ...newTask, project: id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTask({ title: '', description: '' });
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  const updateStatus = async (taskId, status) => {
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/${taskId}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchData();
    } catch (err) {
      console.error(err);
    }
  };

  if (!project) return <p>Loading...</p>;

  return (
    <div>
      <h2>{project.title}</h2>
      <p>{project.description}</p>

      <h3>Add a Task</h3>
      <form onSubmit={handleCreateTask}>
        <input name="title" placeholder="Task title" value={newTask.title} onChange={handleChange} />
        <input name="description" placeholder="Description" value={newTask.description} onChange={handleChange} />
        <button type="submit">Add Task</button>
      </form>

      <h3>Tasks</h3>
      {tasks.length === 0 ? (
        <p>No tasks yet.</p>
      ) : (
        tasks.map((task) => (
          <div key={task._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '8px' }}>
            <h4>{task.title}</h4>
            <p>Status: {task.status}</p>
            <select
              value={task.status}
              onChange={(e) => updateStatus(task._id, e.target.value)}
            >
              <option value="todo">Todo</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        ))
      )}
    </div>
  );
}

export default ProjectDetail;