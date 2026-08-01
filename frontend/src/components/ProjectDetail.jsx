import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ProjectDetail() {
  const { id } = useParams();
  const [project, setProject] = useState(null);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: '', description: '' });
  const token = localStorage.getItem('token');
  const [memberEmail, setMemberEmail] = useState('');
  const [memberError, setMemberError] = useState('');

  const currentUser = JSON.parse(localStorage.getItem('user'));
  const isCreator = project?.createdBy?._id === currentUser?._id;

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

    const handleAddMember = async (e) => {
    e.preventDefault();
    setMemberError('');
    try {
        await axios.post(
        `http://localhost:5000/api/projects/${id}/members`,
        { email: memberEmail },
        { headers: { Authorization: `Bearer ${token}` } }
        );
        setMemberEmail('');
        fetchData(); // refresh so the new member shows up
    } catch (err) {
        setMemberError(err.response?.data?.message || 'Could not add member');
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
        <Link to="/dashboard">← Back to Dashboard</Link>
        <br /><br />
        <p>{project.description}</p>

        <h3>Members</h3>
        <ul>
            {project.members?.map((m) => (
                    <li key={m._id}>{m.name} ({m.email})</li>
            ))}
        </ul>

        {isCreator &&  <form onSubmit={handleAddMember}>
        <input
            type="email"
            placeholder="Add member by email"
            value={memberEmail}
            onChange={(e) => setMemberEmail(e.target.value)}
        />
        <button type="submit">Add Member</button>
        </form>
        }
        {memberError && <p className="error">{memberError}</p>}

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
            <div key={task._id} className="card">
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



