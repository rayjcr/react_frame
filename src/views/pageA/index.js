import React from 'react'
import { useNavigate } from 'react-router-dom'

const PageA = () => {

  const navigate = useNavigate();

  const jump = () => {
    navigate('/home')
  }

  return (
    <div>PageA <button onClick={()=>jump()}>go to home page</button></div>
  )
}

export default PageA;
