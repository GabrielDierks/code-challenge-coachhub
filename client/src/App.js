import React from "react"
import "./App.css"

import { Button } from "./Components/Button/"
import { Input } from "./Components/Input/"
import { TodoItem } from "./Components/TodoItem"

const item = [
  { id: "1", name: "todo1", description: "description 1" },
  { id: "2", name: "todo2", description: "description 2" }
]

const App = () => (
  <div className="App">
    <h1> Code Challange Coachhub.io</h1>
    <form>
      <Input type="text" />
      <Button color="green" type="submit" />
      <Input type="text" name="desc" />
    </form>
    <ul>
      {item.map(item => (
        <TodoItem key={item.id} {...item} />
      ))}
    </ul>
  </div>
)

export default App
