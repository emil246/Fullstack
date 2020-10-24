const initialState = ""

const filterReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILTER':
            console.log(action)
            return action.filter.toLowerCase()
        default:
            return state
    }
}

export const filterSet = (filter) => {
    return {
        type: 'SET_FILTER',
        filter
    }
}

export default filterReducer