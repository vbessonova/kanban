import React from 'react'
import ShowTask from '../ShowTask/ShowTask'
import AddCard from '../AddCard/AddCard'
import { NavLink } from 'react-router-dom';
import Dropdown from "../Dropdown/Dropdown";

const List = ({
    arrayCurrent,
    isShowForm,
    onClickForm,
    onSubmitValueInInput,
    valueInInput,
    onChangeInput,
    onBlurInput,
    addClassNameForInput,
    autoFocusInput,
    addClassNameLabel,
    onClickButton,
    isShowBtnBlock,
    disabled,
    isShowDropdown,
    arrayValueSelection,
    onSelectedTask
}) => {
  const currentUrl = arrayCurrent["title"].toLowerCase()
  return (
    <div>
      <div className="small-board">
        <NavLink to={`/${currentUrl}`} className="link">
          <p className="title">{arrayCurrent["title"]}</p>
        </NavLink>
        <div className="content">
          {arrayCurrent["task"].length > 0 && arrayCurrent["task"].map(item => (
            <ShowTask
              key={item.id}
              taskName={item.taskName}
            />
          ))}
          <AddCard
            isShowForm={isShowForm}
            onClickForm={onClickForm}
            onSubmitValueInInput={onSubmitValueInInput}
            valueInInput={valueInInput}
            onChangeInput={onChangeInput}
            onBlurInput={onBlurInput}
            addClassNameForInput={addClassNameForInput}
            autoFocusInput={autoFocusInput}
            addClassNameLabel={addClassNameLabel}
            onClickButton={onClickButton}
            isShowBtnBlock={isShowBtnBlock}
            disabled={disabled}
          />
        </div>
      </div>
      {isShowDropdown &&
        <Dropdown
          arrayValueSelection={arrayValueSelection && arrayValueSelection["task"]}
          onSelectedTask={onSelectedTask}
        />
      }
    </div>
  )
}

export default List