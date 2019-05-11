import React from "react"
import "./Input.css"

export const Input = ({
  type,
  name,
  value,
  onChange,
  visible,
  placeholder,
  ref,
  maxLength
}) =>
  visible ? (
    <textarea
      className={`input ${name}`}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      ref={ref}
      maxLength={maxLength}
    />
  ) : null
