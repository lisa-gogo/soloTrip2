import React, { FormEvent, useEffect } from 'react'
import {Form, Stack,Row,Col, Button} from 'react-bootstrap'
import CreatableReactSelect from "react-select/creatable"
import {Link, useNavigate} from 'react-router-dom'
import { useRef, useState } from 'react'
import { NoteData, Tag, RawNote,RawNoteData } from './types';
import { v4 as uuidV4} from 'uuid'
import {useAuth} from './contexts/AuthContext'
import axios from 'axios'




export default function NoteForm() {
    const titleRef = useRef<HTMLInputElement> (null)
    const markdownRef = useRef<HTMLTextAreaElement>(null)
    const [titleContent, setTitleContent] = useState<string>('')
    const [startTime, setStartTime] = useState<string>('')
    const [endTime, setEndTime] = useState<string>('')
    const [yourGender, setYourGender] = useState<string>('')
    const [anotherPersonGender,setAnohterPersonGender] = useState<string>('')
    const [location, setLocation] = useState<string>('')
    const [expense, setExpense] = useState<string>('')
    const [markdowns, setMarkdowns] = useState<string>('')

    let PORT : string | any
    process.env.REACT_APP_STATUS === 'production' ? (PORT = process.env.REACT_APP_PROD_PORT):( PORT=process.env.REACT_APP_DEV_PORT)


    const navigate = useNavigate()
    const {currentUser, logout} = useAuth();
    const tripData = {
      user_name: currentUser?.displayName,
      user_id: currentUser?.uid,
      start_time: startTime, 
      end_time: endTime, 
      title: titleContent,
      place: location, 
      gender1: yourGender,
      gender2: anotherPersonGender,
      markdown: markdowns,
      price: expense 
    }

    
   

    const handleSubmit = async (e: FormEvent) =>{
        e.preventDefault()
        await axios.post(`${PORT}/api/user/trip`,tripData).then((response: any)=>{
          console.log(response)
        }).catch((err: any)=>console.log(err))

        navigate("..")
    }
  return (
    <Form onSubmit={handleSubmit}>
      <Stack gap={4}>
        <Row>
            <Col>
              <Form.Group controlId='title'>
                <Form.Label>Title</Form.Label>
                {/* <Form.Control ref={titleRef} required defaultValue={title}></Form.Control> */}
                <Form.Control onChange={e=>setTitleContent(e.target.value)} ></Form.Control>
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId='tags'>
                <Form.Label>Tags</Form.Label>
               
              </Form.Group>
            </Col>
        </Row>
          <Form.Group controlId='startTime'>
                <Form.Label>location-city</Form.Label>
                <Form.Group>
                   <input onChange={e=>setLocation(e.target.value)} type="text"></input>
                </Form.Group>
        </Form.Group>
         <Form.Group controlId='startTime'>
                <Form.Label>Start time</Form.Label>
                <Form.Group>
                   <input onChange={(e)=>{setStartTime(e.target.value)}} type="date"></input>
                </Form.Group>
        </Form.Group>
        <Form.Group controlId='startTime'>
                <Form.Label>End time</Form.Label>
                <Form.Group>
                   <input type="date" onChange={e=>setEndTime(e.target.value)}></input>
                </Form.Group>
        </Form.Group>
          <Form.Group controlId='title'>
                <Form.Label>Your gender</Form.Label>
                   <select onChange={e=>setYourGender(e.target.value)}>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Not tell</option>
                    </select>   
              </Form.Group>
            <Form.Group controlId='title'>
              <Form.Label>Another person's gender you hope</Form.Label>
                  <select onChange={e=>setAnohterPersonGender(e.target.value)}>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Not tell</option>
                  </select>   
            </Form.Group>
             <Form.Group controlId='title'>
              <Form.Label>The possible expense in this trip per person? word</Form.Label>
                 <input type="text" onChange={e=>setExpense(e.target.value)}></input>
            </Form.Group>
        <Form.Group controlId='markdown'>
                <Form.Label>Body</Form.Label>
            <Form.Control required as="textarea" onChange={e=>setMarkdowns(e.target.value)} rows={4}/>
        </Form.Group>
        <Stack direction='horizontal' gap={2} className="justify-content-end">
            <Button type="submit" variant ="primary">Save</Button>
            <Link to="..">
              <Button type="button" variant="outline-secondary">Cancel</Button>
            </Link>
            
        </Stack>
      </Stack>
    </Form>
  )
}
