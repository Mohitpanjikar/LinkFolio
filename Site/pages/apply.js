import React from "react";
import styles from "../styles/apply.module.css";

const Apply = () => {
  return (
    <>
      <section
        className={`${styles.background} min-h-screen flex justify-center items-center`}
      >
        <div className="max-w-4xl w-full px-4">
          <div className="main">
            <div className="content bg-white p-8 rounded-lg shadow-lg">
              <h1 className="text-2xl font-bold text-center mb-8">
                Join the top 1% creators
              </h1>
              <p className="text-center">Create LinkTree for Brand</p>
              <form className="flex flex-col gap-4">
                <div className="flex items-center gap-2">
                  <img className="w-6 mr-2" src="/svg/ig.svg" alt="" />
                  <input
                    className="shadow-md border-2 px-3 py-2 rounded-md focus:outline-none"
                    type="text"
                    placeholder="Social Handle"
                  />
                </div>

                <input
                  className="shadow-md border-2 px-3 py-2 rounded-md focus:outline-none"
                  type="email"
                  placeholder="Enter your email"
                />

                <input
                  className="shadow-md border-2 px-3 py-2 rounded-md focus:outline-none"
                  type="password"
                  placeholder="Enter your password"
                />
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Apply;
