import React from 'react'
import { prepareAnecdote } from '../reducers/anecdoteReducer'
import { setMessage } from '../reducers/notificationReducer'
import { connect } from 'react-redux'


const Anecdote = ({ anecdote, handleClick }) => {
  return(
    <>
        <div>
        {anecdote.content}
        </div>
        <div>
        has {anecdote.votes}
        <button onClick={() => handleClick(anecdote.id)}>Like</button>
        </div>
    </>
  )
}

const Anecdotes = (props) => {

  const anecdotesToShow = () => {
    if ( props.filter === '') {
      return props.anecdotes
    }
    
    return props.anecdotes
      .filter((anecdote) =>
        anecdote.content.toLowerCase().includes(props.filter.toLowerCase())
      )
      .sort((a, b) => (a.votes > b.votes ? -1 : 1))
  }

  return (
    <ul>
        {anecdotesToShow().sort((a, b) => b.votes - a.votes).map(anecdote =>
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => {
                    props.prepareAnecdote(anecdote.id)
                    props.setMessage(`You vote '${anecdote.content}'`, 5)
                }
                }
            />
        )}
    </ul>
)
}

const mapDispatchToProps = {
  prepareAnecdote,
  setMessage
}


const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const ConnectedAnecdotes = connect(
  mapStateToProps,
  mapDispatchToProps
)(Anecdotes)
export default ConnectedAnecdotes