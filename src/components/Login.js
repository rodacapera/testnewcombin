import React from 'react';
import { login } from '../apis/apis';
import { useNavigate } from 'react-router-dom';

function Login() {
    const history = useNavigate();

    const Field = React.forwardRef(({label, type}, ref) => {
        return (
          <div>
            <label className="labelStyle" >{label}</label>
            <input ref={ref} type={type} className="inputStyle" />
          </div>
        );
    });
    
    const Form = ({onSubmit}) => {
        const usernameRef = React.useRef();
        const passwordRef = React.useRef();
        const handleSubmit = e => {
            e.preventDefault();
            const data = {
                username: usernameRef.current.value,
                password: passwordRef.current.value
            };
            onSubmit(data);
        };
        return (
          <form className="formStyle" onSubmit={handleSubmit} >
            <Field ref={usernameRef} label="Username:" type="text" />
            <Field ref={passwordRef} label="Password:" type="password" />
            <div>
              <button className="submitStyle" type="submit">Submit</button>
            </div>
          </form>
        );
    };

    const handleSubmit = async data => {
        const json = JSON.stringify(data);
        const sendLogin = await login(json);
        if (sendLogin) {
            history("/");
        }
    };

    return (
        <div className="container">
            <div className="appStyle">
                <Form onSubmit={handleSubmit} />
            </div>
        </div>
    )
}

export default Login
