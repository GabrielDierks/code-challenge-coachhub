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
  let [loading, setLoading] = useState(true)
  let [focus, onFocus] = useState(false)

  let getPosts = () => {
    axios
      .get("api/todos")
      .then(res => setTodos(res.data))
      .then(setLoading(false))
      .catch(err => console.log(err))
  }
  useEffect(() => {
    getPosts()
  }, [])

  let changeTitle = event => {
    onFocus(false)
    setTitle(event.target.value)
    setVisible(true)
  }

  let changeText = event => {
    setText(event.target.value)
  }

  let handleSubmit = event => {
    event.preventDefault()
    if (title) {
      setLoading(true)

      const newTodo = {
        name: title,
        description: text,
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
      <h1> Code Challange Coachhub.io</h1>
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
          <p>LOADING</p>
        ) : todos.length === 0 ? (
          <p>No Todos yet, add a new one above.</p>
        ) : (
          todos.map(todos => <TodoItem key={todos._id} {...todos} />)
        )}
      </ul>
    </div>
  )
}

export default App
