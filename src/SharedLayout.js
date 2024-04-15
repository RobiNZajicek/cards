import React from 'react'
import Navbar from './components/Navbar/Navbar'
import { Outlet } from 'react-router-dom'
const SharedLayout = () => {
    return <section>
        <Navbar />
        <Outlet />
        
    </section>
}

export default SharedLayout