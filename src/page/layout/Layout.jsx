import React from 'react'
import Header from '../../components/header/Header'
import { Outlet } from 'react-router-dom'

function Layout() {
  return (
    <>
    <Header />
    <main className='pt-[100px] bg-amber-50'>
        <Outlet/>
    </main>
    </>
  )
}

export default Layout