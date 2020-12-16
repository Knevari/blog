import { render } from 'react-dom/cjs/react-dom.development';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../../store/actions/auth'
import { useDispatch, useSelector } from 'react-redux'



import Modal from 'react-modal';


Modal.setAppElement('#root')
const customStyles = {
    overlay: {
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    content: {
        width: '400px',
        margin: '0 auto',
        padding: '8px'
    }
};


const LoginModal = () => {
    
    var subtitle;

    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const modalIsOpen = useSelector(state => state.modal.modalIsOpen);

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';
    }
    
    function closeModal() {
        // setIsOpen(false);
    }


    const onSubmit = data => dispatch(login(data.username, data.password));
    return (

        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={customStyles}
        >

            <h2 ref={_subtitle => (subtitle = _subtitle)}>Login</h2>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Username: </label><br/>
                <input ref={register} type="text" name="username" /><br/>
                <label>Password:</label><br/>
                <input ref={register} type="password" name="password" />
                <br/>
                <button type='submit'>Entrar</button>
            </form>

            <button onClick={closeModal}>close</button>
        </Modal>
    )
}
export default LoginModal;