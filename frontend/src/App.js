import React from 'react'
import Heather from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify' 
import 'react-toastify/dist/ReactToastify.css' 



const App = () => {
  return (
    <>
    <Heather/>
    <main className="py-3">
    <Container>
      <Outlet/>
    </Container>
    </main>
    <Footer/>
    <ToastContainer />
    </>
  )
}

export default App