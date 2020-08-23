import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [allClicks, setAll] = useState([])
  console.log(allClicks)

  const handleGoodClic = () => {
      setAll(allClicks.concat(1))
      setGood(good + 1)
    }

  const handleNeutralClic = () => {
      setAll(allClicks.concat(0))
      setNeutral(neutral + 1)
    }

  const handleBadClic = () => {
      setAll(allClicks.concat(-1))
      setBad(bad + 1)
    }

  return (
    <div>
      <Header text = 'Give feedback'/>
      <Button onClick={handleGoodClic} text='Good' />
      <Button onClick={handleNeutralClic} text='Neutral' />
      <Button onClick={handleBadClic} text='Bad' />
      <Statistics value={allClicks}/>
    </div>
  )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)


const Statistics = (props) => {
  if (props.value.length === 0) {
    return (
      <div>
        <p>No feedback given</p>
      </div>
    )
  }
  let avg = props.value.reduce((a, b) => a + b, 0) / props.value.length
  let percent = (props.value.filter(elem => elem > 0).length / props.value.length) * 100
  let good = props.value.filter(elem => elem > 0).length
  let neutral = props.value.filter(elem => elem === 0).length
  let bad = props.value.filter(elem => elem < 0).length
  return (
    <>
    <h1>Statistics</h1>
    <table>
    <thead></thead>
    <tfoot></tfoot>
    <tbody>
    <Statistic text="good" value ={good} />
    <Statistic text="neutral" value ={neutral} />
    <Statistic text="bad" value ={bad} />
    <tr><td>all</td><td>{props.value.length}</td></tr>
    <tr><td>average</td><td>{avg}</td></tr>
    <tr><td>positive</td><td>{percent} %</td></tr>
    </tbody>
    </table>
    </>
  )
}

const Statistic = ({text, value }) => (
  <tr><td>{text}</td><td>{value}</td></tr>
)

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

ReactDOM.render(<App />,
  document.getElementById('root')
)
