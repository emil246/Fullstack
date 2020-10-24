import React from 'react'
import { filterSet } from '../reducers/filterReducer'
import { connect } from 'react-redux'


const Filter = (props) => {

    const handleChange = (event) => {
        props.filterSet(event.target.value)
    }
  const style = {
    marginBottom: 10
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}

const mapDispatchToProps = {
  filterSet
}


const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
  }
}

const ConnectedFilter = connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter)
export default ConnectedFilter