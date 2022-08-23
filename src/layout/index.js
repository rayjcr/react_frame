import React, { memo } from 'react'
import { Outlet } from 'react-router-dom';

const Layout = memo(() => {
  return (
    <div>
      <div className='header'></div>
      <Outlet />
    </div>
  )
})

export default Layout;
