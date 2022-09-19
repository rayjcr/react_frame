import React, { memo } from 'react'
import { Outlet, useLocation, useOutlet } from 'react-router-dom';
import Header from './header';
import SideMenu from './sideMenu';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import css from './index.module.scss';

const Layout = memo(() => {

  const location = useLocation();
  const outlet = useOutlet();
  // console.log(location, 'location')

  return (
    <div className={css.layout}>
      <Header />
      <div className={css.layoutBody}>
        <SideMenu />
        <div className={css.pageBody}>
          <TransitionGroup>
            <CSSTransition
              key={location.key}
              timeout  = {600}
              classNames = 'page'
              unmountOnExit
              appear = {false}
            >
              { outlet }
              {/* <Outlet /> */}
            </CSSTransition>
          </TransitionGroup>
        </div>
      </div>
      
    </div>
  )
})

export default Layout;
