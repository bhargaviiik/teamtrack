
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Signup from './components/Signup';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/signup">Sign Up</Link> | <Link to="/login">Login</Link>
      </nav>

      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
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