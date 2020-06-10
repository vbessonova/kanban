import React from 'react'
import Button from '../Button/Button'

const AddCard = ({
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
  }) => (
    <>
      {console.log('test', '7test', '88987', 999999, 899)}
      {isShowForm ?
        <form onSubmit={onSubmitValueInInput} className="form" onClick={onClickForm}>
          <input
            type="text"
            value={valueInInput}
            onChange={onChangeInput}
            autoFocus={autoFocusInput}
            onBlur={onBlurInput}
            className={`form__input ${addClassNameForInput ? addClassNameForInput : ''}`}
            required
          />
          {isShowDropdown ? <label className={`form__label ${addClassNameLabel  ? addClassNameLabel : 'hide'}`}>&#8743;</label>:<label className={`form__label ${addClassNameLabel  ? addClassNameLabel : 'hide'}`}>&#8744;</label>}
        </form>
        : null
      }
      {isShowBtnBlock ? (
           <Button
             onClick={onClickButton}
             nameButton="Add card"
             disabled={disabled}
           />
      ): null
      }
    </>
)

export default AddCard