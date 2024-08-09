import React, { useEffect } from 'react';

const Dashboard = () => {
  useEffect(() => {
    if (!localStorage.getItem('LinkTreeToken')) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <section className="main flex justify-center">
      <h1 className='text-white bg-gray-700 rounded-md'>Dashboard</h1>
    </section>
  );
};

export default Dashboard;
