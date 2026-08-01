import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import ProjectDetail from './components/ProjectDetail';
import Home from './components/Home';

function NavBar() {
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav>
      <Link to="/" className="logo">
      <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <rect x="3" y="3" width="7" height="7" rx="1.5" fill="currentColor"/>
        <rect x="14" y="3" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.5"/>
        <rect x="3" y="14" width="7" height="7" rx="1.5" fill="currentColor" opacity="0.5"/>
        <rect x="14" y="14" width="7" height="7" rx="1.5" fill="currentColor"/>
      </svg>
      TeamTrack
  </Link>
      {!token && <Link to="/signup">Sign Up</Link>}
      {!token && <Link to="/login">Login</Link>}
      {token && <Link to="/dashboard">Dashboard</Link>}
      {token && <button onClick={handleLogout}>Logout</button>}
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;



// import Signup from './components/Signup';

// function App() {
//   return <Signup />;
// }

// export default App;



// import { useState } from 'react';
// import TaskCard from './components/TaskCard';

// function App() {
//   const [tasks, setTasks] = useState([
//     { id: 1, title: 'Fix login bug', status: 'in-progress', assignedTo: 'Bhargavi' },
//     { id: 2, title: 'Design homepage', status: 'todo', assignedTo: 'Rahul' },
//   ]);

//   const markDone = (id) => {
//     setTasks(tasks.map(task =>
//       task.id === id ? { ...task, status: 'done' } : task
//     ));
//   };

//   return (
//     <div>
//       <h1>TeamTrack</h1>
//       {tasks.map(task => (
//         <TaskCard
//           key={task.id}
//           title={task.title}
//           status={task.status}
//           assignedTo={task.assignedTo}
//           onMarkDone={() => markDone(task.id)}
//         />
//       ))}
//     </div>
//   );
// }

// export default App;