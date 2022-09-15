/* eslint-disable */
import React, { memo, useEffect, useState, useCallback } from 'react';
import css from './index.module.scss';
import { routes } from '../router/routes';
import { find } from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';
import { Transition } from 'react-transition-group';

const duration = 300;
const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}
const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

const Menu = memo(({ itemMenu, clickMenu }) => {
  const [inProp, setInProp] = useState(false);
  const delay = () => {
    setTimeout(() => {
      !inProp && setInProp(!inProp)
    }, 2000)
  }
  return <>
    <div className={[css.menu, itemMenu.active && css.active].join(' ')} onClick={()=>clickMenu(itemMenu)}>{itemMenu.title}</div>
    {itemMenu.children && itemMenu.children.map(item => {
      return itemMenu.open && <Menu key={item.title} clickMenu={clickMenu} itemMenu={item}/>
    })}
  </>
})

const SideMenu = memo(() => {
  const [menu, setMenu] = useState([]);
  const naNavigate = useNavigate();
  const location = useLocation();

  const addRealPath = useCallback(
    (menuList, rootPath) => {
      menuList.forEach(item => {
        item.realPath = (rootPath ? (rootPath+'/') : rootPath) + item.path;
        if(item.children) {
          addRealPath(item.children, item.realPath);
        }
      })
      return menuList;
    },
    [],
  )
   
  const clickMenu = (itemMenu) => {
    // 如果有子菜单就打开子菜单
    if(itemMenu.children) {
      itemMenu.open = !itemMenu.open;
      setMenu([...menu]);
    } else {
      // 根据真实URL重新定位,展开菜单
      locateMenu(menu, itemMenu.realPath);
      setMenu([...menu])
      naNavigate(itemMenu.realPath)
    }
  }

  /**
   * 清空所有open 和 active
   */
  const clearMenuStatus = (menu) => {
    for(let i=0;i<menu.length;i++) {
      if(menu[i].children){
        // 是否主动关注子菜单 (手风琴效果)
        // menu[i].open = false;
        clearMenuStatus(menu[i].children);
      }else{
        menu[i].active = false;
      }
    }
  }

  /**
   * 菜单定位到当前path (提供刷新用，页面跳转等定位状态)
   */
  const locateMenu = (menuList, curPath) => {
    // 清除所有菜单状态，
    clearMenuStatus(menu);
    let pathArr = curPath.split('/');
    let curMenu = menuList;
    for(let i=0;i<pathArr.length;i++) {
      if(pathArr[i]){
        curMenu = find(curMenu, {'path':pathArr[i]});
        if(curMenu.children){
          curMenu.open = true;
          curMenu = curMenu.children
        } else {
          curMenu.active = true;
        }
      }
    }
    return [...menuList]
  }

  useEffect(() => {
    // 约定菜单以属性 'rootMenu:true' 为标识.它的children为一级菜单
    let realMenu = addRealPath(find(routes,{'rootMenu':true}).children, '');
    setMenu(locateMenu(realMenu, location.pathname));
  }, [addRealPath, location.pathname])
  

  return (
    <div className={css.sideMenu}>
      {menu.map(item => {
        return <Menu key={item.title} clickMenu={clickMenu} itemMenu={item} />
      })}
    </div>
  )
})

export default SideMenu
