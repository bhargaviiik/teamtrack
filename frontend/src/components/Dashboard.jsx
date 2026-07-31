import { useState, useEffect } from 'react';
import axios from 'axios';

function Dashboard() {
  const user = JSON.parse(localStorage.getItem('user'));
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProject, setNewProject] = useState({ title: '', description: '' });

  const token = localStorage.getItem('token');

  const fetchProjects = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/projects', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProjects(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleChange = (e) => {
    setNewProject({ ...newProject, [e.target.name]: e.target.value });
  };

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/projects', newProject, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewProject({ title: '', description: '' });
      fetchProjects(); // refresh the list to include the new project
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <p>Welcome, {user?.name}</p>

      <h3>Create a Project</h3>
      <form onSubmit={handleCreate}>
        <input
          name="title"
          placeholder="Project title"
          value={newProject.title}
          onChange={handleChange}
        />
        <input
          name="description"
          placeholder="Description"
          value={newProject.description}
          onChange={handleChange}
        />
        <button type="submit">Create</button>
      </form>

      <h3>Your Projects</h3>
      {loading ? (
        <p>Loading...</p>
      ) : projects.length === 0 ? (
        <p>No projects yet.</p>
      ) : (
        projects.map((project) => (
          <div key={project._id} style={{ border: '1px solid #ccc', padding: '10px', marginBottom: '8px' }}>
            <h4>{project.title}</h4>
            <p>{project.description}</p>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;



// function Dashboard() {
//   const user = JSON.parse(localStorage.getItem('user'));

//   return (
//     <div>
//       <h2>Dashboard</h2>
//       <p>Welcome, {user?.name}</p>
//     </div>
//   );
// }

// export default Dashboard;