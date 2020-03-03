import React , {useState} from 'react';
import {Link ,Redirect} from 'react-router-dom';
import Layout from '../core/Layout';
import axios from 'axios';
import {authenticate , isAuth} from './helpers'
import {ToastContainer , toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.min.css';

 const Signin = ({history}) => {
    const [values, setValues] = useState({
        email: '',
        password: '',
        buttonText: 'Submit'
    });
    const {email , password , buttonText} = values;

     const handleChange = name => event => {
        setValues({...values , [name] : event.target.value});
     }
     const clickSubmit = event => {
        event.preventDefault();
        setValues({ ...values, buttonText: 'Submitting' });
        axios({
            method: 'POST',
            url: `${process.env.REACT_APP_API}/signin`,
            data: { email, password }
        })
            .then(response => {
                console.log('SIGNIN SUCCESS', response);
                authenticate(response, () => {
                    setValues({ ...values, name: '', email: '', password: '', buttonText: 'Submitted' });
                    // toast.success(`Hey ${response.data.user.name}, Welcome back!`);
                    isAuth() && isAuth().role === 'admin' ? history.push('/admin') : history.push('/private');
                });
                toast.success(response.data.message);
            })
            .catch(error => {
                console.log('SIGNIN ERROR', error.response.data);
                setValues({ ...values, buttonText: 'Submit' });
                toast.warn(error.response.data.error);
            });
    };
     const signinForm = () => (
        <form autoComplete = "off">
        <div className="form-group">
            <label className="text-muted">Email</label>
            <input onChange={handleChange('email')} value={email} type="email" className="form-control" />
        </div>

        <div className="form-group">
            <label className="text-muted">Password</label>
            <input onChange={handleChange('password')} value={password} type="password" className="form-control" />
        </div>

        <div>
            <button className="btn btn-primary" onClick={clickSubmit}>
                {buttonText}
            </button>
        </div>
    </form>
     )
    return (
        <Layout>
            {signinForm()}
            <ToastContainer/>
            {isAuth() ? <Redirect to = "/"/> : null}
            <br />
                <Link to="/auth/password/forgot" className="btn btn-sm btn-outline-danger">
                    Forgot Password
                </Link>
        </Layout>
    )
}
export default Signin