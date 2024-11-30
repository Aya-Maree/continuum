import React from 'react';

const Physician = () => {
  const physicians = [
    { id: 1, name: 'Dr. Adams', specialty: 'Cardiology' },
    { id: 2, name: 'Dr. Brown', specialty: 'Neurology' },
  ];

  return (
    <div>
      <h2>Physicians</h2>
      <ul>
        {physicians.map((physician) => (
          <li key={physician.id}>
            {physician.name} - {physician.specialty}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Physician;
