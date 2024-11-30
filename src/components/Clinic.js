import React from 'react';

const Clinic = () => {
  const clinics = [
    { id: 1, name: 'Downtown Clinic', address: '123 Main St' },
    { id: 2, name: 'Uptown Clinic', address: '456 Elm St' },
  ];

  return (
    <div>
      <h2>Clinics</h2>
      <ul>
        {clinics.map((clinic) => (
          <li key={clinic.id}>
            {clinic.name} - {clinic.address}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Clinic;
