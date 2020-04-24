import React from 'react'

const Dropdown = ({arrayValueSelection, onSelectedTask, creatClassName}) => {
  return (
    <>
      {arrayValueSelection ? ( arrayValueSelection.length > 0 ?
        (<ul className={`dropdown ${creatClassName ? creatClassName : ''}`}>
          {arrayValueSelection.map(item =>
            <li className={`dropdown__title ${creatClassName ? creatClassName : ''}`} key={item.id} onClick={() => onSelectedTask(item.id, item.registrationTimeTask)}>
              {item.taskName}
            </li>)
          }
        </ul>) : null
        ) : null}
    </>
  )
}

export default Dropdown