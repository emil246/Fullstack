import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = (props) => {
  const [selected, setSelected] = useState(0)
  const [voteClicks, setVote] = useState(Array.apply(null, new Array(props.anecdotes.length)).map(Number.prototype.valueOf,0))




  const handleVoteClic = () => {
    const copy = [...voteClicks]
    copy[selected] += 1
    setVote(copy)
    }

  const handleNextClic = () => {
        setSelected(Math.floor(Math.random()*props.anecdotes.length))
    }

  const max = voteClicks.indexOf(Math.max(...voteClicks))
  console.log(voteClicks)
  return (
    <div>
      <Header text='Anecdote of the day'/>
      <Anecdote anecdote={anecdotes[selected]} votes={voteClicks[selected]}/>
      <Button onClick={handleVoteClic} text='Vote' />
      <Button onClick={handleNextClic} text='Next anecdote' />
      <Header text='Anecdote with most votes'/>
      <Anecdote anecdote={anecdotes[max]} votes={voteClicks[max]}/>

    </div>
  )
}

const Anecdote = ({ anecdote, votes }) => {
    return (
        <>
            <p>{anecdote}</p>
            <p>has {votes} votes</p>
        </>
    )
}

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Header = (props) => {
  return (
    <h1>{props.text}</h1>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)
