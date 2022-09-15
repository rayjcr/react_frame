import React from 'react';
import { useNavigate } from 'react-router-dom';

const PageC = () => {

  const navigate = useNavigate();

  const jump = () => {
    navigate('/home/home_a')
  }

  return (
    <div>PageC <button onClick={()=>jump()}>go pageA</button></div>
  )
}

export default PageC;