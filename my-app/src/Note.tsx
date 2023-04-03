import React from 'react'
import { useTrip } from './NoteLayout'
import { Row, Col,Stack, Badge } from 'react-bootstrap'
import { Link, useNavigate} from 'react-router-dom'
import {Button} from 'react-bootstrap'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import {useAuth} from '../src/contexts/AuthContext'
import { PORT } from './App'
import axios from 'axios'
import { useAppSelector, useAppDispatch} from './store/hooks'
import { fetchTrips } from './store/feature/tripListSlice'


export default function Note() {
 const trip = useTrip()
 const navigate = useNavigate()
 const {currentUser} = useAuth()
 const start = trip.start_time.substring(0,10)
 const end = trip.end_time.substring(0,10)
const dispatch = useAppDispatch()


    const deletePost = async  ()=>{
          await axios.delete(`${PORT}/api/trip/${trip.id}`).then((response: any)=>{
          alert('Post is deleted')
          dispatch(fetchTrips())
        }).catch((err: any)=>console.log(err))

    }

 return (
    <>
    {currentUser && <div  className='bg' style={{display:'flex' ,justifyContent: 'flex-end'}}>
              <Link to={`/${trip.id}/edit`} >
                  <Button variant="primary">Edit</Button>
              </Link> 
              <Button className="ml-2" onClick={()=>{
                deletePost()
                navigate ("/myPosts")
              }} variant="outline-danger">Delete</Button>
              <Link to='/'>
                <Button className="ml-2" variant="outline-secondary">Back</Button>
              </Link> 
        </div> }
    
    <Row className="align-items-center mb-4">
        
        <Col>
        <h1>{trip.title}</h1>
        <div style={{display: 'flex'}}>

          <h4>User : </h4>
          <h4 style={{marginLeft: '6px', color:'purple'}}>{trip.user_name}</h4>
        </div>
         <div style={{display: 'flex', color:'purple'}}>
          <h4>From : </h4>
          <h4 style={{marginLeft: '6px', color: 'purple'}}>{start}</h4>
        </div>
         <div style={{display: 'flex', color: 'purple'}}>
          <h4>To : </h4>
          <h4 style={{marginLeft: '6px', color:'purple'}}>{end}</h4>
        </div>
       <div style={{display: 'flex', color: 'purple'}}>
          <h4>Location : </h4>
          <h4 style={{marginLeft: '6px', color: 'purple'}}>{trip.place}</h4>
        </div>
         <div style={{display: 'flex'}}>
          <h4> User gender: </h4>
          <h4 style={{marginLeft: '6px', color:'purple'}}>{trip.gender1}</h4>
        </div>
         <div style={{display: 'flex'}}>
          <h4>Looks for: </h4>
          <h4 style={{marginLeft: '6px', color:'purple'}}>{trip.gender2}</h4>
        </div>
         <div style={{display: 'flex'}}>
          <h4>Description : </h4>
          <h4 style={{marginLeft: '6px', color:'purple'}}>{trip.markdown}</h4>
        </div>
         <div style={{display: 'flex'}}>
          <h4>Expense possible in this trip : </h4>
          <h4 style={{marginLeft: '6px', color:'purple'}}>{trip.price}/person</h4>
        </div>
        </Col>
      
    </Row>
    </>
 )
}

