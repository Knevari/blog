import { render } from 'react-dom/cjs/react-dom.development';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

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
    const [modalIsOpen, setIsOpen] = useState(true);
    const { register, handleSubmit } = useForm();

    function openModal() {
        setIsOpen(true);
    }

    function afterOpenModal() {
        // references are now sync'd and can be accessed.
        subtitle.style.color = '#000';
    }

    function closeModal() {
        setIsOpen(false);
    }

    const onSubmit = data => console.log(data);
    return (

        <Modal
            isOpen={modalIsOpen}
            onAfterOpen={afterOpenModal}
            onRequestClose={closeModal}
            contentLabel="Example Modal"
            style={customStyles}
        >

            <h2 ref={_subtitle => (subtitle = _subtitle)}>Login</h2>
            <button onClick={closeModal}>close</button>

            <form onSubmit={handleSubmit(onSubmit)}>
                <label>Username: </label><br/>
                <input ref={register} type="text" name="username" /><br/>
                <label>Password:</label><br/>
                <input ref={register} type="password" name="password" />
                <br/>
                <button>Entrar</button>
            </form>
        </Modal>
    )
}
export default LoginModal;