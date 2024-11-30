import React from 'react';

const Patient = () => {
  const patients = [
    { id: 1, name: 'John Doe', age: 30 },
    { id: 2, name: 'Jane Smith', age: 40 },
  ];

  return (
    <div>
      <h2>Patients</h2>
      <ul>
        {patients.map((patient) => (
          <li key={patient.id}>
            {patient.name}, Age: {patient.age}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Patient;
