import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function SideBar() {

  const navigate = useNavigate()

  const logOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div>
      <button className='btn btn-danger' onClick={logOut}>log out</button>
    </div>
  )
}
