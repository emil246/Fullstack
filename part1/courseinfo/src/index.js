import React from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total total={course.parts} />
    </div>
  )
}

const Header = (props) => {
  console.log(props)
  return (
    <h1>{props.course}</h1>
  )
}

const Content = (props) => {
  console.log(props)
  return (
    <>
    <Part part = {props.content[0]}/>
    <Part part = {props.content[1]}/>
    <Part part = {props.content[2]}/>
    </>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <p>{props.part.name} {props.part.exercises}</p>
  )
}

const Total = (props) => {
  console.log(props)
  return (
    <p>Number of exercises {props.total[0].exercises+props.total[1].exercises+props.total[2].exercises}</p>
  )
}


ReactDOM.render(<App />, document.getElementById('root'))
