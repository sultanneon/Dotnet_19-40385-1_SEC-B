import React, { useState } from 'react';
import { Col, Container, Form, Row } from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router';
import useAuth from '../../../hooks/useAuth';
const Login = () => {
    const {signInUsingGoogle,RegisterUsingPassword,processLogin,user,isLoading}=useAuth();
    const [name,setName]=useState('');  
    const [email,setEmail]=useState('');
    const [password,setPassword]=useState('');
    const [isLogin,setIsLogin]=useState(false);
    const location=useLocation();
    const history=useHistory();
    const redirect_uri=location.state?.from || '/home';
    const handleNameChange=e=>{
        setName(e.target.value);
    }

    const handleEmailChange=e=>{
        setEmail(e.target.value);
    }

    const handlePasswordChange=e=>{
        setPassword(e.target.value);
    }

    const handleRegistration=e=>{
        e.preventDefault();
        isLogin? processLogin(email,password,location,history): 
        RegisterUsingPassword(name,email,password);
        setIsLogin(true)
    }

    const handleGoogleSignIn=()=>{
        signInUsingGoogle(location,history)
        // .then(result => {
        //     history.push(redirect_uri);
        //     console.log(result.user);
        // })
    }

    const toggleLogin=e=>{
        setIsLogin(e.target.checked);
    }

    return (
        <Container>
            <Row>
                <Col md={6} sm={12} className="d-flex align-items-center">
                    <img src="https://images.unsplash.com/photo-1499916078039-922301b0eb9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=580&q=80" alt="" className="img-fluid" />
                </Col>
                <Col md={6} sm={12}>
                    <div className="border p-5">
                        <h4>{isLogin ? 'Login' : 'Register'} Oxygen</h4>
                        <p>{isLogin ? 'Login with your account':'Create an Account'}</p>
                        <Form onSubmit={handleRegistration}>
                            {
                                isLogin? '':
                                <Form.Group className="my-4" controlId="formBasicName">
                                <Form.Control onChange={handleNameChange}  type="text" placeholder="Name"  required/>
                            </Form.Group>
                            }
                            <Form.Group className="my-4" controlId="formBasicEmail">
                                <Form.Control onChange={handleEmailChange}  type="email" placeholder="Email"  required/>
                            </Form.Group>
                            <Form.Group className="mb-4" controlId="formBasicPassword">
                                <Form.Control onChange={handlePasswordChange}  type="password" placeholder="Password" required />
                            </Form.Group>
                            <button className="w-100 btn btn-primary py-2 my-4">{isLogin? 'Login' : 'Register'}</button>
                        </Form>
                        <p className="text-center"><small className="text-muted ">----or----</small></p>
                        <button className="btn btn-danger w-100 my-4" onClick={handleGoogleSignIn}>Login with Google</button>
                        <Form.Group as={Row} className="mb-3" controlId="formHorizontalCheck">
                            <Col sm={{ span: 10, offset: 2 }}>
                            <Form.Check onChange={toggleLogin} label="Already have an account? " />
                            </Col>
                        </Form.Group>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default Login;