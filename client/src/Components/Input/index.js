import React from "react"
import "./Input.css"

export const Input = ({ type, name }) => {
  return <input className={`input ${name}`} type={type} />
}
