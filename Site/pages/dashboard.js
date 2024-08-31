import React, { useEffect, useState } from 'react';
import Linkbox from '@/components/Linkbox';
import UserHeader from '@/components/userHeader';
import { toast } from 'react-toastify';

const Dashboard = () => {
  const [data, setData] = useState({});

  useEffect(() => {
    const token = localStorage.getItem('LinkTreeToken');
    if (!token) {
      window.location.href = "/login";
    } else {
      fetch('https://localhost:8080/data/dashboard', {
        method: 'POST',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify({ tokenMail: token })
      }).then(res => res.json())
        .then(data => {
          if (data.status === 'error') return toast.error('Error Happened');
          setData(data.userData);
          localStorage.setItem('userHandle', data.userData.handle);
          toast.success(data.message);
        }).catch(err => {
          console.log(err);
        });
    }
  }, []);

  return (
    <div>
      <UserHeader data={data} />
      <main>
        <section className='grid md:grid-cols-2 xl:grid-cols-4 gap-5'>
          <Linkbox lbTitle="Links" lbNumber={data.links || "N/A"} lbSvg="url" lbTheme="red" />
          <Linkbox lbTitle="Growth" lbNumber="30%" lbSvg="growth" lbTheme="red" />
          <Linkbox lbTitle="Links" lbNumber="12" lbSvg="growth" lbTheme="red" />
          <Linkbox lbTitle="Growth" lbNumber="30%" lbSvg="ig" lbTheme="red" />
        </section>
        <section>
          {/* Additional content goes here */}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;
