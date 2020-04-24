import React from 'react'
import List from '../List/List';

const BoardBlock = ({
  arrBacklog,
  onSubmitValueInInputArrBacklog,
  valueArrBacklog,
  onChangeInputArrBacklog,
  onBlurInputArrBacklog,
  onClickButtonArrBacklog,
  arrReady,
  onClickFormArrReady,
  onSubmitValueInInputArrReady,
  onChangeInputArrReady,
  onClickButtonArrReady,
  onSelectedTaskArrReady,
  arrProgress,
  onClickFormArrProgress,
  onSubmitValueInInputArrProgress,
  onChangeInputArrProgress,
  onClickButtonArrProgress,
  onSelectedTaskArrProgress,
  arrFinished,
  onClickFormArrFinished,
  onSubmitValueInInputArrFinished,
  onChangeInputArrFinished,
  onClickButtonArrFinished,
  onSelectedTaskArrFinished,
}) => (
  <div className="block">
    <List
      arrayCurrent={arrBacklog}
      isShowForm={arrBacklog["isAddCard"]}
      onSubmitValueInInput={onSubmitValueInInputArrBacklog}
      valueInInput={valueArrBacklog}
      onChangeInput={onChangeInputArrBacklog}
      onBlurInput={onBlurInputArrBacklog}
      addClassNameForInput="input-with-line-inside"
      autoFocusInput={arrBacklog["isFocused"]}
      key={arrBacklog["isFocused"]}
      onClickButton={onClickButtonArrBacklog}
      isShowBtnBlock={arrBacklog["isShowBtn"]}
    />
    <List
      arrayCurrent={arrReady}
      isShowForm={arrReady["isShowForm"]}
      onClickForm={onClickFormArrReady}
      onSubmitValueInInput={onSubmitValueInInputArrReady}
      valueInInput='Task from Backlog'
      onChangeInput={onChangeInputArrReady}
      addClassNameForInput="input-dropdown"
      autoFocusInput={false}
      addClassNameLabel="active"
      onClickButton={onClickButtonArrReady}
      isShowBtnBlock={arrReady["isShowBtn"]}
      disabled={arrBacklog["task"].length === 0}
      isShowDropdown={arrReady["isShowDropdown"]}
      arrayValueSelection={arrBacklog}
      onSelectedTask={onSelectedTaskArrReady}
    />
    <List
      arrayCurrent={arrProgress}
      isShowForm={arrProgress["isShowForm"]}
      onClickForm={onClickFormArrProgress}
      onSubmitValueInInput={onSubmitValueInInputArrProgress}
      valueInInput='Task from Ready'
      onChangeInput={onChangeInputArrProgress}
      addClassNameForInput="input-dropdown"
      autoFocusInput={false}
      addClassNameLabel="active"
      onClickButton={onClickButtonArrProgress}
      isShowBtnBlock={arrProgress["isShowBtn"]}
      disabled={arrReady["task"].length === 0}
      isShowDropdown={arrProgress["isShowDropdown"]}
      arrayValueSelection={arrReady}
      onSelectedTask={onSelectedTaskArrProgress}
    />
    <List
      arrayCurrent={arrFinished}
      isShowForm={arrFinished["isShowForm"]}
      onClickForm={onClickFormArrFinished}
      onSubmitValueInInput={onSubmitValueInInputArrFinished}
      valueInInput='Task from In Progress'
      onChangeInput={onChangeInputArrFinished}
      addClassNameForInput="input-dropdown"
      autoFocusInput={false}
      addClassNameLabel="active"
      onClickButton={onClickButtonArrFinished}
      isShowBtnBlock={arrFinished["isShowBtn"]}
      disabled={arrProgress["task"].length === 0}
      isShowDropdown={arrFinished["isShowDropdown"]}
      arrayValueSelection={arrProgress}
      onSelectedTask={onSelectedTaskArrFinished}
    />
  </div>
)


export default BoardBlock