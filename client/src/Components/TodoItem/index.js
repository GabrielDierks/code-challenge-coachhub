import React from "react"
import "./TodoItem.css"

import { Button } from "../Button/"

export const TodoItem = ({ name }) => {
  return (
    <li>
      <label className="container">
        <input type="checkbox" />
        <span className="checkmark" />
      </label>
      <input type="text" value={name} className="text" />
      <Button color="red" />
    </li>
  )
}
