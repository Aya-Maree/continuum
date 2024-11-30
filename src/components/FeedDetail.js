import React from 'react';
import { useParams } from 'react-router-dom';

const FeedDetail = () => {
  const { id } = useParams();

  // Dummy data for feeds
  const feedDetails = {
    1: { title: 'Medical Record Updated', detail: 'Your medical records have been updated successfully.' },
    2: { title: 'Physician Update', detail: 'Your physician has added new notes to your profile.' },
    3: { title: 'Clinic Update', detail: 'The clinic operating hours have been updated.' },
    4: { title: 'New Message', detail: 'You have received a new message from your physician.' },
    5: { title: 'Appointment Confirmed', detail: 'Your appointment has been confirmed for the upcoming date.' },
  };

  const feed = feedDetails[id];

  if (!feed) {
    return <h2>Feed Not Found</h2>;
  }

  return (
    <div style={styles.container}>
      <header style={styles.header}>
        <h1>{feed.title}</h1>
      </header>
      <main style={styles.main}>
        <p>{feed.detail}</p>
      </main>
    </div>
  );
};

const styles = {
  container: {
    fontFamily: 'Arial, sans-serif',
    padding: '2rem',
  },
  header: {
    textAlign: 'center',
    backgroundColor: '#2f4f4f',
    color: '#f4f7f5',
    padding: '1rem',
    borderRadius: '8px',
  },
  main: {
    marginTop: '2rem',
    backgroundColor: '#fff',
    padding: '2rem',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
  },
};

export default FeedDetail;
