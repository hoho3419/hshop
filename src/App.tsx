import React from 'react';
import {
  Home,
  About,
  Login,
  Menu,
  Profile,
  Services,
  Signup
} from './Pages';
import { Header } from './components'
import { AnimatePresence } from 'framer-motion';
import { ToastContainer } from 'react-toastify'
import { Routes,Route } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid';

function App() {
  return (
    <AnimatePresence 
    >
     <ToastContainer key={uuidv4()}/>
     {/* 오른쪽 카트와 왼쪽 메세지 해야함 */}
     <div className='w-screen h-auto min-h-[100vh] flex flex-col bg-primary'>
      <Header />
      <main
        className="mt-16 md:mt-16 px-3 md:px-8 md:py-6 py-4"
      >
        <Routes>
          <Route path='/*' element={<Home />}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Signup/>}/>
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/menu' element={<Menu/>}/>
          <Route path='/services' element={<Services/>}/>
        </Routes>
      </main>
     </div>
    </AnimatePresence>
  );
}

export default App;
