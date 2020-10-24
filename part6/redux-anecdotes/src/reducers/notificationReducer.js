const initialState = ""

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_MESSAGE':
        return action.message
      case 'CLEAR':
        return initialState
      default:
        return state
    }
  }

  export const setMessage = (message, time) => {
    return dispatch => {
        dispatch({
            type: 'SET_MESSAGE',
            message,
        })
        setTimeout(() => {
            dispatch({
                type: 'CLEAR'
            })
        }, time * 1000)
    }
}

export default notificationReducer