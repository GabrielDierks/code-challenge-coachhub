import React from "react"
import "./Button.css"

export const Button = ({ color, onClick, children }) => {
  return (
    <button className={color} onClick={onClick}>
      {children}
    </button>
  )
}
