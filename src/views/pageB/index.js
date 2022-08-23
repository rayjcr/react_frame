import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageB = () => {

  const navigate = useNavigate();

  const jump = () => {
    navigate('/a')
  }

  return (
    <div>PageB <button onClick={()=>jump()}>go pageA</button></div>
  )
}

export default PageB;