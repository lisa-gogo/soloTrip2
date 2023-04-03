import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Navigate, Link} from 'react-router-dom'
import { Container, Row, Col, Stack, Button} from 'react-bootstrap';
import NewNote from './NewNote';
import { useLocalStorage } from './useLocalStorage';
import { useMemo } from 'react';
import { v4 as uuidV4} from 'uuid';
import NoteList from './NoteList';
import NoteLayout from './NoteLayout';
import Note from './Note';
import EditNote from './EditNote';
import logo from '../src/assets/logo.png'
import SingleRoom from './components/SingleRoom';
import SharedRoom from './components/SharedRoom';
import CruiseShip from './components/CruiseShip';
import { NoteData, Tag, RawNote,RawNoteData } from './types';
import { Auth } from './components/auth';
import Signup from './components/Signup';
import AuthProvider from './contexts/AuthContext';
import Login from './components/Login';
import Profile from './components/Profile';
import UpdateProfile from './components/UpdateProfile';
import {useAuth} from '../src/contexts/AuthContext'
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch} from './store/hooks'
import { fetchTrips } from './store/feature/tripListSlice'
import MyPost from './components/MyPost';
export let PORT : string | any
  process.env.REACT_APP_STATUS === 'production' ? (PORT = process.env.REACT_APP_PROD_PORT):( PORT=process.env.REACT_APP_DEV_PORT) 

export type Note = {
  id: string 
} & NoteData

function App() {
  const [notes, setNotes] = useLocalStorage<RawNote[]>("NOTES", [])
   const [tags, setTags] = useLocalStorage<Tag[]>("TAGS", []);
     const [error, setError] = useState("")
  
    const navigate = useNavigate();
    
    // redux 
    const trips = useAppSelector((state) => state.trips)
    const allTrips = trips.trips
    
    const dispatch = useAppDispatch()

    useEffect(()=>{
        dispatch(fetchTrips())
    },[])

    // redux - done 
      const {currentUser, logout} = useAuth();

   const notesWithTags = useMemo(()=>{
    return notes.map(note => {
      return {...note, tags: tags.filter(tag => note.tagIds.includes(tag.id))}
    })
   },[notes,tags])

   const onCreateNote=({ tags, ...data}: NoteData)=>{
      setNotes(prevNotes =>{
        return [...prevNotes,
          {...data, id: uuidV4(), tagIds: tags.map(tag => tag.id)}]
      })
   }

   const onDeleteNote=(id: string)=>{
    setNotes (prevNotes =>{
      return prevNotes.filter(note => note.id !==id)
    })
   }

   const addTag=(tag: Tag)=>{
    setTags(prev => [...prev,tag])
   }

   const updateTag=(id: string, label: string)=>{
      setTags(prevTags =>{
        return prevTags.map(tag =>{
          if(tag.id === id){
            return {...tag, label}
          }else{
            return tag
          }
        })
      })
   }

   const deleteTag=(id: string)=>{
    setTags(prevTags =>{
      return prevTags.filter(tag => tag.id !== id)
    })
   }

   const onUpdateNote=(id: string, {tags, ...data}:NoteData) =>{
    setNotes(prevNotes => {
      return prevNotes.map( note =>{
        if(note.id ===id) {
          return {...note,...data, id: uuidV4(),tagIds: tags.map(tag=>tag.id)}
        }else{
          return note
        }
      })
    })
   }
  
   const handleLogout =async ()=>{
    setError('')
    try{
     await logout();
     navigate("/")
    }catch(err){
      setError('Failed to logout ')
    }
     
  }

  return (
    <AuthProvider>
       <Container className="my-4">
      <Row className='align-items-center mb-4'>
        <Col>
         <Link to="/"  className="text-decoration-none text-dark">
           <div className="container h-10 " >
                <div className="row">
                  <div className="col-sm">
                   <img src={logo} alt="logo" />
                  </div>
                  <div className="col-sm fs-2 fw-bold text-start pt-5" style={{alignItems:'center'}}>
                     <div className='' style={{ fontFamily:"Trebuchet MS"}}>Solo Travel </div>
                     <div className='fs-6 fw-light' >Find a companion to embark on a brief journey with you.</div>
                  </div>
              </div>
              </div>
          
         </Link>
         
        </Col>
        <Col xs="auto">
               <Col> 
        <div className='fw-bold'>You can try: test@gmail.com, password: 123456</div>
        <div>Welcome !</div>
        <div className='fw-bold'>{currentUser && currentUser.displayName}</div>
        {currentUser && <Link to="/profile" className='btn btn-primary'>Manage Profile</Link>}
        {currentUser ? 
        <>
          <Button style={{marginLeft :"10px"}} onClick={handleLogout}>Log out</Button>
        </>:
        <>
         <Link to='/SignUp'>
            <Button variant="primary">Sign up</Button>
          </Link>
          <Link to='/Login'>
            <Button style={{marginLeft :"10px"}} variant="primary">Login</Button>
          </Link>
        </>}
      
         
        
    </Col>
              
          </Col>
      </Row>
      <Row>

      </Row>
      <Row>
      </Row>
      <Routes>
        <Route path='/SignUp'element={<Signup/>}/>
         <Route path='/Login'element={<Login/>}/>
        <Route path='/SingleRoom'element={<SingleRoom/>}/>
        <Route path='/sharedroom'element={<SharedRoom/>}/>
        <Route path='/cruiseship'element={<CruiseShip/>}/>
         
        <Route path='/' element ={<NoteList availableTags={tags} notes={notesWithTags}
        onUpdateTag={updateTag}
        onDeleteTag = {deleteTag}
        />}></Route>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/updateprofile'element={<UpdateProfile/>}/>
        <Route path='/myPosts' element={<MyPost/>}></Route>
        <Route path='/new' 
        element={
        <NewNote 
        onSubmit={onCreateNote}
        onAddTag={addTag}
        availableTags = {tags}
        />}></Route>
        <Route path='/:id' element={<NoteLayout trips={allTrips}/>}>
          <Route index element={<Note/>}></Route>
          <Route path='edit' element={<EditNote
          />}/>
        </Route>
        <Route path ="*" element={<Navigate to="/"/>}></Route>
      </Routes>
      </Container>
    </AuthProvider>
   
  );
}

export default App;
