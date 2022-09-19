/* eslint-disable */
import React, { memo, useEffect, useState, useCallback, forwardRef } from 'react';
import css from './index.module.scss';
import { routes } from '../router/routes';
import { find } from 'lodash';
import { useLocation, useNavigate } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
// import { } from '../api';
import { addRealPath } from '../utils/tools';
// import QueueAnim from 'rc-queue-anim';


// const Menu = memo(({ itemMenu, clickMenu }) => {
//   return <>
//     <div className={[css.menu, itemMenu.active && css.active].join(' ')} onClick={()=>clickMenu(itemMenu)}>{itemMenu.title}</div>
//     {itemMenu.children && itemMenu.children.map(item => {
//       return itemMenu.open && <Menu key={item.title} clickMenu={clickMenu} itemMenu={item}/>
//     })}
//   </>
// })

const Menu = memo(({ itemMenu, clickMenu }) => {
  return <>
    {itemMenu.isShow && <>
      <div className={[css.menu, itemMenu.active && css.active].join(' ')} onClick={()=>clickMenu(itemMenu)}>{itemMenu.icon} {itemMenu.title}</div>
      {itemMenu.children && itemMenu.children.map(item => {
        return (
          <CSSTransition
            in = {itemMenu.open}
            timeout  = {300}
            classNames = 'fade'
            unmountOnExit
            appear = {true}
            key={item.title}
          >
            <Menu key={item.title} clickMenu={clickMenu} itemMenu={item}/>
          </CSSTransition>
        )
      })}
    </>}
  </>
})

const SideMenu = memo(() => {
  const [menu, setMenu] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  // const addRealPath = useCallback(
  //   (menuList, rootPath) => {
  //     menuList.forEach(item => {
  //       item.realPath = (rootPath ? (rootPath+'/') : rootPath) + item.path;
  //       if(item.children) {
  //         addRealPath(item.children, item.realPath);
  //       }
  //     })
  //     return menuList;
  //   },
  //   [],
  // )
   
  const clickMenu = (itemMenu) => {
    // 如果有子菜单就打开子菜单
    if(itemMenu.children) {
      itemMenu.open = !itemMenu.open;
      setMenu([...menu]);
    } else {
      // 根据真实URL重新定位,展开菜单
      if(location.pathname === ('/' + itemMenu.realPath)){
        return false
      }
      locateMenu(menu, itemMenu.realPath);
      setMenu([...menu])
      navigate(itemMenu.realPath)
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
        // 如果目标路由状态是 isShow=false，则跳转到404
        if(!curMenu.isShow){
          navigate('/404',{
            replace: true,
          })
        }
        if(curMenu){
          if(curMenu.children){
            curMenu.open = true;
            curMenu = curMenu.children
          } else {
            curMenu.active = true;
          }
        }
      }
    }
    return [...menuList]
  }

  /**
   * 获取用户角色保存在数据库中的权限菜单
   */
  const getPermissionMenu = async () => {
    // 获取完整的路由菜单
    let rootMenu = find(routes,{'rootMenu':true}).children;
    // 获取数据库中的权限菜单 ！！（这里可以替换成接口获取并非从浏览器缓存中获取）
    let permissionList = sessionStorage.getItem('permissionMenu') || [];
    let permissionMenu = CreatePermissionMenu(rootMenu, permissionList);
    return permissionMenu;
  }

  /**
   * 递归给不在权限里的菜单打上isShow=false,其他为true
   */
  const CreatePermissionMenu = (menuList, permissionList) => {
    menuList.forEach((item)=>{
      if(permissionList.includes(item.key) || permissionList.length===0){
        item.isShow = true
        if(item.children){
          CreatePermissionMenu(item.children, permissionList);
        }
      } else {
        item.isShow = false
      }
    })
    return menuList
  }


  const setRealMenu = async () => {
    let permissionMenuList = await getPermissionMenu();
    // 约定菜单以属性 'rootMenu:true' 为标识.它的children为一级菜单
    let realMenu = addRealPath(permissionMenuList, '');
    setMenu(locateMenu(realMenu, location.pathname));
  }

  useEffect(() => {
    setRealMenu();
  }, [addRealPath, location.pathname])
  

  return (
    <div className={css.sideMenu}>
      <TransitionGroup>
        {menu.map(item => {
          return <Menu key={item.title} clickMenu={clickMenu} itemMenu={item} />
        })}
      </TransitionGroup>
    </div>
  )
})

export default SideMenu
