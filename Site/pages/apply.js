import React, { useState } from "react";
import styles from "../styles/apply.module.css";
import { toast } from "react-toastify";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";
 
const Apply = () => {
  const router = useRouter();
  const [handle, setHandle] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [category, setCategory] = useState(""); 
  const [submitted, setSubmitted] = useState(false);
 
  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };
 
  const handleRegister = (e) => {
    e.preventDefault();
    if (!category) return toast.error("Add a category");
    // backend part
    fetch('http://localhost:8080/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        handle,
        email,
        password,
        category
      })
    })
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          toast("You are registered successfully");
          localStorage.setItem('LinkTreeToken', data.token);
          setSubmitted(true);
          router.push('/login');
        } else {
          toast(data.message);
        }
      })
      .catch(err => {
        console.error('Registration error:', err);
        toast("Try a different username");
      })
  };
  return (
    <>
      <Head>
        <title>Join LinkFolio - Create Your Digital Portfolio</title>
        <meta name="description" content="Register for LinkFolio and start showcasing your content, links, and social media in one beautiful page." />
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
                Create Your LinkFolio
              </h1>
              <p className="text-gray-600 mt-2">Build your digital identity in one place</p>
              <div className="h-1 w-16 bg-black mx-auto my-4"></div>
            </div>
            
            <form
              onSubmit={handleRegister}
              className="space-y-4"
            >
              <div className="space-y-4">
                <div>
                  <label htmlFor="handle" className="block text-sm font-medium text-gray-700 mb-1">Your Username</label>
                  <span className="flex flex-row items-center shadow-md border border-gray-200 px-3 py-2 rounded-lg focus-within:border-gray-400 focus-within:ring-2 focus-within:ring-gray-100 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                    <input
                      id="handle"
                      value={handle}
                      onChange={(e) => setHandle(e.target.value)}
                      className="focus:outline-none w-full bg-transparent"
                      type="text"
                      placeholder="Your unique handle"
                      required
                    />
                  </span>
                </div>

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
                      placeholder="Your email address"
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
                      placeholder="Choose a secure password"
                      required
                    />
                  </span>
                </div>
              </div>
 
              <div className="mt-4">
                <p className="text-sm font-medium text-gray-700 mb-2">What describes you best?</p>
                <div className="grid grid-cols-3 gap-2">
                  <label className={`flex items-center justify-center px-2 py-2 border rounded-md cursor-pointer transition-all ${category === "Creator" ? "bg-gray-900 border-gray-900 text-white" : "hover:bg-gray-100 border-gray-200"}`}>
                    <input
                      type="checkbox"
                      className="sr-only"
                      value="Creator"
                      checked={category === "Creator"}
                      onChange={handleCategoryChange}
                    />
                    <span className="text-sm">Creator</span>
                  </label>
                  <label className={`flex items-center justify-center px-2 py-2 border rounded-md cursor-pointer transition-all ${category === "Agency" ? "bg-gray-900 border-gray-900 text-white" : "hover:bg-gray-100 border-gray-200"}`}>
                    <input
                      type="checkbox"
                      className="sr-only"
                      value="Agency"
                      checked={category === "Agency"}
                      onChange={handleCategoryChange}
                    />
                    <span className="text-sm">Agency</span>
                  </label>
                  <label className={`flex items-center justify-center px-2 py-2 border rounded-md cursor-pointer transition-all ${category === "Brand" ? "bg-gray-900 border-gray-900 text-white" : "hover:bg-gray-100 border-gray-200"}`}>
                    <input
                      type="checkbox"
                      className="sr-only"
                      value="Brand"
                      checked={category === "Brand"}
                      onChange={handleCategoryChange}
                    />
                    <span className="text-sm">Brand</span>
                  </label>
                </div>
              </div>
              
              <button
                className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 mt-6"
                type="submit"
              >
                Create My LinkFolio
              </button>
            </form>
          </div>
          <div className="text-center text-white pt-5">
            <p className="drop-shadow-md">
              Already have an account?{" "}
              <Link className="font-bold text-white hover:text-gray-200 transition-colors" href="/login">
                Login
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
};
 
export default Apply;