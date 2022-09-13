import React from 'react';
import Auth from '../../router/Auth';
// import { getToken } from '../../api/index';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = Auth();
  const navigate = useNavigate();
  
  // console.log(Auth(), 'Auth()');

  const jump = async () => {
    await login({
      email: "cui.jiang@citcon.cn",
      password: "Citcon@123"
    });
    // console.log(res, 'login---res');
    navigate('/home')
  }

  return (
    <div>Login page
      <button onClick={()=>jump()}>Login and goto Home</button>
    </div>
  )
}
