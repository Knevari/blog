import styled from 'styled-components'

export const Title = styled.h2`
    color: white;
    padding: 0 8px;
    margin-left: 14px;
`;

export const LoginForm = styled.form`
    display: flex;
    justify-content: center;
    align-items: flex-start;
    flex-direction: column;
    width: 390px;
    margin: 0 auto;
`;

export const Input = styled.input`
    display: block;
    width: 100%;
    font-size: 1.1rem;
    padding: 4px;
    appearance: none;
    border: 1px solid #777;
    border-radius: 4px;
    box-sizing: border-box;
    outline: none;
    color: white;
    background-color: #888;
`;

export const Label = styled.label`
    font-size: 1.2rem;
    color: #f5f5f5;
    text-align: left;
`;

export const SubmitButton = styled.button`
    margin-top: 24px;
    appearance: none;
    border: 3px solid #1e2328;
    border-radius: 25px;
    width: 100%;
    box-sizing: border-box;
    padding: 8px;
    box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.4);
    background-color: #000;
    color: white;
    cursor: pointer;
    font-size: 1.2rem;
    transition: all .2s ease-in-out;
    user-select: none;
    outline: 0;

    &:hover {
        border: 3px solid #fff;
    }
`;

export const FormSet = styled.div`
    width: 100%;
    margin-bottom: 24px;
`;