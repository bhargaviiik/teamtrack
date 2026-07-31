
function TaskCard({ title, status, assignedTo, onMarkDone }) {
  return (
    <div style={{ border: '1px solid #ccc', padding: '12px', marginBottom: '8px' }}>
      <h3>{title}</h3>
      <p>Status: {status}</p>
      <p>Assigned to: {assignedTo}</p>
      {status !== 'done' && (
        <button onClick={onMarkDone}>Mark as Done</button>
      )}
    </div>
  );
}

export default TaskCard;