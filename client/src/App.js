import React, { useState } from "react"
import "./App.css"

import { Button } from "./Components/Button/"
import { Input } from "./Components/Input/"
import { TodoItem } from "./Components/TodoItem"

const item = [
  { id: 1, name: "todo1", description: "description 1", checked: false },
  { id: 2, name: "todo2", description: "description 2", checked: false }
]

const App = () => {
  let [title, setTitle] = useState("")
  let [text, setText] = useState("")
  let [showDesc, setVisible] = useState(false)

  let changeTitle = event => {
    setTitle(event.target.value)
    setVisible(true)
  }

  let changeText = event => {
    setText(event.target.value)
  }

  let handleRemove = () => {
    item.splice(0, 1)
    console.log({ item })
  }

  let handleSubmit = event => {
    event.preventDefault()
    if (title) {
      item.reverse()
      item.push({
        id: item.length + 1,
        name: title,
        description: text,
        checked: false
      })
      item.reverse()

      console.log({ item })
      setVisible(false)
      setTitle("")
      setText("")
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
          placeholder="Description"
          maxLength="180"
        />
      </form>
      <ul>
        {item.map(item => (
          <TodoItem onDelete={handleRemove} key={item.id} {...item} />
        ))}
      </ul>
    </div>
  )
}

export default App
