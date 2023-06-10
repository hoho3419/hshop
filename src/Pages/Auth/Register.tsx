import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import ProviderAuth, { ImageBox } from ".";
import { motion } from "framer-motion";

const Register = () => {
  const navigate = useNavigate();
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('');

  return (
    <section className='w-full h-auto'>
      <div className='container md:py-10 h-full'>
        <div className='flex justify-center items-center'>
          <ImageBox />
          <div className='w-full md:w-[30rem]'>
            <form className='p-2'>
              <ProviderAuth />
              <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                <p className="text-center text-textColor text-sm font-semibold mx-4 mb-0">
                  OR
                </p>
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                  placeholder="Email address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="mb-6">
                <input
                  type="password"
                  className="form-control block w-full px-4 py-2  text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-orange-600 focus:outline-none"
                  placeholder="Password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
                <motion.p
                  className="cursor-pointer flex items-center justify-center px-7 py-3 bg-gradient-to-br from-orange-400 to-orange-500 text-white font-medium text-sm leading-snug rounded shadow-md hover:bg-orange-600 hover:shadow-lg focus:bg-orange-600 focus:shadow-lg focus:outline-none active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                  whileHover={{ scale: 1.1 }}
                >
                  회원가입
                </motion.p>
                <div className="flex items-center my-4 before:flex-1 before:border-t before:border-gray-300 before:mt-0.5 after:flex-1 after:border-t after:border-gray-300 after:mt-0.5">
                  <p className="text-center text-sm text-textColor font-semibold mx-4 mb-0">
                    계정이 있으신가요?
                  </p>
                </div>
                <Link to={"/login"}>
                  <motion.p
                    whileHover={{ scale: 0.99 }}
                    className="cursor-pointer flex items-center justify-center px-7 py-3 bg-gradient-to-br from-orange-400 to-orange-500 text-white font-medium text-sm leading-snug rounded shadow-md hover:bg-orange-600 hover:shadow-lg focus:bg-orange-600 focus:shadow-lg focus:outline-none active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out w-full"
                  >
                    로그인 하러 가기
                  </motion.p>
                </Link>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;