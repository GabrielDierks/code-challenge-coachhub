import React from "react"
import "./Button.css"

export const Button = ({ color, clickon, children }) => {
  return (
    <button className={color} onClick={clickon}>
      {children}
    </button>
  )
}
