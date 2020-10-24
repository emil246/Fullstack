import { createStore, combineReducers, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteReducer from './reducers/anecdoteReducer'
import notificationReducer from './reducers/notificationReducer'
import filterReducer from './reducers/filterReducer'
import thunk from 'redux-thunk'
import anecdoteService from './services/anecdotes'

const reducer = combineReducers({
    anecdotes: anecdoteReducer,
    message: notificationReducer,
    filter: filterReducer
  })

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(thunk))
    )


anecdoteService.getAll().then(anecdotes =>
  anecdotes.forEach(anecdote => {
    store.dispatch({ type: 'NEW_ANEC', data: anecdote })
  })
)


export default store