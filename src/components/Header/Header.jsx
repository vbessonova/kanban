import React from 'react'
import Login from '../Login/Login'
import { NavLink } from 'react-router-dom'

const Header = ({arrLogin, onClick}) => {
  return (
    <header className="header">
      <NavLink to="/" className="link">
        <h1 className="title">Awesome Kanban Board</h1>
      </NavLink>
      <Login
        onClick={onClick}
        isClicked={arrLogin["isShow"]}
        onSelectedTask={() => console.log('click')}
        arrayValueSelection={arrLogin["issues"]}
      />
    </header>
  )
}

export default Header