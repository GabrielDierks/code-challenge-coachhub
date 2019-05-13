import React, { useState, useEffect } from "react"
import axios from "axios"
import moment from "moment"

import "./TodoItem.css"

import { Button } from "../Button/"

let titleItemInput

export const TodoItem = ({ _id, name, description, date, checked }) => {
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
    let curDate = Date.now()
    axios
      .put(`api/todos/${_id}`, { serverCheck, title, desc, curDate })
      .catch(err => console.log(err))
  }

  let handleDelete = () => {
    onDelete(true)
    axios.delete(`api/todos/${_id}`).catch(err => console.log(err))
  }

  let handleDisable = () => {
    onDisable(!disabled)

    let serverCheck = check
    let curDate = Date.now()

    if (!disabled) {
      axios
        .put(`api/todos/${_id}`, { serverCheck, title, desc, curDate })
        .catch(err => console.log(err))
    }
  }

  let formatDate = moment(date).format("MMMM Do YYYY, HH:mm:ss")

  const Item = (
    <>
      <li>
        <label className="container">
          <input type="checkbox" onChange={handleCheck} checked={check} />
          <span className="checkmark" />
        </label>
        {disabled ? (
          <span className="title">{title}</span>
        ) : (
          <textarea
            type="text"
            value={title}
            className="title-edit"
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
        {desc === "" && disabled ? null : disabled ? (
          <span className="text" maxLength="599" onChange={changeText}>
            {desc}
          </span>
        ) : (
          <textarea
            type="text"
            disabled={disabled}
            value={desc}
            className="text-edit"
            maxLength="599"
            onChange={changeText}
          />
        )}
        <span className="text text-date">last updated: {formatDate}</span>
      </li>
    </>
  )
  return remove ? null : Item
}
