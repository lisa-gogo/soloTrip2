import React from 'react'
import { Row,Col,Stack, Button, Form, Card, Badge, Modal, Alert} from 'react-bootstrap'
import { Link } from 'react-router-dom'
import ReactSelect from 'react-select'
import {useState, useMemo, useEffect} from 'react'
import { NoteData, Tag, RawNote,RawNoteData, Trip} from './types';
import styles from './NoteList.module.css'
import {useAuth} from '../src/contexts/AuthContext'
import axios from 'axios'
import { PORT } from './App'
import {useSelector, useDispatch} from 'react-redux'
import { useAppSelector, useAppDispatch} from './store/hooks'
import { fetchTrips } from './store/feature/tripListSlice'
import loading from './assets/loading.gif'




type NoteListProps = {
    availableTags: Tag[]
  notes: tempNote[]
    onDeleteTag: (id: string) => void
    onUpdateTag: (id: string, label: string ) => void
}

type tempNote = {
  title: string 
  id: string 
}

export type SimplifiedNote ={
    title: string 
    user_name : string
    id:string
    start_time: string 
    end_time: string
    place: string 
    gender1: string 
    gender2: string 
    price: string 
}

type EditTagsModalProps ={
  show: boolean,
  availableTags: Tag[],
  handleClose: () => void
   onDeleteTag: (id: string) => void
    onUpdateTag: (id: string, label: string ) => void
}


export default function NoteList({availableTags,notes, onUpdateTag, onDeleteTag }:NoteListProps) {

    const [selectedTags, setSelectedTags] = useState<Tag[]>([])
    const [notGetTrip, setGetTrip] = useState(true) 
    const [title, setTitle] = useState("")
    const [editTagsModalIsOpen, setEditTagsModalIsOpen] = useState(false)
    const {currentUser, logout} = useAuth();

    const trips = useAppSelector((state) => state.trips)
    const allTrips = trips.trips
    
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchTrips())
    },[])
    const filteredTrips = useMemo(() =>{
      return allTrips.filter( (trip) =>{
            setGetTrip(false)
        return(
            (title === "" || trip.title.toLowerCase().includes(title.toLocaleLowerCase()))
        )
      })
    },[title,allTrips])
    
  return (
    <>
    <Row className='align-items-center mb-4'>
       
        <Col xs="auto">
            <Stack gap={2} direction="horizontal">
              <Link to="/new" >
                  <Button variant="primary">Create</Button>
              </Link> 
              <Link to="/myPosts">
                <Button 
                variant="outline-success">My Posts</Button>
              </Link>
              
            </Stack>
        </Col>
       
    </Row>
    <Form>
        <Row className="mb-4">
            <Col>
              <Form.Group controlId='title'>
                <Form.Label>Search</Form.Label>
                <Form.Control type="text" 
                value = {title}
                onChange={e=>setTitle(e.target.value)}
                />
            </Form.Group>
            </Col>
             <Col>
          <Form.Group controlId='tags'>
                <Form.Label>Tags</Form.Label>
                 <ReactSelect 
                value={selectedTags.map(tag =>{
                    return {
                        label:tag.label, value: tag.id
                    }
                })} 

                options = {availableTags.map(tag => {
                    return {label: tag.label, value:tag.id}
                })}
                
                onChange={tags => {
                    setSelectedTags(tags.map(tag => {
                        return {label:tag.label, id: tag.value}
                    }))
                }} isMulti/>
              </Form.Group>
        </Col>
        </Row>
    </Form>
    <div>{notGetTrip && <img src={loading} style={{width:"30%"}} alt="loading"></img>}</div>
     <Row xs={1} sm={2} lg={3} xl={4} className="g-3">
        {filteredTrips.map(trip => (
          <Col key={trip.id}>
            <NoteCard id={trip.id} title={trip.title} user_name={trip.user_name} start_time ={trip.start_time} end_time={trip.end_time} 
            place={trip.place} gender1={trip.gender1} gender2={trip.gender2} price={trip.price}/>
          </Col>  
        ))}
     </Row>
     <EditTagsModal 
     onUpdateTag={onUpdateTag}
     onDeleteTag={onDeleteTag}
     show={editTagsModalIsOpen} handleClose={()=>setEditTagsModalIsOpen(false)} availableTags={availableTags}/>
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


const EditTagsModal =({availableTags, handleClose, show,
 onDeleteTag, 
 onUpdateTag
}:EditTagsModalProps)=>{
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
           <Modal.Title>Edit Tags</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Stack gap={2}>
            {availableTags.map(tag =>(
              <Row key={tag.id}>
                <Col>
                 <Form.Control type="text" value={tag.label}
                 onChange={e => onUpdateTag(tag.id, e.target.value)}
                 />
                </Col>
                <Col xs="auto">
                <Button onClick={()=>onDeleteTag(tag.id)} variant="outline-danger">&times;</Button>
                </Col>
              </Row>
            ))}
          </Stack>
        </Form>
      </Modal.Body>
    </Modal>
  )
}