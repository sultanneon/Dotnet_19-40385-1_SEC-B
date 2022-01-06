import React from 'react';
import { Button, Container, Nav, Navbar } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';
import './Navigation.css';
const Navigation = () => {
    const {user,logOut}=useAuth();
     return (
        <Navbar className=""  expand="lg">
        <Container fluid>
        <Navbar.Brand className='text-success fs-3' as={NavLink} to='/home'>
        
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
            <Nav className="me-auto my-2 my-lg-0 "style={{ maxHeight: '100px' }}navbarScroll>
                <Nav.Link className="text-dark" as={NavLink} to="/home">Home</Nav.Link>
                <Nav.Link className="text-dark" as={NavLink} to="/explore">Explore</Nav.Link>
                {
                    user.email &&
                    <Nav.Link className="text-dark" as={NavLink} to="/dashboard">Dashboard</Nav.Link>
                }
                
                <Nav.Link className="text-dark" as={NavLink} to="/about">About us</Nav.Link>
            </Nav>
            {
                user.email && <p className="ms-auto me-3 my-auto">Welcome, {user.displayName}</p>
            }
            {
                user.email?
                <Button onClick={logOut} className="px-3 py-2 btn-success me-2">Logout</Button>
                :
                <NavLink to="/login"><Button className="px-3 py-2 btn-success me-2">Login</Button></NavLink>
            }
            
        </Navbar.Collapse>
    </Container>
</Navbar>

     );
};

export default Navigation;