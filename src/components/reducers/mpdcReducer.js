export const mpdcReducer = (state,action) => {
    switch(action.type)
    {
        case "ADD_MPDCS":
            return {...state, mpdc: action.payload};
    }
}