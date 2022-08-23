import React, { useState, createContext, useContext } from "react";
import { Navigate } from "react-router-dom";
import { getToken } from '../api/index';

const AuthContext = createContext();

// 自定义hook, 返回 Context 值, 包括 authed 和 setAuthed 的2个开关
const useAuth = () => {
  const [authed, setAuthed] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const [session, setSession] = useState(window.sessionStorage.getItem('token'));

  return {
    authed,
    async login(params) {
      console.log(params, 'params')
      const { u, p } = params;
      let res = await getToken();
      console.log(res, 'getToken-res')
      // return new Promise((res) => {
      //   setAuthed(true);
      //   res(22);
      // });

      return 233
    },
    logout() {
      return new Promise((res) => {
        setAuthed(false);
        res();
      });
    },
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
  const { authed } = AuthConsumer();
  console.log(authed, 'Authed');
  return authed === true ? (
    children
  ) : (
    <Navigate to='/login' replace />
  )
}

