import React from "react"
import "./Input.css"

let titleInput

export const Input = ({
  type,
  name,
  value,
  onChange,
  visible,
  placeholder,
  focus,
  maxLength
}) => {
  if (focus) {
    titleInput.focus()
  }

  const textArea = (
    <textarea
      className={`input ${name}`}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      onFocus={event => (event.target.placeholder = "")}
      onBlur={event => (event.target.placeholder = placeholder)}
      ref={input => {
        titleInput = input
      }}
      maxLength={maxLength}
    />
  )
  return visible ? textArea : null
}
