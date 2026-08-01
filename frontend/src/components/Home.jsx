import { Link } from 'react-router-dom';

function Home() {
  const token = localStorage.getItem('token');

  return (
    <div className="hero">
      <h1>TeamTrack</h1>
      <p>A task management platform built for college project teams — assign tasks, track progress, and stay on top of deadlines together.</p>

      {token ? (
        <div className="hero-buttons">
          <Link to="/dashboard">
            <button>Go to Dashboard</button>
          </Link>
        </div>
      ) : (
        <div className="hero-buttons">
          <Link to="/signup">
            <button>Get Started</button>
          </Link>
          <Link to="/login">
            <button className="btn-outline">Login</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Home;