import React, {FormEvent, useRef, useState} from 'react'
import { Card, Form,Button, Container, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'
export default function Signup() {

     const [error, setError] = useState("")
     const [loading,setLoading ] = useState(false)
    const emailRef = useRef<HTMLInputElement>( null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const passwordConfirmRef = useRef<HTMLInputElement>(null);
    const usernameRef = useRef<HTMLInputElement>(null);
    const navigate = useNavigate()
   
    const {signup, currentUser} = useAuth();
    const handleSubmit = async(e:FormEvent)=>{
     e.preventDefault();
     if(passwordRef.current?.value !== passwordConfirmRef.current?.value){
        return setError('Passwords do not match')
     }
   
     try{
       setError('')
       setLoading(true)
       await  signup(usernameRef.current?.value, emailRef.current?.value, passwordRef.current?.value);
       navigate("/")
     }catch(err){
        setError('Failed to create an account' +err)

     }
     setLoading(false)
    
    }
  return (
    <>
    <Container className="d-flex
    justify-content-center" style={{minHeight: "100vh"}}>
        <div className="w-100" style={{maxWidth:"450px"}}>
            <Card>
            <Card.Body>
                <h2 className="text-center mb-4 mt-2">Sign Up</h2>
                {error&& <Alert variant='danger'>{error}</Alert>}
                {/* {currentUser.email} */}
                <Form  onSubmit={handleSubmit}>
                     <Form.Group id="username"> 
                      <Form.Label></Form.Label>
                      <Form.Control placeholder='username' type="text" ref={usernameRef} required />
                    </Form.Group>
                    <Form.Group id="email"> 
                      <Form.Label></Form.Label>
                      <Form.Control placeholder='email' type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password"> 
                      <Form.Label></Form.Label>
                      <Form.Control placeholder='password' type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Form.Group id="password-confirm"> 
                      <Form.Label></Form.Label>
                      <Form.Control placeholder='password comfirmation' type="password" ref={passwordConfirmRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-3" type="submit">Sign Up</Button>
                      <Link to="/"  className="text-decoration-none text-dark">
                          <Button className="w-100 mt-3"> Cancel</Button>
                      </Link>
                </Form>
            </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                Already have an account? <Link to="/Login">Log In</Link> 
            </div> 
          
        </div>
       
    </Container>
  
    </>
  )
}
