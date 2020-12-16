import { render } from 'react-dom/cjs/react-dom.development';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { login } from '../../store/actions/auth'
import { useDispatch, useSelector } from 'react-redux'
import { ToastProvider, useToasts } from 'react-toast-notifications'

import {
    LoginForm,
    Input,
    Title,
    Label,
    SubmitButton,
    FormSet
} from './styles'

import Modal from 'react-modal';
import modalActions from '../../store/actions/modal';


Modal.setAppElement('#root')

const customStyles = {
    overlay: {
        zIndex: 1000,
        backgroundColor: 'rgba(0, 0, 0, 0.75)'
    },
    content: {
        width: '450px',
        height: '348px',
        margin: '0 auto',
        padding: '8px',
        backgroundColor: "#1e2328",
        border: 'none',
        boxSizing: 'border-box'
    }
};


const LoginModal = () => {
    
    var subtitle;

    const { register, handleSubmit } = useForm();
    const dispatch = useDispatch();
    const { addToast } = useToasts();
    const modalIsOpen = useSelector(state => state.modal.modalIsOpen);
    const userLoggedIn = useSelector(state => state.auth.loggedIn); 
    const userLoginFail = useSelector(state => state.auth.error);

    function closeModal() {
        dispatch(modalActions.toggleModal(false));
    }
    
    useEffect( () => {
        if(userLoggedIn){
            addToast('Login realizado com sucesso', {appearance: 'success'});
        }
        if(userLoginFail){
            addToast('Login ou senha inválidos', { appearance: 'error'});
        }
    }, [userLoggedIn, userLoginFail]);
    

    const onSubmit = data => dispatch(login(data.username, data.password));
        
    
        return (
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={closeModal}
                contentLabel="Example Modal"
                style={customStyles}
            >

                <Title>Login</Title>

                <LoginForm onSubmit={handleSubmit(onSubmit)}>
                    <FormSet>
                        <Label htmlFor="username">Username </Label>
                        <Input ref={register} type="text" name="username" />
                    </FormSet>
                    <FormSet>
                        <Label htmlFor="password">Password </Label>
                        <Input ref={register} type="password" name="password" />
                    </FormSet>
                    <SubmitButton type="submit">Entrar</SubmitButton>
                </LoginForm>

                {/* <button onClick={closeModal}>close</button> */}
            </Modal>
    )
}
export default LoginModal;