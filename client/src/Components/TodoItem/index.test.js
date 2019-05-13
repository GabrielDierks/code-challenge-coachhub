import React from "react"
import Enzyme, { shallow } from "enzyme"
import { TodoItem } from "./index"
import renderer from "react-test-renderer"
import Adapter from "enzyme-adapter-react-16"

Enzyme.configure({ adapter: new Adapter() })

test("Todo Item snapshot", () => {
  const component = renderer.create(
    <TodoItem name="test" description="testdescription" checked={false} />
  )
  let tree = component.toJSON()
  expect(tree).toMatchSnapshot()
})

test("Check a custom Todo", () => {
  const Todo = shallow(
    <TodoItem name="test" description="testdescription" checked={false} />
  )

  Todo.find("input").simulate("change")

  Todo.find("input").equals(true)
})
