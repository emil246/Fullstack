import React from 'react'

const Course = ({ course }) => {
  return(
  <div>
       <Header course={course} />
       <Content course={course} />
       <Total course={course} />
  </div>
  )
}

const Header = ({ course }) => {
  return (
    <h2>{course.name}</h2>
  )
}


const Total = ({ course }) => {
  let sum = course.parts.reduce((a, b) => a + b.exercises, 0)
  return(
    <p><b>Number of exercises {sum}</b></p>
  )
}

const Part = ({part}) => {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part => <Part part={part} />)}
    </div>
  )
}

export default Course
