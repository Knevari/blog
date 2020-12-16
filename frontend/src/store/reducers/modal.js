const initialState = {
    modalIsOpen: false
}

export const TOGGLE_MODAL = "TOGGLE_MODAL";

export default function toggleModalReducer(state = initialState, action){
    
    switch (action.type){
        case TOGGLE_MODAL:{
            return { modalIsOpen: action.modalIsOpen }
        }
        default:
            return state
    }
}