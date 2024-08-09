import React, { useState } from "react";
import styles from "../styles/apply.module.css";
import Footer from "../components/Footer";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";

const Apply = () => {
  const router = useRouter();
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const [category, setCategory] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
     
    // Backend call for login
    fetch('http://localhost:8080/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        password
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          toast('You are logged in');
          localStorage.setItem('LinkTreeToken', data.token);
          router.push('/dashboard');
          // You can redirect or perform additional actions here if needed
        } else if (data.status === 'not found') {
          toast.error('User not found');
        } else if (data.status === 'error') {
          toast.error(data.error || 'Invalid credentials');
        }
      })
      .catch(err => {
        console.log(err);
        toast.error('An error occurred while logging in');
      })
  }
  return (
    <>
      <section
        className={
          styles.background + " min-h-screen flex justify-center items-center"
        }
      >
        <div className="main">
          <div className="content bg-white border-2 px-4 py-8 rounded-2xl shadow-lg">
            <h1 className="text-2xl font-bold text-center">
            You are among top 1% creators
            </h1>
            <p className="text-center">Access you Dashboard</p>
            <p className="text-center py-5 font-bold text-gray-500">
              Start building your portfolio
            </p>
            <form
              onSubmit={handleLogin}
              className="flex flex-col gap-4 text-lg mt-5"
            >
              <span className="flex flex-row shadow-md border-2 px-3 py-2 rounded-md focus:outline-none">
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="px-3 py-2 rounded-md focus:outline-none"
                type="email"
                placeholder="Enter your email"
                required
              />
              </span>
              <input
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="shadow-md border-2 px-3 py-2 rounded-md focus:outline-none"
                type="password"
                placeholder="Set a password"
                required
              />
              <input
                className="bg-indigo-600 text-white py-2 rounded-lg cursor-pointer"
                type="submit"
                value="Login"
              />
            </form>
          </div>
          <h4 className="text-center text-white pt-3">
           New here ?{" "}
            <Link className="font-bold text-red-400" href="/apply">
            Apply 
            </Link>
          </h4>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default Apply;
