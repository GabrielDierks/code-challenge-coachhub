import React, { useState, useEffect } from "react"
import axios from "axios"

import "./TodoItem.css"

import { Button } from "../Button/"

let titleItemInput

export const TodoItem = ({ _id, name, description, checked }) => {
  let [title, setTitle] = useState(name)
  let [desc, setText] = useState(description)
  let [check, setCheck] = useState(checked)
  let [remove, onDelete] = useState(false)
  let [disabled, onDisable] = useState(true)

  useEffect(() => {
    return () => {
      if (disabled) {
        titleItemInput.focus()
      }
    }
  }, [disabled])

  let changeTitle = event => {
    setTitle(event.target.value)
  }

  let changeText = event => {
    setText(event.target.value)
  }

  let handleCheck = () => {
    setCheck(!check)
    let serverCheck = !check
    axios
      .put(`api/todos/${_id}`, { serverCheck, title, desc })
      .catch(err => console.log(err))
  }

  let handleDelete = () => {
    onDelete(true)
    axios.delete(`api/todos/${_id}`).catch(err => console.log(err))
  }

  let handleDisable = () => {
    onDisable(!disabled)
    let serverCheck = check

    if (!disabled) {
      axios
        .put(`api/todos/${_id}`, { serverCheck, title, desc })
        .catch(err => console.log(err))
    }
  }

  const Item = (
    <>
      <li>
        <label className="container">
          <input type="checkbox" onChange={handleCheck} checked={check} />
          <span className="checkmark" />
        </label>
        {disabled ? (
          <textarea type="text" value={title} disabled className="title" />
        ) : (
          <textarea
            type="text"
            value={title}
            className="title"
            maxLength="199"
            autoFocus
            onChange={changeTitle}
            ref={input => {
              titleItemInput = input
            }}
          />
        )}

        <Button color="red" onClick={handleDelete} />
        {disabled ? (
          <Button color="blue" onClick={handleDisable} />
        ) : (
          <Button color="green" onClick={handleDisable} />
        )}
      </li>
      <textarea
        type="text"
        disabled={disabled}
        value={desc}
        className="text"
        maxLength="599"
        onChange={changeText}
      />
    </>
  )
  return remove ? null : Item
}
