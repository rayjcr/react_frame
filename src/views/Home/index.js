import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate();

  const jump = () => {
    navigate('/list');
  }

  return (
    <div>Home Page
        <button onClick={()=>jump()}>go to List Page</button>
    </div>
  )
}
