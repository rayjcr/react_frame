import React, { useState, createContext, useContext, useLayoutEffect } from "react";
import { useDispatch } from "react-redux";
import { Navigate } from "react-router-dom";
import { login } from '../api/index';
import { fetchUserInfo, setState } from "../store/appSlice";
import { Skeleton, notification } from "antd";
import store from "../store";

const AuthContext = createContext();

// 自定义hook, 返回 Context 值, 包括 authed 和 setAuthed 的2个开关
const useAuth = () => {
  /**
   * 1. 如果是一般系统可以根据store内userInfo的数据来判断是否处于登陆状态.并无单独设定 authed 开关的必要
   * 2. 但如果系统登陆后需要多个数据源的基础数据才能判断登陆状态，如无开关，需要在登陆验证方法（RequireAuth）中，判断各种基础数据的存在。
   * 3. authed 只需要在 promise.all('基础数据接口')后setState即可。
   */
  const [authed, setAuthed] = useState(false);
  const dispatch = useDispatch();
  // const [userInfo, setUserInfo] = useState(null);
  // const [session, setSession] = useState(window.sessionStorage.getItem('token'));

  return {
    authed,
    async login(params) {
      // console.log(params, 'params')
      let res = await login(params);
      console.log(res, 'getToken-res')

      if(res.data){
        setAuthed(true);
      }
      window.sessionStorage.setItem('userInfo',JSON.stringify(res.data));
      // return new Promise((res) => {
      //   setAuthed(true);
      //   res(22);
      // });
      dispatch(setState({userInfo: res.data}));
      // console.log(userInfo, 'userInfo')
      // return 233
    },
    logout() {
      return new Promise((res) => {
        window.sessionStorage.removeItem('token');
        setAuthed(false);
        res();
      });
    },
    async getUserInfo() {
      console.log('call getUserInfo....');
      let res = await dispatch(fetchUserInfo());
      setAuthed(true);
      return res;
    },
    setMessage(msg) {
      notification.info({
        message: msg,
        description:'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        placement: 'bottomRight',
      })
    }
  };
}

// 将 context 值传递给了 Context Provider, 并返回该组件用于广播 context 值
export function AuthProvider({ children }) {
  const auth = useAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
}

// 返回 context 值
export default function AuthConsumer() {
  return useContext(AuthContext);
}

/**
 * 封装拦截组件，如果已经登陆，返回children组件。
 * 未登陆跳转到登陆页面
 * @example
 * <RequireAuth>
 *   <ComponentNeedAuth />
 * </RequireAuth>
 */
export function RequireAuth({ children }) {
  // const { getUserInfo } = AuthConsumer();
  const [status, setStatus] = useState('pending');
  const { app } = store.getState();
  const { userInfo } = app;
  const dispatch = useDispatch();
  // console.log(userInfo, 'store.getState()');
  // console.log(children, 'children');
  // if(userInfo){
  //   console.log('aaaaa');
  //   return children;
  // } else {
  //   new Promise(async (resolve)=>{

  //     let user_res = await getUserInfo();
  //     console.log(user_res, 'user_res');
  //     if(user_res){
  //       console.log('bbb2bb');
  //       resolve(children)
  //     } else {
  //       resolve(<Navigate to='/login' replace />)
  //     }
  //   })
  //   // console.log(resChild, 'resChild')
  //   // return
  // }

  // console.log('Auth Compontent')

  const renderByStatus = () => {
    switch (status) {
      case 'pending':
        return <Skeleton active />;
      case 'success':
        return children;
        // return <Skeleton active />
      case 'error':
        return <Navigate to='/login' replace />; 
      default:
        return <Skeleton active />;
    }
  }

  useLayoutEffect(() => {
    // console.log(userInfo, '111111111')
    // const getUser = async () => {
    //   let user_res = await getUserInfo();
    //   if(!user_res){
    //     setStatus('error');
    //   }
    // }
    let checkUserInfo = userInfo;
    
    if(checkUserInfo){
      setStatus('success');
    } else if (sessionStorage.getItem('userInfo')) {
      // 这里需要做一个userInfo的二次验证过程, 验证通过在调用 setState
      dispatch(setState({userInfo: JSON.parse(sessionStorage.getItem('userInfo'))}));
      setStatus('success');
    } else {
      window.location.href = '/login';
    }
  }, [dispatch, userInfo])
  
  return renderByStatus();
  // 给一次机会获取session中的token，再进行登陆状态的维持
  // if(!authed){
  //   new Promise(async (res)=>{
  //     await getUserInfo();
  //     if(authed){
  //       return children
  //     } else {
  //       <Navigate to='/login' replace />
  //     }
  //   })
  // } else {
  //   return children
  // }


  // return authed === true ? (
  //   children
  // ) : (
  //   <Navigate to='/login' replace />
  // )
}
