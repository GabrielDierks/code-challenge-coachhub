import React, { useState } from "react"
import axios from "axios"

import "./TodoItem.css"

import { Button } from "../Button/"

export const TodoItem = ({ _id, name, description, checked }) => {
  let [title, setTitle] = useState(name)
  let [desc, setText] = useState(description)
  let [check, setCheck] = useState(checked)
  let [remove, onDelete] = useState(false)

  let changeTitle = event => {
    setTitle(event.target.value)
  }

  let changeText = event => {
    setText(event.target.value)
  }

  let handleCheck = () => {
    setCheck(!check)
    axios.post(`api/todos/${_id}`, { check }).catch(err => console.log(err))
  }

  let handleDelete = () => {
    onDelete(true)
    axios.delete(`api/todos/${_id}`).catch(err => console.log(err))
  }

  const Item = (
    <>
      <li>
        <label className="container">
          <input type="checkbox" onChange={handleCheck} checked={check} />
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
        <Button color="red" onClick={handleDelete} />
        <Button color="blue" />
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
  return remove ? null : Item
}
