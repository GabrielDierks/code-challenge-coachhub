import React, { useState } from "react"
import "./TodoItem.css"

import { Button } from "../Button/"

export const TodoItem = ({ name, description, onDelete, checked }) => {
  let [title, setTitle] = useState(name)
  let [desc, setText] = useState(description)
  let [check, setCheck] = useState(checked)

  let changeTitle = event => {
    setTitle(event.target.value)
  }

  let changeText = event => {
    setText(event.target.value)
  }

  return (
    <>
      <li>
        <label className="container">
          <input
            type="checkbox"
            onChange={() => setCheck(!check)}
            checked={check}
          />
          <span className="checkmark" />
        </label>
        <textarea
          disabled
          type="text"
          value={title}
          className="title"
          maxLength="199"
          onChange={changeTitle}
        />
        <Button color="red" onClick={onDelete} />
        <Button color="blue" onClick={onDelete} />
      </li>
      <textarea
        type="text"
        disabled
        value={desc}
        className="text"
        maxLength="599"
        onChange={changeText}
      />
    </>
  )
}
