import React, {useMemo}from 'react'
import { useAppSelector, useAppDispatch} from '../store/hooks'
import { fetchTrips } from '../store/feature/tripListSlice'
import {useAuth} from '../contexts/AuthContext'
import { Row, Col } from 'react-bootstrap'
import styles from '../NoteList.module.css'
import { Card, Stack } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { SimplifiedNote } from '../NoteList'

export default function MyPost() {

    // redux 
    const trips = useAppSelector((state) => state.trips)
    const allTrips = trips.trips
    
    const dispatch = useAppDispatch()

    const {currentUser} = useAuth()

    const filteredTrips = useMemo(() =>{
      return allTrips.filter( (trip) =>{
        return(
            ( trip.user_id===currentUser?.uid )
        )
      })
    },[allTrips])

  return (
    <>
    {currentUser? <div className='fs-4'>Your Post Records</div>:<div className='fs-4'>Please Login</div>}
     <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredTrips.map(trip => (
          <Col key={trip.id}>
            <NoteCard id={trip.id} title={trip.title} user_name={trip.user_name} start_time ={trip.start_time} end_time={trip.end_time} 
            place={trip.place} gender1={trip.gender1} gender2={trip.gender2} price={trip.price}/>
          </Col>  
        ))}
     </Row>
    </>
  )
}

const NoteCard=({id,title, user_name,start_time, end_time, place, gender1, gender2, price}: SimplifiedNote)=>{

    const start = start_time.substring(0,10)
    const end = end_time.substring(0,10)
  return <Card as={Link} to={`/${id}`} className={`h-100 text-reset text-decoration-non ${styles.card}`}>
            <Card.Body>
                <Stack gap={2} className="align-item-center 
                justify-content-center h-100">
                <span className="fs-5">{title}</span>
                 <div style={{display: "flex"}}>
                  <div>User:</div>
                  <div style={{marginLeft: "3px", marginRight: "3px", color:"#8B008B", fontWeight: "bold"}}>{user_name}</div>
                </div>
                <div style={{display: "flex"}}>
                  <div>Location:</div>
                  <div style={{marginLeft: "3px", marginRight: "3px", color:"#8B008B", fontWeight: "bold"}}>{place}</div>
                </div>
                <div style={{display: "flex"}}>
                 
                   <div style={{color:"#8B008B", fontWeight: "bold"}}>{start}</div>
                   <div style={{marginLeft: "4px", marginRight: "4px"}}> to </div>
                   <div style={{color:"#8B008B", fontWeight: "bold"}}>{end}</div>
                </div>
                 <div style={{display: "flex"}}>
                  <div style={{color:"#8B008B", fontWeight: "bold"}}>{gender1}</div>
                  <div style={{marginLeft:"3px", marginRight:"3px"}}> looks for </div>
                  <div style={{color:"#8B008B", fontWeight: "bold"}}>{gender2}</div>
                 </div>
                  <div style={{display: "flex"}}>
                    <div style={{color:"#8B008B", fontWeight: "bold"}}>Expense: </div>
                    <div style={{color:"#8B008B", fontWeight: "bold"}}>{price}/per</div>
                  </div>
                </Stack>
            </Card.Body>
  </Card>
}
