import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function List() {
  const navigate = useNavigate();

  const jump = () => {
    navigate('/home');
  }

  return (
    <div>List Page
        <button onClick={()=>jump()}>go to Home Page</button>
    </div>
  )
}
