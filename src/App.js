import React, {useEffect, useState } from 'react'
import './App.css'
import axios from 'axios'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Sign from './components/Sign'
import { useSelector } from 'react-redux'
import Header from './components/Header'
import useRefreshUser from './components/useRefreshUser'
import Bookmarked from './components/Bookmarked'
import Tv from './components/Tv'
import SelctedMovie from './components/SelctedMovie'
// import lottie from 'lottie-web';
// import { defineElement } from 'lord-icon-element';

// defineElement(lottie.loadAnimation);


const App = () => {
  const user = useSelector(state => state.Auth.User)
const [refresh] = useRefreshUser()


  const CheckAuth = ({ children }) => {
    if (user == '') {
      return <Navigate to='/sign' />
    } else {
      return children
    }
  }
  const CheckNotAuth = ({ children }) => {
    if (user != '') {
      return <Navigate to='/' />
    } else {
      return (children)
    }
  }

  useEffect(() => {
    if (user !== '') {
      refresh()
    }
    
  }, []);


  return (
    <div className='flex sm:flex-row  flex-col   dark'>
      <BrowserRouter>
        {user !== '' && <Header />}
        <Routes>
          <Route path='/' element={<CheckAuth><Home /></CheckAuth>} />
          <Route path='/bookmarked' element={<CheckAuth><Bookmarked /></CheckAuth>} />
          <Route path='/discover_tv' element={<CheckAuth><Tv /></CheckAuth>} />
          <Route path='/selected_movie' element={<CheckAuth><SelctedMovie /></CheckAuth>} />
          <Route path='/sign' element={<CheckNotAuth><Sign /></CheckNotAuth>} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App