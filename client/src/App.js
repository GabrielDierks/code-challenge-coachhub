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
    setTitle(event.target.value)
    setVisible(true)
  }

  let changeText = event => {
    setText(event.target.value)
  }

  let handleSubmit = event => {
    setLoading(true)
    event.preventDefault()
    if (title) {
      const newTodo = {
        name: title,
        description: text,
        checked: false
      }

      axios.post("api/todos", newTodo).catch(err => console.log(err))
      getPosts()
      setVisible(false)
      setTitle("")
      setText("")
      setLoading(false)
    }
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
          maxLength="22"
        />
        <Button color="green" type="submit" />
        <Input
          type="text"
          name="desc"
          value={text}
          visible={showDesc}
          onChange={changeText}
          placeholder="add a description"
          maxLength="180"
        />
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
