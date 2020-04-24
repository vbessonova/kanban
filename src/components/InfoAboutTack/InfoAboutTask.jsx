import React from 'react'
import ShowTask from '../ShowTask/ShowTask'
import {NavLink} from "react-router-dom";

const InfoAboutTask = ({arrayCurrent}) => (
  <div className="popup">
    <div className="popup__title">
      <p className="name-block">{arrayCurrent.title}</p>
      <NavLink to="/" className="link">
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <line x1="1.35355" y1="0.646447" x2="24.3536" y2="23.6464" stroke="black"/>
          <line y1="-0.5" x2="32.5269" y2="-0.5" transform="matrix(-0.707107 0.707107 0.707107 0.707107 24 1)" stroke="black"/>
        </svg>
      </NavLink>
    </div>
      { arrayCurrent["task"].length > 0 ? (
        <div className="popup__content">
          {arrayCurrent["task"].map(item => (
            <ShowTask
              key={item.id}
              taskName={item.taskName}
              timeCreateTask={item.registrationTimeTask}
              timeChangeTask={item.registrationTimeChangeTask}
              description={item.description}
            />
          ))}
        </div>
      ) : (
        <div className="popup__empty">
          <p>Well done!</p>
          <span role="img" aria-label="ghost"> 👻</span>
        </div>
      )}
  </div>
)

export default InfoAboutTask