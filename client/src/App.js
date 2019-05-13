import React, { useState, useEffect } from "react"
import axios from "axios"

import "./App.css"
import { Button } from "./Components/Button/"
import { Input } from "./Components/Input/"
import { TodoItem } from "./Components/TodoItem"

const App = () => {
  let [todos, setTodos] = useState([])
  let [title, setTitle] = useState("")
  let [text, setText] = useState("")
  let [showDesc, setVisible] = useState(false)
  let [date, setDate] = useState(Date.now())
  let [loading, setLoading] = useState(false)
  let [focus, onFocus] = useState(false)
  let [error, onError] = useState(null)

  let getTodos = async () => {
    setLoading(true)

    await axios
      .get("api/todos")
      .then(res => setTodos(res.data))
      .catch(err => onError(err))
    await setLoading(false)
  }
  useEffect(() => {
    getTodos()
  }, [])

  let changeTitle = event => {
    onFocus(false)
    setTitle(event.target.value)
    if (event.target.value === "") {
      setVisible(false)
    } else {
      setVisible(true)
    }
  }

  let changeText = event => {
    setText(event.target.value)
  }

  let handleSubmit = event => {
    event.preventDefault()
    if (title) {
      setLoading(true)
      setDate(Date.now())

      const newTodo = {
        name: title,
        description: text,
        date: date,
        checked: false
      }

      axios
        .post("api/todos", newTodo)
        .then(res => setTodos([res.data, ...todos]))
        .then(setLoading(false))
        .catch(err => console.log(err))
      setVisible(false)
      setTitle("")
      setText("")
    } else onFocus(true)
  }

  return (
    <div className="App">
      <h1> Code Challenge Coachhub.io</h1>
      <form onSubmit={handleSubmit}>
        <Input
          type="text"
          value={title}
          visible={true}
          onChange={changeTitle}
          placeholder="add a new Todo"
          maxLength="199"
          focus={focus}
        />
        <Input
          type="text"
          name="desc"
          value={text}
          visible={showDesc}
          onChange={changeText}
          placeholder="add a description"
          maxLength="599"
        />
        <Button color="greenBig" type="submit" />
      </form>
      <ul>
        {loading ? (
          <p>loading ...</p>
        ) : error ? (
          <p style={{ color: "red" }}>
            Error, couldnt connect to the database, please contact an admin.
          </p>
        ) : (
          todos.map(todos => <TodoItem key={todos._id} {...todos} />)
        )}
      </ul>
    </div>
  )
}

export default App
