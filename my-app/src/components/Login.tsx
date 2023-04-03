import React, {FormEvent, useRef, useState} from 'react'
import { Card, Form,Button, Container, Alert} from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import {useAuth} from '../contexts/AuthContext'
export default function Login() {

     const [error, setError] = useState("")
     const [loading,setLoading ] = useState(false)
     const navigate = useNavigate();
    const emailRef = useRef<HTMLInputElement>( null);
    const passwordRef = useRef<HTMLInputElement>(null);
  
   
    const {login} = useAuth();
    const handleSubmit = async(e:FormEvent)=>{
     e.preventDefault();
    

     try{
       setError('')
       setLoading(true)
       await  login(emailRef.current?.value, passwordRef.current?.value)
       navigate('/')
     }catch(err){
        setError('Failed to login' +err)

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
                <h2 className="text-center mb-4 mt-2">Login</h2>
                {error&& <Alert variant='danger'>{error}</Alert>}
                {/* {currentUser.email} */}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id="email"> 
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" ref={emailRef} required />
                    </Form.Group>
                    <Form.Group id="password"> 
                    <Form.Label>Password</Form.Label>
                    <Form.Control type="password" ref={passwordRef} required />
                    </Form.Group>
                    <Button disabled={loading} className="w-100 mt-3" type="submit">Login</Button>
                     <Link to="/"  className="text-decoration-none text-dark">
                          <Button className="w-100 mt-3"> Cancel</Button>
                      </Link>
                </Form>
            </Card.Body>
            </Card>
            <div className="w-100 text-center mt-2">
                 Need a account ? <Link to='/SignUp'>Sign Up</Link>
            </div> 
        </div>
       
    </Container>
  
    </>
  )
}
