import { TOGGLE_MODAL } from '../reducers/modal'

const modalActions = {
    toggleModal: (value) => ({
        type: TOGGLE_MODAL,
        modalIsOpen: value
    })
}
export default modalActions;