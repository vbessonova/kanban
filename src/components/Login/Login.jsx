import React from 'react'
import svgUserAvatar from '../../icon/user-avatar.svg'
import svgArrowDown from '../../icon/arrow-down.svg'
import svgArrowUp from '../../icon/arrow-up.svg'
import Dropdown from '../Dropdown/Dropdown'

const Login = ({isClicked, arrayValueSelection, onSelectedTask, onClick}) => (
  <div className="login">
    <div className="icon" onClick={onClick}>
      <img src={svgUserAvatar} alt="User avatar"/>
      {isClicked ? <img src={svgArrowDown} alt="Arrow down"/> : <img src={svgArrowUp} alt="Arrow down"/>}
    </div>
    {isClicked &&
      <>
        <div className="login__square"/>
        <Dropdown
          arrayValueSelection={arrayValueSelection}
          onSelectedTask={onSelectedTask}
        />
      </>
    }
  </div>
)

export default Login