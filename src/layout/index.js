import React, { memo } from 'react'
import { Outlet } from 'react-router-dom';
import Header from './header';
import SideMenu from './sideMenu';
import css from './index.module.scss'

const Layout = memo(() => {
  return (
    <div className={css.layout}>
      <Header />
      <div className={css.layoutBody}>
        <SideMenu />
        <div className={css.pageBody}>
          <Outlet />
        </div>
      </div>
      
    </div>
  )
})

export default Layout;
