import React from 'react';

const Coordinator = () => {
  const coordinators = [
    { id: 1, name: 'Alice', role: 'Coordinator' },
    { id: 2, name: 'Bob', role: 'Coordinator' },
  ];

  return (
    <div>
      <h2>Coordinators</h2>
      <ul>
        {coordinators.map((coordinator) => (
          <li key={coordinator.id}>
            {coordinator.name} - {coordinator.role}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Coordinator;
