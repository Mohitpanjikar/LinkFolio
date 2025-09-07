import React, { useState } from "react";
import styles from "../styles/apply.module.css";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
import { API_ENDPOINTS } from "../utils/apiConfig";

const Login = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");  
  const [submitted, setSubmitted] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
     
    // Backend call for login
    fetch(API_ENDPOINTS.login, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email: email.toLowerCase().trim(),
        password
      })
    })
      .then(res => res.json())
      .then(data => {
        console.log('Login response:', data); // Debug log
        if (data.status === 'success') {
          toast.success('You are logged in');
          localStorage.setItem('LinkTreeToken', data.token);
          // Force navigation with a small delay to ensure storage is set
          setTimeout(() => {
            router.push('/dashboard');
          }, 100);
        } else if (data.status === 'not found') {
          toast.error('User not found');
        } else if (data.status === 'error') {
          toast.error(data.error || 'Invalid credentials');
        } else {
          toast.error('Login failed. Please try again.');
        }
      })
      .catch(err => {
        console.error('Login error:', err);
        toast.error('An error occurred while logging in');
      })
  }
  return (
    <>
      <Head>
        <title>Login to LinkFolio - Access Your Dashboard</title>
        <meta name="description" content="Login to your LinkFolio account to manage your links, profile, and social media connections." />
      </Head>
      <section
        className={
          styles.background + " min-h-screen flex justify-center items-center"
        }
      >
        <div className="relative z-10 w-full max-w-md mx-auto px-4 py-10 sm:px-0">
          <div className="card p-6 sm:p-8 bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-xl">
            <div className="text-center mb-6">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 font-heading">
                Welcome Back
              </h1>
              <p className="text-gray-600 mt-2">Access your LinkFolio dashboard</p>
              <div className="h-1 w-16 bg-black mx-auto my-4"></div>
            </div>
            
            <form
              onSubmit={handleLogin}
              className="space-y-4"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <span className="flex flex-row items-center shadow-md border border-gray-200 px-3 py-2 rounded-lg focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-100 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <input
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="focus:outline-none w-full bg-transparent"
                      type="email"
                      placeholder="Enter your email"
                      required
                    />
                  </span>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
                  <span className="flex flex-row items-center shadow-md border border-gray-200 px-3 py-2 rounded-lg focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-100 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                    </svg>
                    <input
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="focus:outline-none w-full bg-transparent"
                      type="password"
                      placeholder="Enter your password"
                      required
                    />
                  </span>
                </div>
              </div>
              
              <button
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-6"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
          <div className="text-center text-white pt-5">
            <p className="drop-shadow-md">
              Don't have an account?{" "}
              <Link className="font-bold text-white hover:text-gray-200 transition-colors" href="/apply">
                Apply Now
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
