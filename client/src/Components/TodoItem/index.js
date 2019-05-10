import React from "react"
import "./TodoItem.css"

import { Button } from "../Button/"

export const TodoItem = ({ name, description }) => {
  return (
    <>
      <li>
        <label className="container">
          <input type="checkbox" />
          <span className="checkmark" />
        </label>
        <input type="text" value={name} className="title" />
        <Button color="red" />
      </li>
      <input type="text" value={description} className="text" />
    </>
  )
}
