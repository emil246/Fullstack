import React, {useEffect} from 'react'
import NewAnecdote from './components/NewAnecdote'
import Anecdotes from './components/Anecdotes'
import Notification from './components/Notification'
import Filter from './components/Filter'
import { initializeAnecdotes } from './reducers/anecdoteReducer'
import { useDispatch } from 'react-redux'

const App = () => {

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(initializeAnecdotes())  
  },[dispatch]) 

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter />
      <Notification />
      <NewAnecdote />
      <Anecdotes  />
    </div>
  )
}

export default App