import React from 'react'

const Footer = ({activeTask, finishedTask}) => (
  <footer className="footer">
    <div className="content">
      <p className="item">Active tasks: {activeTask}</p>
      <p className="item">Finished tasks: {finishedTask}</p>
    </div>
    <p className="title">Kanban board by Veronika, 2020 </p>
  </footer>
)

export default Footer