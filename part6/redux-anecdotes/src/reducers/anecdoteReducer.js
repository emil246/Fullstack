import anecdoteService from '../services/anecdotes'

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECS',
      data: anecdotes,
    })
  }
}

export const prepareAnecdote = (id) => {
  return async (dispatch, getState ) => {
    const anecdoteToChange = getState().anecdotes.find((a) => a.id === id);
      const votedAnecdote = {
        ...anecdoteToChange,
        votes: anecdoteToChange.votes + 1,
      }
      await anecdoteService.update(id, votedAnecdote)
      dispatch({
        type: 'VOTE',
        data: {id}
      })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANEC',
      data: newAnecdote,
    })
  }
}



const anecdoteReducer = (state = [], action) => {
  switch(action.type) {
    case 'NEW_ANEC':
      return [...state, action.data]
    case 'INIT_ANECS':
      return action.data
    case 'VOTE':
      const id = action.data.id
      const anecdoteToChange = state.find(n => n.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote 
      )
    default:
      return state
  }
}

export default anecdoteReducer