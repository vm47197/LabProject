import { Form } from 'react-bootstrap';
import { useState } from 'react';
import { useAppContext } from '../providers/AppProvider';
import api from '../AxiosCall';

import Register from './Register';

function Login(props) {
    const { user, dispatch } = useAppContext();
    const [showLogin, setShowLogin] = useState(true);
    const [show, setShow] = useState(true);
    const email = useInput('');
    const password = useInput('');
    const onLoginHandel = async (event) => {
        event.preventDefault();
        let userData = {
            username: email.value,
            password: password.value
        };
        
        api.post('/authenticate/login', userData).then(res => {
            setShow(false);
            email.onClear();
            password.onClear();
            dispatch({ type: 'login', payload: res.data });
        }).catch(error => {
            console.log(error);
        });
    }

    // const onHandleRegister = () => {
    //     setShowLogin(true);
    // }

    return (
        <>
        <div className="container">
            {showLogin ?
                <Form onSubmit={onLoginHandel} className="mt-3 mb-4">
                    <h2 className="text-dark my-0">Welcome Back</h2>
                    <p className="text-50">Sign in to continue</p>
                    <Form.Group>
                        <Form.Label className="text-dark">Email</Form.Label>
                        <Form.Control {...email} type="text" placeholder="Enter Email" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label className="text-dark">Password</Form.Label>
                        <Form.Control {...password} type="password" placeholder="Enter Password" />
                    </Form.Group>
                    <button className="btn btn-primary btn-block">SIGN IN</button>
                </Form>
                :
                <Register {...{ setShow }} />
            }
            </div>
        </>
    )
}
function useInput(init) {
    const [value, setValue] = useState(init);
    const onHandleChange = (e) => {
        setValue(e.target.value);
    }

    const onHandleClear = () => {
        setValue('');
    }
    return {
        value,
        onChange: onHandleChange,
        onClear: onHandleClear
    };
}
export default Login;