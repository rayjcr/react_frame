import React from 'react';
import Auth from '../../router/Auth';
import { getToken } from '../../api/index';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login, logout } = Auth();
  const navigate = useNavigate();
  
  // console.log(Auth(), 'Auth()');

  const jump = async () => {
    let res = await login({u:'abc', p:'123'});
    // console.log(res, 'login---res');
    navigate('/home')
  }

  return (
    <div>Login page
      <button onClick={()=>jump()}>go to home page2</button>
    </div>
  )
}
